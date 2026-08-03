/**
 * Costruisce lo sprite del marchio a partire dall'SVG originale.
 *
 * Produce DUE symbol nello stesso sistema di coordinate (viewBox 0 0 800 260):
 *   #moioli-logo         → sigla e lettering, senza la riga di payoff
 *   #moioli-logo-payoff  → solo la riga "Prefabbricare per il futuro"
 *
 * Sono separati perché la riga di payoff va mostrata o nascosta a seconda del
 * contesto, ma il riquadro resta quello del lockup completo: così accendere o
 * spegnere la riga non cambia di un pixel la dimensione della sigla e non
 * provoca nessuno spostamento in pagina.
 *
 * Uso:  node scripts/build-logo.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '../src/assets/logo.svg');
const OUT = path.resolve(__dirname, '../src/assets/logo-symbol.svg');

let svg = readFileSync(SRC, 'utf8');

/* Via l'involucro e il clip: il clip coincide con il viewBox, è un'operazione
   nulla, e il suo id rischierebbe di collidere in pagina. */
svg = svg
  .replace(/^[\s\S]*?<g clip-path="url\(#moioliLogoClip\)">/, '')
  .replace(/<\/g><defs>[\s\S]*?<\/defs><\/svg>\s*$/, '');

const tracciati = [...svg.matchAll(/<path d="[^"]+"[^>]*><\/path>/g)].map((m) => m[0]);
if (tracciati.length !== 24) {
  throw new Error(`attesi 24 tracciati, trovati ${tracciati.length}`);
}

/* La riga di payoff è l'unico tracciato che sta interamente sotto quota 220:
   si riconosce da lì, non dalla posizione nell'elenco. */
const sottoQuota = (d) => {
  const ys = [...d.matchAll(/M(-?[\d.]+)\s+(-?[\d.]+)/g)].map((m) => +m[2]);
  return Math.min(...ys) > 220;
};

const payoff = tracciati.filter((t) => sottoQuota(t));
const marchio = tracciati.filter((t) => !sottoQuota(t));

if (payoff.length !== 1) {
  throw new Error(`attesa una sola riga di payoff, trovate ${payoff.length}`);
}

/* I riempimenti fissi diventano variabili CSS: sono le uniche proprietà che
   attraversano il confine di <use>, quindi permettono la variante bianca
   senza duplicare la geometria. */
const varia = (s) =>
  s.replace(/fill="#1F2A43"/g, 'style="fill:var(--lg-n)"').replace(/fill="#E42829"/g, 'style="fill:var(--lg-r)"');

const out =
  `<symbol id="moioli-logo" viewBox="0 0 800 260">${varia(marchio.join(''))}</symbol>` +
  `<symbol id="moioli-logo-payoff" viewBox="0 0 800 260">${varia(payoff.join(''))}</symbol>`;

writeFileSync(OUT, out + '\n', 'utf8');

console.log(`marchio: ${marchio.length} tracciati, ${varia(marchio.join('')).length} byte`);
console.log(`payoff:  ${payoff.length} tracciato,  ${varia(payoff.join('')).length} byte`);
console.log(`totale sprite: ${out.length} byte`);
