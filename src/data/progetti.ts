/**
 * Portfolio.
 *
 * Nomi cliente, superfici e località: dati confermati come verificati.
 * L'ABBINAMENTO FOTO ↔ PROGETTO è invece da confermare: le immagini sono
 * fotografie reali di cantieri Moioli, ma la corrispondenza con la singola
 * commessa non è documentata negli asset forniti.
 * La cosa è dichiarata in pagina e tracciata in CONTENT-STATUS.md.
 */

export type Progetto = {
  slug: string;
  cliente: string;
  settore: string;
  superficie: string;
  localita: string;
  img: string;
  alt: string;
  /** true = scheda dimostrativa, non una commessa reale. */
  dimostrativo?: boolean;
};

export const progetti: Progetto[] = [
  {
    slug: 'sanpellegrino',
    cliente: 'Sanpellegrino',
    settore: 'Industria alimentare',
    superficie: '65.000 mq',
    localita: 'Madone (BG)',
    img: 'prj-01',
    alt: 'Vista aerea di uno stabilimento industriale prefabbricato',
  },
  {
    slug: 'arcese-logistica',
    cliente: 'Arcese Logistica',
    settore: 'Logistica',
    superficie: '51.000 mq',
    localita: 'Basiano (MI)',
    img: 'prj-03',
    alt: 'Capannone logistico prefabbricato in cemento armato',
  },
  {
    slug: 'metelli',
    cliente: 'Metelli S.p.A.',
    settore: 'Automotive',
    superficie: '25.968 mq',
    localita: 'Cologne (BS)',
    img: 'prj-04',
    alt: 'Struttura industriale prefabbricata a più campate',
  },
  {
    slug: 'ravago-italia',
    cliente: 'Ravago Italia',
    settore: 'Chimica',
    superficie: '14.000 mq',
    localita: 'Mornico al Serio (BG)',
    img: 'prj-02',
    alt: 'Edificio produttivo prefabbricato visto dall’alto',
  },
  {
    slug: 'siae-microelettronica',
    cliente: 'SIAE Microelettronica',
    settore: 'Elettronica',
    superficie: '7.000 mq',
    localita: 'Cologno Monzese (MI)',
    img: 'prj-07',
    alt: 'Interno di un edificio industriale prefabbricato',
  },
  {
    slug: 'pneumax',
    cliente: 'Pneumax S.p.A.',
    settore: 'Meccanica',
    superficie: '5.500 mq',
    localita: 'Lurano (BG)',
    img: 'prj-08',
    alt: 'Copertura industriale prefabbricata in fase di completamento',
  },
];

/**
 * Scheda modello.
 * Progetto FITTIZIO, dichiarato tale in pagina. Serve a mostrare il formato
 * della scheda di dettaglio, non a rappresentare una commessa reale.
 * Nessun dato numerico: tutto placeholder.
 */
export const progettoModello = {
  slug: 'scheda-modello',
  cliente: 'Committente dimostrativo',
  titolo: 'Nuovo polo produttivo',
  settore: 'Progetto dimostrativo',
  localita: 'Provincia di Bergamo',
  anno: 'ANNO',
  soluzione: 'Tecnoshed',
  soluzioneHref: '/soluzioni/tecnoshed',
  intro:
    'Questa scheda è un modello di impaginazione. I contenuti descrittivi mostrano come si presenta un progetto completo; tutti i valori tecnici sono segnaposto in attesa dei dati reali.',
  descrizione: [
    'La commessa riguarda un edificio produttivo a campata unica con annesso corpo uffici, realizzato con struttura prefabbricata in cemento armato precompresso e copertura a shed.',
    'La scelta della copertura nasce da una richiesta precisa della committenza: portare luce naturale uniforme sul piano di lavoro riducendo il ricorso all’illuminazione artificiale nelle ore centrali della giornata.',
    'La fornitura è stata gestita in modalità chiavi in mano, con un unico interlocutore dalla progettazione strutturale al collaudo.',
  ],
  scheda: [
    { label: 'Superficie coperta', spec: 'SUPERFICIE — da commessa' },
    { label: 'Luce netta', spec: 'LUCE NETTA — da catalogo' },
    { label: 'Altezza sottotrave', spec: 'ALTEZZA — da verifica geometra' },
    { label: 'Interasse pilastri', spec: 'INTERASSE — da catalogo' },
    { label: 'Tempi di montaggio', spec: 'DURATA — da commessa' },
    { label: 'Classificazione', spec: 'DA VERIFICA GEOMETRA' },
  ],
  fasi: [
    {
      num: '01',
      titolo: 'Progettazione',
      testo:
        'Dimensionamento strutturale e verifica dei vincoli urbanistici insieme al progettista incaricato.',
    },
    {
      num: '02',
      titolo: 'Produzione',
      testo:
        'Realizzazione degli elementi nello stabilimento di Bagnatica, con controllo dimensionale in linea.',
    },
    {
      num: '03',
      titolo: 'Montaggio',
      testo:
        'Posa in opera con maestranze interne e coordinamento delle lavorazioni di completamento.',
    },
    {
      num: '04',
      titolo: 'Consegna',
      testo: 'Verifica finale, documentazione e consegna della struttura al committente.',
    },
  ],
  gallery: ['prj-05', 'prj-06', 'prj-09'],
  cover: 'shed-cantiere',
} as const;
