import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response('The site URL is not configured.', { status: 500 });
  }

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
