/**
 * Archivio della pagina temporanea /raccolta-dati.
 *
 * È una Vercel Function a sé, fuori da Astro: il sito resta interamente
 * statico e le intestazioni di vercel.json (noindex, cache) non cambiano.
 * Si elimina insieme a public/raccolta-dati quando la raccolta è chiusa.
 *
 * DOVE FINISCONO I DATI
 * Un documento JSON per voce in Vercel Blob, sotto `raccolta/<collezione>/`.
 * Uno per voce e non uno solo per tutto: due persone che compilano voci
 * diverse nello stesso momento non si sovrascrivono a vicenda.
 * I file (disegni, foto) NON passano di qui: vanno nella cartella Drive.
 *
 * VARIABILI D'AMBIENTE (pannello Vercel)
 *   BLOB_STORE_ID          creata da Vercel collegando lo store Blob; con
 *                          questa l'SDK si autentica da solo (OIDC). Gli store
 *                          collegati prima usano invece BLOB_READ_WRITE_TOKEN:
 *                          vanno bene entrambe.
 *   RACCOLTA_PASSWORD      scelta dal cliente, chiesta all'apertura della pagina
 *   RACCOLTA_BLOB_ACCESS   facoltativa: 'private' (predefinito) o 'public',
 *                          deve coincidere con il tipo di store creato
 */
import { list, get, put } from '@vercel/blob';
import { timingSafeEqual } from 'node:crypto';

const COLLEZIONI = new Set(['risposte', 'realizzazioni', 'rivestimenti']);
const ID_VALIDO = /^[A-Za-z0-9-]{1,48}$/;
const MAX_BYTE = 32 * 1024;
const PREFISSO = 'raccolta/';
const ACCESSO = process.env.RACCOLTA_BLOB_ACCESS === 'public' ? 'public' : 'private';

function rispondi(res, stato, corpo) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.status(stato).json(corpo);
}

function chiaveGiusta(inviata) {
  const attesa = process.env.RACCOLTA_PASSWORD || '';
  if (!attesa || typeof inviata !== 'string') return false;
  const a = Buffer.from(inviata);
  const b = Buffer.from(attesa);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function leggiTutto() {
  const blobs = [];
  let cursor;
  do {
    const pagina = await list({ prefix: PREFISSO, cursor, limit: 1000 });
    blobs.push(...pagina.blobs);
    cursor = pagina.hasMore ? pagina.cursor : undefined;
  } while (cursor);

  const stato = { risposte: {}, realizzazioni: {}, rivestimenti: {} };
  await Promise.all(
    blobs.map(async (b) => {
      const [, coll, file] = b.pathname.split('/');
      if (!COLLEZIONI.has(coll) || !file || !file.endsWith('.json')) return;
      const r = await get(b.pathname, { access: ACCESSO, useCache: false });
      if (!r) return;
      try {
        stato[coll][file.slice(0, -5)] = JSON.parse(await new Response(r.stream).text());
      } catch {
        /* documento illeggibile: lo si salta invece di far fallire tutto */
      }
    }),
  );
  return stato;
}

export default async function handler(req, res) {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    return rispondi(res, 503, { errore: 'archivio_non_attivo', messaggio: 'L’archivio delle risposte non è ancora collegato al progetto.' });
  }
  if (!process.env.RACCOLTA_PASSWORD) {
    return rispondi(res, 503, { errore: 'password_non_impostata', messaggio: 'Manca la password della pagina nelle impostazioni del progetto.' });
  }
  if (!chiaveGiusta(req.headers['x-raccolta-chiave'])) {
    return rispondi(res, 401, { errore: 'password_errata', messaggio: 'Password non corretta.' });
  }

  try {
    if (req.method === 'GET') {
      return rispondi(res, 200, { stato: await leggiTutto() });
    }

    if (req.method === 'PUT') {
      const { collezione, id, dati } = req.body || {};
      if (!COLLEZIONI.has(collezione) || !ID_VALIDO.test(id || '') || !dati || typeof dati !== 'object' || Array.isArray(dati)) {
        return rispondi(res, 400, { errore: 'richiesta_non_valida', messaggio: 'Voce o dati non riconosciuti.' });
      }
      const testo = JSON.stringify({ ...dati, aggiornato: new Date().toISOString() });
      if (Buffer.byteLength(testo) > MAX_BYTE) {
        return rispondi(res, 413, { errore: 'troppo_lungo', messaggio: 'Il testo è troppo lungo per una sola voce.' });
      }
      await put(PREFISSO + collezione + '/' + id + '.json', testo, {
        access: ACCESSO,
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 60,
      });
      return rispondi(res, 200, { ok: true });
    }

    res.setHeader('Allow', 'GET, PUT');
    return rispondi(res, 405, { errore: 'metodo_non_ammesso' });
  } catch (e) {
    return rispondi(res, 502, { errore: 'archivio_non_raggiungibile', messaggio: (e && e.message) || 'Archivio non raggiungibile.' });
  }
}
