/**
 * Modulo «Richiedi un preventivo» di /contatti e /en/contact.
 * Spedisce la richiesta a DESTINATARI.contatti (info@), con chi scrive come
 * indirizzo di risposta.
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return rispondi(res, 405, { errore: 'metodo_non_ammesso' });
  }
  if (!postaPronta()) return rispondi(res, 503, NON_ATTIVO);

  const c = req.body || {};
  if (sembraAutomatico(c)) return rispondi(res, 200, { ok: true });

  const nome = testo(c.nome, 120);
  const azienda = testo(c.azienda, 160);
  const telefono = testo(c.telefono, 40);
  const email = testo(c.email, 200);
  const tipo = testo(c.tipo, 120);
  const messaggio = testo(c.messaggio, 5000, true);
  const lingua = c.lingua === 'en' ? 'en' : 'it';

  if (
    nome.length < 2 ||
    azienda.length < 2 ||
    telefono.replace(/[^\d+]/g, '').length < 8 ||
    !EMAIL_VALIDA.test(email) ||
    c.privacy !== true
  ) {
    return rispondi(res, 400, { errore: 'dati_non_validi', messaggio: 'Alcuni campi non sono validi.' });
  }

  const corpo = [
    `Nuova richiesta dal modulo contatti del sito${lingua === 'en' ? ' (versione inglese)' : ''}`,
    '',
    `Nome e cognome: ${nome}`,
    `Azienda: ${azienda}`,
    `Telefono: ${telefono}`,
    `Email: ${email}`,
    `Tipo di intervento: ${tipo || '(non indicato)'}`,
    '',
    'Progetto:',
    messaggio || '(nessuna descrizione)',
    '',
    'Chi scrive ha preso visione dell’informativa privacy.',
    `Inviata il ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}`,
  ].join('\n');

  try {
    await invia({
      a: DESTINATARI.contatti,
      rispondiA: email,
      oggetto: `Richiesta preventivo - ${azienda} - ${nome}`,
      testo: corpo,
    });
    return rispondi(res, 200, { ok: true });
  } catch (e) {
    console.error('contatto:', e);
    return rispondi(res, 502, { errore: 'invio_fallito', messaggio: 'Invio non riuscito.' });
  }
}
