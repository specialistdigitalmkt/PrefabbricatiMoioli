/**
 * Contenuti della pagina /soluzioni/stegos.
 *
 * FONTE DEI DATI TECNICI
 * Tutti i valori e le denominazioni provengono dal catalogo ufficiale
 *   moioli-site/assets/CATALOGHI IN SCALA PER A4/Catalogo 4ante Stegos in scala.pdf
 * Sono riportati alla lettera, senza arrotondamenti né deduzioni.
 * Nessun valore è stato calcolato, stimato o completato.
 *
 * DA CONFERMARE prima della messa online: che quel catalogo sia la versione
 * validata. I metadati del PDF riportano una data di impaginazione 22/11/19 e
 * il file InDesign di origine si chiama "4-ante-Tecnowing FINAL.indd".
 * Vedi CONTENT-STATUS.md §4-bis.
 *
 * I testi discorsivi (apertura, introduzioni) sono redazionali e restano da
 * validare. Sono scritti in modo da non aggiungere nulla ai dati di catalogo.
 *
 * DAL PDF SI PRENDONO SOLO LE INFORMAZIONI, NON LE IMMAGINI.
 * I disegni del catalogo non vengono riprodotti in pagina: la sezione
 * interattiva usa un disegno segnaposto (StegosSection.astro) costruito a
 * partire dalla descrizione testuale, e le fotografie restano quelle
 * d'archivio o dei riquadri dichiarati.
 */
import type { Hotspot } from './tipi';

export const pagina = {
  eyebrow: 'Soluzioni · Solai e coperture',
  titolo: 'Stegos',
  claim: 'Sviluppato esclusivamente da Prefabbricati Moioli.',
  lead:
    'Sistema di copertura e solaio in cemento armato precompresso, con lucernario continuo centrale integrato nell’elemento. Progettato per edifici industriali e commerciali, mono e pluripiano.',

  /* --------------------------------------------------------------------- */
  identita: {
    eyebrow: 'Di cosa si tratta',
    titolo: 'Un elemento, tre funzioni.',
    paragrafi: [
      'Stegos non è una copertura o un solaio: è lo stesso elemento impiegato come entrambi. La flessibilità modulare permette di usarlo come solaio intermedio, in edifici pluripiano e in copertura, con la stessa geometria e la stessa linea di produzione.',
      'Quando è in copertura, la luce naturale non arriva da un lucernario aggiunto sopra la struttura: arriva dal lucernario continuo centrale, che fa parte dell’elemento.',
    ],
  },

  /* Le quattro caratteristiche dichiarate dal catalogo, alla lettera. */
  caratteristiche: [
    {
      titolo: 'Lucernario continuo centrale',
      testo: 'Illuminazione naturale integrata nell’elemento, non sovrapposta alla struttura.',
    },
    {
      titolo: 'Isolamento termico',
      testo: 'Alleggerimento e isolamento termico incorporati nella sezione.',
    },
    {
      titolo: 'Pendenza integrata',
      testo:
        'Pendenza del 2% per lo smaltimento delle acque verso l’esterno, quando l’elemento è impiegato in copertura.',
    },
    {
      titolo: 'Resistenza al fuoco senza penalizzazioni',
      testo:
        'Da R90′ a R120′, estendibile fino a R180′, senza riduzione di portata.',
    },
  ],

  /* Sezione interattiva: è il blocco centrale della pagina. */
  sezione: {
    eyebrow: 'Sezione costruttiva',
    titolo: 'Dove sta la differenza.',
    intro:
      'La particolarità di Stegos non si vede da fuori: sta nella sezione. Seleziona un punto per capire come è risolto.',
  },

  /* Tabella dati. Valori testuali esattamente come a catalogo. */
  dati: {
    eyebrow: 'Dati tecnici',
    titolo: 'I numeri della copertura.',
    voci: [
      { label: 'Altezza', valore: 'da 30 a 85', unita: 'cm' },
      { label: 'Larghezza modulo', valore: '250', unita: 'cm' },
      { label: 'Luce netta massima', valore: 'Variabile', unita: '' },
      { label: 'Resistenza al fuoco', valore: 'da R90′ a R120′', nota: 'estendibile fino a R180′' },
      { label: 'Pendenza integrata', valore: '2', unita: '%', nota: 'se impiegato in copertura' },
    ],
    nota: 'Misure indicate in centimetri. Fonte: catalogo Stegos.',
  },

  /* --------------------------------------------------------------------- */
  sistema: {
    eyebrow: 'Gli elementi del sistema',
    titolo: 'Ogni dettaglio, una funzione.',
    intro:
      'Stegos non arriva da solo: il sistema comprende le travi e i pilastri progettati per riceverlo.',
    componenti: [
      {
        nome: 'Elemento Stegos',
        testo: 'In cemento armato precompresso. Disponibile come elemento singolo, doppio e doppio con lastrina.',
      },
      {
        nome: 'Travi a “T”',
        testo:
          'Elementi precompressi per impieghi centrali, con possibilità di appoggi speciali per scomparsa mensole.',
      },
      {
        nome: 'Travi a “L”',
        testo:
          'Elementi precompressi per impieghi laterali, con possibilità di appoggi speciali per scomparsa mensole.',
      },
      {
        nome: 'Travi a “I”',
        testo:
          'Elementi precompressi per impieghi centrali, con possibilità di appoggi speciali per scomparsa mensole.',
      },
      {
        nome: 'Pilastri con armatubo',
        testo: 'Con opzione plinto a bozzetto e opzione sistema armatubo.',
      },
    ],
  },

  /* --------------------------------------------------------------------- */
  copertura: {
    eyebrow: 'Impiego in copertura',
    titolo: 'Come si chiude il pacchetto.',
    intro:
      'La stratigrafia di copertura, dall’elemento portante alla copertina di coronamento.',
    strati: [
      'Copertina di coronamento',
      'Rialzi monolitici in c.a.',
      'Manto impermeabile',
      'Strato coibente',
      'Velario',
      'Lucernario',
      'Elemento Stegos',
      'Trave',
      'Pilastro',
    ],
    varianti: [
      { nome: 'Stegos pendenziato', testo: 'Con la pendenza del 2% integrata nell’elemento.' },
      { nome: 'Stegos con lucernari di copertura', testo: 'Con il lucernario continuo in vista.' },
      { nome: 'Stegos con copertura piana', testo: 'Impiego a estradosso piano.' },
      { nome: 'Stegos con particolare a sbalzo', testo: 'Per aggetti e impalcati intermedi.' },
    ],
    compatibilita:
      'Compatibile con impianti fotovoltaici, evacuatori di fumo e calore (EFC) e sistemi antincendio sprinkler.',
  },

  /* --------------------------------------------------------------------- */
  applicazioni: {
    eyebrow: 'Applicazioni',
    titolo: 'Dove si usa.',
    voci: [
      { num: '01', titolo: 'Edifici industriali', testo: 'In copertura e come solaio intermedio.' },
      { num: '02', titolo: 'Edifici commerciali', testo: 'Dove l’intradosso resta a vista.' },
      { num: '03', titolo: 'Edifici monopiano', testo: 'Con impiego in copertura e pendenza integrata.' },
      { num: '04', titolo: 'Edifici pluripiano', testo: 'Come solaio, con la stessa geometria di elemento.' },
    ],
  },

  gallery: {
    eyebrow: 'Realizzazioni',
    titolo: 'Stegos in opera.',
    immagini: [
      {
        id: 'stegos-struttura',
        alt: 'Struttura prefabbricata Moioli con solai piani e pilastri a vista',
      },
      {
        id: 'stegos-nodo',
        alt: 'Dettaglio del nodo fra trave e pilastro in un edificio con elementi Stegos',
      },
      { id: 'stegos-interno', alt: 'Interno di un edificio con intradosso continuo' },
      {
        id: 'stegos-cantiere',
        alt: 'Edificio con struttura prefabbricata Moioli in fase di completamento',
      },
    ],
  },
} as const;

/**
 * Punti caldi della sezione interattiva.
 *
 * Le DESCRIZIONI usano le denominazioni e i fatti del catalogo.
 * I VALORI restano segnaposto: il catalogo dà i dati d'insieme (altezza,
 * modulo, REI, pendenza) ma non le misure dei singoli dettagli costruttivi.
 *
 * `x` e `y` sono percentuali del viewBox del disegno (1200 × 700):
 * restano valide se l'SVG viene sostituito con quello definitivo.
 */
export const hotspots: Hotspot[] = [
  {
    id: 'appoggio',
    x: 14.2,
    y: 52.9,
    titolo: 'Appoggio sulla trave',
    sommario: 'Dove l’elemento scarica sulla struttura.',
    descrizione:
      'L’elemento appoggia sull’ala della trave. Le travi del sistema — a “T” e a “I” per gli impieghi centrali, a “L” per quelli laterali — prevedono appoggi speciali per la scomparsa delle mensole, così il nodo non sporge nell’ambiente sottostante.',
    specs: ['LUNGHEZZA APPOGGIO — da catalogo', 'CARICO — da verifica geometra'],
  },
  {
    id: 'getto',
    x: 25,
    y: 39.6,
    titolo: 'Getto di completamento',
    sommario: 'Lo strato gettato in opera sull’estradosso.',
    descrizione:
      'Il getto di completamento chiude l’elemento all’estradosso e rende continua la superficie fra un pezzo e il successivo. È l’unica lavorazione a umido del pacchetto: tutto il resto arriva finito dallo stabilimento.',
    specs: ['SPESSORE GETTO — da catalogo'],
  },
  {
    id: 'alleggerimento',
    x: 33.3,
    y: 45.9,
    titolo: 'Alleggerimento e isolamento termico',
    sommario: 'Il corpo cavo dentro la sezione.',
    descrizione:
      'L’alleggerimento interno riduce il peso proprio dell’elemento e incorpora l’isolamento termico. Non è uno strato aggiunto sopra la struttura: fa parte della sezione.',
    specs: ['SPESSORE ISOLANTE — da catalogo', 'TRASMITTANZA — da verifica geometra'],
  },
  {
    id: 'lucernario',
    x: 50,
    y: 30.3,
    titolo: 'Lucernario continuo centrale',
    sommario: 'La luce è dentro l’elemento, non sopra.',
    descrizione:
      'È la parte che definisce Stegos. Il lucernario corre al centro dell’elemento per tutta la sua lunghezza: la luce naturale non arriva da un serramento appoggiato sulla copertura, ma da una fessura che appartiene al pezzo strutturale. Sotto, il velario controlla la diffusione.',
    specs: ['SUPERFICIE VETRATA — da catalogo', 'TIPO DI VELARIO — da progetto'],
  },
  {
    id: 'manto',
    x: 70.8,
    y: 36.3,
    titolo: 'Manto impermeabile e coibente',
    sommario: 'La chiusura verso l’esterno.',
    descrizione:
      'Sopra il getto si posano lo strato coibente e il manto impermeabile, fino alla copertina di coronamento sui bordi. Quando l’elemento è impiegato in copertura, la pendenza del 2% è già nella sua geometria: il pacchetto non deve crearla.',
    specs: ['STRATIGRAFIA — da catalogo', 'PENDENZA — 2% se in copertura'],
  },
  {
    id: 'pilastro',
    x: 85.8,
    y: 74.3,
    titolo: 'Pilastro con armatubo',
    sommario: 'Il collegamento a terra.',
    descrizione:
      'Il pilastro prefabbricato riceve i carichi attraverso la trave. Il sistema prevede l’opzione armatubo per il collegamento e l’opzione plinto a bozzetto in fondazione.',
    specs: ['SEZIONE PILASTRO — da catalogo', 'TIPO DI COLLEGAMENTO — da progetto'],
  },
];
