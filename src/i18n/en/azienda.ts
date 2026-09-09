/**
 * Profilo aziendale in inglese.
 *
 * Traduzione di `profilo` in src/data/azienda.ts. I numeri verificati
 * restano identici (1972, 700.000 mq, 100+ committenti, 50+ anni); i due
 * segnaposto dichiarati — superficie dello stabilimento e organico — restano
 * segnaposto anche in inglese, perche' il dato non e' stato fornito.
 *
 * Il formato dei numeri cambia con la lingua: 700.000 in italiano,
 * 700,000 in inglese. E' l'unica differenza numerica ammessa.
 *
 * TERMINOLOGIA — da confermare
 * - «cemento armato precompresso» → prestressed reinforced concrete
 * - «lucernario continuo» → continuous rooflight
 * - «casseri» → moulds
 * - «linee di precompressione» → prestressing lines
 *
 * Stato: needs-client-approval, come l'italiano.
 */

export const profilo = {
  eyebrow: 'Company',
  titolo: 'Building is a trade you learn on site.',
  lead: 'Prefabbricati Moioli was founded in Bagnatica at the end of 1972, out of the determination and combined experience of the Moioli brothers and a group of designers. Since then it has produced precast reinforced concrete structures for industrial, commercial and civic construction.',

  paragrafi: [
    'A technically ambitious company from the very start, able to deliver singular projects. In a sector that demands quality, competitiveness and safety, advice on the design counts as much as the product itself: which is why design, production and erection all stay inside the same company.',
    'From the first idea to the coordination of suppliers and trades, right through to handover, the client has a single point of contact. This is the turnkey method the company has built up over half a century of work.',
  ],

  numeri: [
    { valore: '1972', label: 'Year founded', stato: 'ok' },
    { valore: '700,000', unita: 'm²', label: 'Floor area built', stato: 'ok' },
    { valore: '100', unita: '+', label: 'Clients served', stato: 'ok' },
    { valore: '50', unita: '+', label: 'Years in business', stato: 'ok' },
    { spec: 'PLANT FLOOR AREA', label: 'The Bagnatica plant', stato: 'manca' },
    { spec: 'HEADCOUNT', label: 'People in the company', stato: 'manca' },
  ],

  sistema: {
    eyebrow: 'The proprietary system',
    nome: 'Stegos',
    claim: 'Developed exclusively by Prefabbricati Moioli.',
    testo:
      'A roof and floor element in prestressed reinforced concrete, with a continuous rooflight integrated into the section itself. It is not a product bought from a supplier’s catalogue: it originates and is made at the Bagnatica plant.',
    /* La scheda Stegos non e' tradotta: il collegamento porta all'indice
       inglese delle soluzioni, non a una pagina italiana. */
    href: '/en/solutions',
  },

  stabilimento: {
    eyebrow: 'The plant',
    titolo: 'It is made in Bagnatica.',
    testo:
      'Moulds, prestressing lines and dimensional control are all in house. Elements reach the site finished: on site they are placed, not cast.',
  },

  tappe: [
    { anno: '1972', testo: 'The Moioli brothers found the company in Bagnatica.' },
    {
      anno: '1985',
      testo: 'The plant expands: new mould lines and prestressed beams.',
    },
    { anno: '2005', testo: 'Major industrial and logistics contracts across northern Italy.' },
    {
      anno: 'Today',
      testo: 'More than 700,000 m² built and an established turnkey method.',
    },
  ],

  video: {
    titolo: 'Corporate video',
    nota: 'Space reserved for the company video. To be filmed or supplied.',
  },
};

/** Etichette dell'interfaccia della pagina azienda. */
export const ui = {
  seoTitolo: 'The company — Prefabbricati Moioli, Bagnatica, Italy',
  seoDescrizione:
    'Prefabbricati Moioli: in Bagnatica, near Bergamo, since 1972. Precast reinforced concrete structures for industrial, commercial and civic construction. More than 700,000 m² built.',
  home: 'Home',
  briciola: 'Company',
  daCliente: '— from the client',
  vaiSchedaTecnica: 'Go to the solutions index',
  stegosAlt: 'Interior of a building made with Stegos elements',
  stabilimentoAlt: 'Production bay for precast elements at the Bagnatica plant',
  mezzoSecolo: 'Half a century',
  leTappe: 'The milestones.',
  daFornire: '— to be supplied',
  ctaEyebrow: 'The next step',
  ctaTitolo: 'Let’s talk about what you need to build.',
  ctaTesto: 'A single point of contact from design to handover.',
  contattaci: 'Get in touch',
};
