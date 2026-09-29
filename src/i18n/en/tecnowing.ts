/**
 * Scheda tecnica Tecnowing in inglese.
 *
 * Traduzione di `tecnowing` in src/data/soluzioni-tecniche.ts. I NUMERI NON
 * SI TOCCANO: modulo 250 cm, R90'-R120' estendibile a R180', travi da 90 a
 * 235 cm arrivano dal catalogo ufficiale e sono ricopiati identici. Dove
 * l'italiano dichiara un segnaposto, l'inglese dichiara un segnaposto.
 *
 * TERMINOLOGIA TECNICA — DA CONFERMARE CON L'UFFICIO TECNICO
 * Sono le scelte su cui una traduzione puo' sbagliare senza che si veda:
 * - «tegolo alare» → wing unit
 * - «interposto» → infill panel
 * - «cemento armato precompresso» → prestressed reinforced concrete
 * - «luce netta» → clear span
 * - «lucernari a shed» → north-light rooflights
 * - «compluvio / valle di scarico» → valley
 * - «armatubo» → lasciato in italiano: e' un sistema di collegamento
 *   denominato cosi' dal catalogo, non un termine descrittivo. Va deciso se
 *   ha un nome commerciale inglese.
 * - «da verifica geometra» → to be confirmed by the surveyor
 *
 * Stato: needs-client-approval.
 */
import type { SchedaTecnica } from '../../data/soluzioni-tecniche';
import { schedeTecniche } from '../../data/soluzioni-tecniche';

const it = schedeTecniche.find((s) => s.slug === 'tecnowing')!;

export const tecnowing: SchedaTecnica = {
  slug: 'tecnowing',
  nome: 'Tecnowing',
  alias: 'Wing roof',
  eyebrow: 'Solutions · Roofing',
  claim: 'The “V” shape brings in the light and sheds the water.',
  meta: 'Tecnowing, the Moioli wing roof: wing units with solid or glazed infill panels, 250 cm module, fire resistance from R90′ to R180′.',
  lead: 'A wing roofing system for industrial, commercial and logistics buildings. Between one wing unit and the next, solid or glazed panels alternate — continuous or north-light rooflights — chosen according to how the building will be used.',

  identita: {
    titolo: 'It is assembled to suit.',
    paragrafi: [
      'Tecnowing is not a single roof: it is a rhythm. The wing unit repeats, and between one element and the next you decide each time what to put there — a solid infill where you need closure, a glazed one where you need light.',
      'The “V” shape of the element is not an aesthetic decision: it carries water outwards and leaves the plane clear for sprinkler systems.',
    ],
  },

  caratteristiche: [
    {
      titolo: 'Daylight you can tune',
      testo: 'Solid or glazed infill panels, continuous or north-light rooflights, chosen bay by bay.',
    },
    { titolo: 'High thermal insulation', testo: 'Insulation integrated into the roof build-up.' },
    {
      titolo: 'Water carried outwards',
      testo: 'The “V” geometry takes water to the edges, with no internal valleys.',
    },
    {
      titolo: 'Sprinkler compatible',
      testo: 'The profile leaves the plane clear for sprinkler systems.',
    },
  ],

  dati: {
    titolo: 'The figures behind the roof.',
    voci: [
      { label: 'Module width', valore: '250', unita: 'cm' },
      { label: 'Fire resistance', valore: 'R90′ to R120′', nota: 'extendable to R180′' },
      { label: '“I” beam depth', valore: '90 · 110 · 140 · 180 · 235', unita: 'cm' },
      { label: 'Water disposal', valore: 'outwards', nota: '“V” geometry' },
    ],
    nota: 'Dimensions in centimetres. Source: Tecnowing catalogue.',
  },

  sistema: {
    titolo: 'Every configuration, an answer.',
    intro:
      'The wing unit does not arrive on its own: the system includes the beams and columns designed to receive it.',
    componenti: [
      {
        nome: 'Tecnowing wing unit',
        testo: 'The load-bearing wing-section element, in prestressed reinforced concrete.',
      },
      {
        nome: 'Infill panel',
        testo: 'Lightweight or concrete, solid or glazed: chosen according to the intended use.',
      },
      {
        nome: '“I” beams',
        testo: 'Prestressed elements for central positions. Depths from 90 to 235 cm.',
      },
      { nome: '“L” and “T” beams', testo: 'Special solutions for edge and central positions.' },
      {
        nome: '“U” beams',
        testo: 'An element with a wide channel, to carry water across large roof areas.',
      },
      {
        nome: 'Column with armatubo system',
        testo: 'Columns of suitable section, with corbels for floors and the armatubo connection system.',
      },
    ],
  },

  sezione: {
    titolo: 'The points that matter.',
    intro: 'Cross section through the roof. Select a point to see how it is resolved.',
  },

  modello3d: {
    /* Il configuratore 3D e' una pagina a se', non tradotta: il collegamento
       porta alla versione italiana, che e' comunque un modello da guardare
       piu' che da leggere. */
    href: it.modello3d!.href,
    titolo: 'The same system, in three dimensions.',
    testo:
      'The configurator shows the roof assembled: rotate the model, isolate a component, change the infill and the configuration. It opens in a separate tab because it is heavy. The configurator interface is in Italian.',
  },

  applicazioni: [
    {
      num: '01',
      titolo: 'Industrial buildings',
      testo: 'Large areas with different daylight requirements zone by zone.',
    },
    {
      num: '02',
      titolo: 'Commercial buildings',
      testo: 'Where the soffit stays exposed and the rhythm of the roof is part of the room.',
    },
    {
      num: '03',
      titolo: 'Logistics hubs',
      testo: 'Large continuous roofs with water carried outwards.',
    },
    {
      num: '04',
      titolo: 'Photovoltaic roofs',
      testo: 'The pitches remain usable surfaces for solar collection.',
    },
  ],

  hotspots: [
    {
      id: 'tegolo',
      x: 50,
      y: 40.5,
      titolo: 'Wing unit',
      sommario: 'The load-bearing wing-section element.',
      descrizione:
        'The prestressed reinforced concrete unit made at the Bagnatica plant. Its wing section lets it span the bay while staying slender at mid-span and deepening at the supports.',
      specs: ['CLEAR SPAN — from catalogue', 'MODULE WIDTH — 250 cm'],
    },
    {
      id: 'interposto',
      x: 35.2,
      y: 48.4,
      titolo: 'Infill panel',
      sommario: 'The space between one unit and the next.',
      descrizione:
        'A lightweight or concrete element sits between two wing units. Solid where closure is needed, glazed where light is needed: this is the decision that makes the roof different from one building to another. It can carry continuous or north-light rooflights.',
      specs: ['INFILL TYPE — from the design', 'GLAZED AREA — from catalogue'],
    },
    {
      id: 'valle',
      x: 14.2,
      y: 55.7,
      titolo: 'Drainage valley',
      sommario: 'Where the “V” collects the water.',
      descrizione:
        'The wing geometry forms a valley that carries water towards the outside of the building. There are no internal valleys to cross, and the roof plane stays clear for sprinkler systems.',
      specs: ['FALL — from catalogue', 'DRAINAGE SECTION — to be confirmed by the surveyor'],
    },
    {
      id: 'coibente',
      x: 79.7,
      y: 39.5,
      titolo: 'Insulation',
      sommario: 'The insulation inside the build-up.',
      descrizione:
        'The insulating layer is part of the roof build-up, not something added afterwards. The build-up is defined according to the performance the project requires.',
      specs: ['BUILD-UP — from catalogue', 'THICKNESS — to be confirmed by the surveyor'],
    },
    {
      id: 'trave',
      x: 85.8,
      y: 52.9,
      titolo: '“I” beam',
      sommario: 'Where the unit bears.',
      descrizione:
        'Prestressed beams for central positions, available in depths from 90 to 235 cm. At the edges “L” or “U” beams are used, the latter where a wide channel is needed for water.',
      specs: ['BEAM DEPTH — 90 · 110 · 140 · 180 · 235 cm'],
    },
    {
      id: 'pilastro',
      x: 85.8,
      y: 75.7,
      titolo: 'Column with armatubo system',
      sommario: 'The connection to the ground.',
      descrizione:
        'Columns of suitable section, with corbels for floors or travelling cranes where the design calls for them, and the armatubo system for the connection.',
      specs: ['COLUMN SECTION — from catalogue', 'CONNECTION TYPE — from the design'],
    },
  ],
};

/** Etichette dell'interfaccia della scheda soluzione. */
export const ui = {
  sistemaGenerico: 'Precast roofing system',
  home: 'Home',
  soluzioni: 'Solutions',
  esploraSezione: 'Explore the section',
  chiediAdatto: 'Ask whether it suits your project',
  diCosaSiTratta: 'What it is',
  laSezione: 'The section',
  apriModello3d: 'Open the 3D model',
  datiTecnici: 'Technical data',
  ilSistema: 'The system',
  doveSiUsa: 'Where it is used',
  destinazioni: 'The most frequent uses.',
  realizzazioni: 'Completed work',
  comeSiVede: 'How it looks finished.',
  notaGalleria:
    'Review note: photographs from the Moioli archive, taken from the folder for this solution. Captions are still to be written and the individual buildings to be identified.',
  altreSoluzioni: 'Other solutions',
  nonUnica: 'It is not the only route.',
  tutteLeSoluzioni: 'All solutions',
  passoSuccessivo: 'The next step',
  verifichiamo: (nome: string) => `Let’s check whether ${nome} suits your building.`,
  ctaTesto:
    'Intended use, floor area and number of storeys: with those three figures we can already tell you whether it makes sense.',
  richiediValutazione: 'Request an assessment',
  galleriaAlt: (nome: string, i: number) =>
    `${nome}: a Prefabbricati Moioli project, image ${i}`,
  heroAltFallback: (nome: string) => `${nome} roofing built by Prefabbricati Moioli`,
};
