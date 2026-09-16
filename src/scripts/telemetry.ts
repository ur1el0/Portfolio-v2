/**
 * Client-Side Telemetry Collector
 * Captures visitor device specifications and origin referrers.
 * Deduplicates notifications per browser session to prevent email flooding.
 */

function initTelemetry(): void {
  if (typeof window === 'undefined') return;

  // 1. Guard: Ignore automated bot/crawler traffic
  const ua = navigator.userAgent;
  const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|headless/i.test(ua);
  if (isBot) return;

  // 2. Resolve URL Params & Debug Bypass
  const urlParams = new URLSearchParams(window.location.search);
  const isDebug = urlParams.has('test') || urlParams.has('debug');

  // 3. Guard: Deduplicate alerts per visitor session (bypassed if ?test=1)
  const SESSION_KEY = 'portfolio_view_reported';
  if (!isDebug && sessionStorage.getItem(SESSION_KEY)) {
    return;
  }

  // 4. Resolve Traffic Source / Platform Origin
  const refParam = urlParams.get('ref') || urlParams.get('utm_source') || urlParams.get('source');
  const rawReferrer = document.referrer || '';

  let platform = 'Direct / Bookmarked';
  if (refParam) {
    platform = refParam.charAt(0).toUpperCase() + refParam.slice(1);
  } else if (rawReferrer.includes('github.com')) {
    platform = 'GitHub';
  } else if (rawReferrer.includes('linkedin.com')) {
    platform = 'LinkedIn';
  } else if (rawReferrer.includes('instagram.com')) {
    platform = 'Instagram';
  } else if (rawReferrer.includes('facebook.com') || rawReferrer.includes('fb.com')) {
    platform = 'Facebook';
  } else if (rawReferrer.includes('twitter.com') || rawReferrer.includes('x.com') || rawReferrer.includes('t.co')) {
    platform = 'X (Twitter)';
  } else if (rawReferrer.includes('reddit.com')) {
    platform = 'Reddit';
  } else if (rawReferrer) {
    try {
      platform = new URL(rawReferrer).hostname;
    } catch {
      platform = rawReferrer;
    }
  }

  // 4. Resolve Device & Client Specs
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch)))/i.test(ua);
  const deviceType = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';

  let os = 'Other';
  if (ua.includes('Win')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  let browser = 'Other';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Microsoft Edge';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';

  const payload = {
    platform,
    rawReferrer: rawReferrer || '(None)',
    deviceType,
    os,
    browser,
    screenResolution: `${window.screen.width} × ${window.screen.height}`,
    viewport: `${window.innerWidth} × ${window.innerHeight}`,
    path: window.location.pathname,
    timestamp: new Date().toLocaleString(),
    language: navigator.language,
  };

  // 5. Mark session as recorded (unless in test/debug mode)
  if (!isDebug) {
    sessionStorage.setItem(SESSION_KEY, '1');
  }

  // 6. Send telemetry via fetch (guaranteed application/json) with beacon fallback
  const serialized = JSON.stringify(payload);
  fetch('/api/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: serialized,
    keepalive: true,
  })
    .then((res) => {
      if (isDebug) {
        console.log('[Telemetry] Dispatched successfully. Status:', res.status);
      }
    })
    .catch(() => {
      if (navigator.sendBeacon) {
        const blob = new Blob([serialized], { type: 'application/json' });
        navigator.sendBeacon('/api/notify', blob);
      }
    });
}

// Run after idle/page load to ensure zero impact on First Contentful Paint (FCP)
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    initTelemetry();
  } else {
    window.addEventListener('load', initTelemetry);
  }
}

