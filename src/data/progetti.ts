/**
 * Realizzazioni.
 *
 * Le schede sono costruite sul materiale fotografico fornito dal cliente
 * (`CARTELLA IMMAGINI/REALIZZAZIONI/da catalogo`), elaborato da
 * `npm run realizzazioni`. L'elenco tecnico — quali immagini, in quali
 * tagli — sta in `realizzazioni-generate.json` e NON si modifica a mano:
 * si rigenera.
 *
 * Qui si tiene solo ciò che è redazionale: titoli, settori, dati di commessa.
 *
 * STATO DEI CONTENUTI
 * - Sei realizzazioni hanno un nome di cartella (Autoindustriale, Centro
 *   Ufficio, Cingol Car, Frigor Trasporti, K22, Sacar). Il nome è quello
 *   dato dall'archivio: va confermato che sia la denominazione da esporre.
 * - Diciannove non hanno ancora un nome: la scheda lo dichiara con un
 *   segnaposto visibile invece di inventarlo.
 * - NESSUNA ha superficie, località o anno: quei dati non sono stati
 *   forniti e restano segnaposto.
 *
 * I committenti con dati verificati (Sanpellegrino, Arcese, Metelli, Ravago,
 * SIAE, Pneumax) vivono in /azienda/referenze, dove il dato è il nome. Qui
 * vive il costruito, dove il dato è la fotografia.
 */
import generate from './realizzazioni-generate.json';

export type FotoGalleria = { id: string; ratio: number };

export type Realizzazione = {
  slug: string;
  /** null = nome non ancora assegnato, la pagina lo dichiara */
  titolo: string | null;
  numerata: boolean;
  cover: string;
  coverRatio: number;
  galleria: FotoGalleria[];
  totaleFoto: number;
};

export const realizzazioni: Realizzazione[] = generate.realizzazioni;

/** Campioni di rivestimento, dalle pagine di catalogo. */
export const rivestimenti: { id: string }[] = generate.rivestimenti;

export const getRealizzazione = (slug: string) =>
  realizzazioni.find((r) => r.slug === slug);

/** Etichetta da mostrare: il nome vero, oppure la sua assenza dichiarata. */
export const etichetta = (r: Realizzazione) =>
  r.titolo ?? `Realizzazione ${r.slug.replace('realizzazione-', '')}`;

/**
 * Testi della pagina indice.
 */
export const paginaProgetti = {
  eyebrow: 'Realizzazioni',
  titolo: 'Oltre 700.000 mq costruiti.',
  lead: 'Più di cento aziende ci hanno affidato i loro stabilimenti. Qui il costruito: capannoni industriali, poli logistici, sedi direzionali.',
  nota: 'Nota per la revisione: le fotografie sono di archivio Moioli e le realizzazioni sono reali. Per sei di esse l’archivio riporta già il nome; per le altre il nome è da assegnare. Superficie, località e anno non sono stati forniti per nessuna e restano segnaposto.',
} as const;

/**
 * Testi della scheda di dettaglio.
 * Gli stessi per tutte: finché non arrivano i dati di commessa, ogni scheda
 * dice le stesse cose e mostra le proprie fotografie.
 */
export const schedaDettaglio = {
  datiTitolo: 'Dati di progetto',
  dati: [
    { label: 'Committente', spec: 'NOME — da archivio' },
    { label: 'Località', spec: 'COMUNE — da commessa' },
    { label: 'Anno', spec: 'ANNO — da commessa' },
    { label: 'Superficie coperta', spec: 'SUPERFICIE — da commessa' },
    { label: 'Soluzione impiegata', spec: 'TIPOLOGIA — da ufficio tecnico' },
    { label: 'Rivestimento', spec: 'FINITURA — da ufficio tecnico' },
  ],
  nota: 'Nota per la revisione: le fotografie sono reali. I dati di commessa non sono stati forniti — ogni riquadro in monospazio indica esattamente il dato che serve.',
} as const;
