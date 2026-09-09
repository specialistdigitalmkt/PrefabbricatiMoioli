/**
 * Impianto bilingue.
 *
 * L'italiano resta alla radice: è la lingua del sito, e nessun URL esistente
 * cambia. L'inglese vive sotto /en con percorsi tradotti — /en/turnkey, non
 * /en/chiavi-in-mano — perché a un lettore inglese un percorso italiano dice
 * solo che la traduzione è stata fatta a metà.
 *
 * PORTATA DELLA VERSIONE INGLESE
 * Tradotte: home, indice soluzioni, Tecnowing, chiavi in mano, indice
 * progetti, azienda, contatti. Le altre pagine esistono solo in italiano.
 * Il menu inglese quindi NON le elenca: mandare un lettore inglese su una
 * pagina italiana è peggio che non offrirgli la voce.
 */

export type Lang = 'it' | 'en';

export const LINGUE: Record<Lang, { etichetta: string; sigla: string; locale: string }> = {
  it: { etichetta: 'Italiano', sigla: 'IT', locale: 'it_IT' },
  en: { etichetta: 'English', sigla: 'EN', locale: 'en_GB' },
};

/**
 * Le pagine che esistono in entrambe le lingue.
 * Chiave: percorso italiano. Valore: percorso inglese.
 * Una pagina che non compare qui esiste solo in italiano: niente switcher,
 * niente hreflang, niente voce di menu inglese.
 */
export const coppieRotte: Record<string, string> = {
  '/': '/en',
  '/soluzioni': '/en/solutions',
  '/soluzioni/tecnowing': '/en/solutions/tecnowing',
  '/chiavi-in-mano': '/en/turnkey',
  '/progetti': '/en/projects',
  '/azienda': '/en/company',
  '/contatti': '/en/contact',
};

const rotteInverse: Record<string, string> = Object.fromEntries(
  Object.entries(coppieRotte).map(([it, en]) => [en, it])
);

/** Toglie la barra finale, tenendo la radice. */
export const normalizza = (percorso: string) => percorso.replace(/\/+$/, '') || '/';

export const linguaDi = (percorso: string): Lang =>
  /^\/en(\/|$)/.test(normalizza(percorso)) ? 'en' : 'it';

/**
 * Il percorso corrispondente nell'altra lingua, o null se la pagina in
 * quella lingua non esiste. Chi chiama decide cosa farne: lo switcher lo
 * nasconde, l'hreflang non lo dichiara.
 */
export function percorsoAlternato(percorso: string): string | null {
  const p = normalizza(percorso);
  return linguaDi(p) === 'it' ? (coppieRotte[p] ?? null) : (rotteInverse[p] ?? null);
}

/** Testi dell'interfaccia condivisa: testata, piè di pagina, comandi. */
export const ui = {
  it: {
    skip: 'Vai al contenuto',
    ctaPreventivo: 'Richiedi preventivo',
    menuApri: 'Apri il menu',
    menuChiudi: 'Chiudi il menu',
    tornaSu: "Torna all'inizio della pagina",
    home: 'Home',
    homeAria: 'Prefabbricati Moioli — home',
    navPrincipale: 'Navigazione principale',
    navMobile: 'Navigazione principale (mobile)',
    navSecondaria: 'Navigazione secondaria',
    cambioLingua: 'Cambia lingua',
    footNaviga: 'Naviga',
    footFileDaFornire: 'FILE — da fornire',
    footLegale: 'Privacy Policy · Cookie Policy',
    demoFlag: 'Demo concept',
    fotoDaServizio: 'FOTO — da servizio fotografico',
    daCatalogo: '— da catalogo',
    scopriSoluzione: 'Scopri la soluzione',
    fotoDettaglio: 'FOTO DETTAGLIO — da servizio fotografico',
    disegnoSegnaposto: 'DISEGNO SEGNAPOSTO — vettoriale definitivo da produrre',
  },
  en: {
    skip: 'Skip to content',
    ctaPreventivo: 'Request a quote',
    menuApri: 'Open the menu',
    menuChiudi: 'Close the menu',
    tornaSu: 'Back to top of page',
    home: 'Home',
    homeAria: 'Prefabbricati Moioli — home',
    navPrincipale: 'Main navigation',
    navMobile: 'Main navigation (mobile)',
    navSecondaria: 'Secondary navigation',
    cambioLingua: 'Change language',
    footNaviga: 'Navigate',
    footFileDaFornire: 'FILE — to be supplied',
    footLegale: 'Privacy Policy · Cookie Policy',
    demoFlag: 'Demo concept',
    fotoDaServizio: 'PHOTO — from a photo shoot',
    daCatalogo: '— from catalogue',
    scopriSoluzione: 'Explore the solution',
    fotoDettaglio: 'DETAIL PHOTO — from a photo shoot',
    disegnoSegnaposto: 'PLACEHOLDER DRAWING — final vector artwork to be produced',
  },
} as const;

/** Piè di pagina: blocco documentazione, in inglese. */
export const downloadEn = {
  titolo: 'Technical documentation',
  nota: 'Data sheets and certifications available on request.',
  voci: [
    { label: 'Roofing data sheets', formato: 'PDF' },
    { label: 'DoP and certification pack', formato: 'ZIP' },
  ],
} as const;

/**
 * Menu inglese: solo le pagine che esistono in inglese.
 * La tendina Soluzioni elenca l'indice e Tecnowing, le uniche due tradotte.
 */
export const navEn = [
  {
    label: 'Solutions',
    href: '/en/solutions',
    voci: [
      { label: 'All solutions', href: '/en/solutions', nota: 'The seven building types' },
      { label: 'Tecnowing', href: '/en/solutions/tecnowing', nota: 'Wing-shaped roofing element' },
    ],
  },
  { label: 'Turnkey', href: '/en/turnkey' },
  { label: 'Projects', href: '/en/projects' },
  { label: 'Company', href: '/en/company' },
  { label: 'Contact', href: '/en/contact' },
];
