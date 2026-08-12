/**
 * Schede tecniche delle soluzioni che non hanno una pagina dedicata scritta
 * a mano (Tecnoshed e Stegos ce l'hanno).
 *
 * FONTE DEI DATI TECNICI
 * Cataloghi ufficiali in `CARTELLA IMMAGINI/CATALOGHI TECNICI PDF A4`.
 * Ogni valore è riportato alla lettera: niente arrotondamenti, niente
 * deduzioni, niente completamenti. Dove il catalogo scrive «variabile» o
 * «a seconda della necessità», la pagina scrive la stessa cosa.
 *
 * DA CONFERMARE prima della messa online: che quei cataloghi siano la
 * versione validata. Portano data di impaginazione 22/11/19 e il file
 * InDesign di origine di tutti si chiama «4-ante-Tecnowing FINAL.indd».
 *
 * I testi discorsivi sono redazionali e non aggiungono nulla ai dati.
 * I disegni in sezione sono SEGNAPOSTO dichiarati, costruiti dalla
 * descrizione testuale: nessuna tavola di catalogo è riprodotta.
 */
import type { Hotspot } from './tipi';

export type SchedaTecnica = {
  slug: string;
  nome: string;
  alias?: string;
  eyebrow: string;
  claim: string;
  /** Meta description: il lead è testo di pagina, troppo lungo per la SERP. */
  meta: string;
  lead: string;
  identita: { titolo: string; paragrafi: string[] };
  caratteristiche: { titolo: string; testo: string }[];
  dati: {
    titolo: string;
    voci: { label: string; valore: string; unita?: string; nota?: string }[];
    nota: string;
  };
  sistema: { titolo: string; intro: string; componenti: { nome: string; testo: string }[] };
  sezione: { titolo: string; intro: string };
  applicazioni: { num: string; titolo: string; testo: string }[];
  hotspots: Hotspot[];
};

/* ========================================================================
   TECNOWING — copertura alare
   ======================================================================== */
const tecnowing: SchedaTecnica = {
  slug: 'tecnowing',
  nome: 'Tecnowing',
  alias: 'Copertura alare',
  eyebrow: 'Soluzioni · Coperture',
  claim: 'La forma a “V” porta la luce e scarica l’acqua.',
  meta: 'Tecnowing, la copertura alare Moioli: tegoli alari e interposti opachi o luminosi, modulo 250 cm, resistenza al fuoco da R90′ a R180′.',
  lead:
    'Sistema di copertura alare per edifici industriali, commerciali e logistici. Fra un tegolo alare e il successivo si alternano elementi opachi o luminosi, lucernari continui o a shed, scelti in base alla destinazione d’uso.',

  identita: {
    titolo: 'Si compone come serve.',
    paragrafi: [
      'Tecnowing non è una copertura sola: è un ritmo. Il tegolo alare si ripete, e fra un elemento e l’altro si decide di volta in volta cosa mettere — un interposto opaco dove serve chiusura, uno luminoso dove serve luce.',
      'La forma a “V” dell’elemento non è un fatto estetico: convoglia l’acqua verso l’esterno e lascia il piano libero per i sistemi antincendio a pioggia.',
    ],
  },

  caratteristiche: [
    { titolo: 'Luce naturale modulabile', testo: 'Interposti opachi o luminosi, lucernari continui o a shed, scelti campata per campata.' },
    { titolo: 'Isolamento termico elevato', testo: 'Coibentazione integrata nel pacchetto di copertura.' },
    { titolo: 'Smaltimento verso l’esterno', testo: 'La geometria a “V” porta l’acqua ai bordi, senza compluvi interni.' },
    { titolo: 'Compatibile con sprinkler', testo: 'Il profilo lascia libero il piano per i sistemi antincendio a pioggia.' },
  ],

  dati: {
    titolo: 'I numeri della copertura.',
    voci: [
      { label: 'Larghezza modulo', valore: '250', unita: 'cm' },
      { label: 'Resistenza al fuoco', valore: 'da R90′ a R120′', nota: 'estendibile fino a R180′' },
      { label: 'Altezza travi “I”', valore: '90 · 110 · 140 · 180 · 235', unita: 'cm' },
      { label: 'Smaltimento acque', valore: 'verso l’esterno', nota: 'geometria a “V”' },
    ],
    nota: 'Misure indicate in centimetri. Fonte: catalogo Tecnowing.',
  },

  sistema: {
    titolo: 'Ogni configurazione, una risposta.',
    intro: 'Il tegolo alare non arriva da solo: il sistema comprende le travi e i pilastri progettati per riceverlo.',
    componenti: [
      { nome: 'Tegolo alare Tecnowing', testo: 'L’elemento portante a sezione alare, in cemento armato precompresso.' },
      { nome: 'Interposto', testo: 'Leggero o in CLS, opaco o luminoso: si sceglie in base alla destinazione d’uso.' },
      { nome: 'Travi a “I”', testo: 'Elementi precompressi per impieghi centrali. Altezze da 90 a 235 cm.' },
      { nome: 'Travi a “L” e “T”', testo: 'Soluzioni speciali per impieghi laterali e centrali.' },
      { nome: 'Travi a “U”', testo: 'Elemento con ampio invaso, per il convogliamento delle acque su grandi superfici.' },
      { nome: 'Pilastro con armatubo', testo: 'Pilastri di adeguata sezione, con mensole per impalcati e sistema armatubo.' },
    ],
  },

  sezione: {
    titolo: 'I punti che contano.',
    intro: 'Sezione trasversale della copertura. Seleziona un punto per vedere come è risolto.',
  },

  applicazioni: [
    { num: '01', titolo: 'Edifici industriali', testo: 'Grandi superfici con esigenze di luce differenziate per zona.' },
    { num: '02', titolo: 'Edifici commerciali', testo: 'Dove l’intradosso resta a vista e il ritmo della copertura si vede.' },
    { num: '03', titolo: 'Poli logistici', testo: 'Grandi coperture continue con smaltimento verso l’esterno.' },
    { num: '04', titolo: 'Coperture fotovoltaiche', testo: 'Le falde restano superfici utili per i sistemi captanti.' },
  ],

  hotspots: [
    {
      id: 'tegolo',
      x: 50,
      y: 40.5,
      titolo: 'Tegolo alare',
      sommario: 'L’elemento portante a sezione alare.',
      descrizione:
        'Il tegolo in cemento armato precompresso prodotto nello stabilimento di Bagnatica. La sezione ad ala gli permette di coprire la campata restando sottile al centro e ingrossandosi agli appoggi.',
      specs: ['LUCE NETTA — da catalogo', 'LARGHEZZA MODULO — 250 cm'],
    },
    {
      id: 'interposto',
      x: 35.2,
      y: 48.4,
      titolo: 'Interposto',
      sommario: 'Lo spazio fra un tegolo e il successivo.',
      descrizione:
        'Fra due tegoli si inserisce un elemento leggero o in CLS. Opaco dove serve chiusura, luminoso dove serve luce: è la decisione che rende la copertura diversa da un edificio all’altro. Può ospitare lucernari continui o a shed.',
      specs: ['TIPO INTERPOSTO — da progetto', 'SUPERFICIE LUMINOSA — da catalogo'],
    },
    {
      id: 'valle',
      x: 14.2,
      y: 55.7,
      titolo: 'Valle di scarico',
      sommario: 'Dove la “V” raccoglie l’acqua.',
      descrizione:
        'La geometria ad ala crea un impluvio che convoglia l’acqua verso l’esterno dell’edificio. Non ci sono compluvi interni da attraversare, e il piano di copertura resta libero per i sistemi sprinkler.',
      specs: ['PENDENZA — da catalogo', 'SEZIONE DI SCARICO — da verifica geometra'],
    },
    {
      id: 'coibente',
      x: 79.7,
      y: 39.5,
      titolo: 'Coibentazione',
      sommario: 'L’isolamento dentro il pacchetto.',
      descrizione:
        'Lo strato isolante è parte del pacchetto di copertura, non un’aggiunta successiva. La stratigrafia si definisce in funzione delle prestazioni richieste dal progetto.',
      specs: ['STRATIGRAFIA — da catalogo', 'SPESSORE — da verifica geometra'],
    },
    {
      id: 'trave',
      x: 85.8,
      y: 52.9,
      titolo: 'Trave a “I”',
      sommario: 'Dove il tegolo appoggia.',
      descrizione:
        'Le travi precompresse per impieghi centrali, disponibili in altezze da 90 a 235 cm. Ai bordi si usano travi a “L” o a “U”, quest’ultima quando serve un invaso ampio per le acque.',
      specs: ['ALTEZZA TRAVE — 90 · 110 · 140 · 180 · 235 cm'],
    },
    {
      id: 'pilastro',
      x: 85.8,
      y: 75.7,
      titolo: 'Pilastro con armatubo',
      sommario: 'Il collegamento a terra.',
      descrizione:
        'Pilastri di sezione adeguata, con mensole per impalcati o carroponte dove il progetto le richiede, e sistema armatubo per il collegamento.',
      specs: ['SEZIONE PILASTRO — da catalogo', 'TIPO DI COLLEGAMENTO — da progetto'],
    },
  ],
};

/* ========================================================================
   BACACIER
   ======================================================================== */
const bacacier: SchedaTecnica = {
  slug: 'bacacier',
  nome: 'Bacacier',
  eyebrow: 'Soluzioni · Coperture',
  claim: 'Grandi luci libere, pochi pilastri in mezzo.',
  meta: 'Bacacier, copertura per edifici logistici a grande luce: travi a “I”, arcarecci precompressi, lamiera grecata, pendenza 4%, nodi sismici certificati.',
  lead:
    'La risposta Moioli per edifici logistici a grande luce libera. Struttura in pilastri, travi principali a “I”, arcarecci e canali in cemento armato precompresso, con copertura in lamiera grecata.',

  identita: {
    titolo: 'Lo spazio libero è il prodotto.',
    paragrafi: [
      'In un edificio logistico il vincolo non è coprire: è coprire lasciando il pavimento sgombro. Ogni pilastro interno è una scaffalatura che non si può mettere, un corridoio che deve girare, un muletto che rallenta.',
      'Bacacier riduce al minimo i pilastri interni. La maglia strutturale non è fissa: si dimensiona in funzione di quello che l’edificio deve contenere.',
    ],
  },

  caratteristiche: [
    { titolo: 'Numero ridotto di pilastri interni', testo: 'La maglia si dimensiona sulle necessità del layout, non il contrario.' },
    { titolo: 'Nodi e vincoli sismici certificati', testo: 'I collegamenti fra gli elementi sono oggetto di certificazione.' },
    { titolo: 'Copertura in lamiera grecata', testo: 'Integrabile con isolamento, lucernari e impianti fotovoltaici.' },
    { titolo: 'Resistenza al fuoco estesa', testo: 'Da R60′ e R90′ fino a R120′, estendibile a R180′.' },
  ],

  dati: {
    titolo: 'I numeri della copertura.',
    voci: [
      { label: 'Maglia strutturale', valore: 'a seconda della necessità' },
      { label: 'Altezza trave “I”', valore: '90 · 110 · 140 · 180 · 235', unita: 'cm' },
      { label: 'Altezza arcareccio', valore: '56 · 66 · 86 · 96', unita: 'cm' },
      { label: 'Pendenza copertura', valore: '4', unita: '%' },
      { label: 'Resistenza al fuoco', valore: 'da R60′ e R90′ a R120′', nota: 'estendibile fino a R180′' },
      { label: 'Nodi sismici', valore: 'certificati' },
    ],
    nota: 'Misure indicate in centimetri. Fonte: catalogo Bacacier.',
  },

  sistema: {
    titolo: 'Ogni configurazione, una risposta.',
    intro: 'Un sistema di elementi precompressi, tutti prodotti nello stabilimento di Bagnatica.',
    componenti: [
      { nome: 'Pilastri in c.a.v.', testo: 'In cemento armato vibrato, con sistema armatubo per il collegamento.' },
      { nome: 'Travi centrali a “I”', testo: 'Le travi principali. Altezze da 90 a 235 cm.' },
      { nome: 'Travi a “U” laterali', testo: 'Elemento di bordo con invaso, per la raccolta delle acque.' },
      { nome: 'Arcarecci precompressi', testo: 'Elementi secondari appoggiati sulle travi. Altezze da 56 a 96 cm.' },
      { nome: 'Copertura in lamiera grecata', testo: 'Integrabile con isolamento, lucernari e impianti fotovoltaici.' },
    ],
  },

  sezione: {
    titolo: 'I punti che contano.',
    intro: 'Sezione trasversale della copertura. Seleziona un punto per vedere come è risolto.',
  },

  applicazioni: [
    { num: '01', titolo: 'Poli logistici', testo: 'Grandi superfici con il minimo di ostacoli a terra.' },
    { num: '02', titolo: 'Magazzini automatizzati', testo: 'Dove il layout delle scaffalature detta la maglia strutturale.' },
    { num: '03', titolo: 'Edifici industriali', testo: 'Capannoni a grande luce con copertura leggera.' },
    { num: '04', titolo: 'Coperture fotovoltaiche', testo: 'La lamiera grecata accoglie i sistemi captanti.' },
  ],

  hotspots: [
    {
      id: 'lamiera',
      x: 23.3,
      y: 45.1,
      titolo: 'Copertura in lamiera grecata',
      sommario: 'Il manto leggero sopra la struttura.',
      descrizione:
        'La copertura è in lamiera grecata, integrabile con lo strato isolante, i lucernari e gli impianti fotovoltaici. È la parte che rende leggero il pacchetto e permette di allargare la maglia sottostante.',
      specs: ['STRATIGRAFIA — da catalogo', 'SPESSORE ISOLANTE — da verifica geometra'],
    },
    {
      id: 'arcareccio',
      x: 51.7,
      y: 46.4,
      titolo: 'Arcareccio',
      sommario: 'L’elemento secondario che regge il manto.',
      descrizione:
        'Gli arcarecci precompressi corrono fra una trave e l’altra e sostengono la lamiera. L’altezza si sceglie fra 56, 66, 86 e 96 cm in funzione della campata.',
      specs: ['ALTEZZA ARCARECCIO — 56 · 66 · 86 · 96 cm'],
    },
    {
      id: 'pendenza',
      x: 66.7,
      y: 38.1,
      titolo: 'Pendenza del 4%',
      sommario: 'Lo scarico delle acque.',
      descrizione:
        'La copertura ha pendenza del 4% verso i canali di raccolta. Non è una pendenza da creare in opera: è nella geometria degli elementi.',
      specs: ['PENDENZA — 4%'],
    },
    {
      id: 'trave',
      x: 35,
      y: 54.7,
      titolo: 'Trave principale a “I”',
      sommario: 'La struttura portante della campata.',
      descrizione:
        'Le travi a “I” in cemento armato precompresso reggono gli arcarecci. Altezze da 90 a 235 cm: è la scelta che determina quanto può essere ampia la maglia e quindi quanti pilastri restano a terra.',
      specs: ['ALTEZZA TRAVE — 90 · 110 · 140 · 180 · 235 cm', 'LUCE — da verifica geometra'],
    },
    {
      id: 'nodo',
      x: 83.3,
      y: 51.4,
      titolo: 'Nodo trave–pilastro',
      sommario: 'Il collegamento certificato.',
      descrizione:
        'I nodi e i vincoli sismici del sistema sono oggetto di certificazione. È il punto su cui un progettista si sofferma per primo in zona sismica.',
      specs: ['NODI SISMICI — certificati', 'CLASSIFICAZIONE — da verifica geometra'],
    },
    {
      id: 'pilastro',
      x: 14.2,
      y: 75.7,
      titolo: 'Pilastro in c.a.v.',
      sommario: 'Il collegamento a terra.',
      descrizione:
        'Pilastri in cemento armato vibrato con sistema armatubo. La maglia — quanti e quanto distanti — si dimensiona in funzione delle necessità dell’edificio.',
      specs: ['SEZIONE PILASTRO — da catalogo', 'MAGLIA — a seconda della necessità'],
    },
  ],
};

/* ========================================================================
   DOPPIA FALDA
   ======================================================================== */
const doppiaFalda: SchedaTecnica = {
  slug: 'doppia-falda',
  nome: 'Doppia falda',
  alias: 'Trave a doppia pendenza',
  eyebrow: 'Soluzioni · Coperture',
  claim: 'La geometria più collaudata, fino a 40 metri di luce.',
  meta: 'Doppia falda: la struttura prefabbricata Moioli più diffusa. Luci libere fino a 40 metri, pendenza 10%, resistenza al fuoco fino a R180′.',
  lead:
    'La soluzione più diffusa per edifici industriali, commerciali e logistici. Semplice nella configurazione geometrica, resta attuale per la flessibilità progettuale e la versatilità di utilizzo.',

  identita: {
    titolo: 'Non è vecchia: è risolta.',
    paragrafi: [
      'La doppia falda è la forma che tutti riconoscono come capannone, e c’è un motivo: funziona. La trave a doppia pendenza porta la copertura fino a quaranta metri di luce libera senza appoggi intermedi, e la pendenza del 10% smaltisce l’acqua senza che nessuno debba pensarci.',
      'La semplicità è anche flessibilità: sopra la trave ci si mette quello che serve — tegoli “TT”, Stegos, lucernari in falda, shed semplice o doppio.',
    ],
  },

  caratteristiche: [
    { titolo: 'Luci libere fino a 40 metri', testo: 'Nessun appoggio intermedio sulla campata principale.' },
    { titolo: 'Pendenza integrata del 10%', testo: 'Lo smaltimento è nella geometria della trave, non nel pacchetto.' },
    { titolo: 'Compatibile con lucernari e shed', testo: 'Lucernari in falda, shed semplice e doppio, inserti fotovoltaici.' },
    { titolo: 'Portata non penalizzata dal fuoco', testo: 'R90′, R120′ e R180′ senza riduzione di portata.' },
  ],

  dati: {
    titolo: 'I numeri della struttura.',
    voci: [
      { label: 'Luci libere', valore: 'fino a 40', unita: 'm' },
      { label: 'Pendenza copertura', valore: '10', unita: '%' },
      { label: 'Altezza trave', valore: 'variabile' },
      { label: 'Resistenza al fuoco', valore: 'da R60′ e R90′ a R120′', nota: 'estendibile fino a R180′' },
      { label: 'Nodi sismici', valore: 'certificati' },
    ],
    nota: 'Misure indicate in centimetri salvo diversa indicazione. Fonte: catalogo Doppia falda.',
  },

  sistema: {
    titolo: 'Gli elementi del sistema.',
    intro: 'La trave a doppia pendenza è il pezzo che dà il nome al sistema, ma non è l’unico.',
    componenti: [
      { nome: 'Trave a doppia pendenza', testo: 'L’elemento portante principale, con la pendenza del 10% nella propria geometria.' },
      { nome: 'Pilastri in c.a.v.', testo: 'Con sistema armatubo, mensole per soppalchi e mensole per carroponte dove servono.' },
      { nome: 'Tegoli “TT” e Stegos', testo: 'Gli elementi di copertura posati sulla trave.' },
      { nome: 'Travi canale', testo: 'Perimetrali e centrali, per la raccolta e il convogliamento delle acque.' },
      { nome: 'Plinto a pozzetto', testo: 'La fondazione che riceve il pilastro.' },
    ],
  },

  sezione: {
    titolo: 'I punti che contano.',
    intro: 'Sezione trasversale della struttura. Seleziona un punto per vedere come è risolto.',
  },

  applicazioni: [
    { num: '01', titolo: 'Edifici industriali', testo: 'La configurazione più diffusa per la produzione.' },
    { num: '02', titolo: 'Poli logistici', testo: 'Grandi luci libere con geometria semplice.' },
    { num: '03', titolo: 'Edifici commerciali', testo: 'Dove serve superficie coperta senza vincoli di layout.' },
    { num: '04', titolo: 'Capannoni con carroponte', testo: 'I pilastri possono ricevere le mensole di scorrimento.' },
  ],

  hotspots: [
    {
      id: 'colmo',
      x: 50,
      y: 40.6,
      titolo: 'Colmo',
      sommario: 'Il punto alto della trave.',
      descrizione:
        'Dal colmo le due falde scendono con pendenza del 10% verso i bordi. È la geometria che dà il nome al sistema e che rende lo smaltimento delle acque un fatto strutturale invece che un problema di pacchetto.',
      specs: ['ALTEZZA AL COLMO — da catalogo'],
    },
    {
      id: 'tegolo',
      x: 30,
      y: 44,
      titolo: 'Elemento di copertura',
      sommario: 'Tegoli “TT” oppure Stegos.',
      descrizione:
        'Sulla trave si posano gli elementi di copertura: tegoli a doppio “TT” o elementi Stegos, secondo il progetto. È qui che si decide se e come entra la luce naturale.',
      specs: ['TIPO ELEMENTO — da progetto', 'LUCE NETTA — da catalogo'],
    },
    {
      id: 'trave',
      x: 66.7,
      y: 54.3,
      titolo: 'Trave a doppia pendenza',
      sommario: 'La campata, fino a 40 metri.',
      descrizione:
        'L’elemento portante principale copre luci libere fino a quaranta metri senza appoggi intermedi. L’altezza è variabile e si dimensiona sulla luce e sui carichi di progetto.',
      specs: ['LUCE LIBERA — fino a 40 m', 'ALTEZZA TRAVE — variabile'],
    },
    {
      id: 'gronda',
      x: 10.6,
      y: 54.3,
      titolo: 'Trave canale',
      sommario: 'La raccolta delle acque al bordo.',
      descrizione:
        'Le travi canale, perimetrali e centrali, raccolgono l’acqua che scende dalle falde e la convogliano ai pluviali.',
      specs: ['SEZIONE CANALE — da catalogo', 'PENDENZA — 10%'],
    },
    {
      id: 'mensola',
      x: 81.5,
      y: 68.3,
      titolo: 'Mensola',
      sommario: 'Per soppalchi e carroponte.',
      descrizione:
        'Il pilastro può portare mensole per gli impalcati intermedi o per lo scorrimento del carroponte. Si prevedono in fase di progetto: aggiungerle dopo significa intervenire sulla struttura.',
      specs: ['PORTATA MENSOLA — da verifica geometra'],
    },
    {
      id: 'plinto',
      x: 14.2,
      y: 90.6,
      titolo: 'Plinto a pozzetto',
      sommario: 'La fondazione che riceve il pilastro.',
      descrizione:
        'Il pilastro si incastra nel plinto a pozzetto. È il nodo che trasferisce a terra i carichi della struttura, ed è oggetto di certificazione sismica.',
      specs: ['DIMENSIONI PLINTO — da verifica geometra', 'NODI SISMICI — certificati'],
    },
  ],
};

/* ========================================================================
   TEGOLO TT — copertura piana a tegoli
   ======================================================================== */
const tegoloTT: SchedaTecnica = {
  slug: 'tegolo-tt',
  nome: 'Tegolo TT',
  alias: 'Copertura piana a tegoli “TT”',
  eyebrow: 'Soluzioni · Solai e coperture',
  claim: 'Più livelli, fino a 33 metri di luce.',
  meta: 'Tegolo TT: sistema mono e pluripiano Moioli per centri commerciali e direzionali. Luce netta fino a 33 m, altezza tegolo da 35 a 100 cm.',
  lead:
    'Il sistema mono e pluripiano “TT” è la soluzione per edifici prefabbricati su più livelli: centri commerciali, edifici polivalenti e direzionali.',

  identita: {
    titolo: 'Quando l’edificio cresce in altezza.',
    paragrafi: [
      'Il tegolo a doppio “TT” è un elemento di solaio prima ancora che di copertura. Regge carichi importanti su luci fino a trentatré metri, e questo permette di impilare i livelli senza riempire i piani di pilastri.',
      'È la soluzione degli edifici che devono reggere il confronto anche esteticamente: centri commerciali, direzionali, polivalenti.',
    ],
  },

  caratteristiche: [
    { titolo: 'Grandi luci libere', testo: 'Fino a 33 metri senza appoggi intermedi.' },
    { titolo: 'Elevata capacità portante', testo: 'Nasce come elemento di solaio, non solo di copertura.' },
    { titolo: 'Flessibilità compositiva', testo: 'Struttura su più livelli di solaio, mono e pluripiano.' },
    { titolo: 'Nodi sismici certificati', testo: 'I collegamenti fra gli elementi sono oggetto di certificazione.' },
  ],

  dati: {
    titolo: 'I numeri dell’elemento.',
    voci: [
      { label: 'Luce netta massima', valore: '33', unita: 'm' },
      { label: 'Larghezza modulo', valore: '250', unita: 'cm' },
      { label: 'Altezza tegolo', valore: '35 · 45 · 55 · 65 · 75 · 85 · 95 · 100', unita: 'cm' },
      { label: 'Spessore gamba nervatura', valore: '9 · 15 · 20', unita: 'cm' },
      { label: 'Resistenza al fuoco', valore: 'da R90′ a R120′', nota: 'estendibile fino a R180′' },
    ],
    nota: 'Misure indicate in centimetri salvo diversa indicazione. Fonte: catalogo Copertura piana a tegoli “TT”.',
  },

  sistema: {
    titolo: 'Gli elementi del sistema.',
    intro: 'Un sistema pensato per impilarsi: le travi ricevono i tegoli, i pilastri attraversano i livelli.',
    componenti: [
      { nome: 'Tegolo a doppio “TT”', testo: 'L’elemento di solaio e copertura. Altezze da 35 a 100 cm, modulo da 250 cm.' },
      { nome: 'Pilastri monolitici', testo: 'Attraversano i livelli senza interruzione, riducendo i nodi.' },
      { nome: 'Travi principali a “T”', testo: 'Per gli impieghi centrali.' },
      { nome: 'Travi secondarie a “L”', testo: 'Per gli impieghi laterali e di bordo.' },
    ],
  },

  sezione: {
    titolo: 'I punti che contano.',
    intro: 'Sezione trasversale del solaio. Seleziona un punto per vedere come è risolto.',
  },

  applicazioni: [
    { num: '01', titolo: 'Centri commerciali', testo: 'Grandi luci su più livelli, senza pilastri in mezzo alle superfici di vendita.' },
    { num: '02', titolo: 'Edifici direzionali', testo: 'Dove la struttura deve reggere anche il confronto estetico.' },
    { num: '03', titolo: 'Edifici polivalenti', testo: 'Destinazioni d’uso che possono cambiare nel tempo.' },
    { num: '04', titolo: 'Edifici pluripiano', testo: 'Il tegolo lavora come solaio intermedio, non solo come copertura.' },
  ],

  hotspots: [
    {
      id: 'getto',
      x: 33.3,
      y: 26.7,
      titolo: 'Piano di calpestio',
      sommario: 'La superficie finita sopra il tegolo.',
      descrizione:
        'Sull’estradosso del tegolo si realizza il piano di calpestio, che rende continua la superficie fra un elemento e il successivo. È quello che permette al tegolo di lavorare come solaio.',
      specs: ['SPESSORE GETTO — da catalogo'],
    },
    {
      id: 'nervatura',
      x: 45.1,
      y: 35.7,
      titolo: 'Nervature',
      sommario: 'Le due gambe del doppio “TT”.',
      descrizione:
        'Le due nervature sono la parte che porta: scendono sotto il piano e danno all’elemento l’altezza strutturale necessaria per coprire la luce. Lo spessore si sceglie fra 9, 15 e 20 cm.',
      specs: ['SPESSORE GAMBA — 9 · 15 · 20 cm', 'ALTEZZA TEGOLO — da 35 a 100 cm'],
    },
    {
      id: 'trave',
      x: 85.5,
      y: 34.3,
      titolo: 'Travi a “L” e “T”',
      sommario: 'Dove il tegolo appoggia.',
      descrizione:
        'Le travi principali a “T” per gli impieghi centrali ricevono i tegoli su entrambi i lati. Ai bordi si usano travi a “L”, che appoggiano da un lato solo.',
      specs: ['LUNGHEZZA APPOGGIO — da catalogo', 'CARICO — da verifica geometra'],
    },
    {
      id: 'pilastro',
      x: 14.7,
      y: 48.6,
      titolo: 'Pilastro monolitico',
      sommario: 'Attraversa i livelli senza interruzione.',
      descrizione:
        'Il pilastro è monolitico: non si interrompe a ogni piano. Meno nodi significa meno punti critici in zona sismica e un montaggio più rapido.',
      specs: ['SEZIONE PILASTRO — da catalogo', 'NUMERO LIVELLI — da progetto'],
    },
    {
      id: 'livello',
      x: 33.3,
      y: 59.6,
      titolo: 'Solaio intermedio',
      sommario: 'Lo stesso elemento, un piano più in basso.',
      descrizione:
        'Il sistema si ripete in altezza: lo stesso tegolo che copre è quello che divide i livelli. È il motivo per cui la stessa linea di produzione serve tutto l’edificio.',
      specs: ['INTERPIANO — da progetto'],
    },
    {
      id: 'luce',
      x: 50,
      y: 88,
      titolo: 'Luce netta',
      sommario: 'Quanto spazio resta libero sotto.',
      descrizione:
        'Il tegolo copre luci fino a trentatré metri senza appoggi intermedi. È la misura che decide quanti pilastri restano in mezzo alla superficie di vendita o all’ufficio.',
      specs: ['LUCE NETTA MASSIMA — 33 m'],
    },
  ],
};

/* ======================================================================== */

export const schedeTecniche: SchedaTecnica[] = [
  tecnowing,
  bacacier,
  doppiaFalda,
  tegoloTT,
];

export const getScheda = (slug: string) => schedeTecniche.find((s) => s.slug === slug);
