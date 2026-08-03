/**
 * Le sette tipologie di copertura.
 * Nomi prodotto: forniti dal cliente, verificati. Non modificare.
 *
 * I testi descrittivi sono redazionali e restano da validare
 * (CONTENT-STATUS.md → needs-client-approval).
 * NESSUN dato tecnico è inventato: dove serve un numero c'è un placeholder.
 */

export type Soluzione = {
  slug: string;
  nome: string;
  /** Nome alternativo/descrittivo, se il cliente ne usa due. */
  alias?: string;
  /** Frase di posizionamento, una riga. */
  claim: string;
  /** Paragrafo introduttivo per la card e per l'indice. */
  intro: string;
  /** id dell'immagine in public/img, oppure null = placeholder dichiarato. */
  img: string | null;
  alt: string;
  /** Etichette dei dati tecnici da compilare. Il valore resta placeholder. */
  specs: string[];
  /** Solo la scheda con pagina dedicata ha href. */
  href?: string;
  /** Evidenzia la tipologia nell'indice. */
  inEvidenza?: boolean;
};

export const soluzioni: Soluzione[] = [
  {
    slug: 'tecnoshed',
    nome: 'Tecnoshed',
    claim: 'Luce naturale costante, senza abbagliamento.',
    intro:
      'Copertura a shed: la superficie vetrata orientata a nord porta luce diffusa e uniforme sul piano di lavoro per tutta la giornata. La soluzione di riferimento dove il capannone è anche un ambiente in cui si sta.',
    img: 'sol-tecnoshed',
    alt: 'Vista aerea di un edificio industriale Moioli con copertura a shed',
    specs: ['LUCE NETTA', 'INTERASSE', 'SUPERFICIE VETRATA'],
    href: '/soluzioni/tecnoshed',
    inEvidenza: true,
  },
  {
    slug: 'stegos',
    nome: 'Stegos',
    claim: 'Un elemento che non ha equivalenti sul mercato.',
    intro:
      'Il pezzo più caratteristico della produzione Moioli, sviluppato internamente e senza corrispettivi diretti tra i sistemi concorrenti.',
    img: 'sol-stegos',
    alt: 'Struttura prefabbricata Moioli con copertura Stegos',
    specs: ['ELEMENTO DISTINTIVO', 'LUCE NETTA', 'GEOMETRIA'],
    href: '/soluzioni/stegos',
    inEvidenza: true,
  },
  {
    slug: 'tecnowing',
    nome: 'Tecnowing',
    alias: 'Tegolo alare',
    claim: 'Il tegolo alare della gamma Moioli.',
    intro:
      'Elemento di copertura a sezione alare, impiegato dove servono grandi superfici continue con un numero ridotto di appoggi.',
    img: 'sol-tecnowing',
    alt: 'Dettaglio costruttivo di un tegolo alare Tecnowing',
    specs: ['LUCE NETTA', 'INTERASSE', 'SEZIONE'],
  },
  {
    slug: 'tegolo-tt',
    nome: 'Tegolo TT',
    alias: 'Copertura piana a tegoli',
    claim: 'Copertura piana, praticabile e predisposta agli impianti.',
    intro:
      'La soluzione a tegoli TT per coperture piane: superficie regolare, adatta a ospitare impianti tecnici e campi fotovoltaici.',
    img: 'sol-tegolo-tt',
    alt: 'Interno di un edificio con copertura piana a tegoli TT',
    specs: ['LUCE NETTA', 'INTERASSE', 'CARICO AMMISSIBILE'],
  },
  {
    slug: 'bacacier',
    nome: 'Bacacier',
    claim: 'Manto metallico su struttura prefabbricata.',
    intro:
      'Sistema di copertura che abbina la struttura portante in cemento armato precompresso a un manto di finitura in acciaio.',
    img: 'sol-bacacier',
    alt: 'Copertura Bacacier realizzata da Prefabbricati Moioli',
    specs: ['LUCE NETTA', 'PENDENZA', 'STRATIGRAFIA'],
  },
  {
    slug: 'doppia-pendenza',
    nome: 'Doppia pendenza',
    claim: 'La geometria classica del capannone industriale.',
    intro:
      'Copertura a due falde: la soluzione più diretta ed economica quando la priorità è coprire grandi superfici in tempi rapidi.',
    img: null,
    alt: '',
    specs: ['LUCE NETTA', 'PENDENZA FALDE', 'INTERASSE'],
  },
  {
    slug: 'coverplan',
    nome: 'Coverplan',
    claim: 'Copertura piana continua.',
    intro:
      'Sistema di copertura piana della gamma Moioli, pensato per edifici dove la quinta facciata deve restare pulita e regolare.',
    img: null,
    alt: '',
    specs: ['LUCE NETTA', 'INTERASSE', 'STRATIGRAFIA'],
  },
];

export const getSoluzione = (slug: string) =>
  soluzioni.find((s) => s.slug === slug);
