/**
 * Contenuti d'impresa in inglese: numeri, tappe, metodo, soluzioni.
 *
 * Traduzione di src/data/site.ts e src/data/soluzioni.ts. Vale la stessa
 * regola dell'italiano: nessun dato tecnico inventato. Dove l'italiano ha un
 * segnaposto, l'inglese ha un segnaposto.
 *
 * DUE PUNTI DA FAR CONFERMARE AL CLIENTE
 *
 * 1. IL PAYOFF. Deciso dal cliente: resta in italiano anche nella versione
 *    inglese, «Dove la forma prende volume». Porta lang="it" perché un
 *    lettore di schermo in inglese lo pronunci correttamente.
 *
 * 2. I NOMI DI PRODOTTO. Tecnowing, Stegos, Tecnoshed, Tegolo TT, Bacacier,
 *    Coverplan restano invariati: sono nomi commerciali. Sono tradotti solo
 *    gli alias descrittivi («Copertura alare» → «Wing roof»).
 *
 * Stato: needs-client-approval su tutti i testi redazionali.
 */
import { soluzioni as soluzioniIt } from '../../data/soluzioni';
import { azienda } from '../../data/site';
import type { Realizzazione } from '../../data/progetti';

/** Payoff del marchio: in italiano per decisione del cliente. Vedi nota 1. */
export const payoff = { ...azienda.payoff, lingua: 'it' };

/** Riga fattuale che firma il piè di pagina e la scheda azienda. */
export const descrizione = 'Precast reinforced concrete structures';

/** Numeri d'impresa mostrati nell'apertura. Valori invariati: solo etichette. */
export const numeri = [
  { valore: 50, suffisso: '+', label: 'Years in business' },
  { prefisso: '+', valore: 700, label: 'Thousand m² built' },
  { valore: 100, suffisso: '+', label: 'Companies served' },
  { statico: '100%', label: 'Made in Italy' },
];

/** Tappe storiche. Dato verificato, tradotto. */
export const timeline = [
  {
    anno: '1972',
    testo:
      'The Moioli brothers found the company in Bagnatica, technically ambitious from the very start.',
  },
  {
    anno: '1985',
    testo: 'The plant expands: new formwork lines and prestressed beams.',
  },
  {
    anno: '2005',
    testo: 'Major industrial and logistics contracts across northern Italy.',
  },
  {
    anno: 'Today',
    testo: 'More than 700,000 m² built and an established turnkey method.',
  },
];

/** Fasi del metodo chiavi in mano. Testo descrittivo — da validare. */
export const metodo = [
  {
    num: '01',
    titolo: 'Full project management',
    testo: 'One point of contact from the first idea to final handover.',
  },
  {
    num: '02',
    titolo: 'Firm costs and dates',
    testo: 'Clear planning, no surprises once work is under way.',
  },
  {
    num: '03',
    titolo: 'Built around you',
    testo: 'Construction solutions shaped to your sector.',
  },
  {
    num: '04',
    titolo: 'Quality that lasts',
    testo: 'Materials and know-how built to stay.',
  },
];

/**
 * Le sette tipologie di copertura, in inglese.
 * Struttura, immagini, slug e href arrivano dai dati italiani: qui si
 * traducono soltanto claim, intro, alias, alt e le etichette dei dati tecnici.
 */
const testiSoluzioni: Record<
  string,
  { alias?: string; claim: string; intro: string; alt: string; specs: string[]; nota?: string }
> = {
  tecnowing: {
    alias: 'Wing roof',
    claim: 'The “V” shape brings in light and sheds the water.',
    intro:
      'Wing-shaped roofing for industrial, commercial and logistics buildings. Between one element and the next, solid or glazed panels alternate — continuous rooflights or north lights — chosen according to how the building will be used.',
    alt: 'Aerial view of a building with a Tecnowing wing roof',
    specs: ['MODULE WIDTH', 'BEAM DEPTH', 'FIRE RESISTANCE'],
    nota: 'Wing roof',
  },
  stegos: {
    claim: 'An element with no equivalent on the market.',
    intro:
      'The most distinctive piece Moioli makes, developed in house and without a direct counterpart among competing systems.',
    alt: 'Interior of a Moioli structure in exposed concrete, with flat floors on columns',
    specs: ['DISTINCTIVE FEATURE', 'CLEAR SPAN', 'GEOMETRY'],
    nota: 'The exclusive Moioli element',
  },
  tecnoshed: {
    claim: 'Steady daylight, without glare.',
    intro:
      'North-light roofing: the glazed face turned north brings soft, even daylight onto the working floor all day long. The reference solution where the shed is also a place people spend time in.',
    alt: 'Overhead view of a Tecnoshed roof: parallel rows of vertical glazing',
    specs: ['CLEAR SPAN', 'GLAZING HEIGHT', 'MODULE WIDTH'],
    nota: 'North daylight',
  },
  'tegolo-tt': {
    alias: 'Flat double-tee roof',
    claim: 'Several floors, spans up to 33 metres.',
    intro:
      'The single and multi-storey “TT” system: the answer for precast buildings on more than one level, shopping centres, mixed-use and office buildings.',
    alt: 'Interior of a flat-roofed building with double-tee units and racking',
    specs: ['CLEAR SPAN', 'UNIT DEPTH', 'MODULE WIDTH'],
    nota: 'Multi-storey floor and roof',
  },
  bacacier: {
    claim: 'Wide clear spans, few columns in the way.',
    intro:
      'The answer for logistics buildings with wide clear spans: columns, “I” beams, purlins and prestressed valley gutters, with profiled steel sheet roofing.',
    alt: 'Underside of a Bacacier roof in profiled steel sheet on beams and purlins',
    specs: ['BEAM DEPTH', 'PURLIN DEPTH', 'ROOF PITCH'],
    nota: 'Wide spans, few columns',
  },
  'doppia-falda': {
    alias: 'Double-pitch beam',
    claim: 'The most proven geometry, spans up to 40 metres.',
    intro:
      'The most widely used solution for industrial, commercial and logistics buildings. Simple in its geometry, it stays current thanks to design flexibility and range of use.',
    alt: 'Moioli double-pitch industrial building with a brick frontage and loading doors',
    specs: ['CLEAR SPANS', 'ROOF PITCH', 'BEAM DEPTH'],
    nota: 'The most common geometry',
  },
  coverplan: {
    claim: 'Continuous flat roofing.',
    intro:
      'The flat roofing system in the Moioli range, for buildings where the fifth elevation has to stay clean and regular.',
    alt: '',
    specs: ['CLEAR SPAN', 'SPACING', 'BUILD-UP'],
  },
};

/**
 * In inglese esiste una sola scheda di dettaglio: Tecnowing.
 * Le altre sei tipologie hanno quindi `href` vuoto, esattamente come
 * Coverplan in italiano: la card rimanda all'indice invece di puntare a una
 * pagina che in inglese non c'e'. Il giorno che una scheda viene tradotta,
 * si aggiunge il suo slug qui e il collegamento compare da solo.
 */
const schedeTradotte = ['tecnowing'];

export const soluzioni = soluzioniIt.map((s) => {
  const en = testiSoluzioni[s.slug];
  if (!en) throw new Error(`Manca la traduzione della soluzione ${s.slug}`);
  return {
    ...s,
    alias: en.alias,
    claim: en.claim,
    intro: en.intro,
    alt: en.alt,
    specs: en.specs,
    nota: en.nota,
    href: schedeTradotte.includes(s.slug) ? `/en/solutions/${s.slug}` : undefined,
  };
});

export const getSoluzione = (slug: string) => soluzioni.find((s) => s.slug === slug);

/** Etichetta di una realizzazione senza nome assegnato. */
export const etichetta = (r: Realizzazione) =>
  r.titolo ?? `Project ${r.slug.replace('realizzazione-', '')}`;
