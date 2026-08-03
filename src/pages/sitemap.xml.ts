/**
 * Sitemap generata a build time.
 * Elenca solo le route realmente esistenti: niente pagine fantasma.
 */
import type { APIRoute } from 'astro';

const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/soluzioni', priority: '0.9', changefreq: 'monthly' },
  { path: '/soluzioni/tecnoshed', priority: '0.9', changefreq: 'monthly' },
  { path: '/soluzioni/stegos', priority: '0.9', changefreq: 'monthly' },
  { path: '/progetti', priority: '0.8', changefreq: 'monthly' },
  { path: '/azienda', priority: '0.8', changefreq: 'yearly' },
  { path: '/azienda/referenze', priority: '0.6', changefreq: 'yearly' },
  { path: '/azienda/riconoscimenti', priority: '0.5', changefreq: 'yearly' },
  { path: '/progetti/scheda-modello', priority: '0.5', changefreq: 'yearly' },
  { path: '/contatti', priority: '0.7', changefreq: 'yearly' },
];

export const GET: APIRoute = ({ site }) => {
  const base = String(site ?? 'https://www.prefabbricatimoioli.it').replace(/\/$/, '');
  const today = new Date().toISOString().slice(0, 10);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${base}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
