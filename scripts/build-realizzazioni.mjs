/**
 * Pipeline immagini delle realizzazioni e dei rivestimenti.
 *
 * Sorgente: `CARTELLA IMMAGINI/REALIZZAZIONI/da catalogo`, fornita dal
 * cliente e NON versionata (centinaia di MB di originali).
 * Uscita: derivate WebP in public/img + voci in src/data/images.json, quindi
 * utilizzabili con <Picture> come tutte le altre.
 *
 * Struttura riconosciuta:
 *   <n>-gruppo/        realizzazione senza nome, da assegnare in seguito
 *   <nome>/            realizzazione con nome gia noto
 *   -rivestimenti/     campioni di finitura, raggruppati per pagina di catalogo
 *
 * Uso:  npm run realizzazioni
 */
import sharp from 'sharp';
import { readdir, mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '../CARTELLA IMMAGINI/REALIZZAZIONI/da catalogo');
const OUT = path.resolve(__dirname, '../public/img');
const MANIFEST = path.resolve(__dirname, '../src/data/images.json');
const DATI = path.resolve(__dirname, '../src/data/realizzazioni-generate.json');

/* Le copertine vanno anche a piena larghezza: servono tutti i tagli.
   Le foto di galleria si vedono al massimo a mezza colonna. */
const W_COVER = [480, 768, 1200, 1800];
const W_GALLERY = [480, 768, 1200];
const W_SWATCH = [320, 648];

const QUALITY = 78;
/** Massimo di foto per realizzazione, oltre diventa peso inutile. */
const MAX_GALLERY = 6;
/** Sotto questa larghezza la sorgente non regge nemmeno una miniatura. */
const MIN_UTILE = 1000;

const slug = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Titolo leggibile da un nome di cartella: "centro ufficio" -> "Centro Ufficio". */
const titolo = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());

async function scrivi(file, id, widths) {
  const meta = await sharp(file).metadata();
  const usabili = widths.filter((w) => w <= meta.width);
  if (usabili.length === 0) usabili.push(meta.width);

  for (const w of usabili) {
    await sharp(file)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(path.join(OUT, `${id}-${w}.webp`));
  }

  return {
    widths: usabili,
    ratio: +((meta.width ?? 1) / (meta.height ?? 1)).toFixed(4),
  };
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));

  const voci = await readdir(SRC, { withFileTypes: true });
  const cartelle = voci.filter((v) => v.isDirectory()).map((v) => v.name);

  const realizzazioni = [];
  const rivestimenti = [];

  for (const cartella of cartelle) {
    const dir = path.join(SRC, cartella);

    /* ---------- Rivestimenti: campioni quadrati su piu sottocartelle ---- */
    if (cartella === '-rivestimenti') {
      const pagine = (await readdir(dir, { withFileTypes: true }))
        .filter((v) => v.isDirectory())
        .map((v) => v.name)
        .sort();

      let n = 0;
      for (const pagina of pagine) {
        const files = (await readdir(path.join(dir, pagina)))
          .filter((f) => /\.jpe?g$/i.test(f))
          .sort();

        for (const f of files) {
          n++;
          const id = `riv-${String(n).padStart(2, '0')}`;
          const info = await scrivi(path.join(dir, pagina, f), id, W_SWATCH);
          manifest[id] = { ...info, source: `${cartella}/${pagina}/${f}` };
          rivestimenti.push({ id });
        }
      }
      console.log(`rivestimenti: ${n} campioni`);
      continue;
    }

    /* ---------- Realizzazioni ------------------------------------------- */
    const files = (await readdir(dir)).filter((f) => /\.jpe?g$/i.test(f)).sort();

    /* Si misura tutto prima di scegliere: la copertina deve essere la
       fotografia piu grande e orizzontale, non semplicemente la prima. */
    const misurate = [];
    for (const f of files) {
      const m = await sharp(path.join(dir, f)).metadata();
      misurate.push({ f, w: m.width, h: m.height, area: m.width * m.height, land: m.width / m.height >= 1.25 });
    }

    const utili = misurate.filter((x) => x.w >= MIN_UTILE);
    if (utili.length === 0) {
      console.log(`saltata ${cartella}: nessuna immagine sopra ${MIN_UTILE}px`);
      continue;
    }

    /* Scelta della copertina.
       Le cartelle fotografate hanno tutte immagini della stessa dimensione,
       quindi l'area non dice nulla sulla qualita dell'inquadratura: ordinando
       per area si finiva su un dettaglio di facciata. Le riprese da drone
       (file DJI_) inquadrano invece l'edificio intero, ed e quello che serve
       a una copertina. Dove non ci sono, si torna all'immagine piu grande. */
    const orizzontali = utili.filter((x) => x.land);
    const candidate = orizzontali.length ? orizzontali : utili;
    const drone = candidate.filter((x) => /^DJI_/i.test(x.f));
    const cover = (drone.length ? drone : candidate).sort((a, b) => b.area - a.area)[0];

    const numerata = /^\d+-gruppo$/i.test(cartella);
    const nome = numerata
      ? `realizzazione-${String(parseInt(cartella, 10)).padStart(2, '0')}`
      : slug(cartella);

    const idCover = `prj-${nome}-cover`;
    const infoCover = await scrivi(path.join(dir, cover.f), idCover, W_COVER);
    manifest[idCover] = { ...infoCover, source: `${cartella}/${cover.f}` };

    const galleria = [];
    for (const x of utili.filter((x) => x.f !== cover.f).slice(0, MAX_GALLERY)) {
      const id = `prj-${nome}-${galleria.length + 1}`;
      const info = await scrivi(path.join(dir, x.f), id, W_GALLERY);
      manifest[id] = { ...info, source: `${cartella}/${x.f}` };
      galleria.push({ id, ratio: info.ratio });
    }

    realizzazioni.push({
      slug: nome,
      cartella,
      /* Le numerate non hanno ancora un nome: lo dichiara la pagina. */
      titolo: numerata ? null : titolo(cartella),
      numerata,
      cover: idCover,
      coverRatio: infoCover.ratio,
      galleria,
      totaleFoto: utili.length,
    });

    console.log(
      `${cartella.padEnd(20)} cover + ${galleria.length} foto  (${utili.length} utili su ${files.length})`
    );
  }

  /* Le realizzazioni con nome per prime, poi le numerate in ordine. */
  realizzazioni.sort((a, b) => {
    if (a.numerata !== b.numerata) return a.numerata ? 1 : -1;
    return a.slug.localeCompare(b.slug, 'it', { numeric: true });
  });

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  await writeFile(
    DATI,
    JSON.stringify({ realizzazioni, rivestimenti }, null, 2) + '\n',
    'utf8'
  );

  console.log(
    `\n${realizzazioni.length} realizzazioni, ${rivestimenti.length} rivestimenti. Manifesto aggiornato.`
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
