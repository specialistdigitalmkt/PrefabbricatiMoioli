# Configuratore 3D Tecnowing — dove sta e come è collegato

Le versioni sono **due**, e servono due pagine diverse.

| file in `modelli3d/` | servito da | usato da |
| --- | --- | --- |
| `tecnowing-viewer.html` | `public/soluzioni/tecnowing/configuratore-3d/index.html` | `/soluzioni/tecnowing` |
| `tecnowing-viewer-fasce.html` | `public/soluzioni/tecnowing/configuratore-3d-fasce/index.html` | `/soluzioni/tecnowing-3d` |

Il file in `modelli3d/` e la sua copia in `public/` devono restare identici.
Per l'originale la copia è a mano:

```bash
cp modelli3d/tecnowing-viewer.html public/soluzioni/tecnowing/configuratore-3d/index.html
```

Per la variante a fasce no: la fa lo script che la genera, qui sotto.

## La variante «a fasce»

`tecnowing-viewer-fasce.html` **non è una seconda esportazione**: è
`tecnowing-viewer.html` riscritto da uno script, perché la versione originale
resti intoccata sotto la scheda corrente. Lo script tocca due cose: il markup
dell'app, che sta nel template, e il modulo `tecnowing-scene.js`, che sta nel
manifest delle risorse — gzippato e in base64. Quest'ultimo viene decompresso,
riscritto come testo e ricompresso.

Cosa cambia:

- **I pannelli non stanno più sul modello.** L'app passa da pannelli bianchi
  in `position:absolute` sopra il canvas a una griglia di tre colonne:
  fascia sinistra (componenti e scheda elemento) · modello · fascia destra
  (interposto e configurazione), con testata e piede a tutta larghezza. Le
  fasce sono blu come il resto della pagina, quindi la banda del sito e
  l'interfaccia del visualizzatore sono una cosa sola.
- **Il modello gira da solo** all'apertura (`autorotate` su `three-d-stage`)
  e si ferma al primo gesto: il trascinamento lo spegne dai controlli, ogni
  comando dei pannelli chiama `stopSpin()`. Non riparte più.
- **Le inquadrature si ricalcolano** invece di essere punti fissi. Delle
  viste da fuori si tiene solo la direzione: il bersaglio diventa il centro
  di ciò che è acceso in quel momento (`visibleBox` — in sezione tre quarti
  dei tegoli sono nascosti) e la distanza si trova a tentativi, proiettando
  gli spigoli dell'ingombro e correggendo finché non stanno dentro
  (`frame`). Il campo visivo passa da 45° a 30°: a 45 l'estremità vicina
  dell'edificio pesa tanto più della lontana che il modello, pur centrato,
  si legge spostato di lato. La vista dall'interno resta a mano, e a 45°.
- **Sotto i 1000px** le tre colonne diventano una pila — modello, viste,
  configuratore, componenti — e l'elenco componenti parte chiuso, per non
  rubare al modello una riga intera. Lì la cella del modello è alta poco più
  di 270 px su un telefono vero: un edificio lungo visto in assonometria ci
  sta dentro minuscolo, quindi **la vista di partenza è la sezione**, che la
  riempie. Da quando la vista la sceglie chi guarda (`viewScelta`), il
  passaggio di soglia non gliela cambia più sotto le mani.
- **Il taglio della sezione sta fuori da `setView`** (`applySection`).
  `setInterposto` ricostruisce da capo interposto, serramenti, fotovoltaico e
  bordo falda, e i pezzi nuovi nascono tutti visibili: senza rifare il taglio,
  cambiare interposto faceva ricomparire il tetto intero mentre la vista era
  ancora la sezione. Il cambio pannello rifà anche l'inquadratura
  (`refit`), ma tenendo la direzione in cui si sta guardando: lo Shed alza il
  tetto e la coppella lo ingrossa, e senza aggiornare centro e distanza il
  modello scivolava fuori campo. L'angolo scelto da chi guarda resta.

- **I tamponamenti sono rifatti.** L'involucro parte da mezzo pilastro oltre
  il filo di griglia, non dal filo: i pilastri sono i pezzi più esterni della
  struttura e con i pannelli sul filo restavano davanti, in vista. Le facciate
  lunghe girano l'angolo e le testate ci si appoggiano dentro, così sparisce
  la fessura di spigolo. Dietro i pannelli corre una lastra continua: senza,
  le fughe sarebbero buchi aperti sul capannone. Modulo 250 nei due versi,
  tre posature — `setTamponamenti('verticali' | 'orizzontali' | 'misto')`:
  verticali sono pannelli alti tutta la facciata, orizzontali sono corsi da
  250 interrotti sui pilastri (dove un pannello orizzontale trova appoggio),
  misto è lati lunghi verticali e testate orizzontali. Con i pannelli accesi
  i plinti spariscono: stanno sotto quota ma sono larghi 150 e sporgevano di
  8 cm oltre l'involucro. In sezione il tamponamento della facciata vicina
  non si disegna, o il taglio sarebbe un muro grigio e basta.

### Come si rigenera

```bash
python3 scripts/build-tecnowing-fasce.py
```

Scrive `modelli3d/tecnowing-viewer-fasce.html` e ne mette la copia in
`public/`. **La modifica non si fa a mano**: il markup dell'app vive dentro
`<script type="__bundler/template">` come una stringa JSON su una riga sola,
con ogni `</` scritto `<\u002F` — una riga da 36 000 caratteri che un editor
rompe al primo a capo. Lo script la decodifica, la modifica e la ricodifica.

Quando arriva una nuova esportazione del configuratore, si sostituisce
`tecnowing-viewer.html` e si rilancia lo script: **non** si ritocca il file a
fasce. Ogni sostituzione dichiara quante occorrenze si aspetta, quindi se
l'esportazione ha cambiato un pezzo lo script si ferma dicendo quale, invece
di produrre in silenzio un file rotto.

Questo promemoria sta in `modelli3d/` e non accanto al file servito, perché
tutto ciò che entra in `public/` finisce in `dist/` ed è raggiungibile dal web:
una nota interna non deve essere pubblicabile.

## Perché in `public/` e non in `src/pages/`

Il file è un documento completo e autosufficiente: ha `<!doctype>`, la sua
testa, i suoi font e le sue librerie (three.js, React) incorporate in base64.

Astro copia `public/` in `dist/` **senza toccarla**. È l'unico modo per farlo
arrivare intatto:

- in `src/pages/` Vite proverebbe a risolvere `<script src="1700f770-…">` —
  un percorso che è un UUID, non un file — e **il build fallirebbe**;
- `compressHTML: true` riscriverebbe il markup, e dentro c'è uno script
  `__bundler/template` il cui contenuto è una stringa JSON esatta: riscriverlo
  significa romperlo.

Per la stessa ragione qui non si applica niente del sistema del sito: né
`BaseLayout`, né i token, né i font locali di `public/fonts`. La pagina se li
porta dentro.

## Chi lo usa

Due pagine, in due modi diversi.

**`/soluzioni/tecnowing`** — la scheda corrente, generata da
`src/pages/soluzioni/[slug].astro`. Il blocco centrale resta il disegno in
sezione con i sei punti; il modello è un rimando che apre una scheda nuova.
Il collegamento non è scritto nel markup: è il campo `modello3d` in
`src/data/soluzioni-tecniche.ts`. Toglierlo spegne il rimando, darlo a
un'altra scheda lo accende lì.

**`/soluzioni/tecnowing-3d`** — la variante in valutazione,
`src/pages/soluzioni/tecnowing-3d.astro`, che usa la versione **a fasce**.
Qui il modello **prende il posto** del disegno e dei sei punti: sta in una
banda che tocca i due bordi della pagina e alta quanto lo schermo meno la
testata fissa, con `loading="lazy"` perché i suoi megabyte non partano
all'apertura della pagina. È `noindex` e fuori dalla sitemap finché è una
prova.

**Se `index.html` non è al suo posto, l'iframe resta vuoto e il rimando dà
404.**

## Da sapere

- **Pesa ~950 KB** e porta dentro three.js e React, mentre il resto del sito
  non spedisce framework. È il motivo per cui sta fuori dalle pagine.
- **È responsivo**: il contenitore è fluido e `three-d-stage` ha un
  `ResizeObserver`, quindi il canvas si ridimensiona invece di essere scalato.
  Nella versione originale, sotto gli 820 px i pannelli si spostano sopra e
  sotto il modello; in quella a fasce la soglia è 1000 px e le colonne
  diventano righe. Entrambe hanno regole per il telefono, anche in
  orizzontale.
- **Fuori dalla sitemap**, e va bene così: è uno strumento, non un contenuto
  da indicizzare. Non ha canonical né Open Graph.
- I dati che mostra (modulo 250 cm, R90′–R120′, altezze travi) vanno
  confrontati con la tabella della scheda, che resta la fonte unica.
