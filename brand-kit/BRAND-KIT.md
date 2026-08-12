# Brand Kit — Prefabbricati Moioli

Estratto dal sistema grafico del sito (`moioli-web`), a sua volta ricavato
dall'index.html fornito dal cliente. Ogni valore qui dentro è verificato sul
codice sorgente, non ricostruito a memoria.

Aggiornato: 10/08/2026

---

## Correzione importante

Il payoff disegnato dentro il logo **non è "Prefabbricare per il futuro"**
come indicato in una fase precedente del lavoro — quella era una deduzione
fatta senza mai renderizzare il tracciato vettoriale. Renderizzandolo per
questo pacchetto risulta **"Dove la forma prende volume"**, identico al
titolo usato nel sito. Il marchio e il payoff testuale sono quindi già
allineati: non c'è conflitto fra vecchio e nuovo slogan da gestire.

---

## 1. Colore

### Struttura (navy)

| Nome | Hex | Uso |
|---|---|---|
| Navy | `#1D2A44` | Colore primario di marchio: titoli, bottone principale, fondo sezioni scure |
| Navy Deep | `#16203A` | Fondo scuro (header scrollato, footer superiore, sezioni alternate) |
| Navy Ink | `#11192E` | Fondo più scuro (footer) |

### Accento (rosso) — due rossi distinti, non intercambiabili

| Nome | Hex | Uso | Vincolo |
|---|---|---|---|
| Red Logo | `#E42829` | **Solo il marchio** (mai testo, bordi, UI) | Contrasto ~4.0:1 su bianco: sotto soglia AA per testo |
| Red | `#B13733` | Accento d'interfaccia: bottoni, link, eyebrow, sottolineature | Contrasto ~5.9:1 su bianco |
| Red Deep | `#963029` | Stato hover del rosso | — |
| Red Soft | `#D98581` | Rosso su fondo scuro (navy) | `--red` su navy scende sotto 3:1: qui si usa questo |

### Neutri

| Nome | Hex | Uso |
|---|---|---|
| Bg 1 | `#F5F6F7` | Fondo pagina, sezioni chiare |
| Bg 2 | `#E1E3E5` | Bordi, separatori |
| Bianco | `#FFFFFF` | Card, sezioni bianche |
| Text | `#3B3F45` | Testo corrente (9.79:1 su Bg1) |
| Text 2 | `#686F79` | Testo secondario, etichette (5.07:1 su bianco, 4.69:1 su Bg1) |
| UI | `#9CA3AF` | **Solo elementi non testuali** — frecce, glifi decorativi. Non usare per testo: 2.54:1 su bianco, sotto soglia |

### Placeholder (segnaposto di dato tecnico)

| Nome | Hex | Uso |
|---|---|---|
| Ph Bg | `#EEF0F2` | Fondo dei blocchi "dato da verificare" |
| Ph Border | `#D3D7DC` | Bordo tratteggiato dei placeholder |
| Ph Text | `#5A6472` | Testo dei placeholder |

**Regola:** non più di 2-3 colori dominanti per composizione. Il rosso è
sempre un accento, mai un colore di superficie estesa.

---

## 2. Tipografia

| Ruolo | Famiglia | Pesi | Note |
|---|---|---|---|
| Display (titoli) | **Space Grotesk** | 500, 600, 700 | Presente nel marchio stesso |
| Corpo (testo, UI) | **IBM Plex Sans** | 400, 500, 600, 700 | Impianto tecnico, coerente con un costruttore |
| Monospazio (dati tecnici) | **IBM Plex Mono** | 400, 500 | Solo per segnaposto/valori tecnici |

Font ospitati come file statici (`.woff2`), non caricati da Google Fonts a
runtime — nessuna dipendenza da terzi. I file sono nella cartella `fonts/` di
questo pacchetto (sottoinsieme latino).

**Non usare:** Inter, Roboto, o qualunque grottesca da interfaccia generica —
era la scelta originale scartata perché indistinguibile da un sito a basso
budget.

### Scala tipografica (desktop)

| Ruolo | Dimensione |
|---|---|
| H1 hero | `clamp(42px, 6.6vw, 94px)`, peso 600, interlinea 1.02 |
| H2 sezione | `clamp(32px, 4.4vw, 58px)`, peso 600, interlinea 1.08 |
| H3 | 19–21px, peso 600 |
| Eyebrow / sopratitolo | 13px, peso 600, maiuscolo, spaziatura 0.16em |
| Corpo | 16px, interlinea 1.6 |
| Corpo card | 14.5px |
| Etichetta | 11.5px, maiuscolo, spaziatura 0.16em |

---

## 3. Logo

Cartella `logo/` di questo pacchetto, quattro varianti:

| File | Contenuto | Uso |
|---|---|---|
| `moioli-lockup-colore.svg` | Sigla + payoff, colori marchio | Apertura di documenti, materiali dove il logo è protagonista |
| `moioli-lockup-bianco.svg` | Sigla + payoff, bianco pieno | Stesso, su fondo scuro |
| `moioli-sigla-colore.svg` | Solo sigla (senza payoff), colori marchio | Usi compatti: intestazioni, favicon, angoli di pagina |
| `moioli-sigla-bianca.svg` | Solo sigla, bianco pieno | Stesso, su fondo scuro |

**Colori del marchio, fissi, non sostituibili:** navy `#1F2A43` (nota: non
`#1D2A44` — sono percettivamente identici ma il file vettoriale del logo usa
il valore leggermente diverso dell'originale) e rosso `#E42829`.

**Regole d'uso:**
- Non ricolorare il marchio con colori diversi da questi due (o bianco pieno su fondo scuro)
- Non deformare, non alterare le proporzioni
- La sigla e il lockup completo condividono lo stesso riquadro (`viewBox 0 0 800 260`): il lockup ha semplicemente più contenuto nella stessa area, non è ridimensionato
- Zona di rispetto minima consigliata: l'altezza della "M" di MOIOLI su ogni lato

**Non ancora disponibili:** favicon bitmap per browser datati, versione
monocromatica a un solo colore, versione per formati quadrati (icona social).

---

## 4. Spaziatura, raggi, ombre

| Token | Valore |
|---|---|
| Larghezza massima contenuto | 1280px |
| Margine laterale | 32px (20px sotto 600px) |
| Raggio piccolo (bottoni, campi) | 3px |
| Raggio medio (card, immagini) | 4px |

Ombre — sempre proiettate verso il basso, mai diffuse in ogni direzione:

| Uso | Valore |
|---|---|
| Card in hover | `0 28px 56px -28px rgba(29,42,68,.45)` |
| Elemento sollevato | `0 18px 36px -22px rgba(29,42,68,.35)` |
| Elemento flottante | `0 14px 30px -12px rgba(0,0,0,.45)` |

---

## 5. Movimento

| Nome | Curva | Uso |
|---|---|---|
| Ease | `cubic-bezier(.16,1,.3,1)` | Uscita morbida: hover, comparse |
| Ease In-Out | `cubic-bezier(.65,0,.35,1)` | Transizioni simmetriche |

Durate: 150–300ms per micro-interazioni, mai oltre 500ms. Rispettare sempre
`prefers-reduced-motion`.

---

## 6. Voce e tono

Pubblico: tecnico, B2B (imprenditori, geometri, progettisti, direttori
lavori). Non consumer.

- Precisione prima di tutto: dato tecnico reale o dichiarato mancante, mai
  un valore plausibile inventato
- Nessun gergo di marketing, nessun superlativo non sostanziato
- Frasi dirette, corte, senza aggettivi di riempimento
- Dove manca un'informazione, lo si dice esplicitamente invece di riempire

---

## Contenuto del pacchetto

```
brand-kit/
├── BRAND-KIT.md              questo file
├── logo/
│   ├── moioli-lockup-colore.svg
│   ├── moioli-lockup-bianco.svg
│   ├── moioli-sigla-colore.svg
│   └── moioli-sigla-bianca.svg
└── fonts/
    ├── space-grotesk-500/600/700-latin.woff2
    ├── ibm-plex-sans-400/500/600/700-latin.woff2
    └── ibm-plex-mono-400/500-latin.woff2
```
