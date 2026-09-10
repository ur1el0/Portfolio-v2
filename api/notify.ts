/**
 * Vercel Serverless Telemetry Endpoint
 * Route: POST /api/notify
 * Captures edge geolocation and sends an alert email to zanoroosc@gmail.com via Resend.
 */

declare const process: { env: Record<string, string | undefined> };

export default async function handler(req: any, res: any) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse body if received as string or stream
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // Fallback for beacon payloads
      }
    }

    const {
      platform = 'Unknown',
      rawReferrer = '(None)',
      deviceType = 'Unknown',
      os = 'Unknown',
      browser = 'Unknown',
      screenResolution = 'Unknown',
      viewport = 'Unknown',
      path = '/',
      timestamp = new Date().toISOString(),
      language = 'Unknown',
    } = body || {};

    // Extract Vercel Edge Geolocation Headers
    const country = (req.headers['x-vercel-ip-country'] as string) || 'Unknown Country';
    const region = (req.headers['x-vercel-ip-country-region'] as string) || '';
    const rawCity = (req.headers['x-vercel-ip-city'] as string) || 'Unknown City';
    const city = rawCity !== 'Unknown City' ? decodeURIComponent(rawCity) : rawCity;
    const ip = ((req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || '').split(',')[0].trim();

    const locationText = [city, region, country].filter(Boolean).join(', ');

    // Check if Resend API key is configured
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('[Telemetry] RESEND_API_KEY environment variable is not configured. Visitor payload:', {
        platform,
        location: locationText,
        deviceType,
        ip,
      });
      return res.status(200).json({ status: 'ok', warning: 'RESEND_API_KEY not configured' });
    }

    const emailSubject = `Portfolio Visit: ${platform} (${locationText})`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0b0f19; color: #cbd5e1; margin: 0; padding: 24px; }
            .card { max-width: 560px; margin: 0 auto; background: #131b2e; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
            .header { background: linear-gradient(135deg, #0ea5e9, #10b981); padding: 20px 24px; color: #ffffff; }
            .header h2 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
            .header p { margin: 4px 0 0 0; font-size: 13px; opacity: 0.9; }
            .content { padding: 24px; }
            .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #38bdf8; margin: 18px 0 8px 0; }
            .section-title:first-child { margin-top: 0; }
            .data-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1e293b; font-size: 14px; }
            .label { color: #94a3b8; }
            .value { color: #f1f5f9; font-weight: 500; text-align: right; word-break: break-word; max-width: 65%; }
            .badge { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 12px; font-weight: 600; background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
            .footer { padding: 16px 24px; background: #0c1222; font-size: 11px; text-align: center; color: #64748b; border-top: 1px solid #1e293b; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h2>New Portfolio Visitor Alert</h2>
              <p>Referred via <strong>${platform}</strong></p>
            </div>
            <div class="content">
              <div class="section-title">Traffic Origin & Referrer</div>
              <div class="data-row">
                <span class="label">Platform / Source</span>
                <span class="value"><span class="badge">${platform}</span></span>
              </div>
              <div class="data-row">
                <span class="label">Raw Referrer</span>
                <span class="value">${rawReferrer}</span>
              </div>
              <div class="data-row">
                <span class="label">Page Visited</span>
                <span class="value"><code>${path}</code></span>
              </div>

              <div class="section-title">Visitor Location</div>
              <div class="data-row">
                <span class="label">Location</span>
                <span class="value">${locationText}</span>
              </div>
              <div class="data-row">
                <span class="label">Country Code</span>
                <span class="value">${country}</span>
              </div>
              <div class="data-row">
                <span class="label">IP Address</span>
                <span class="value">${ip}</span>
              </div>

              <div class="section-title">Device & Browser</div>
              <div class="data-row">
                <span class="label">Device Type</span>
                <span class="value">${deviceType}</span>
              </div>
              <div class="data-row">
                <span class="label">Operating System</span>
                <span class="value">${os}</span>
              </div>
              <div class="data-row">
                <span class="label">Browser</span>
                <span class="value">${browser}</span>
              </div>
              <div class="data-row">
                <span class="label">Screen & Viewport</span>
                <span class="value">${screenResolution} (View: ${viewport})</span>
              </div>
              <div class="data-row">
                <span class="label">Language</span>
                <span class="value">${language}</span>
              </div>
              <div class="data-row">
                <span class="label">Timestamp</span>
                <span class="value">${timestamp}</span>
              </div>
            </div>
            <div class="footer">
              Automated visitor telemetry • Portfolio v2
            </div>
          </div>
        </body>
      </html>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Alerts <onboarding@resend.dev>',
        to: ['zanoroosc@gmail.com'],
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      console.error('[Telemetry] Resend API error:', errText);
      return res.status(502).json({ error: 'Email service error', details: errText });
    }

    const data = await resendResponse.json();
    return res.status(200).json({ status: 'delivered', id: data.id });
  } catch (error: any) {
    console.error('[Telemetry] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
