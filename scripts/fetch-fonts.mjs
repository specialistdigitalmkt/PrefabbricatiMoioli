/**
 * Scarica i font in locale.
 *
 * Perché non il CDN di Google: il foglio di stile remoto blocca il rendering e
 * costa due connessioni prima ancora che parta il primo byte di testo.
 * Ospitandoli si tolgono entrambe le attese e i file entrano nella stessa
 * cache del resto del sito.
 *
 * Uso:  node scripts/fetch-fonts.mjs
 * Va rilanciato solo se si cambiano famiglie o pesi.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_FONTS = path.resolve(__dirname, '../public/fonts');
const OUT_CSS = path.resolve(__dirname, '../src/styles/fonts.css');

/* User agent moderno: senza, Google restituisce formati vecchi e pesanti. */
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const FAMIGLIE = [
  { css: 'Space+Grotesk:wght@500;600;700', nome: 'Space Grotesk', slug: 'space-grotesk' },
  { css: 'IBM+Plex+Sans:wght@400;500;600;700', nome: 'IBM Plex Sans', slug: 'ibm-plex-sans' },
  { css: 'IBM+Plex+Mono:wght@400;500', nome: 'IBM Plex Mono', slug: 'ibm-plex-mono' },
  /* Solo per la variante editoriale in valutazione: se la variante non viene
     scelta, questa riga e i file corrispondenti vanno tolti. */
  { css: 'Archivo:wght@500;600;700', nome: 'Archivo', slug: 'archivo' },
];

/* Solo i sottoinsiemi che servono all'italiano. */
const SUBSET_OK = new Set(['latin', 'latin-ext']);

const blocchi = [];

for (const fam of FAMIGLIE) {
  const url = `https://fonts.googleapis.com/css2?family=${fam.css}&display=swap`;
  const css = await fetch(url, { headers: { 'User-Agent': UA } }).then((r) => r.text());

  /* Il CSS di Google arriva a blocchi, ciascuno preceduto da un commento
     con il nome del sottoinsieme. */
  const pezzi = css.split('/*').slice(1);

  for (const pezzo of pezzi) {
    const subset = pezzo.slice(0, pezzo.indexOf('*/')).trim();
    if (!SUBSET_OK.has(subset)) continue;

    const peso = pezzo.match(/font-weight:\s*(\d+)/)?.[1];
    const stile = pezzo.match(/font-style:\s*(\w+)/)?.[1] ?? 'normal';
    const src = pezzo.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
    const unicode = pezzo.match(/unicode-range:\s*([^;]+);/)?.[1];
    if (!peso || !src) continue;

    const file = `${fam.slug}-${peso}-${subset}.woff2`;
    const buf = Buffer.from(await fetch(src, { headers: { 'User-Agent': UA } }).then((r) => r.arrayBuffer()));
    await mkdir(OUT_FONTS, { recursive: true });
    await writeFile(path.join(OUT_FONTS, file), buf);

    blocchi.push({ fam: fam.nome, peso, stile, file, unicode, subset, kb: buf.length / 1024 });
    console.log(`  ${file}  ${(buf.length / 1024).toFixed(1)} KB`);
  }
}

const css = `/* =========================================================================
   FONT — generato da scripts/fetch-fonts.mjs. Non modificare a mano.

   Ospitati in locale: nessuna richiesta a terzi, nessun foglio di stile
   remoto che blocchi il rendering.
   font-display: swap — il testo compare subito con il ripiego di sistema e
   viene sostituito appena il font è pronto: mai una pagina muta.
   ========================================================================= */

${blocchi
  .map(
    (b) => `@font-face {
  font-family: '${b.fam}';
  font-style: ${b.stile};
  font-weight: ${b.peso};
  font-display: swap;
  src: url('/fonts/${b.file}') format('woff2');
  unicode-range: ${b.unicode};
}`
  )
  .join('\n\n')}
`;

await writeFile(OUT_CSS, css, 'utf8');

const tot = blocchi.reduce((s, b) => s + b.kb, 0);
console.log(`\n${blocchi.length} file, ${tot.toFixed(1)} KB totali.`);
