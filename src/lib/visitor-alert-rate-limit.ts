declare const process: { env: Record<string, string | undefined> };

const WINDOW_MS = 24 * 60 * 60 * 1000;
const GLOBAL_REQUEST_LIMIT = 10;
const IP_REQUEST_LIMIT = 1;

const CONSUME_REQUEST_SCRIPT = `
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local globalLimit = tonumber(ARGV[3])
local ipLimit = tonumber(ARGV[4])
local requestId = ARGV[5]

redis.call('ZREMRANGEBYSCORE', KEYS[1], '-inf', now - window)
redis.call('ZREMRANGEBYSCORE', KEYS[2], '-inf', now - window)

local function retryAfter(key)
  local oldest = redis.call('ZRANGE', key, 0, 0, 'WITHSCORES')
  return math.max(1, tonumber(oldest[2]) + window - now)
end

if redis.call('ZCARD', KEYS[1]) >= globalLimit then
  return {0, retryAfter(KEYS[1])}
end

if redis.call('ZCARD', KEYS[2]) >= ipLimit then
  return {0, retryAfter(KEYS[2])}
end

redis.call('ZADD', KEYS[1], now, requestId)
redis.call('ZADD', KEYS[2], now, requestId)
redis.call('PEXPIRE', KEYS[1], window)
redis.call('PEXPIRE', KEYS[2], window)

return {1, 0}
`;

type RateLimitResult =
  | { status: 'allowed' }
  | { status: 'limited'; retryAfterSeconds: number }
  | { status: 'unavailable' };

async function hashClientIp(ip: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(ip));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function consumeVisitorAlertRequest(ip: string): Promise<RateLimitResult> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) return { status: 'unavailable' };

  let endpoint: URL;
  try {
    endpoint = new URL(redisUrl);
  } catch {
    return { status: 'unavailable' };
  }

  if (endpoint.protocol !== 'https:' || !endpoint.hostname.endsWith('.upstash.io')) {
    return { status: 'unavailable' };
  }

  try {
    const ipHash = await hashClientIp(ip, redisToken);
    const now = Date.now();
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${redisToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        'EVAL',
        CONSUME_REQUEST_SCRIPT,
        2,
        'portfolio-alert:requests:global',
        `portfolio-alert:requests:ip:${ipHash}`,
        now,
        WINDOW_MS,
        GLOBAL_REQUEST_LIMIT,
        IP_REQUEST_LIMIT,
        crypto.randomUUID(),
      ]),
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) return { status: 'unavailable' };

    const result = await response.json() as { result?: unknown; error?: unknown };
    if (result.error || !Array.isArray(result.result) || result.result.length < 2) {
      return { status: 'unavailable' };
    }

    if (Number(result.result[0]) === 1) return { status: 'allowed' };

    const retryAfterMs = Number(result.result[1]);
    if (!Number.isFinite(retryAfterMs)) return { status: 'unavailable' };

    return {
      status: 'limited',
      retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
    };
  } catch {
    return { status: 'unavailable' };
  }
}
