# Configuratore 3D Tecnowing — dove sta e come è collegato

Il documento esportato dal configuratore è
`modelli3d/tecnowing-viewer.html`. La copia che il sito serve è la stessa, in:

```
public/soluzioni/tecnowing/configuratore-3d/index.html
```

Le due devono restare identiche: quando arriva una nuova esportazione,
si sostituisce quella in `modelli3d/` e si ricopia.

```bash
cp modelli3d/tecnowing-viewer.html public/soluzioni/tecnowing/configuratore-3d/index.html
```

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
`src/pages/soluzioni/tecnowing-3d.astro`. Qui il modello **prende il posto**
del disegno e dei sei punti: sta in un iframe alto quasi quanto lo schermo,
con `loading="lazy"` perché i suoi megabyte non partano all'apertura della
pagina. È `noindex` e fuori dalla sitemap finché è una prova.

**Se `index.html` non è al suo posto, l'iframe resta vuoto e il rimando dà
404.**

## Da sapere

- **Pesa ~950 KB** e porta dentro three.js e React, mentre il resto del sito
  non spedisce framework. È il motivo per cui sta fuori dalle pagine.
- **È responsivo**: il contenitore è fluido e `three-d-stage` ha un
  `ResizeObserver`, quindi il canvas si ridimensiona invece di essere scalato.
  Sotto gli 820 px i pannelli si spostano sopra e sotto il modello; ci sono
  regole fino a 520 px e per il telefono in orizzontale.
- **Fuori dalla sitemap**, e va bene così: è uno strumento, non un contenuto
  da indicizzare. Non ha canonical né Open Graph.
- I dati che mostra (modulo 250 cm, R90′–R120′, altezze travi) vanno
  confrontati con la tabella della scheda, che resta la fonte unica.
