/**
 * Modulo «Invia la tua candidatura» delle pagine /azienda/lavora-con-noi/*.
 * Spedisce dati e CV a DESTINATARI.candidature (service@), con il candidato
 * come indirizzo di risposta: in casella basta «Rispondi».
 *
 * Il CV arriva in base64 dentro il JSON. Il file si controlla due volte:
 * dall'estensione e dai primi byte (un PDF comincia con «%PDF», un .docx è
 * uno zip, un .doc è un documento OLE). Un file che dice di essere un PDF e
 * non lo è non parte.
 */
import {
  DESTINATARI,
  EMAIL_VALIDA,
  NON_ATTIVO,
  invia,
  postaPronta,
  rispondi,
  sembraAutomatico,
  testo,
} from './_lib/posta.js';

const MAX_BYTE = 3 * 1024 * 1024;

const FIRME = {
  pdf: [0x25, 0x50, 0x44, 0x46],
  docx: [0x50, 0x4b, 0x03, 0x04],
  doc: [0xd0, 0xcf, 0x11, 0xe0],
};

function controllaCv(cv) {
  if (!cv || typeof cv.dati !== 'string' || typeof cv.nome !== 'string') return null;
  const est = cv.nome.toLowerCase().match(/\.(pdf|docx?)$/)?.[1];
  if (!est) return null;
  const buf = Buffer.from(cv.dati, 'base64');
  if (buf.length === 0 || buf.length > MAX_BYTE) return null;
  if (!FIRME[est].every((b, i) => buf[i] === b)) return null;
  /* Il nome del file si ricostruisce: niente percorsi o caratteri strani
     dentro l'allegato che arriva in casella. */
  const base = cv.nome.slice(0, -(est.length + 1)).replace(/[^\w.-]+/g, '_').slice(0, 80) || 'cv';
  return { filename: `${base}.${est}`, content: buf.toString('base64') };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return rispondi(res, 405, { errore: 'metodo_non_ammesso' });
  }
  if (!postaPronta()) return rispondi(res, 503, NON_ATTIVO);

  const c = req.body || {};
  if (sembraAutomatico(c)) return rispondi(res, 200, { ok: true });

  const posizione = testo(c.posizione, 120) || 'Candidatura spontanea';
  const nome = testo(c.nome, 120);
  const email = testo(c.email, 200);
  const telefono = testo(c.telefono, 40);
  const messaggio = testo(c.messaggio, 3000, true);
  const allegato = controllaCv(c.cv);

  if (nome.length < 3 || !EMAIL_VALIDA.test(email) || telefono.replace(/[^\d+]/g, '').length < 8 || c.privacy !== true) {
    return rispondi(res, 400, { errore: 'dati_non_validi', messaggio: 'Alcuni campi non sono validi.' });
  }
  if (!allegato) {
    return rispondi(res, 400, { errore: 'cv_non_valido', messaggio: 'Il CV deve essere un PDF o un file Word di massimo 3 MB.' });
  }

  const corpo = [
    `Nuova candidatura dal sito per: ${posizione}`,
    '',
    `Nome e cognome: ${nome}`,
    `Email: ${email}`,
    `Telefono: ${telefono}`,
    '',
    'Messaggio:',
    messaggio || '(nessun messaggio)',
    '',
    `CV allegato: ${allegato.filename}`,
    'Il candidato ha preso visione dell’informativa privacy per i candidati.',
    `Inviata il ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}`,
  ].join('\n');

  try {
    await invia({
      a: DESTINATARI.candidature,
      rispondiA: email,
      oggetto: `Candidatura - ${posizione} - ${nome}`,
      testo: corpo,
      allegati: [allegato],
    });
    return rispondi(res, 200, { ok: true });
  } catch (e) {
    console.error('candidatura:', e);
    return rispondi(res, 502, { errore: 'invio_fallito', messaggio: 'Invio non riuscito.' });
  }
}
