import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const staticPages = ['', 'about', 'our-work', 'impact', 'gallery', 'get-involved', 'donate', 'contact'];

export const GET: APIRoute = async ({ site }) => {
  const campaigns = await getCollection('campaigns', (c) => !c.data.draft);
  const urls = [...staticPages.map((p) => (p ? `/${p}/` : "/")), ...campaigns.map((c) => `/campaigns/${c.id}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${new URL(u, site).href}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
