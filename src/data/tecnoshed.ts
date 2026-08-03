/**
 * Contenuti della pagina /soluzioni/tecnoshed.
 *
 * I MARKER SONO DATI, NON CODICE.
 * Per aggiungere, togliere o spostare un punto caldo si modifica solo
 * l'array `hotspots`: la vista non va toccata.
 *
 * `x` e `y` sono percentuali riferite al viewBox del disegno (1200 × 700),
 * quindi restano valide se l'SVG viene sostituito mantenendo lo stesso
 * sistema di coordinate.
 *
 * Nessuna specifica tecnica reale è presente: ogni valore è un segnaposto.
 */

import type { Hotspot } from './tipi';

export const hotspots: Hotspot[] = [
  {
    id: 'manto',
    x: 19.2,
    y: 42.3,
    titolo: 'Manto di copertura e isolamento',
    sommario: 'La stratigrafia sopra l’elemento portante.',
    descrizione:
      'Il pacchetto di finitura posato sull’estradosso dell’elemento: strato isolante e manto impermeabile. La composizione varia in funzione della destinazione d’uso dell’edificio e delle prestazioni richieste dal progetto.',
    specs: ['STRATIGRAFIA — da catalogo', 'SPESSORE — da verifica geometra'],
  },
  {
    id: 'vetrata',
    x: 32.7,
    y: 45.1,
    titolo: 'Superficie vetrata a nord',
    sommario: 'Il tratto verticale che porta luce diffusa.',
    descrizione:
      'È la parte che definisce la copertura a shed. Orientata a nord, capta luce indiretta e la distribuisce sul piano di lavoro senza irraggiamento diretto e senza abbagliamento, con una resa costante nell’arco della giornata.',
    specs: ['SUPERFICIE VETRATA — da catalogo', 'ORIENTAMENTO — da progetto'],
  },
  {
    id: 'gronda',
    x: 37.7,
    y: 55.4,
    titolo: 'Canale di gronda',
    sommario: 'Raccolta e smaltimento delle acque meteoriche.',
    descrizione:
      'Il compluvio tra due elementi contigui raccoglie l’acqua e la convoglia ai pluviali. È il punto in cui la tenuta dell’intera copertura si gioca: geometria e continuità del canale sono definite in fase esecutiva.',
    specs: ['SEZIONE CANALE — da catalogo', 'PENDENZA — da verifica geometra'],
  },
  {
    id: 'pilastro',
    x: 40,
    y: 72.9,
    titolo: 'Pilastro e nodo strutturale',
    sommario: 'Il collegamento tra copertura e struttura portante.',
    descrizione:
      'Il pilastro prefabbricato in cemento armato riceve i carichi della copertura attraverso la trave. Il nodo di collegamento è dimensionato caso per caso sulla base delle azioni di progetto.',
    specs: ['SEZIONE PILASTRO — da catalogo', 'CLASSIFICAZIONE — da verifica geometra'],
  },
  {
    id: 'elemento',
    x: 54.2,
    y: 42.3,
    titolo: 'Elemento di copertura shed',
    sommario: 'Il componente prefabbricato che compone la falda.',
    descrizione:
      'L’elemento in cemento armato precompresso realizzato nello stabilimento di Bagnatica. Arriva in cantiere finito e viene posato in sequenza: la copertura si chiude per campate successive, senza opere provvisionali diffuse.',
    specs: ['LUCE NETTA — da catalogo', 'INTERASSE — da catalogo', 'SEZIONE — da catalogo'],
  },
  {
    id: 'appoggio',
    x: 75,
    y: 55.4,
    titolo: 'Appoggio su trave portante',
    sommario: 'Dove l’elemento scarica sulla trave.',
    descrizione:
      'La superficie di appoggio tra elemento di copertura e trave. Il dettaglio garantisce la trasmissione dei carichi e assorbe le tolleranze di montaggio: è uno dei punti in cui la prefabbricazione mostra il proprio vantaggio in cantiere.',
    specs: ['LUNGHEZZA APPOGGIO — da catalogo', 'CARICO — da verifica geometra'],
  },
];

/** Testi di pagina. Redazionali, da validare. */
export const pagina = {
  eyebrow: 'Soluzioni · Coperture',
  titolo: 'Tecnoshed',
  claim: 'Luce naturale costante, senza abbagliamento.',
  lead:
    'La copertura a shed porta luce diffusa e uniforme sul piano di lavoro per tutta la giornata. È la soluzione da scegliere quando il capannone non è solo un volume da coprire, ma un ambiente in cui si lavora.',

  descrizione: {
    eyebrow: 'La soluzione',
    titolo: 'Un capannone che si illumina da solo.',
    paragrafi: [
      'In un edificio produttivo la luce non è un dettaglio estetico: determina la qualità del lavoro che ci si svolge dentro. La copertura a shed nasce esattamente per questo — orientare le superfici vetrate a nord e trasformare l’intera copertura in una fonte di luce naturale diffusa.',
      'Il risultato è un ambiente illuminato in modo uniforme, senza le zone d’ombra tipiche dell’illuminazione artificiale puntuale e senza l’irraggiamento diretto che rende inutilizzabili le postazioni sotto un lucernario mal orientato.',
      'Tecnoshed è la declinazione Moioli di questo principio, realizzata con elementi prefabbricati in cemento armato precompresso prodotti nello stabilimento di Bagnatica.',
    ],
  },

  tecnologia: {
    eyebrow: 'Tecnologia',
    titolo: 'Prodotto in stabilimento, chiuso in cantiere.',
    paragrafi: [
      'Ogni elemento esce dallo stabilimento già finito e controllato. In cantiere non si getta: si posa. La copertura si chiude per campate successive, riducendo le opere provvisionali e il tempo in cui il cantiere resta esposto.',
      'È il motivo per cui la prefabbricazione continua ad avere senso su edifici di questa scala: il tempo che non si passa in cantiere è tempo che non diventa costo.',
    ],
    punti: [
      {
        titolo: 'Produzione controllata',
        testo:
          'Casseri e controllo dimensionale in linea: la tolleranza è governata in stabilimento, non corretta in opera.',
      },
      {
        titolo: 'Montaggio in sequenza',
        testo:
          'Posa per campate successive con maestranze interne, senza attese fra le lavorazioni.',
      },
      {
        titolo: 'Copertura predisposta',
        testo:
          'La geometria della copertura è pensata per ospitare impianti e superfici captanti senza interventi successivi.',
      },
    ],
  },

  experience: {
    eyebrow: 'Sezione costruttiva',
    titolo: 'I punti che contano.',
    intro:
      'Sezione trasversale della copertura. Seleziona un punto per vedere come è risolto.',
  },

  vantaggi: {
    eyebrow: 'Perché sceglierla',
    titolo: 'Cosa cambia, in concreto.',
    voci: [
      {
        num: '01',
        titolo: 'Luce che non cambia durante il giorno',
        testo:
          'L’orientamento a nord evita l’irraggiamento diretto: nessun abbagliamento sulle postazioni, nessuna fascia oraria inutilizzabile.',
      },
      {
        num: '02',
        titolo: 'Meno illuminazione artificiale',
        testo:
          'Con luce naturale distribuita in modo uniforme si riduce il ricorso ai corpi illuminanti nelle ore centrali.',
      },
      {
        num: '03',
        titolo: 'Copertura che resta disponibile',
        testo:
          'Le falde cieche restano superfici utili: impianti e sistemi captanti trovano posto senza compromettere la copertura.',
      },
      {
        num: '04',
        titolo: 'Un solo interlocutore',
        testo:
          'Struttura, copertura e completamenti arrivano dallo stesso fornitore, con una sola responsabilità sul risultato.',
      },
    ],
  },

  gallery: {
    eyebrow: 'Realizzazioni',
    titolo: 'Tecnoshed in opera.',
    immagini: [
      { id: 'shed-copertura', alt: 'Dettaglio della copertura a shed vista dall’estradosso' },
      { id: 'shed-interno', alt: 'Interno di un capannone con copertura a shed illuminato da luce naturale' },
      { id: 'shed-aerea-01', alt: 'Vista aerea di un edificio industriale con copertura a shed' },
      { id: 'shed-aerea-02', alt: 'Copertura a shed di un complesso produttivo vista dall’alto' },
      { id: 'shed-cantiere', alt: 'Montaggio degli elementi di copertura in cantiere' },
      { id: 'sol-tecnoshed', alt: 'Edificio industriale Moioli con copertura a shed completata' },
    ],
  },
} as const;
