/**
 * Pipeline immagini — Prefabbricati Moioli
 *
 * Genera derivate WebP responsive dagli originali in ../moioli-site/assets.
 * Gli originali NON vengono modificati: si scrive solo in public/img/.
 *
 * I file .TIF sono esclusi per scelta (non processabili in modo affidabile
 * e non necessari alla demo).
 *
 * Uso:  npm run images
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_ROOT = path.resolve(__dirname, '../../moioli-site/assets');
const OUT_ROOT = path.resolve(__dirname, '../public/img');

/** Larghezze generate per ogni immagine (srcset). */
const WIDTHS = [480, 768, 1200, 1800];
const QUALITY = 76;

/**
 * Manifesto sorgenti.
 * `id`  -> nome file di output (public/img/<id>-<w>.webp)
 * `src` -> percorso relativo a moioli-site/assets
 */
const MANIFEST = [
  // --- Home -----------------------------------------------------------
  { id: 'hero-home', src: 'hero probabule moioli (1).jpg' },
  { id: 'stabilimento', src: 'Produzione-prefabbricati-moioli-2.jpg' },
  { id: 'plant', src: 'plant.webp' },
  { id: 'warehouse', src: 'warehouse.webp' },

  // --- Soluzioni: copertine -------------------------------------------
  { id: 'sol-tecnoshed', src: 'tegolo alare contenuti/Record_44DJI_0873.jpg' },
  { id: 'sol-tecnowing', src: 'tegolo alare contenuti/DSC00679.jpg' },
  { id: 'sol-bacacier', src: 'Bacacier/IMG_6804.JPG' },
  { id: 'sol-tegolo-tt', src: 'Tegolo TT/09-PAN_0783.jpg' },
  { id: 'sol-stegos', src: 'Stegos/LeCorne_32PAZ_5921.jpg' },

  // --- Tecnoshed: hero + gallery --------------------------------------
  { id: 'shed-hero', src: 'tegolo alare contenuti/Record_45DJI_0881.jpg' },
  { id: 'shed-interno', src: 'tegolo alare contenuti/shed modificato .png' },
  { id: 'shed-copertura', src: 'Shed/IMG_3655.jpg' },
  { id: 'shed-aerea-01', src: 'tegolo alare contenuti/Senago_48DJI_0566.jpg' },
  { id: 'shed-aerea-02', src: 'tegolo alare contenuti/Senago_62DJI_0844.jpg' },
  { id: 'shed-cantiere', src: 'tegolo alare contenuti/Record_47DJI_0880 1.jpg' },
  { id: 'shed-lineart', src: 'tegolo alare contenuti/alare bianco.png' },

  // --- Stegos: pagina dedicata ----------------------------------------
  { id: 'stegos-hero', src: 'Stegos/LeCorne_32PAZ_5921.jpg' },
  { id: 'stegos-elementi', src: 'Stegos/Stegos Foto/Risorsa 1Stegos.png' },
  { id: 'stegos-nodo', src: 'Stegos/IMG_0422.jpg' },
  { id: 'stegos-interno', src: 'Stegos/IMG_0410.jpg' },
  /* Escluso "Risorsa 5Stegos.png": la sorgente è larga 272px, sotto qualunque
     soglia utilizzabile in pagina. */
  { id: 'stegos-cantiere', src: 'Stegos/LeCorne_34PAZ_5925.jpg' },
  { id: 'stegos-struttura', src: 'Stegos/IMG_0428.jpg' },

  // --- Progetti --------------------------------------------------------
  { id: 'prj-01', src: 'Auto industriale SI/DJI_0100.JPG' },
  { id: 'prj-02', src: 'Cingol car SI/DJI_0170.JPG' },
  { id: 'prj-03', src: 'tegolo alare contenuti/Senago_46PAN_8323.jpg' },
  { id: 'prj-04', src: 'Tegolo TT/CMB_Martignoni_24PAN_8335.jpg' },
  { id: 'prj-05', src: 'Auto industriale SI/DSC00301.JPG' },
  { id: 'prj-06', src: 'Cingol car SI/DSC00540.JPG' },
  { id: 'prj-07', src: 'Stegos/IMG_0410.jpg' },
  { id: 'prj-08', src: 'Bac-acier betania SI/IMG_6895.JPG' },
  { id: 'prj-09', src: 'tegolo alare contenuti/Senago_84PAN_3700.jpg' },

  // --- Contatti --------------------------------------------------------
  { id: 'sede', src: 'tegolo alare contenuti/Record_50PAZ_3638.jpg' },
];

async function run() {
  await mkdir(OUT_ROOT, { recursive: true });
  const meta = {};
  let ok = 0;
  const missing = [];

  for (const item of MANIFEST) {
    const abs = path.join(SRC_ROOT, item.src);
    if (!existsSync(abs)) {
      missing.push(item.src);
      continue;
    }

    const input = sharp(abs, { limitInputPixels: false });
    const info = await input.metadata();
    const maxW = info.width ?? 0;

    // Non ingrandire mai oltre la risoluzione nativa.
    const widths = WIDTHS.filter((w) => w <= maxW);
    if (widths.length === 0) widths.push(maxW);

    for (const w of widths) {
      const out = path.join(OUT_ROOT, `${item.id}-${w}.webp`);
      await sharp(abs, { limitInputPixels: false })
        .rotate() // rispetta l'orientamento EXIF
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(out);
    }

    meta[item.id] = {
      widths,
      ratio: +((info.width ?? 1) / (info.height ?? 1)).toFixed(4),
      source: item.src,
    };
    ok++;
    process.stdout.write(`  ok  ${item.id}  (${widths.join('/')})\n`);
  }

  await writeFile(
    path.resolve(__dirname, '../src/data/images.json'),
    JSON.stringify(meta, null, 2) + '\n',
    'utf8'
  );

  console.log(`\n${ok}/${MANIFEST.length} immagini elaborate.`);
  if (missing.length) {
    console.log('Sorgenti non trovate:');
    missing.forEach((m) => console.log('  -', m));
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
