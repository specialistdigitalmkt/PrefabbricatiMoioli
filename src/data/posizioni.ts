/**
 * Posizioni aperte — /azienda/lavora-con-noi
 *
 * FONTE
 * Il testo di ogni posizione è quello dell'annuncio approvato dall'azienda
 * (per il Capo Cantiere: `assunzione/RICERCHIAMO UN CAPO CANTIERE ESPERTO.docx`).
 * Qui non si riscrive: si copia, al massimo si accorcia.
 *
 * COME SI AGGIUNGE O SI CHIUDE UNA POSIZIONE
 * - Aggiungere: un nuovo oggetto in `posizioni`. La pagina di dettaglio, la
 *   voce nell'elenco, la sitemap e i dati strutturati JobPosting si generano
 *   da soli.
 * - Chiudere: `aperta: false`. La posizione esce dall'elenco e dalla sitemap
 *   e la sua pagina dice che la ricerca è chiusa, invece di sparire e
 *   lasciare un 404 a chi arriva da un vecchio link di LinkedIn.
 *
 * DOVE ARRIVANO LE CANDIDATURE
 * A `emailCandidature`, sia dal pulsante email sia dal modulo con il CV
 * (che passa da api/candidatura.js).
 */

export const emailCandidature = 'service@prefabbricatimoioli.it';

export type Posizione = {
  slug: string;
  titolo: string;
  aperta: boolean;
  /** Data di pubblicazione, AAAA-MM-GG. Finisce nel JobPosting. */
  pubblicata: string;
  reparto: string;
  sede: string;
  impiego: string;
  inserimento: string;
  /** Una frase: compare nell'elenco e come descrizione della pagina. */
  sintesi: string;
  ruolo: string[];
  responsabilita: string[];
  requisiti: string[];
  contratto: string[];
  /** Per i dati strutturati: retribuzione annua lorda del contratto subordinato. */
  ral?: { min: number; max: number };
  /** Tipi di impiego schema.org. */
  tipiImpiego: ('FULL_TIME' | 'TEMPORARY' | 'CONTRACTOR')[];
};

export const posizioni: Posizione[] = [
  {
    slug: 'capo-cantiere',
    titolo: 'Capo cantiere',
    aperta: true,
    pubblicata: '2026-10-27',
    reparto: 'Chiavi in mano',
    sede: 'Bagnatica (BG)',
    impiego: 'Tempo pieno',
    inserimento: 'Dicembre 2026',
    sintesi:
      'Per il reparto Chiavi in mano cerchiamo un capo cantiere con almeno 10 anni di esperienza, per la gestione di importanti cantieri industriali.',
    ruolo: [
      'La figura ricercata avrà responsabilità di organizzazione, gestione e coordinamento delle lavorazioni, piuttosto che compiti di esecuzione pratica delle stesse.',
      'Il compito principale sarà garantire il corretto andamento delle attività di cantiere, coordinando le diverse imprese e i subappaltatori presenti: sia quelli incaricati direttamente da Prefabbricati Moioli sia quelli incaricati dagli altri soggetti coinvolti nel progetto, nell’ambito delle responsabilità e delle competenze assegnate.',
      'Cerchiamo una persona con solida esperienza pratica di cantiere, spiccata capacità decisionale, autorevolezza e fermezza nelle scelte, in grado di gestire autonomamente le priorità, affrontare le criticità e assumere decisioni tempestive, anche in situazioni complesse.',
      'È fondamentale saper dialogare e confrontarsi con le diverse imprese, mantenendo una posizione chiara e determinata, facendo rispettare programmi, accordi operativi e tempistiche.',
    ],
    responsabilita: [
      'Pianificare e organizzare le attività quotidiane e settimanali, garantendo il rispetto del cronoprogramma.',
      'Coordinare le imprese e i subappaltatori presenti in cantiere, anche quando non direttamente incaricati dalla nostra azienda, secondo le responsabilità attribuite.',
      'Assumere decisioni operative in autonomia, individuando soluzioni concrete e tempestive a problematiche e imprevisti.',
      'Verificare il corretto avanzamento dei lavori, il rispetto delle scadenze e la qualità delle esecuzioni.',
      'Prevenire anziché intervenire: individuare con anticipo possibili errori e criticità, adottando le misure correttive prima che incidano sull’andamento dei lavori.',
      'Mantenere un confronto costante con direzione lavori, tecnici, referenti delle imprese e figure incaricate della sicurezza.',
      'Garantire ordine, organizzazione e continuità operativa all’interno del cantiere.',
    ],
    requisiti: [
      'Almeno 10 anni di esperienza nel ruolo di capo cantiere, preferibilmente nella realizzazione di edifici industriali e nella gestione di cantieri complessi.',
      'Comprovata esperienza nel coordinamento contemporaneo di più imprese e lavorazioni.',
      'Solida conoscenza pratica delle lavorazioni edili, acquisita con esperienza diretta in cantiere.',
      'Elevata capacità organizzativa, decisionale e di problem solving.',
      'Autorevolezza, fermezza nelle decisioni e capacità di far rispettare le scelte operative.',
      'Capacità di anticipare le criticità, pianificare le attività e individuare soluzioni concrete.',
      'Ottime capacità di comunicazione con imprese, tecnici e direzione lavori.',
      'Lettura dei disegni esecutivi e conoscenza approfondita delle principali fasi costruttive.',
      'Gradito il patentino per la conduzione di gru edile, in corso di validità.',
    ],
    contratto: [
      'Contratto di lavoro subordinato a tempo determinato di 12 mesi, con concreta prospettiva di trasformazione a tempo indeterminato. RAL indicativa: 60.000-70.000 €.',
      'In alternativa, collaborazione professionale con partita IVA, con compenso annuo indicativo di 90.000-100.000 €, oltre IVA e oneri previdenziali se dovuti.',
      'Le condizioni economiche saranno definite in funzione dell’esperienza, delle competenze e delle responsabilità affidate.',
    ],
    ral: { min: 60000, max: 70000 },
    tipiImpiego: ['FULL_TIME', 'TEMPORARY', 'CONTRACTOR'],
  },
];

export const posizioniAperte = posizioni.filter((p) => p.aperta);

/** Oggetto dell'email: lo stesso dal pulsante e dal modulo, così in casella
 *  le candidature si filtrano con una regola sola. */
export const oggettoCandidatura = (p: Pick<Posizione, 'titolo'>) => `Candidatura - ${p.titolo}`;
