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
resti intoccata sotto la scheda corrente. Lo script tocca solo il markup
dell'app, che sta nel template. Il modulo della scena (`tecnowing-scene.js`)
non lo tocca più: le posature dei tamponamenti, che prima aggiungeva lui,
dall'esportazione di settembre 2026 ci sono già.

Cosa cambia:

- **Da 821 px in su i pannelli non stanno più sul modello.** L'app passa a
  una griglia di tre colonne: fascia sinistra (componenti e scheda elemento)
  · modello · fascia destra (interposto, tamponamento, configurazione), con
  testata e piede a tutta larghezza. Le fasce sono blu come il resto della
  pagina, quindi la banda del sito e l'interfaccia del visualizzatore sono
  una cosa sola. I pannelli nascono in `position:absolute` e lo script non
  toglie quelle misure: le scavalca con `!important` dentro la media query.
  I colori passano per variabili `--f-*`, definite solo sulle fasce, con il
  colore originale come ripiego.
- **Sotto gli 821 px, e sul telefono sdraiato, niente fasce**: resta
  l'impaginazione dell'esportazione, con i fogli bianchi richiamati dalla
  barra schede in fondo. La condizione è l'opposto esatto di `MOBILE` nel
  componente; se l'esportazione la cambia, va cambiata anche nello script.
- **Il modello gira da solo** all'apertura (lo fa già l'esportazione) e si
  ferma al primo gesto: il trascinamento lo spegne dai controlli, e qui anche
  ogni comando dei pannelli, con `stopSpin()`. Non riparte più.
- **Le inquadrature si stringono sul volume visibile, ovunque.**
  L'esportazione lo fa solo su telefono e su schermo largo tiene i punti di
  vista composti per l'iPad; fra le due fasce la cella è quasi quadrata e il
  modello finiva piccolo e di lato. Qui `frameFor` mira sempre al centro di
  ciò che è acceso e arretra quanto basta. Il campo visivo delle viste da
  fuori è 30° invece di 45°: a 45 l'estremità vicina dell'edificio pesa tanto
  più della lontana che il modello, pur centrato, si legge spostato di lato.
  Dall'interno restano i 45° e il punto di vista a mano. Cambiare interposto,
  configurazione, posa o un livello rifà l'inquadratura tenendo l'angolo di
  chi guarda; lo stesso quando la cella cambia misura (`ResizeObserver`).
- **Il taglio della sezione si rifà** dopo `setInterposto` e
  `setTamponamenti`: ricostruiscono i pezzi da capo e i pezzi nuovi nascono
  visibili, quindi il tetto ricompariva intero mentre la vista era ancora la
  sezione. In sezione il tamponamento della facciata vicina (nord) non si
  disegna, o il taglio sarebbe un muro grigio e basta.
- **La scheda elemento a tutto pannello** resta solo nei fogli: nella fascia
  la colonna è alta quanto lo schermo e lista e scheda ci stanno insieme.

### Come si rigenera

```bash
python3 scripts/build-tecnowing-fasce.py
```

Scrive `modelli3d/tecnowing-viewer-fasce.html` e ne mette la copia in
`public/`. **La modifica non si fa a mano**: il markup dell'app vive dentro
`<script type="__bundler/template">` come una stringa JSON su una riga sola,
con ogni `</` scritto `<\u002F` — una riga da 54 000 caratteri che un editor
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
  Sotto gli 820 px, e sul telefono sdraiato, entrambe le versioni passano ai
  fogli richiamati da una barra schede; sopra, l'originale tiene i pannelli
  sul modello e quella a fasce li mette ai lati.
- **Fuori dalla sitemap**, e va bene così: è uno strumento, non un contenuto
  da indicizzare. Non ha canonical né Open Graph.
- I dati che mostra (modulo 250 cm, R90′–R120′, altezze travi) vanno
  confrontati con la tabella della scheda, che resta la fonte unica.
