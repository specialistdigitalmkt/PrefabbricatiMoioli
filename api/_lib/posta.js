/**
 * Invio email dei moduli del sito, condiviso da api/contatto.js e
 * api/candidatura.js. La cartella comincia con «_»: Vercel non la espone
 * come indirizzo, è solo codice in comune.
 *
 * SERVIZIO: Resend (resend.com), chiamato con fetch: nessuna dipendenza in
 * più nel progetto. Il piano gratuito copre 3.000 email al mese, allegati
 * compresi, ben oltre quello che serve qui.
 *
 * VARIABILI D'AMBIENTE (pannello Vercel → Settings → Environment Variables)
 *   RESEND_API_KEY      chiave API di Resend. Senza, i moduli rispondono
 *                       503 e la pagina propone l'email diretta.
 *   MAIL_FROM           mittente, es. «Sito Prefabbricati Moioli
 *                       <sito@prefabbricatimoioli.it>». Il dominio va
 *                       verificato in Resend (record DNS SPF/DKIM).
 *   MAIL_CONTATTI       facoltativa, predefinito info@prefabbricatimoioli.it
 *   MAIL_CANDIDATURE    facoltativa, predefinito service@prefabbricatimoioli.it
 */

export const DESTINATARI = {
  contatti: process.env.MAIL_CONTATTI || 'info@prefabbricatimoioli.it',
  candidature: process.env.MAIL_CANDIDATURE || 'service@prefabbricatimoioli.it',
};

export const EMAIL_VALIDA = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function rispondi(res, stato, corpo) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.status(stato).json(corpo);
}

/** Testo pulito e accorciato: niente a capo dove non servono, niente romanzi. */
export function testo(v, max, aCapo = false) {
  if (typeof v !== 'string') return '';
  const t = aCapo ? v.replace(/\r\n?/g, '\n') : v.replace(/\s+/g, ' ');
  return t.trim().slice(0, max);
}

/**
 * Filtro anti-automatismi: il campo trappola deve restare vuoto e fra
 * l'apertura della pagina e l'invio devono passare almeno 3 secondi.
 * A chi non passa si risponde «ok» senza spedire nulla: un errore
 * insegnerebbe al programma cosa correggere.
 */
export function sembraAutomatico(corpo) {
  return Boolean(corpo.sito) || (typeof corpo.ms === 'number' && corpo.ms < 3000);
}

export function postaPronta() {
  return Boolean(process.env.RESEND_API_KEY && process.env.MAIL_FROM);
}

/**
 * @param {{ a: string, rispondiA?: string, oggetto: string, testo: string,
 *           allegati?: { filename: string, content: string }[] }} m
 */
export async function invia(m) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM,
      to: [m.a],
      reply_to: m.rispondiA,
      subject: m.oggetto,
      text: m.testo,
      attachments: m.allegati,
    }),
  });
  if (!r.ok) {
    const dettaglio = await r.text().catch(() => '');
    throw new Error(`Resend ${r.status}: ${dettaglio.slice(0, 300)}`);
  }
}

export const NON_ATTIVO = {
  errore: 'posta_non_attiva',
  messaggio: 'L’invio dal sito non è ancora attivo.',
};
