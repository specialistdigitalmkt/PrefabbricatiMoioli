/**
 * Dati d'impresa e navigazione.
 * Tutti i valori qui dentro sono stati confermati come verificati dal cliente.
 * Stato: ready — vedi CONTENT-STATUS.md
 */
import { soluzioni } from './soluzioni';

export const azienda = {
  nome: 'Prefabbricati Moioli',
  ragioneSociale: 'Prefabbricati Moioli S.r.l.',

  /* Payoff del marchio. Compare UNA VOLTA SOLA in tutto il sito, come titolo
     di apertura della home: è lì che ha forza. Ripeterlo nel piè di pagina
     lo trasformerebbe in una firma qualunque e sulla home lo si leggerebbe
     due volte nella stessa schermata.
     Il vecchio "Prefabbricare per il futuro" è stato eliminato ovunque,
     compresa la terza riga disegnata dentro il logo. */
  payoff: { riga1: 'Dove la forma', riga2: 'prende volume.' },

  /* Descrizione fattuale: è questa che firma il piè di pagina. */
  descrizione: 'Strutture prefabbricate in cemento armato',

  fondazione: '1972',
  piva: '01851070167',
  telefono: '+39 035 681239',
  telefonoHref: '+39035681239',
  email: 'info@prefabbricatimoioli.it',
  indirizzo: {
    via: 'Via F.lli Kennedy, 24',
    cap: '24060',
    citta: 'Bagnatica',
    provincia: 'BG',
    regione: 'Lombardia',
    paese: 'IT',
  },
  /* Coordinate della sede, usate per i dati strutturati e il link mappa. */
  geo: { lat: 45.6592, lng: 9.7796 },
  accesso: 'Autostrada A4 — Uscita Seriate',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Prefabbricati+Moioli+Via+F.lli+Kennedy+24+Bagnatica+BG',
} as const;

/**
 * Menu principale: contiene solo ciò che è navigabile e finito.
 * Le voci con `voci` aprono un sottomenu.
 */
export type VoceMenu = {
  label: string;
  href: string;
  voci?: { label: string; href: string; nota: string }[];
};

/* Le voci della tendina Soluzioni si costruiscono dai dati: una soluzione
   entra nel menu solo quando ha davvero una pagina. Coverplan resta fuori
   finché non arriva il materiale, e il giorno che arriva non c'è niente da
   ricordarsi di aggiungere qui. */
const vociSoluzioni = [
  /* Deve restare la prima: la testata la usa come destinazione del genitore
     e il menu mobile salta proprio questa voce, perché lì il link «Soluzioni»
     ce l'ha già sopra. */
  { label: 'Tutte le soluzioni', href: '/soluzioni', nota: 'L’indice delle sette tipologie' },
  ...soluzioni
    .filter((s) => s.href)
    .map((s) => ({ label: s.nome, href: s.href!, nota: s.nota ?? s.alias ?? '' })),
  {
    label: 'Rivestimenti',
    href: '/soluzioni/rivestimenti',
    nota: 'Le finiture di facciata',
  },
];

export const nav: VoceMenu[] = [
  { label: 'Soluzioni', href: '/soluzioni', voci: vociSoluzioni },
  { label: 'Chiavi in mano', href: '/chiavi-in-mano' },
  { label: 'Progetti', href: '/progetti' },
  {
    label: 'Azienda',
    href: '/azienda',
    voci: [
      { label: 'Chi siamo', href: '/azienda', nota: 'Storia, numeri, stabilimento' },
      { label: 'Referenze', href: '/azienda/referenze', nota: 'I committenti, per settore' },
      {
        label: 'Riconoscimenti e network',
        href: '/azienda/riconoscimenti',
        nota: 'Certificazioni e appartenenze',
      },
    ],
  },
  { label: 'Contatti', href: '/contatti' },
];

/**
 * Blocco download nel footer.
 * Nessun file reale allegato alla demo: i link sono disabilitati e dichiarati.
 */
export const download = {
  titolo: 'Documentazione tecnica',
  nota: 'Schede e certificazioni disponibili su richiesta.',
  voci: [
    { label: 'Schede tecniche coperture', formato: 'PDF' },
    { label: 'Materiale DOP e certificazioni', formato: 'ZIP' },
  ],
} as const;

/** Aziende che hanno commissionato lavori a Moioli. Dato verificato. */
export const clienti = [
  'Sanpellegrino',
  'Arcese Logistica',
  'Metelli',
  'Iveco',
  'Pneumax',
  'Ravago Italia',
  'SIAE Microelettronica',
  'Jolly Mec',
  'Gualini Lamiere',
  'Radici Group',
] as const;

/** Numeri d'impresa mostrati nell'hero. Dato verificato. */
export const numeri = [
  { valore: 50, suffisso: '+', label: 'Anni di attività' },
  { prefisso: '+', valore: 700, label: 'Mila mq realizzati' },
  { valore: 100, suffisso: '+', label: 'Aziende servite' },
  { statico: '100%', label: 'Made in Italy' },
] as const;

/** Tappe storiche. Dato verificato. */
export const timeline = [
  {
    anno: '1972',
    testo:
      "I fratelli Moioli fondano l'azienda a Bagnatica: da subito alto profilo tecnologico.",
  },
  {
    anno: '1985',
    testo: 'Lo stabilimento si amplia: nuove linee di casseri e travi precompresse.',
  },
  {
    anno: '2005',
    testo: 'Grandi commesse industriali e logistiche in tutto il Nord Italia.',
  },
  {
    anno: 'Oggi',
    testo: 'Oltre 700.000 mq realizzati e un metodo chiavi in mano consolidato.',
  },
] as const;

/** Fasi del metodo chiavi in mano. Testo descrittivo — da validare. */
export const metodo = [
  {
    num: '01',
    titolo: 'Completa gestione progetto',
    testo: "Un unico interlocutore dall'ideazione alla consegna finale.",
  },
  {
    num: '02',
    titolo: 'Costi e tempi certi',
    testo: "Pianificazione chiara, nessuna sorpresa in corso d'opera.",
  },
  {
    num: '03',
    titolo: 'Personalizzazione',
    testo: 'Soluzioni costruttive su misura per il tuo settore.',
  },
  {
    num: '04',
    titolo: 'Qualità e durabilità',
    testo: 'Materiali e know-how che durano nel tempo.',
  },
] as const;
