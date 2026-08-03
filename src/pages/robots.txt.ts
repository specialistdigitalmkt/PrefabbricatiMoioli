/**
 * robots.txt generato a build time.
 *
 * FINCHÉ È UNA DEMO, IL SITO NON DEVE ESSERE INDICIZZATO.
 * Una demo del sito di un'azienda reale, pubblicata su un dominio provvisorio,
 * se finisce nei motori di ricerca crea due problemi: contenuti duplicati
 * rispetto al sito vero, e il nome del cliente associato a un indirizzo che
 * non è il suo.
 *
 * L'indicizzazione si apre da sola quando si imposta la variabile d'ambiente
 * `SITE_URL` sul dominio definitivo. Nessun file da ricordarsi di modificare
 * a mano il giorno del lancio.
 */
import type { APIRoute } from 'astro';

const DOMINIO_DEFINITIVO = 'www.prefabbricatimoioli.it';

export const GET: APIRoute = ({ site }) => {
  const base = String(site ?? '').replace(/\/$/, '');

  /* Si guarda la variabile d'ambiente, non `site`: quest'ultimo ha come
     ripiego il dominio definitivo — serve a generare canonical validi anche
     in anteprima — quindi da solo farebbe sembrare produzione qualunque
     build. L'indicizzazione si apre solo con una scelta esplicita. */
  const inProduzione = (process.env.SITE_URL ?? '').includes(DOMINIO_DEFINITIVO);

  const corpo = inProduzione
    ? `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`
    : `# Anteprima di lavoro — non indicizzare.
# L'indicizzazione si apre impostando SITE_URL sul dominio definitivo.
User-agent: *
Disallow: /
`;

  return new Response(corpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
