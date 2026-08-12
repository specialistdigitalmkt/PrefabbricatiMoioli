/**
 * Le sette tipologie di copertura.
 * Nomi prodotto: forniti dal cliente, verificati.
 *
 * NOTA SUL NOME «DOPPIA FALDA»
 * Nell'elenco iniziale la soluzione era indicata come «Doppia pendenza», ma il
 * catalogo ufficiale intitola il sistema «Copertura a doppia falda» e riserva
 * «doppia pendenza» alla trave. Si è scelto il nome del catalogo, con la trave
 * come alias. Lo slug è cambiato di conseguenza: `doppia-pendenza` non è mai
 * stato pubblicato, quindi non serve un reindirizzamento.
 *
 * I testi descrittivi sono redazionali e restano da validare
 * (CONTENT-STATUS.md → needs-client-approval).
 * NESSUN dato tecnico è inventato: dove serve un numero c'è un placeholder.
 *
 * Le copertine `sol-*-cover` sono generate da `npm run soluzioni-foto`
 * leggendo le cartelle che il cliente ha ordinato per soluzione: l'abbinamento
 * foto ↔ tipologia viene da lì, non da una scelta redazionale.
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
  /** Solo le schede con pagina dedicata hanno href. */
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
    img: 'sol-tecnoshed-cover',
    alt: 'Vista dall’alto di una copertura Tecnoshed: file parallele di finestrature verticali',
    specs: ['LUCE NETTA', 'ALTEZZA FINESTRA', 'LARGHEZZA MODULO'],
    href: '/soluzioni/tecnoshed',
    inEvidenza: true,
  },
  {
    slug: 'stegos',
    nome: 'Stegos',
    claim: 'Un elemento che non ha equivalenti sul mercato.',
    intro:
      'Il pezzo più caratteristico della produzione Moioli, sviluppato internamente e senza corrispettivi diretti tra i sistemi concorrenti.',
    img: 'sol-stegos-cover',
    alt: 'Interno di una struttura Moioli in cemento a vista, con solai piani su pilastri',
    specs: ['ELEMENTO DISTINTIVO', 'LUCE NETTA', 'GEOMETRIA'],
    href: '/soluzioni/stegos',
    inEvidenza: true,
  },
  {
    slug: 'tecnowing',
    nome: 'Tecnowing',
    alias: 'Copertura alare',
    claim: 'La forma a “V” porta la luce e scarica l’acqua.',
    intro:
      'Copertura alare per edifici industriali, commerciali e logistici. Fra un tegolo e il successivo si alternano elementi opachi o luminosi, lucernari continui o a shed, scelti in base alla destinazione d’uso.',
    img: 'sol-tecnowing-cover',
    alt: 'Vista aerea di un edificio con copertura alare Tecnowing',
    specs: ['LARGHEZZA MODULO', 'ALTEZZA TRAVE', 'RESISTENZA AL FUOCO'],
    href: '/soluzioni/tecnowing',
  },
  {
    slug: 'tegolo-tt',
    nome: 'Tegolo TT',
    alias: 'Copertura piana a tegoli',
    claim: 'Più livelli, fino a 33 metri di luce.',
    intro:
      'Il sistema mono e pluripiano “TT”: la soluzione per edifici prefabbricati su più livelli, centri commerciali, edifici polivalenti e direzionali.',
    img: 'sol-tegolo-tt-cover',
    alt: 'Interno di un edificio a copertura piana con tegoli TT e scaffalature',
    specs: ['LUCE NETTA', 'ALTEZZA TEGOLO', 'LARGHEZZA MODULO'],
    href: '/soluzioni/tegolo-tt',
  },
  {
    slug: 'bacacier',
    nome: 'Bacacier',
    claim: 'Grandi luci libere, pochi pilastri in mezzo.',
    intro:
      'La risposta per edifici logistici a grande luce libera: struttura in pilastri, travi a “I”, arcarecci e canali precompressi, con copertura in lamiera grecata.',
    img: 'sol-bacacier-cover',
    alt: 'Intradosso di una copertura Bacacier in lamiera grecata su travi e arcarecci',
    specs: ['ALTEZZA TRAVE', 'ALTEZZA ARCARECCIO', 'PENDENZA'],
    href: '/soluzioni/bacacier',
  },
  {
    slug: 'doppia-falda',
    nome: 'Doppia falda',
    alias: 'Trave a doppia pendenza',
    claim: 'La geometria più collaudata, fino a 40 metri di luce.',
    intro:
      'La soluzione più diffusa per edifici industriali, commerciali e logistici. Semplice nella configurazione geometrica, resta attuale per la flessibilità progettuale e la versatilità di utilizzo.',
    img: 'sol-doppia-falda-cover',
    alt: 'Edificio industriale Moioli a doppia falda con fronte in laterizio e portoni',
    specs: ['LUCI LIBERE', 'PENDENZA COPERTURA', 'ALTEZZA TRAVE'],
    href: '/soluzioni/doppia-falda',
  },
  {
    slug: 'coverplan',
    nome: 'Coverplan',
    claim: 'Copertura piana continua.',
    intro:
      'Sistema di copertura piana della gamma Moioli, pensato per edifici dove la quinta facciata deve restare pulita e regolare.',
    /* Unica soluzione senza materiale: né catalogo tecnico né fotografie.
       Resta in elenco con segnaposto dichiarato, senza pagina dedicata. */
    img: null,
    alt: '',
    specs: ['LUCE NETTA', 'INTERASSE', 'STRATIGRAFIA'],
  },
];

export const getSoluzione = (slug: string) =>
  soluzioni.find((s) => s.slug === slug);
