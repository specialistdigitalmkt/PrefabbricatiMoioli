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
 * DATI DI COMMESSA
 * Compilati da commerciale e marketing nella pagina /raccolta-dati
 * (esportazione del 22-23/09/2026) e riportati qui così come inseriti, con
 * due sole normalizzazioni: sigla di provincia maiuscola e Tecnoshed scritto
 * microSHED. Le realizzazioni 13 e 15 sono state segnate «da togliere» e non
 * vengono pubblicate (le foto restano in archivio). Dove un campo non è stato
 * compilato la scheda mostra il segnaposto.
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

export type Commessa = {
  nome: string;
  comune?: string;
  anno?: string;
  /** m², come numero intero */
  superficie?: number;
  /** nome della soluzione, come in soluzioni.ts; 'Mista' se più d'una */
  copertura?: string;
};

/** Escluse su indicazione di commerciale e marketing («togliere»). */
const ESCLUSE = new Set(['realizzazione-13', 'realizzazione-15']);

export const commesse: Record<string, Commessa> = {
  autoindustriale: { nome: 'Auto Industriale Bergamasca S.p.a.', comune: 'Dalmine (BG)', anno: '2017', superficie: 5500, copertura: 'Tecnowing' },
  'centro-ufficio': { nome: 'Centro Ufficio Loreto S.p.a.', comune: 'Pioltello (MI)', anno: '2018', superficie: 15000, copertura: 'Tecnowing' },
  'cingol-car': { nome: 'Cingol Car', comune: 'Nembro (BG)', anno: '2018', superficie: 1400, copertura: 'Coverplan' },
  'frigor-trasporti': { nome: 'Frigor Trasporti', comune: 'San Paolo d’Argon (BG)', anno: '2017', superficie: 3300, copertura: 'Coverplan' },
  k22: { nome: 'GFM S.p.a.', comune: 'Nembro (BG)', anno: '2023', superficie: 5000, copertura: 'Tecnowing' },
  sacar: { nome: 'Sacar', comune: 'Meda (MI)', anno: '2011', superficie: 2200, copertura: 'Tecnowing' },
  'realizzazione-01': { nome: 'Scuola Materna', comune: 'Pognano (BG)', copertura: 'Tegolo TT' },
  'realizzazione-02': { nome: 'Electraline S.p.a.', comune: 'Concorezzo (MB)', anno: '2010', superficie: 6000, copertura: 'microSHED' },
  'realizzazione-03': { nome: 'Concessionaria Range Rover', comune: 'Concorezzo (MB)', copertura: 'Stegos' },
  'realizzazione-04': { nome: 'Imec S.p.a.', comune: 'Carvico (BG)', anno: '2009', superficie: 3500, copertura: 'Doppia falda' },
  'realizzazione-05': { nome: 'Multi-cliente', comune: 'Lallio (BG)', anno: '2010', superficie: 4000, copertura: 'Tecnowing' },
  'realizzazione-06': { nome: 'Le Maschere Shop', comune: 'Martinengo (BG)', anno: '2008', superficie: 15000, copertura: 'Tegolo TT' },
  'realizzazione-07': { nome: 'Bosio Commerciale', comune: 'Onore (BG)', anno: '2007', superficie: 1850, copertura: 'Tegolo TT' },
  'realizzazione-08': { nome: 'Pneumax S.p.a.', comune: 'Lurano (BG)', anno: '2018', superficie: 5500, copertura: 'Stegos' },
  'realizzazione-09': { nome: 'Centro commerciale', comune: 'Milano (MI)', anno: '2004', superficie: 17500, copertura: 'Tegolo TT' },
  'realizzazione-10': { nome: 'Valseriana Center', comune: 'Albino (BG)', anno: '2008', superficie: 24000, copertura: 'Tegolo TT' },
  'realizzazione-11': { nome: 'Cantina vinicola Locatelli & Caffi', comune: 'Chiuduno (BG)', anno: '2015', superficie: 2300, copertura: 'Mista' },
  'realizzazione-12': { nome: 'Aro Tubi S.p.a.', comune: 'Valmorea (CO)', anno: '2010', superficie: 8000, copertura: 'Doppia falda' },
  'realizzazione-14': { nome: 'Casa del Dolce S.p.a.', comune: 'Fara Gera d’Adda (BG)', anno: '2011', superficie: 3000, copertura: 'Tecnowing' },
  'realizzazione-16': { nome: 'La Sorgente', comune: 'Pessano con Bornago (BG)', anno: '2014', superficie: 5400, copertura: 'Stegos' },
  'realizzazione-17': { nome: 'Pagani Industrie Alimentari S.p.a.', comune: 'Vimercate (MB)', anno: '2010', superficie: 6100, copertura: 'Tecnowing' },
  'realizzazione-18': { nome: 'Bosch Italia', comune: 'Cavernago (BG)', anno: '2010', superficie: 1800, copertura: 'Tecnowing' },
  'realizzazione-19': { nome: 'San Pellegrino S.p.a.', comune: 'Madone (BG)', anno: '2000', superficie: 65000, copertura: 'Tegolo TT' },
};

export const realizzazioni: Realizzazione[] = generate.realizzazioni
  .filter((r) => !ESCLUSE.has(r.slug))
  .map((r) => {
    const c = commesse[r.slug];
    return c ? { ...r, titolo: c.nome, numerata: false } : r;
  });

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
  nota: 'Nota per la revisione: nomi e dati di commessa sono quelli inseriti da commerciale e marketing nella raccolta dati di settembre 2026. Dove un dato manca, la scheda lo segnala.',
} as const;

/**
 * Testi della scheda di dettaglio.
 * Il nome della commessa è il titolo della pagina; qui le righe sotto.
 * `spec` è il segnaposto mostrato quando il campo non è stato compilato.
 */
export const schedaDettaglio = {
  datiTitolo: 'Dati di progetto',
  dati: [
    { k: 'comune', label: 'Località', spec: 'COMUNE — da commessa' },
    { k: 'anno', label: 'Anno', spec: 'ANNO — da commessa' },
    { k: 'superficie', label: 'Superficie coperta', spec: 'SUPERFICIE — da commessa' },
    { k: 'copertura', label: 'Soluzione impiegata', spec: 'TIPOLOGIA — da ufficio tecnico' },
  ],
  nota: 'Nota per la revisione: i dati sono quelli inseriti da commerciale e marketing nella raccolta dati di settembre 2026. I riquadri in monospazio indicano i dati ancora mancanti.',
} as const;
