/**
 * Versione inglese della pagina «chiavi in mano».
 *
 * Traduzione dell'italiano in src/data/chiavi-in-mano.ts, non un testo nuovo:
 * valgono le stesse cautele. Del chiavi in mano Moioli e' stato fornito un
 * dato: il servizio si presenta solo col marchio Moioli, e la traduzione
 * non aggiunge nulla. I segnaposto restano segnaposto.
 *
 * Tutto cio' che non e' testo (percorsi del video, del poster e del logo,
 * misure, numero di riquadri) arriva dai dati italiani invece di essere
 * riscritto: se cambia una misura, cambia in un posto solo.
 *
 * TERMINOLOGIA — da confermare con l'ufficio tecnico
 * - «chiavi in mano» → turnkey
 * - «opere civili» → civil works
 * - «involucro» → building envelope
 * - «struttura prefabbricata» → precast structure
 *
 * Stato: needs-client-approval, come l'italiano. Vedi CONTENT-STATUS.md §9.
 */
import { pagina as it } from '../../data/chiavi-in-mano';

export const pagina = {
  eyebrow: 'Turnkey',
  titolo: 'From the foundations to the final detail.',
  claim: 'One point of contact, no contractors to coordinate.',
  lead: 'With Moioli turnkey construction the precast structure leaves the plant in Bagnatica, and everything else — civil works, building envelope, finishes — comes under the same contract.',

  video: {
    ...it.video,
    alt: 'Time-lapse of a Moioli site: from the foundations to the finished building with a rooftop photovoltaic system',
    didascalia: 'Bonate site — time-lapse',
  },

  identita: {
    eyebrow: 'What it means',
    titolo: 'One signature, one responsibility.',
    paragrafi: [
      'In a traditional contract the client coordinates several firms: one does the excavation, one erects the structure, one closes the envelope, one installs the services. Every boundary between one firm and the next is a point where schedules stretch and responsibility blurs.',
      'Turnkey construction takes those boundaries off the client’s desk. What is left is one contract, one point of contact, one delivery date — and the party coordinating the work is the party building it.',
    ],
  },

  vantaggi: [
    {
      titolo: 'A single contract',
      testo: 'The client has one contractual reference instead of a chain of firms to keep aligned.',
    },
    {
      titolo: 'The structure is ours',
      testo: 'The precast element is not bought in from a third party: it leaves the plant in Bagnatica.',
    },
    {
      titolo: 'One delivery date',
      testo: 'There is one schedule, not the sum of several schedules waiting on one another.',
    },
    {
      titolo: 'One party accountable',
      testo: 'If something is not right, there is no boundary to argue over first.',
    },
  ],

  percorso: {
    eyebrow: 'The sequence',
    titolo: 'What the film shows, in order.',
    intro:
      'The time-lapse at the top is the Bonate site filmed from beginning to end. These are the stages every building goes through.',
    fasi: [
      {
        num: '01',
        titolo: 'Design',
        testo: 'Intended use, floor areas, site constraints. This is the stage where it is decided which structure makes sense.',
      },
      {
        num: '02',
        titolo: 'Civil works',
        testo: 'Excavation, foundations, ground slab. The base the structure will be erected on.',
      },
      {
        num: '03',
        titolo: 'Precast structure',
        testo: 'Columns, beams and roof elements arrive from the plant and are erected on site.',
      },
      {
        num: '04',
        titolo: 'Building envelope',
        testo: 'Façade panels, roofing, doors and windows. The building closes.',
      },
      {
        num: '05',
        titolo: 'Finishes and services',
        testo: 'Flooring, offices, building services, rooftop photovoltaics where required.',
      },
      {
        num: '06',
        titolo: 'Handover',
        testo: 'The building passes to the client ready for use.',
      },
    ],
  },

  comprende: {
    eyebrow: 'What it covers',
    titolo: 'The exact scope is set by the contract.',
    testo:
      'What falls inside a turnkey package and what stays outside changes from one project to the next. The final list is agreed with the technical department.',
    segnaposto: 'LIST OF INCLUDED WORKS — to be defined with the technical department',
  },

  portfolio: {
    ...it.portfolio,
    eyebrow: 'Completed work',
    titolo: 'The turnkey buildings delivered.',
    intro:
      'The cards fill in as material arrives. Each frame is a place already set aside for a completed building.',
    nota: 'Declared placeholders: none of these is a real project. They are replaced one at a time, without touching the rest of the page.',
  },

  cta: {
    eyebrow: 'The next step',
    titolo: 'Do you have a site and an idea of what has to stand on it?',
    testo:
      'Plot area, intended use and covered square metres: with those three figures we can tell you whether turnkey is the right route.',
  },
};

/** Etichette dell'interfaccia della pagina. */
export const ui = {
  seoTitolo: 'Turnkey — From the foundations to the final detail | Prefabbricati Moioli',
  seoDescrizione:
    'Turnkey construction by Prefabbricati Moioli: one contract from civil works to handover of the finished building.',
  home: 'Home',
  briciola: 'Turnkey',
  comeFunziona: 'How it works',
  parlane: 'Talk to us',
  videoPausa: 'Pause the film',
  videoRiprendi: 'Resume the film',
  fotoDaRecuperare: 'PHOTO — to be sourced',
  realizzazioneDaInserire: 'Project to be added',
  richiediValutazione: 'Request an assessment',
};
