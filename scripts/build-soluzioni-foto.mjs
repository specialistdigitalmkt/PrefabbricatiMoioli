/**
 * Pipeline fotografica delle soluzioni.
 *
 * Sorgente: `CARTELLA IMMAGINI/SOLUZIONI`, fornita dal cliente e non
 * versionata. Uscita: derivate WebP in public/img + voci in images.json.
 *
 * I FILE .TIF VENGONO ELABORATI.
 * In una fase precedente erano stati esclusi perché c'erano alternative in
 * JPG. Per Doppia falda non è così: la cartella contiene solo TIF, e senza
 * quelli la soluzione resterebbe l'unica priva di fotografie. Sono sorgenti
 * ottime — fino a 6144px — quindi non c'era motivo di rinunciarci.
 *
 * Uso:  npm run soluzioni-foto
 */
import sharp from 'sharp';
import { readdir, mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '../CARTELLA IMMAGINI/SOLUZIONI');
const OUT = path.resolve(__dirname, '../public/img');
const MANIFEST = path.resolve(__dirname, '../src/data/images.json');
const DATI = path.resolve(__dirname, '../src/data/soluzioni-foto.json');

const W_COVER = [480, 768, 1200, 1800];
const W_GALLERY = [480, 768, 1200];
const QUALITY = 78;
const MAX_GALLERY = 8;
const MIN_UTILE = 1000;

/** Cartella sorgente → slug della soluzione sul sito. */
const MAPPA = {
  Bacacier: 'bacacier',
  'Doppia Pendenza': 'doppia-falda',
  Stegos: 'stegos',
  Tecnoshed: 'tecnoshed',
  Tecnowing: 'tecnowing',
  'Tegolo TT': 'tegolo-tt',
};

/**
 * Solo queste quattro hanno la galleria automatica.
 * Stegos e Tecnoshed hanno pagine scritte a mano, con una galleria scelta a
 * mano: generare anche le loro derivate significherebbe produrre decine di
 * file che nessuna pagina richiede. La copertina invece serve a tutte e sei,
 * perché la usa la scheda nell'indice.
 */
const CON_GALLERIA = new Set(['bacacier', 'doppia-falda', 'tecnowing', 'tegolo-tt']);

const LEGGIBILI = /\.(jpe?g|png|tiff?)$/i;

async function scrivi(file, id, widths) {
  const meta = await sharp(file, { limitInputPixels: false }).metadata();
  const usabili = widths.filter((w) => w <= meta.width);
  if (usabili.length === 0) usabili.push(meta.width);

  for (const w of usabili) {
    await sharp(file, { limitInputPixels: false })
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(path.join(OUT, `${id}-${w}.webp`));
  }

  return { widths: usabili, ratio: +((meta.width ?? 1) / (meta.height ?? 1)).toFixed(4) };
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));
  const risultato = {};

  for (const [cartella, slug] of Object.entries(MAPPA)) {
    const dir = path.join(SRC, cartella);

    let files;
    try {
      files = (await readdir(dir)).filter((f) => LEGGIBILI.test(f)).sort();
    } catch {
      console.log(`saltata ${cartella}: cartella assente`);
      continue;
    }

    /* Si misura tutto prima di scegliere: cosi la copertina e una vera
       vista d'insieme e non il primo file in ordine alfabetico. */
    const misurate = [];
    for (const f of files) {
      try {
        const m = await sharp(path.join(dir, f), { limitInputPixels: false }).metadata();
        misurate.push({
          f,
          w: m.width,
          h: m.height,
          area: m.width * m.height,
          land: m.width / m.height >= 1.25,
        });
      } catch (e) {
        console.log(`  illeggibile: ${f}`);
      }
    }

    const utili = misurate.filter((x) => x.w >= MIN_UTILE);
    if (utili.length === 0) {
      console.log(`saltata ${cartella}: nessuna immagine utilizzabile`);
      continue;
    }

    /* Le riprese da drone inquadrano l'edificio intero: come copertina
       valgono piu di un dettaglio, anche quando il dettaglio e piu grande. */
    const orizzontali = utili.filter((x) => x.land);
    const candidate = orizzontali.length ? orizzontali : utili;
    const drone = candidate.filter((x) => /DJI/i.test(x.f));
    const cover = (drone.length ? drone : candidate).sort((a, b) => b.area - a.area)[0];

    const idCover = `sol-${slug}-cover`;
    const infoCover = await scrivi(path.join(dir, cover.f), idCover, W_COVER);
    manifest[idCover] = { ...infoCover, source: `SOLUZIONI/${cartella}/${cover.f}` };

    const galleria = [];
    const daElaborare = CON_GALLERIA.has(slug)
      ? utili.filter((x) => x.f !== cover.f).slice(0, MAX_GALLERY)
      : [];
    for (const x of daElaborare) {
      const id = `sol-${slug}-${galleria.length + 1}`;
      const info = await scrivi(path.join(dir, x.f), id, W_GALLERY);
      manifest[id] = { ...info, source: `SOLUZIONI/${cartella}/${x.f}` };
      galleria.push({ id, ratio: info.ratio });
    }

    risultato[slug] = {
      cover: idCover,
      coverRatio: infoCover.ratio,
      galleria,
      totale: utili.length,
    };

    console.log(
      `${cartella.padEnd(18)} → ${slug.padEnd(14)} cover + ${galleria.length} foto (${utili.length} utili su ${files.length})`
    );
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  await writeFile(DATI, JSON.stringify(risultato, null, 2) + '\n', 'utf8');
  console.log(`\n${Object.keys(risultato).length} soluzioni con fotografie.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
