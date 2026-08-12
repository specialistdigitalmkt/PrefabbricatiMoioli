/**
 * Contenuti della pagina /chiavi-in-mano.
 *
 * ATTENZIONE — QUASI TUTTO QUI È REDAZIONALE.
 * Del chiavi in mano Moioli è stato fornito un solo dato: che nasce con
 * CMB Costruzioni, società del gruppo Moioli. Nient'altro.
 *
 * Di conseguenza:
 * - Non compare nessun numero: né cantieri, né tempi, né superfici.
 * - Non è attribuita a Moioli o a CMB nessuna competenza specifica che non
 *   sia deducibile dal termine «chiavi in mano».
 * - Le fasi descritte sono l'arco di qualunque costruzione, ed è l'arco che
 *   il timelapse in apertura mostra davvero: scavo, struttura, involucro,
 *   finiture, consegna. Non sono una descrizione del processo interno.
 * - Quello che deve arrivare dal cliente sta in blocchi segnaposto
 *   dichiarati, visibili in pagina.
 *
 * Stato: needs-client-approval su tutto. Vedi CONTENT-STATUS.md §9.
 */

export const pagina = {
  eyebrow: 'Chiavi in mano',
  titolo: 'Dal terreno alle chiavi.',
  claim: 'Un solo interlocutore, dall’area libera all’edificio che apre.',
  lead:
    'Il chiavi in mano Moioli nasce con CMB Costruzioni, società del gruppo. La struttura prefabbricata esce dallo stabilimento di Bagnatica; tutto il resto — opere civili, involucro, finiture — arriva dallo stesso contratto.',

  video: {
    /* Timelapse del cantiere di Bonate, fornito dal cliente. Tagliato a 41",
       senza audio: è sfondo, non contenuto. */
    src: '/video/chiavi-in-mano.mp4',
    poster: 'cim-hero-poster',
    alt: 'Timelapse di un cantiere Moioli: dalle fondazioni all’edificio finito con impianto fotovoltaico in copertura',
    didascalia: 'Cantiere di Bonate — timelapse',
  },

  identita: {
    eyebrow: 'Di cosa si tratta',
    titolo: 'Una firma sola, una responsabilità sola.',
    paragrafi: [
      'In un appalto tradizionale il committente coordina imprese diverse: chi fa gli scavi, chi monta la struttura, chi chiude l’involucro, chi posa gli impianti. Ogni confine fra un’impresa e l’altra è un punto in cui i tempi si allungano e le responsabilità si sfumano.',
      'Il chiavi in mano toglie quei confini dal tavolo del committente. Resta un contratto, un interlocutore, una data di consegna — e chi coordina è chi costruisce.',
    ],
  },

  vantaggi: [
    {
      titolo: 'Un contratto solo',
      testo: 'Il committente ha un unico riferimento contrattuale invece di una catena di imprese da tenere allineate.',
    },
    {
      titolo: 'La struttura è di casa',
      testo: 'L’elemento prefabbricato non è comprato da terzi: esce dallo stabilimento di Bagnatica.',
    },
    {
      titolo: 'Una data di consegna',
      testo: 'Il calendario è uno, non la somma di calendari che si aspettano a vicenda.',
    },
    {
      titolo: 'Un solo responsabile',
      testo: 'Se qualcosa non torna, non c’è da stabilire di chi sia il confine.',
    },
  ],

  /* Le fasi sono quelle che il timelapse mostra. Nessuna pretesa di
     descrivere il processo interno: quello lo scriverà il cliente. */
  percorso: {
    eyebrow: 'Il percorso',
    titolo: 'Quello che si vede nel filmato, in ordine.',
    intro:
      'Il timelapse in apertura è il cantiere di Bonate ripreso dall’inizio alla fine. Sono le stesse fasi che attraversa ogni edificio.',
    fasi: [
      {
        num: '01',
        titolo: 'Progetto',
        testo: 'Destinazione d’uso, superfici, vincoli dell’area. È la fase in cui si decide quale struttura ha senso.',
      },
      {
        num: '02',
        titolo: 'Opere civili',
        testo: 'Scavi, fondazioni, platea. Il piano su cui la struttura verrà montata.',
      },
      {
        num: '03',
        titolo: 'Struttura prefabbricata',
        testo: 'Pilastri, travi ed elementi di copertura arrivano dallo stabilimento e si montano in cantiere.',
      },
      {
        num: '04',
        titolo: 'Involucro',
        testo: 'Pannelli di facciata, coperture, serramenti. L’edificio si chiude.',
      },
      {
        num: '05',
        titolo: 'Finiture e impianti',
        testo: 'Pavimentazioni, uffici, impianti tecnologici, eventuale fotovoltaico in copertura.',
      },
      {
        num: '06',
        titolo: 'Consegna',
        testo: 'L’edificio passa al committente pronto all’uso.',
      },
    ],
  },

  cmb: {
    eyebrow: 'Il partner',
    titolo: 'CMB Costruzioni.',
    testo:
      'CMB Costruzioni è la società del gruppo Moioli che porta a termine la parte edile del chiavi in mano. La struttura prefabbricata e la costruzione dell’edificio restano così dentro lo stesso gruppo.',
    /* Profilo, storia e competenze di CMB non sono stati forniti: al loro
       posto un segnaposto dichiarato, non un testo inventato. */
    segnaposto: 'PROFILO CMB COSTRUZIONI — testo da fornire',
    logo: {
      chiaro: '/cmb/cmb-orizzontale-bianco.svg',
      scuro: '/cmb/cmb-orizzontale.svg',
      alt: 'CMB Costruzioni',
      larghezza: 543.79,
      altezza: 82.2,
    },
  },

  comprende: {
    eyebrow: 'Cosa comprende',
    titolo: 'Il perimetro esatto lo definisce il contratto.',
    testo:
      'Che cosa rientri nel chiavi in mano e che cosa resti fuori cambia da commessa a commessa. L’elenco definitivo va concordato con l’ufficio tecnico.',
    segnaposto: 'ELENCO DELLE PRESTAZIONI INCLUSE — da definire con l’ufficio tecnico',
  },

  portfolio: {
    eyebrow: 'Realizzazioni',
    titolo: 'I chiavi in mano consegnati.',
    intro:
      'Le schede si popolano man mano che il materiale arriva. Ogni riquadro è un posto già pronto ad accogliere una realizzazione.',
    /* Numero di riquadri segnaposto. Sono dichiarati: non simulano contenuto. */
    posti: 6,
    nota: 'Segnaposto dichiarati: nessuna di queste è una realizzazione reale. Si sostituiscono una alla volta, senza toccare il resto della pagina.',
  },

  cta: {
    eyebrow: 'Il passo successivo',
    titolo: 'Hai un’area e un’idea di cosa ci deve stare dentro?',
    testo:
      'Superficie del lotto, destinazione d’uso e metri quadri coperti: con questi tre dati possiamo dirti se il chiavi in mano è la strada giusta.',
  },
} as const;
