# Prefabbricati Moioli — demo sito multi-pagina

Build dimostrativa per l'approvazione del cliente. Non è il sito finale.

**Documenti da leggere prima di intervenire:**
- [`DESIGN-TOKENS.md`](DESIGN-TOKENS.md) — il sistema grafico estratto dall'index esistente
- [`CONTENT-STATUS.md`](CONTENT-STATUS.md) — stato di ogni blocco di contenuto e cosa manca

---

## Avvio

```bash
npm install
```

```bash
npm run dev
```

| Comando | Cosa fa |
|---|---|
| `npm run dev` | Server di sviluppo |
| `npm run build` | Build statico in `dist/` |
| `npm run preview` | Anteprima del build |
| `npm run images` | Rigenera le derivate WebP dagli originali |
| `npm run realizzazioni` | Elabora realizzazioni e rivestimenti da `CARTELLA IMMAGINI` |
| `node scripts/fetch-fonts.mjs` | Riscarica i font in locale (solo se cambiano famiglie o pesi) |

---

## Stack

Astro in modalità statica. Nessun framework UI, nessuna libreria di animazione:
il JavaScript spedito al browser sono i pochi script inline dei componenti.
Il risultato è HTML, CSS e immagini.

La scelta di Astro rispetto al file HTML singolo di partenza serve a tre cose:
testata e piè di pagina condivisi tra sei pagine, contenuti separati dal markup,
e generazione automatica delle immagini responsive.

---

## Struttura

```
src/
├── data/            ← I CONTENUTI. Modificare qui, non nel markup.
│   ├── site.ts          dati d'impresa, menu, blocco download
│   ├── soluzioni.ts     le 7 tipologie di copertura
│   ├── progetti.ts      portfolio + scheda modello
│   ├── tecnoshed.ts     testi della pagina vetrina + punti caldi
│   └── images.json      generato da `npm run images`, non modificare a mano
├── components/
│   ├── ShedSection.astro      disegno segnaposto in sezione — sostituibile
│   ├── HotspotExplainer.astro logica dei punti caldi
│   ├── Picture.astro          immagine responsive con spazio riservato
│   ├── Header.astro / Footer.astro / PageHero.astro / Logo.astro / Breadcrumb.astro
├── layouts/BaseLayout.astro   testa SEO, dati strutturati, sistema di animazione
├── pages/                     una cartella per route
└── styles/
    ├── tokens.css      i token del sistema
    └── global.css      base e primitive riusabili
```

---

## Route

Solo queste sei. Il menu contiene solo ciò che è navigabile e finito.

| Percorso | Pagina |
|---|---|
| `/` | Home |
| `/soluzioni` | Indice delle tipologie |
| `/soluzioni/tecnoshed` | Pagina vetrina |
| `/soluzioni/stegos` | Scheda prodotto |
| `/soluzioni/rivestimenti` | Campionario delle finiture di facciata |
| `/progetti` | Le 25 realizzazioni fotografate |
| `/progetti/[slug]` | Scheda di ogni realizzazione, con galleria |
| `/azienda` | Profilo aziendale |
| `/azienda/referenze` | Committenti, filtrabili per settore |
| `/azienda/riconoscimenti` | Certificazioni e network |
| `/contatti` | Modulo, dati, mappa |

**Azienda** è una sezione a tre pagine con sottomenu. Le voci si definiscono in
`src/data/site.ts` (`nav`, campo `voci`): la testata costruisce da lì il
pannello a comparsa su desktop e le voci rientrate nel menu mobile, e
`SezioneNav.astro` la barra interna alla sezione.

**Fuori perimetro, temporanea:** `/anteprima-editoriale` è una variante della
home in valutazione, non una pagina del sito. Non è nel menu, non è nella
sitemap ed è marcata `noindex`. **Va eliminata quando la direzione è decisa**,
insieme ai file `public/fonts/archivo-*` e alla riga corrispondente in
`scripts/fetch-fonts.mjs`.

---

## Modificare i contenuti

**Un testo:** `src/data/*.ts`. Il markup non va toccato.

**Un punto caldo del disegno in sezione:** `src/data/tecnoshed.ts`, array
`hotspots`. Aggiungerne, toglierne o spostarne uno è una modifica di contenuto.
`x` e `y` sono percentuali del viewBox del disegno (1200 × 700).

**Un disegno in sezione:** sostituire il contenuto di
`src/components/ShedSection.astro` (Tecnoshed) o `StegosSection.astro` (Stegos)
mantenendo `viewBox="0 0 1200 700"` e l'orientamento. Nessuna logica dipende
dall'SVG.

**Una nuova sezione interattiva:** `HotspotExplainer.astro` è generico — riceve
i punti caldi come dato e il disegno come contenuto:

```
<HotspotExplainer hotspots={hotspots} intro="…">
  <MioDisegno />
</HotspotExplainer>
```

**Dai cataloghi PDF si prendono solo le informazioni, non le immagini.**
I disegni non vengono riprodotti in pagina.

**Le immagini:** aggiungere una voce al `MANIFEST` in
`scripts/build-images.mjs`, poi `npm run images`. Gli originali in
`../moioli-site/assets` non vengono mai modificati; i `.TIF` sono esclusi.

---

## Pubblicazione su Vercel

Il progetto è pronto: `vercel.json` definisce build, intestazioni di cache e
sicurezza. Il build è **autonomo** — non serve la cartella `moioli-site` sul
server, perché immagini, font e logo sono già dentro `public/`.

Serve solo autenticarsi una volta, dalla tua macchina:

```bash
npx vercel login
```

Poi, dalla cartella `moioli-web`:

```bash
npx vercel deploy --prod
```

### L'anteprima non viene indicizzata

Finché non si imposta `SITE_URL`, il sito si pubblica **chiuso ai motori di
ricerca**: `robots.txt` restituisce `Disallow: /` e ogni risposta porta
`X-Robots-Tag: noindex`.

È voluto. La demo di un'azienda reale su un dominio provvisorio, se finisce
su Google, crea contenuti duplicati rispetto al sito vero e associa il nome
del cliente a un indirizzo che non è il suo.

### Quando si va in produzione

Due cose, nessuna delle quali si può dimenticare per sbaglio:

1. Impostare la variabile d'ambiente su Vercel:
   `SITE_URL = https://www.prefabbricatimoioli.it`
   Da sola riapre l'indicizzazione e sistema canonical, Open Graph, dati
   strutturati e sitemap.
2. Togliere il blocco `X-Robots-Tag` da `vercel.json` — è la seconda
   sicurezza, e va rimossa a mano apposta.

---

## Prima della messa online

Elenco completo in [`CONTENT-STATUS.md`](CONTENT-STATUS.md) §7. In sintesi:
disegno definitivo, dati tecnici reali, foto dei dettagli costruttivi,
collegamento del modulo e informativa privacy.

---

## Verifiche eseguite

Layout controllato a **360 · 768 · 1280 · 1920** su tutte le pagine:
nessuno scorrimento orizzontale, nessun elemento fuori dal viewport.

Accessibilità: contrasti misurati a schermo e portati sopra la soglia AA
(le correzioni sono elencate in `DESIGN-TOKENS.md` §9.2), gerarchia dei titoli
senza salti di livello, tutti gli `alt` presenti, bersagli tattili conformi,
navigazione da tastiera con focus visibile, `prefers-reduced-motion` rispettato.

Il modulo di contatto valida i campi, sposta il focus sul primo errore e mostra
lo stato di esito — **senza inviare nulla**.

Prestazioni: immagini WebP responsive con spazio riservato in pagina, quindi
scorrimento senza scatti. L'immagine di apertura è passata da 7 MB a 222 KB;
l'intera cartella delle immagini pesa 10 MB per 100 file.

**Percorso critico della home: 189 KB in 5 richieste, nessuna a terzi.**
I font sono ospitati in locale, quindi non c'è nessun foglio di stile remoto
che blocchi il rendering.

Tipografia: Space Grotesk (display) + IBM Plex Sans (corpo) + IBM Plex Mono
(segnaposto tecnici). Le icone sono tracciati vettoriali con tratto unico —
nessun carattere tipografico usato come icona.
