# Design tokens — Prefabbricati Moioli

**Fonte di verità:** `moioli-site/index.html` (home rifatta, blocco `:root` e CSS inline).
Tutto il sito multi-pagina usa esclusivamente questo sistema.
Implementazione: `src/styles/tokens.css`.

Ultimo aggiornamento: 29/07/2026

---

## 1. Colore

### 1.1 Navy — colore strutturale primario

| Token | Valore | Uso |
|---|---|---|
| `--navy` | `#1D2A44` | Fondo sezioni scure, titoli su fondo chiaro, bottone primario |
| `--navy-deep` | `#16203A` | Fondo preloader, menu mobile, sezione contatti, hover bottone navy |
| `--navy-ink` | `#11192E` | Footer |

### 1.2 Rosso — accento

Il sistema usa **due rossi distinti**. Non è un errore di codifica: è confermato
come identità doppia.

| Token | Valore | Uso | Vincolo |
|---|---|---|---|
| `--red-logo` | `#E42829` | **Esclusivamente il marchio** (path SVG del logo) | Mai usato per UI, testo o bordi |
| `--red` | `#B13733` | Accento UI: eyebrow, bottoni, sottolineature, marker, barra di scroll | Colore d'azione |
| `--red-deep` | `#963029` | Hover del bottone rosso | — |
| `--red-soft` | `#D98581` | Rosso su fondo scuro: eyebrow e label dentro sezioni navy | **Nuovo token.** Il valore era già usato letterale nell'index (3 occorrenze) senza essere dichiarato in `:root`. Nessun colore nuovo introdotto: solo formalizzato. |

**Perché due rossi.** `#E42829` su bianco ha un contrasto di ~4.0:1 — sotto la
soglia AA per testo normale. `#B13733` arriva a ~5.9:1. Il logo resta acceso e
riconoscibile, l'interfaccia resta leggibile. `--red-soft` esiste perché
`#B13733` su navy scende sotto 3:1 e diventa illeggibile.

### 1.3 Neutri

| Token | Valore | Uso | Contrasto |
|---|---|---|---|
| `--bg1` | `#F5F6F7` | Fondo pagina, sezioni chiare alternate | — |
| `--bg2` | `#E1E3E5` | Bordi, separatori, contorno `sec-num` | — |
| `--white` | `#FFFFFF` | Card, sezioni bianche | — |
| `--text` | `#3B3F45` | Testo corrente | 9.79:1 su `--bg1` |
| `--text-2` | `#686F79` | **Nuovo.** Testo secondario: etichette, note, breadcrumb | 5.07:1 su bianco · 4.69:1 su `--bg1` |
| `--ui` | `#9CA3AF` | **Solo elementi non testuali** (frecce, glifi) | 2.54:1 — non ammesso per testo |

> **Modifica al sistema originale.** Nell'index `--ui` era usato per le etichette
> dei campi del modulo. Su bianco dà **2.54:1**, sotto la soglia AA di 4.5:1: chi
> guarda il sito da un telefono in cantiere, con luce diretta sullo schermo, non
> lo legge. È stato introdotto `--text-2` per tutti gli usi testuali; `--ui`
> resta nel sistema per gli elementi decorativi. Nessuna nuova tinta: stessa
> famiglia fredda, solo più scura.

### 1.4 Token aggiunti per il multi-pagina

Necessari perché l'index non aveva né placeholder tecnici né pagine interne.
Derivati dai neutri esistenti, nessuna nuova tinta.

| Token | Valore | Uso |
|---|---|---|
| `--ph-bg` | `#EEF0F2` | Fondo dei placeholder dato tecnico |
| `--ph-border` | `#D3D7DC` | Bordo dei placeholder |
| `--ph-text` | `#5A6472` | Testo dei placeholder |
| `--focus` | `#B13733` | Anello di focus (= `--red`) |

---

## 2. Tipografia

### 2.1 Famiglie

| Token | Famiglia | Pesi | Uso |
|---|---|---|---|
| `--brand` | `Space Grotesk` | 500 · 600 · 700 | Titoli h1–h4, eyebrow, numeri, etichette |
| `--ui-font` | `IBM Plex Sans` | 400 · 500 · 600 · 700 | Testo corrente, bottoni, moduli, navigazione |
| `--mono` | `IBM Plex Mono` | 400 · 500 | Segnaposto dei dati tecnici |

> **Sostituzione di Inter.** L'index usava Inter per tutto il corpo del testo.
> È stato sostituito con **IBM Plex Sans**, che ha un impianto disegnato e
> tecnico — nasce per una società di ingegneria — e regge il tono di un
> costruttore meglio di una grottesca neutra da interfaccia. Il compagno
> **IBM Plex Mono** ha preso il posto del monospazio di sistema per i
> segnaposto: così anche il trattamento dei dati mancanti appartiene al
> sistema invece di essere un ripiego del browser.
>
> Space Grotesk resta come carattere del display: è la scelta già presente nel
> marchio e non va cambiata senza una decisione esplicita.

**Caricamento: font ospitati in locale**, non su CDN esterno.
Un foglio di stile remoto blocca il rendering e costa due connessioni prima
del primo byte di testo. Ora il sito non fa **nessuna richiesta a terzi**.

I file stanno in `public/fonts/`, le regole `@font-face` in
`src/styles/fonts.css`, entrambi generati da `scripts/fetch-fonts.mjs`.
`font-display: swap` su tutti: il testo compare subito con il ripiego di
sistema, mai una pagina muta.

I due tagli che compaiono per primi — Space Grotesk 600 e IBM Plex Sans 400 —
sono precaricati nella testa del documento.

Ripieghi scelti per prossimità metrica, così lo scarto durante il caricamento
resta contenuto: `Arial Narrow` per il display, `Segoe UI`/`system-ui` per il
corpo.

### 2.2 Scala

Fluida via `clamp()`, misurata dall'index.

| Ruolo | Valore | Note |
|---|---|---|
| H1 hero | `clamp(42px, 6.6vw, 94px)` | Space Grotesk 600, `line-height: 1.02`, `letter-spacing: -.02em` |
| H1 pagina interna | `clamp(34px, 5vw, 64px)` | Derivato: le pagine interne non devono competere con la home |
| H2 sezione | `clamp(32px, 4.4vw, 58px)` | `line-height: 1.08`, `letter-spacing: -.02em` |
| H3 card | `20px` / `21px` / `19px` | 600 |
| H4 | `16px` | 600 |
| Lead | `clamp(16px, 1.5vw, 20px)` | — |
| Corpo | `16px` · sezioni `18px` · card `14.5px` | `line-height: 1.6` |
| Eyebrow | `13px` | 600, `letter-spacing: .16em`, uppercase, con barretta 34×2px |
| Label | `11.5px` | 600, `letter-spacing: .16em`, uppercase |
| Numeri statistica | `clamp(26px, 3.2vw, 42px)` | Space Grotesk 700 |
| `sec-num` decorativo | `clamp(60px, 8vw, 120px)` | 700, solo contorno 1px |

`line-height` globale corpo: **1.6**. Titoli: **1.08** (hero 1.02).

---

## 3. Spaziatura e griglia

| Token | Valore |
|---|---|
| `--maxw` | `1280px` |
| Padding contenitore | `32px` (≥600px) · `20px` (<600px) |
| Padding sezione | `120px` verticali (≥600px) · `80px` (<600px) |
| Gap griglia card | `22px` |
| Gap griglia colonne larghe | `70px` |
| Margine sotto testata sezione | `60px` |

Ritmo verticale interno: multipli di 4 (`4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 22 · 24 · 26 · 30 · 34`).

---

## 4. Raggi, bordi, ombre

| Token | Valore | Uso |
|---|---|---|
| `--r-sm` | `3px` | Bottoni, campi form, badge |
| `--r-md` | `4px` | Card, immagini, pannelli |
| Bordo standard | `1px solid var(--bg2)` | Card su fondo chiaro |
| Bordo su scuro | `1px solid rgba(255,255,255,.12)` | Griglie su navy |
| Bordo bottone | `1.5px` | — |

Ombre — sempre proiettate verso il basso, mai diffuse:

| Contesto | Valore |
|---|---|
| Card hover | `0 28px 56px -28px rgba(29,42,68,.45)` |
| Elemento sollevato | `0 18px 36px -22px rgba(29,42,68,.35)` |
| Badge / floating | `0 14px 30px -12px rgba(0,0,0,.45)` |

---

## 5. Movimento

| Token | Valore | Uso |
|---|---|---|
| `--ease` | `cubic-bezier(.16, 1, .3, 1)` | Uscita morbida: reveal, hover, trasformazioni |
| `--ease-io` | `cubic-bezier(.65, 0, .35, 1)` | In-out simmetrico: clip-path, preloader, rail |

Durate in uso: `.25s` micro-interazioni · `.3–.45s` hover e stato ·
`.75–.9s` reveal on scroll · `1–1.8s` rivelazioni di grande formato.

`prefers-reduced-motion: reduce` azzera animazioni e transizioni, forza
`opacity: 1` e rimuove i `transform` su tutti gli elementi rivelati.

---

## 6. Breakpoint

| Larghezza | Comportamento |
|---|---|
| `< 600px` | Colonna singola su tutte le griglie · padding 20px · sezioni 80px |
| `600 – 920px` | Griglie a 2 colonne · timeline 2 colonne senza rail |
| `> 920px` | Layout pieno · nav desktop · elementi decorativi visibili |

Sotto 920px vengono nascosti: `nav.main`, CTA di header, `.since`, `.scroll-cue`, `.sec-num`, cursore custom.

Target di verifica: **360 · 768 · 1280 · 1920**.

---

## 7. Asset logo

Il logo è un **SVG inline** in `viewBox="0 0 800 260"`, senza file esterno.
Composizione in tre gruppi di path:

| Elemento | Riempimento |
|---|---|
| Lettering "PREFABBRICATI" (riga superiore) | `#1F2A43` |
| Lettering "MOIOLI" (riga principale) | `#E42829` |
| Simbolo a barre (sinistra) | Misto `#1F2A43` + `#E42829` |
| ~~Payoff, terza riga~~ | **rimosso** — vedi nota |

> **Nota sui colori.** Il navy del logo è `#1F2A43`, quello dei token è
> `#1D2A44`. Sono percettivamente identici (ΔE ≈ 1). I riempimenti restano ai
> valori originali del file vettoriale.

### 7.1 La riga di payoff dentro il marchio

Il lockup porta come terza riga la scritta *«Prefabbricare per il futuro»*,
disegnata in vettoriale. **Resta nel marchio**, ma non è sempre accesa.

Il marchio è costruito come **due strati sovrapposti nello stesso riquadro**:

| Symbol | Contenuto |
|---|---|
| `#moioli-logo` | Simbolo a barre e lettering, 23 tracciati |
| `#moioli-logo-payoff` | Solo la riga di payoff, 1 tracciato |

Entrambi hanno `viewBox="0 0 800 260"`, quello del lockup completo. Accendere
o spegnere la riga **non cambia le proporzioni della sigla e non sposta un
pixel in pagina**: verificato, il riquadro resta 105×34 in tutti e due gli
stati.

**Quando è accesa**

| Contesto | Payoff | Perché |
|---|---|---|
| Testata, sopra l'apertura della home | spento | Il payoff è già scritto in grande come titolo: nel marchio si leggerebbe due volte nella stessa schermata |
| Testata, superata l'apertura | acceso | Il titolo è uscito di scena, il lockup si completa |
| Testata, pagine interne | acceso | Non c'è nessun payoff a testo con cui competere |
| Piè di pagina | sempre acceso | Nessuna competizione |

Il passaggio è governato da un `IntersectionObserver` sull'apertura della home
(`Header.astro`), che accende la classe `.con-payoff`.

A payoff spento la sigla scenderebbe in alto nel proprio riquadro lasciando un
vuoto sotto: uno scarto di `0.107 × altezza` (3.65px a 34px) la riporta al
centro ottico. Quando la riga si accende, la sigla risale alla propria
posizione nel lockup. Movimento minimo e legato a un cambio di stato reale.

> Il **nuovo payoff** — «Dove la forma prende volume.» — non è disegnato nel
> marchio: è testo, e compare **una sola volta in tutto il sito**, come titolo
> di apertura della home. Il piè di pagina porta una riga fattuale.

Generazione dello sprite: `node scripts/build-logo.mjs`, che separa i due
strati partendo da `src/assets/logo.svg` riconoscendo la riga di payoff dalla
quota (unico tracciato interamente sotto 220) — non dalla posizione
nell'elenco, così resta valido se il file sorgente viene rigenerato.

Su fondo scuro il logo viene forzato a bianco pieno (`fill: #fff`) via CSS —
comportamento già presente nell'index (header non scrollato, footer).

Componente: `src/components/Logo.astro`, con prop `variant: 'auto' | 'light'`.

**Non disponibile in cartella:** favicon, logo monocromatico, versione ridotta
per formati quadrati, file `.ai`/`.svg` sorgente. Da richiedere al cliente.

---

## 8. Elementi ricorrenti del sistema

| Nome | Descrizione |
|---|---|
| `.eyebrow` | Sopratitolo rosso uppercase preceduto da barretta 34×2px |
| `.sec-num` | Numero d'ordine sezione, solo contorno, in alto a destra |
| `.btn` | 4 varianti: `navy`, `red`, `ghost`, `light`; freccia che scorre di 5px in hover |
| `.reveal` / `.stagger` | Sistema di comparsa allo scroll via IntersectionObserver |
| `.img-reveal` | Immagine svelata con `clip-path` + zoom-out interno da 1.12 a 1 |
| `.mag` | Bottone magnetico (segue il cursore di 14%/22%) |
| `.tilt` | Card con inclinazione 3D di ±5° |
| `.demo-flag` | Etichetta fissa "Demo concept" in basso a sinistra |

---

## 9. Aggiunte introdotte per la demo

Tutto ciò che non esisteva nell'index e che va approvato.

### 9.1 Aggiunte strutturali

| Elemento | Motivazione |
|---|---|
| `--red-soft` come token | Valore già in uso nell'index (3 occorrenze letterali), solo formalizzato |
| `--ph-*` (placeholder) | Serve un trattamento grafico riconoscibile per i dati non verificati |
| `.spec` (placeholder dato tecnico) | Monospace di sistema, fondo `--ph-bg`, bordo tratteggiato. **Unica deviazione tipografica del sito** — voluta, perché deve staccare a colpo d'occhio in presentazione |
| `--r-sm` / `--r-md` come token | I valori 3px/4px erano ripetuti letterali |
| H1 di pagina interna | Scala ridotta perché le interne non devono competere con la home |
| `.breadcrumb` | Necessario con la gerarchia a 3 livelli `/soluzioni/tecnoshed` |
| Anello di focus visibile | L'index non definiva stati di focus da tastiera: requisito di accessibilità |

Font monospace dei placeholder: stack di sistema
(`ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`), **nessun font
aggiuntivo scaricato**.

### 9.2 Correzioni emerse dalla verifica di accessibilità

Misurate a schermo, non stimate. Ognuna correggeva un valore che non raggiungeva
la soglia AA.

| Punto | Prima | Dopo | Intervento |
|---|---|---|---|
| Testo secondario su bianco | 2.54:1 | 5.07:1 | Nuovo token `--text-2` |
| Navigazione bianca sopra l'hero fotografico | ~3.6:1 | 8.75:1 | Velo scuro sotto la testata trasparente (`header::before`) |
| `100%` in rosso nei numeri hero | 2.36:1 | 5.20:1 | Da `--red` a `--red-soft`, che esiste per questo |
| Nomi clienti nel carosello | 3.72:1 | ~5.6:1 | Opacità da `.40` a `.58` |
| Note e riga legale nel piè di pagina | 3.79–4.06:1 | ~6:1 | Opacità da `.40`/`.42` a `.55` |
| Voci del piè di pagina e breadcrumb | altezza 21–22px | ≥26px | Padding per rispettare WCAG 2.5.8 |

**Il velo della testata** merita una nota: la testata è trasparente sopra
un'immagine, quindi il contrasto dipende dalla fotografia. Con un cielo chiaro il
bianco scendeva sotto la soglia. La fascia sfumata garantisce la leggibilità
qualunque immagine venga messa in futuro, senza dover ritoccare la sfumatura di
ogni hero.

### 9.3 Revisione sulla checklist dei $10K

Interventi fatti dopo il confronto con le otto voci della checklist.

| Voce | Esito | Intervento |
|---|---|---|
| 01 Punto di vista | **aperto** | Vedi la nota qui sotto: è una decisione, non una correzione |
| 02 Tipografia | corretto | Inter era vietato esplicitamente. Sostituito con IBM Plex Sans + IBM Plex Mono, ospitati in locale |
| 03 Colore contenuto | conforme | Due tinte più i neutri; nessun intervento |
| 04 Gerarchia | corretto | Sezioni da 120 a 140px, testate ridotte a 680px con testo secondario più chiaro, scala mobile più contrastata |
| 05 Immagini | conforme | Solo fotografie Moioli; dove mancano, riquadro dichiarato |
| 06 Movimento | corretto | Vedi sotto |
| 07 Mobile progettato | corretto | Scale e spaziature decise per lo schermo stretto, non ereditate. La sezione interattiva già cambiava impianto |
| 08 Le cose invisibili | conforme | 189 KB e 5 richieste sul percorso critico, nessuna a terzi |

**Movimento.** Sono state tolte tre cose che la checklist chiama per nome:

- Il *fade-up* da 28px su 0.9s applicato a tutto. Ora 10px su 0.5s: si legge
  come assestamento, non come effetto. Lo scarto fra elementi di una griglia è
  passato da 80 a 45ms e si azzera dopo il sesto, così l'ultima scheda non
  arriva mezzo secondo dopo la prima.
- L'**inclinazione 3D** delle schede al passaggio del mouse.
- I **bottoni magnetici** che inseguono il cursore.

Le ultime due sono stilemi da vetrina d'agenzia, riconoscibili al primo
passaggio del mouse, e non dicono nulla su ciò che l'azienda vende. Un bottone
che scappa dal cursore non comunica precisione.

**Frecce.** I 22 caratteri tipografici usati come icone (`→` `↑` `←`) sono
diventati tracciati vettoriali (`src/components/Icon.astro`), tratto unico a
1.75. I glifi dipendono dal font installato: su alcuni sistemi cambiano peso,
su altri vengono resi come emoji a colori.

### 9.4 Cosa NON è stato toccato

- I riempimenti del logo restano ai valori originali del vettoriale
- Space Grotesk resta il carattere del display: è nel marchio
- Nessuna nuova famiglia cromatica: `--text-2` è lo stesso grigio freddo dei
  neutri esistenti, solo più scuro
- Preloader e cursore personalizzato restano, come richiesto

### 9.5 La voce 01 resta aperta

La checklist chiede una direzione formale dichiarata — brutalista, editoriale,
lusso scuro — «eseguita senza esitazioni».

Il sito oggi esegue con precisione il sistema estratto dall'index: navy e
rosso, fotografia a piena pagina, griglie di schede, numeri di sezione. È
coerente e curato, ma la direzione è quella prudente del settore. Non è un
difetto da correggere in autonomia: il committente ha indicato quell'index
come fonte di verità del marchio, e cambiare impianto formale è una scelta che
spetta a lui.

Se si volesse spingere sulla voce 01, la strada più coerente con un marchio
che vende sicurezza è **editoriale-tecnica**: griglia visibile, tipografia più
grande e più netta, disegno costruttivo trattato come materiale grafico invece
che come illustrazione di supporto, fotografia usata a piena pagina e in
sequenza invece che dentro schede tutte uguali. Da decidere prima di
proseguire.
