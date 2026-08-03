/**
 * Contenuti della sezione Azienda: profilo, referenze, riconoscimenti.
 *
 * Impostazione ripresa dal profilo aziendale di Baraclit — chi siamo con i
 * numeri, referenze per settore, riconoscimenti e network — e adattata a ciò
 * che di Moioli è effettivamente documentato.
 *
 * REGOLA INVARIATA: nessun dato inventato. Dove Baraclit ha un numero e Moioli
 * non ce l'ha, resta un segnaposto visibile. Vedi CONTENT-STATUS.md §7.
 */

/* =========================================================================
   CHI SIAMO
   ========================================================================= */

export const profilo = {
  eyebrow: 'Azienda',
  titolo: 'Costruire è un mestiere che si impara stando in cantiere.',
  lead:
    'Prefabbricati Moioli nasce a Bagnatica alla fine del 1972 dalla volontà e dalle esperienze combinate dei fratelli Moioli con alcuni progettisti. Da allora produce strutture prefabbricate in cemento armato per edilizia industriale, commerciale e civile.',

  paragrafi: [
    'Fin dall’inizio un’azienda ad alto profilo tecnologico, capace di realizzare progetti unici. In un settore che richiede qualità, competitività e sicurezza, la consulenza sul progetto vale quanto il prodotto: è per questo che progettazione, produzione e montaggio restano dentro la stessa azienda.',
    'Dall’ideazione al coordinamento di fornitori e maestranze, fino alla consegna, il committente ha un solo interlocutore. È il metodo chiavi in mano che l’azienda ha consolidato in mezzo secolo di lavoro.',
  ],

  /* Numeri d'impresa. I primi quattro sono verificati; gli altri sono
     segnaposto dichiarati — Moioli non ha ancora fornito superficie dello
     stabilimento, organico e fatturato. */
  numeri: [
    { valore: '1972', label: 'Anno di fondazione', stato: 'ok' },
    { valore: '700.000', unita: 'mq', label: 'Superficie realizzata', stato: 'ok' },
    { valore: '100', unita: '+', label: 'Committenti serviti', stato: 'ok' },
    { valore: '50', unita: '+', label: 'Anni di attività', stato: 'ok' },
    { spec: 'SUPERFICIE STABILIMENTO', label: 'Stabilimento di Bagnatica', stato: 'manca' },
    { spec: 'ORGANICO', label: 'Persone in azienda', stato: 'manca' },
  ],

  /* Il sistema proprietario: è l'equivalente di quello che per Baraclit è
     Aliant. Per Moioli è Stegos, e la fonte è il catalogo ufficiale. */
  sistema: {
    eyebrow: 'Il sistema proprietario',
    nome: 'Stegos',
    claim: 'Sviluppato esclusivamente da Prefabbricati Moioli.',
    testo:
      'Elemento di copertura e solaio in cemento armato precompresso, con lucernario continuo centrale integrato nella sezione. Non è un prodotto acquistato da un catalogo di fornitori: nasce e si produce nello stabilimento di Bagnatica.',
    href: '/soluzioni/stegos',
  },

  stabilimento: {
    eyebrow: 'Lo stabilimento',
    titolo: 'Si produce a Bagnatica.',
    testo:
      'Casseri, linee di precompressione e controllo dimensionale sono in casa. Gli elementi arrivano in cantiere finiti: in opera si posa, non si getta.',
  },

  /* Tappe. Dato verificato, già in uso in home. */
  tappe: [
    { anno: '1972', testo: 'I fratelli Moioli fondano l’azienda a Bagnatica.' },
    { anno: '1985', testo: 'Lo stabilimento si amplia: nuove linee di casseri e travi precompresse.' },
    { anno: '2005', testo: 'Grandi commesse industriali e logistiche in tutto il Nord Italia.' },
    { anno: 'Oggi', testo: 'Oltre 700.000 mq realizzati e un metodo chiavi in mano consolidato.' },
  ],

  /* Baraclit ha un video istituzionale. Moioli no: dichiarato. */
  video: {
    titolo: 'Video istituzionale',
    nota: 'Spazio previsto per il video aziendale. Da girare o da fornire.',
  },
} as const;

/* =========================================================================
   REFERENZE
   ========================================================================= */

export type Committente = { nome: string; settore: string };

/**
 * ELENCO PARZIALE. Sono i dieci nomi già presenti nei materiali Moioli.
 * L'azienda dichiara oltre cento committenti: la lista completa e i loghi
 * vanno forniti.
 *
 * L'attribuzione di settore è una nostra classificazione, da confermare.
 */
export const settori = [
  'Alimentare e beverage',
  'Logistica',
  'Automotive',
  'Meccanica e metallurgia',
  'Chimica e materiali',
  'Elettronica',
] as const;

export const committenti: Committente[] = [
  { nome: 'Sanpellegrino', settore: 'Alimentare e beverage' },
  { nome: 'Arcese Logistica', settore: 'Logistica' },
  { nome: 'Metelli', settore: 'Automotive' },
  { nome: 'Iveco', settore: 'Automotive' },
  { nome: 'Pneumax', settore: 'Meccanica e metallurgia' },
  { nome: 'Gualini Lamiere', settore: 'Meccanica e metallurgia' },
  { nome: 'Jolly Mec', settore: 'Meccanica e metallurgia' },
  { nome: 'Ravago Italia', settore: 'Chimica e materiali' },
  { nome: 'Radici Group', settore: 'Chimica e materiali' },
  { nome: 'SIAE Microelettronica', settore: 'Elettronica' },
];

export const referenze = {
  eyebrow: 'Referenze',
  titolo: 'Chi ci ha affidato uno stabilimento.',
  lead:
    'Più di cento aziende hanno costruito con Moioli. Qui una selezione, divisa per settore.',
  nota:
    'Elenco parziale: dieci committenti sui più di cento serviti. I loghi e la lista completa sono da fornire, così come la conferma dell’attribuzione di settore.',
} as const;

/* =========================================================================
   RICONOSCIMENTI E NETWORK
   ========================================================================= */

/**
 * QUESTA È LA PAGINA PIÙ SCOPERTA DEL SITO.
 *
 * Di Moioli non è stato fornito nessun riconoscimento, nessuna certificazione
 * e nessuna appartenenza associativa. La struttura c'è ed è quella giusta, ma
 * i contenuti vanno raccolti: qui sotto ogni voce è un segnaposto dichiarato
 * che dice esattamente cosa serve.
 *
 * L'unico riferimento documentato è il "Materiale DOP" citato fra i download
 * del sito precedente — quindi le Dichiarazioni di Prestazione esistono, ma
 * vanno recuperate e verificate.
 */
export const riconoscimenti = {
  eyebrow: 'Riconoscimenti e network',
  titolo: 'Le carte in regola.',
  lead:
    'Certificazioni di prodotto, qualifiche aziendali e appartenenze: quello che un progettista controlla prima di mettere una firma.',

  avviso:
    'Sezione da compilare. La struttura è pronta, i contenuti vanno raccolti: sotto, ogni riquadro indica esattamente il documento o l’informazione che serve.',

  gruppi: [
    {
      titolo: 'Certificazioni di prodotto',
      testo:
        'Quello che accompagna l’elemento in cantiere e che il direttore lavori si aspetta di trovare.',
      voci: [
        { label: 'Dichiarazione di Prestazione (DoP)', spec: 'DOCUMENTI — da recuperare' },
        { label: 'Marcatura CE degli elementi', spec: 'ESTREMI — da verifica' },
        { label: 'Classificazione di resistenza al fuoco', spec: 'RAPPORTI — da ufficio tecnico' },
      ],
    },
    {
      titolo: 'Certificazioni aziendali',
      testo: 'I sistemi di gestione, se presenti.',
      voci: [
        { label: 'Qualità', spec: 'ISO 9001 — da verificare se presente' },
        { label: 'Ambiente', spec: 'ISO 14001 — da verificare se presente' },
        { label: 'Sicurezza sul lavoro', spec: 'ISO 45001 — da verificare se presente' },
      ],
    },
    {
      titolo: 'Riconoscimenti',
      testo: 'Premi, menzioni, progetti segnalati.',
      voci: [{ label: 'Nessun riconoscimento fornito', spec: 'ELENCO — da cliente' }],
    },
    {
      titolo: 'Associazioni e network',
      testo: 'Appartenenze di categoria e collaborazioni.',
      voci: [
        { label: 'Associazioni di categoria', spec: 'ELENCO — da cliente' },
        { label: 'Collaborazioni tecniche o universitarie', spec: 'ELENCO — da cliente' },
        { label: 'Legami con il territorio', spec: 'ELENCO — da cliente' },
      ],
    },
  ],
} as const;
