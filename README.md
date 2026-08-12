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
| `npm run soluzioni-foto` | Elabora le fotografie per soluzione da `CARTELLA IMMAGINI/SOLUZIONI` |
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
| `/soluzioni/[slug]` | Schede di Tecnowing, Tegolo TT, Bacacier, Doppia falda |
| `/soluzioni/rivestimenti` | Campionario delle finiture di facciata |
| `/chiavi-in-mano` | Il chiavi in mano con CMB Costruzioni |
| `/progetti` | Le 25 realizzazioni fotografate |
| `/progetti/[slug]` | Scheda di ogni realizzazione, con galleria |
| `/azienda` | Profilo aziendale |
| `/azienda/referenze` | Committenti, filtrabili per settore |
| `/azienda/riconoscimenti` | Certificazioni e network |
| `/contatti` | Modulo, dati, mappa |

**Le schede di soluzione sono di due tipi.** Tecnoshed e Stegos hanno una
pagina scritta a mano, già approvata. Le altre quattro condividono
`soluzioni/[slug].astro`, perché condividono la stessa struttura di contenuto:
una correzione di impaginazione le sistema tutte insieme. Le due forme
convivono senza conflitti — in Astro una route statica vince su una dinamica.

**Coverplan non ha pagina.** È l'unica soluzione senza materiale: né catalogo
tecnico né fotografie. Resta nell'indice come scheda con riquadro dichiarato.
Per accenderla basta darle un `href` in `src/data/soluzioni.ts` e una voce in
`src/data/soluzioni-tecniche.ts`: sitemap e collegamenti si aggiornano da sé.

**Il video della pagina chiavi in mano** è sfondo, non contenuto: muto, in
ciclo, `aria-hidden`. Non parte da solo se `prefers-reduced-motion` è attivo,
se il viewport è sotto i 760 px, o prima che la pagina abbia finito di
caricare — e in tutti e tre i casi resta il poster, quindi non manca niente.
C'è un comando di pausa perché un ciclo di 41 secondi supera i 5 oltre i quali
la WCAG 2.2.2 chiede di poterlo fermare.

Per rifare il file dal timelapse originale:

```bash
ffmpeg -i "sorgente.mp4" -map 0:v:0 -t 41 -vf "scale=1280:720" -c:v libx264 -preset veryslow -crf 35 -pix_fmt yuv420p -movflags +faststart -write_tmcd 0 public/video/chiavi-in-mano.mp4
```

`-map 0:v:0` è quello che toglie l'audio, `-write_tmcd 0` la traccia di
timecode che il muxer mp4 aggiungerebbe da sé. Il risultato pesa 4,4 MB: è
molto, ed è il motivo per cui si carica solo dove serve.

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

**Un punto caldo del disegno in sezione:** array `hotspots` in
`src/data/tecnoshed.ts`, `stegos.ts` o `soluzioni-tecniche.ts`. Aggiungerne,
toglierne o spostarne uno è una modifica di contenuto. `x` e `y` sono
percentuali del viewBox del disegno (1200 × 700).

**Un disegno in sezione:** sostituire il contenuto del file corrispondente,
mantenendo `viewBox="0 0 1200 700"` e l'orientamento. Nessuna logica dipende
dall'SVG.

| Soluzione | File |
|---|---|
| Tecnoshed | `components/ShedSection.astro` |
| Stegos | `components/StegosSection.astro` |
| Tecnowing | `components/sezioni/TecnowingSection.astro` |
| Bacacier | `components/sezioni/BacacierSection.astro` |
| Doppia falda | `components/sezioni/DoppiaFaldaSection.astro` |
| Tegolo TT | `components/sezioni/TegoloTTSection.astro` |

I quattro disegni in `sezioni/` condividono lo stile di
`src/styles/disegno.css` (classi `ln-*` per i tratti, `tx-dim` per le sigle).
I due della prima fase hanno il proprio stile scoped e sono rimasti come
stanno, per non toccare pagine già approvate.

**Tutti i disegni sono segnaposto dichiarati.** Sono schemi costruiti dalla
descrizione testuale dei cataloghi, non tavole esecutive: nessun disegno dei
PDF è riprodotto. Le quote portano l'etichetta senza il valore — i numeri
stanno nella tabella dei dati, dove si possono correggere in un posto solo.

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
