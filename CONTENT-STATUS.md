# Stato dei contenuti — demo Prefabbricati Moioli

Aggiornato: 29/07/2026

## Legenda

| Stato | Significato |
|---|---|
| `ready` | Contenuto verificato, pronto per la pubblicazione |
| `needs-client-approval` | Testo redazionale scritto da noi: va letto e approvato |
| `needs-geometra` | Dato tecnico da produrre e validare tecnicamente |
| `placeholder` | Segnaposto dichiarato, visibile in pagina come tale |

**Regola applicata in tutto il progetto: nessuna specifica tecnica è stata
inventata.** Dove servirebbe un numero c'è un segnaposto in monospazio su fondo
tenue, riconoscibile a colpo d'occhio in presentazione.

---

## 1. Dati d'impresa — `src/data/site.ts`

| Blocco | Stato | Note |
|---|---|---|
| Ragione sociale, P.IVA `01851070167` | `ready` | Confermato |
| Payoff «Dove la forma prende volume.» | `ready` | Confermato dal cliente. Compare **una sola volta in tutto il sito**, come titolo di apertura della home |
| «Prefabbricare per il futuro» dentro il marchio | `needs-client-approval` | **Non è più usato come slogan a testo**, ma resta disegnato nel lockup. Si accende solo dove non compete con il payoff a testo — vedi DESIGN-TOKENS §7.1. Da confermare che convivano due formule diverse |
| Telefono `+39 035 681239` | `ready` | Confermato — finisce nei dati strutturati |
| Email `info@prefabbricatimoioli.it` | `ready` | Confermato |
| Indirizzo Via F.lli Kennedy 24, Bagnatica (BG) | `ready` | Confermato |
| Anno di fondazione 1972 | `ready` | Confermato |
| Numeri hero (50+ anni, +700 mila mq, 100+ aziende, 100% Made in Italy) | `ready` | Confermati |
| Elenco clienti del carosello (10 nomi) | `ready` | Confermati |
| Tappe 1972 / 1985 / 2005 / Oggi | `ready` | Confermate |
| **Coordinate geografiche** della sede | `needs-client-approval` | **Ricavate dall'indirizzo, non fornite.** Vanno verificate: finiscono nello schema LocalBusiness |
| Le 4 voci del metodo chiavi in mano | `needs-client-approval` | Testo ripreso dall'index esistente |

---

## 2. Home — `src/pages/index.astro`

| Blocco | Stato | Note |
|---|---|---|
| Titolo hero "Dove la forma prende volume" | `ready` | Dall'index esistente |
| Occhiello e testo introduttivo hero | `ready` | Dall'index esistente |
| Sezione Azienda, tre paragrafi | `ready` | Dall'index esistente |
| Titolo sezione Soluzioni "Sette modi di coprire uno spazio" | `needs-client-approval` | Nuovo |
| Testo introduttivo Soluzioni | `needs-client-approval` | Nuovo |
| Titolo CTA "Parliamo del tuo progetto" | `ready` | Dall'index esistente |
| Testo CTA finale | `needs-client-approval` | Nuovo |

---

## 3. Soluzioni — `src/data/soluzioni.ts`

I **nomi prodotto** sono quelli forniti e sono `ready`. Tutto il resto è
redazionale.

| Tipologia | Nome | Claim + intro | Immagine | Dati tecnici |
|---|---|---|---|---|
| Tecnoshed | `ready` | `needs-client-approval` | `needs-client-approval` (abbinamento da confermare) | `needs-geometra` |
| Stegos | `ready` | `needs-client-approval` | `needs-client-approval` | `needs-geometra` |
| Tecnowing | `ready` | `needs-client-approval` | `needs-client-approval` | `needs-geometra` |
| Tegolo TT | `ready` | `needs-client-approval` | `needs-client-approval` | `needs-geometra` |
| Bacacier | `ready` | `needs-client-approval` | `needs-client-approval` | `needs-geometra` |
| Doppia pendenza | `ready` | `needs-client-approval` | **`placeholder`** — nessuna foto utilizzabile | `needs-geometra` |
| Coverplan | `ready` | `needs-client-approval` | **`placeholder`** — nessuna foto utilizzabile | `needs-geometra` |

### Punti aperti sulle soluzioni

1. ~~**Stegos è dichiarato "unico nel suo genere" ma non è spiegato perché.**~~
   **Risolto dal catalogo.** Il catalogo ufficiale dichiara che Stegos è
   *«sviluppato esclusivamente da Prefabbricati Moioli»* e ne motiva la
   distinzione con quattro caratteristiche verificabili: lucernario continuo
   centrale integrato nell'elemento, alleggerimento e isolamento termico,
   pendenza integrata del 2% in copertura, resistenza al fuoco da R90′ a R180′
   **senza riduzione di portata**. Più la flessibilità modulare: lo stesso
   elemento come solaio, in pluripiano e in copertura.
   La pagina è stata rifatta su questi contenuti — vedi §4-bis.
2. **Doppia pendenza e Coverplan non hanno fotografie utilizzabili.**
   La cartella `DOPPIA PENDENZA` contiene solo file `.TIF`, esclusi dalla
   lavorazione come concordato; per Coverplan esistono solo PDF di disegno.
   In pagina compare un riquadro dichiarato al posto dell'immagine.
3. **L'abbinamento foto ↔ tipologia è da confermare.** Le cartelle sono
   organizzate per prodotto ma alcune contengono materiale misto: la cartella
   `tegolo alare contenuti` include per esempio fotografie di coperture a shed.
   Nessuna foto è stata attribuita con certezza. Dichiarato in pagina.

---

## 4. Tecnoshed — `src/data/tecnoshed.ts`

| Blocco | Stato | Note |
|---|---|---|
| Titolo, claim, testo di apertura | `needs-client-approval` | Nuovi |
| Sezione "La soluzione", tre paragrafi | `needs-client-approval` | Nuovi. Il principio della luce da nord è tipologico, non una prestazione dichiarata |
| Sezione "Tecnologia", due paragrafi + tre punti | `needs-client-approval` | Nuovi |
| Sezione "Perché sceglierla", quattro voci | `needs-client-approval` | **Da leggere con attenzione**: parlano di riduzione dell'illuminazione artificiale senza quantificarla. Se il claim non regge, va tolto |
| **Disegno in sezione** | `placeholder` | SVG segnaposto dichiarato in pagina. Sostituibile senza toccare la logica — vedi §7 |
| I 6 punti costruttivi: titoli e descrizioni | `needs-client-approval` | Nuovi, volutamente generici |
| I 6 punti costruttivi: dati tecnici | `needs-geometra` | Tutti segnaposto |
| Foto di dettaglio dei 6 punti | `placeholder` | Riquadro dichiarato: serve un servizio fotografico sui dettagli costruttivi |
| Gallery, 6 immagini | `needs-client-approval` | Foto reali d'archivio, abbinamento da confermare |

---

## 4-bis. Stegos — `src/data/stegos.ts`

**I dati tecnici vengono dal catalogo ufficiale**
`CATALOGHI IN SCALA PER A4/Catalogo 4ante Stegos in scala.pdf`.
Sono riportati alla lettera: nessun valore è stato calcolato, arrotondato,
dedotto o completato.

> **Dai cataloghi si prendono SOLO LE INFORMAZIONI, non le immagini.**
> Nessun disegno del PDF è riprodotto in pagina. I disegni definitivi
> arriveranno separatamente; nel frattempo la pagina usa un disegno segnaposto
> dichiarato e riquadri dichiarati.

| Blocco | Stato | Note |
|---|---|---|
| Denominazioni prodotto e componenti | `ready` | Dal catalogo: elemento singolo / doppio / doppio con lastrina; travi a "T", "L", "I"; pilastri con armatubo |
| Dati tecnici (altezza, modulo, luce netta, REI, pendenza) | `needs-client-approval` | **Dal catalogo, da confermare che sia la versione validata** — vedi sotto |
| Le 4 caratteristiche principali | `needs-client-approval` | Dal catalogo, riformulate in italiano corretto |
| Stratigrafia di copertura (9 strati) | `ready` | Dalle denominazioni del catalogo |
| Compatibilità fotovoltaico / EFC / sprinkler | `needs-client-approval` | Dal catalogo |
| Titolo, claim, testo di apertura | `needs-client-approval` | Redazionali |
| «Di cosa si tratta», due paragrafi | `needs-client-approval` | Redazionali. Non aggiungono nulla ai dati di catalogo |
| «Applicazioni», quattro voci | `needs-client-approval` | Derivate da «edifici industriali, commerciali, mono e pluripiano» |
| **Disegno della sezione interattiva** | `placeholder` | `StegosSection.astro`. Schema costruito dalla **descrizione testuale**, non ricavato dalla tavola di catalogo. Dichiarato in pagina |
| I 6 punti caldi: titoli e descrizioni | `needs-client-approval` | Usano le denominazioni del catalogo |
| I 6 punti caldi: valori | `needs-geometra` | Il catalogo dà i dati d'insieme, non le misure dei singoli dettagli |
| Disegni delle varianti di copertura | `placeholder` | Riquadro dichiarato: da ridisegnare nella grafica del sito |
| Gallery, quattro fotografie | `needs-client-approval` | Archivio Moioli, abbinamento da confermare |

### Impostazione della pagina

Il baricentro è la **sezione interattiva**, in posizione 02: arriva subito dopo
l'introduzione, occupa una fascia intera con spaziature più larghe del resto e
ha il titolo più grande della pagina. Tutto ciò che viene dopo — dati tecnici,
elementi del sistema, impiego in copertura — commenta i punti che nella sezione
si toccano solo con un titolo.

Il disegno usa `viewBox="0 0 1200 700"`, lo stesso del Tecnoshed: le coordinate
dei punti caldi sono percentuali di quel sistema e restano valide quando arriva
il vettoriale definitivo.

### Tre cose da decidere sul catalogo Stegos

1. **È la versione validata?** I metadati del PDF riportano una data di
   impaginazione **22/11/19** e il file InDesign di origine si chiama
   **`4-ante-Tecnowing FINAL.indd`**: il catalogo Stegos è stato costruito
   partendo dal modello del Tecnowing. Il contenuto è coerentemente Stegos, ma
   la provenienza va confermata prima di pubblicare dei numeri.

2. **Refusi nel catalogo.** Nel documento compaiono «Allegerimento»
   (→ *alleggerimento*), «Smaltimentose acque», «pulripiano», «Spinkler»
   (→ *sprinkler*). Nel sito sono già scritti correttamente, ma vanno sistemati
   anche nel file sorgente del catalogo.

3. **Il payoff nel marchio.** Il logo stampato sul catalogo porta
   **«Dove la forma prende volume»**, non «Prefabbricare per il futuro».
   Il lockup ufficiale aggiornato quindi esiste già: conviene farselo dare in
   vettoriale e sostituire quello attualmente in uso sul sito, invece di
   tenere i due strati sovrapposti descritti in DESIGN-TOKENS §7.1.

> Nota sulla palette: la grafica dei cataloghi è **arancione**, il sito usa il
> rosso `#B13733`. Finché i disegni del catalogo non entrano in pagina la cosa
> non crea conflitti, ma quando arriveranno i disegni definitivi andranno
> prodotti nella palette del sito — oppure va deciso di allineare il sito ai
> cataloghi.

Nota sulle fotografie: la cartella `Stegos` contiene materiale utilizzabile, ma
`Risorsa 5Stegos.png` è stata **esclusa** perché la sorgente è larga 272px,
sotto qualunque soglia utile in pagina.

**Gli altri cinque cataloghi** (Tecnoshed, Tecnowing, Bacacier, Doppia falda,
Piana a tegoli) sono nella stessa cartella: il testo si estrae in modo pulito e
si può ripetere lo stesso lavoro sulle rispettive schede.

---

## 5. Progetti — `src/data/progetti.ts`

| Blocco | Stato | Note |
|---|---|---|
| 6 committenti, superfici, località | `ready` | Confermati |
| Abbinamento foto ↔ commessa | `needs-client-approval` | Foto reali Moioli, ma la corrispondenza con la singola commessa non risulta dagli archivi. Dichiarato in pagina |
| Testo introduttivo di pagina | `needs-client-approval` | Nuovo |

### Scheda di dettaglio `/progetti/scheda-modello`

**L'intera pagina è un modello dimostrativo**, con committente fittizio e
etichetta rossa in evidenza nell'hero.

| Blocco | Stato |
|---|---|
| Committente "Committente dimostrativo" | `placeholder` dichiarato |
| Tre paragrafi descrittivi | `needs-client-approval` |
| Tutti i 6 dati di progetto in scheda | `needs-geometra` (segnaposto) |
| Le 4 fasi | `needs-client-approval` |
| Immagini | `placeholder` — foto d'archivio usate come esempio |

Nella versione finale ogni progetto avrà la propria scheda: la demo ne mostra
una sola, come da perimetro concordato.

---

## 5-bis. Azienda — `src/data/azienda.ts`

Sezione a tre pagine con sottomenu, impostata sul profilo aziendale di
Baraclit (chi siamo con i numeri → referenze per settore → riconoscimenti e
network) e adattata a ciò che di Moioli è documentato.

> **Nota di perimetro.** Il brief iniziale escludeva esplicitamente le
> referenze. La sezione è stata aggiunta su richiesta successiva del cliente.

### `/azienda` — chi siamo

| Blocco | Stato | Note |
|---|---|---|
| Storia e paragrafi introduttivi | `ready` | Riformulati dai testi dell'index esistente |
| Numeri: 1972, 700.000 mq, 100+ committenti, 50+ anni | `ready` | Confermati |
| **Superficie stabilimento** | `placeholder` | Baraclit dichiara 300.000 mq; di Moioli non abbiamo il dato. Riquadro dichiarato |
| **Organico** | `placeholder` | Baraclit dichiara 350 dipendenti; di Moioli non abbiamo il dato |
| Fatturato | **non inserito** | Baraclit lo dichiara. Per Moioli non è stato fornito e non è stato previsto un riquadro: si aggiunge solo se il cliente vuole esporlo |
| Sistema proprietario (Stegos) | `ready` | È l'equivalente di quello che per Baraclit è Aliant. Fonte: catalogo ufficiale |
| Stabilimento e indirizzo | `ready` | Confermati |
| Le quattro tappe | `ready` | Già in uso in home |
| **Video istituzionale** | `placeholder` | Baraclit ha «Baraclit in 240 secondi». Riquadro previsto, video da girare o fornire |

### `/azienda/referenze`

| Blocco | Stato | Note |
|---|---|---|
| I dieci nomi dei committenti | `ready` | Già presenti nei materiali Moioli |
| **Attribuzione di settore** | `needs-client-approval` | È una nostra classificazione in sei settori. Da confermare |
| **Loghi dei committenti** | `placeholder` | Baraclit mostra i loghi. Di Moioli non li abbiamo: al loro posto un riquadro con il nome, delle stesse proporzioni, così i loghi veri entreranno senza rimpaginare |
| Completezza dell'elenco | `placeholder` dichiarato | Dieci nomi sui più di cento committenti. Lista completa da fornire |

Il filtro per settore funziona ed è accessibile: bottoni con `aria-pressed`,
esito annunciato in una regione `aria-live`. Senza JavaScript la griglia resta
completa — nessun contenuto sparisce mai per errore.

### `/azienda/riconoscimenti`

**È la pagina più scoperta del sito.** Di Moioli non è stato fornito nessun
riconoscimento, nessuna certificazione e nessuna appartenenza associativa.

La struttura c'è ed è quella giusta, ma i contenuti vanno raccolti: la pagina
**si dichiara apertamente incompleta** e ogni riquadro indica il documento che
serve. In presentazione diventa una lista della spesa, che è più utile di una
pagina riempita con voci verosimili.

| Gruppo | Voci | Stato |
|---|---|---|
| Certificazioni di prodotto | DoP, marcatura CE, classificazione al fuoco | `placeholder` |
| Certificazioni aziendali | ISO 9001 / 14001 / 45001 | `placeholder` — **da verificare se esistono** |
| Riconoscimenti | — | `placeholder` — nessuno fornito |
| Associazioni e network | Categoria, collaborazioni, territorio | `placeholder` |

Unico riferimento documentato: il «Materiale DOP» citato fra i download del
sito precedente. Le Dichiarazioni di Prestazione quindi esistono, ma vanno
recuperate e verificate.

**Cosa serve dal cliente, in ordine di utilità:**
1. Le DoP e gli estremi della marcatura CE
2. Se esistono, le certificazioni ISO
3. Appartenenze associative (es. associazione di categoria dei prefabbricatori)
4. Eventuali premi o progetti segnalati

Se dopo la raccolta la pagina resta troppo magra, l'alternativa è **assorbirla
dentro `/azienda`** come blocco finale invece di tenerla come pagina a sé.

---

## 6. Contatti — `src/pages/contatti.astro`

| Blocco | Stato | Note |
|---|---|---|
| Recapiti | `ready` | Confermati |
| "Autostrada A4 — Uscita Seriate" | `ready` | Dall'index esistente |
| Mappa | `placeholder` dichiarato | Schema disegnato, non in scala. Nessun servizio esterno, quindi nessun banner cookie in demo |
| **Modulo di contatto** | `placeholder` funzionale | Valida i campi ma **non invia nulla**. Dichiarato in pagina |
| Informativa privacy | **mancante** | Va aggiunta prima della messa online: obbligatoria con un modulo attivo |

---

## 7. Cose da produrre prima della messa online

Ordinate per impatto.

1. **Disegno in sezione definitivo** (Illustrator, validato dal geometra).
   Sostituire il contenuto di `src/components/ShedSection.astro` mantenendo
   `viewBox="0 0 1200 700"` e l'orientamento (valle in basso, colmo in alto).
   Le posizioni dei punti caldi stanno in `src/data/tecnoshed.ts` come
   percentuali del viewBox: non vanno toccate. Nessuna logica dipende dall'SVG.
2. **Dati tecnici reali** per le 7 tipologie e per i 6 punti costruttivi.
   Ogni segnaposto in pagina corrisponde a una voce in questo file.
3. **Servizio fotografico sui dettagli costruttivi** — oggi i 6 pannelli della
   sezione interattiva mostrano un riquadro dichiarato al posto della foto.
4. **Conferma degli abbinamenti foto ↔ prodotto e foto ↔ commessa.**
5. **Fotografie di Doppia pendenza e Coverplan**, oggi assenti.
6. **Collegamento del modulo** alla casella aziendale + informativa privacy e
   cookie policy.
7. **File scaricabili** per il blocco documentazione nel piè di pagina: oggi le
   voci sono dichiarate come non ancora disponibili.
8. **Asset del marchio mancanti**: favicon bitmap per i browser vecchi,
   versione monocromatica, versione per formati quadrati. Il favicon attuale è
   ricavato dal simbolo a barre del logo esistente.
9. **Verifica delle coordinate geografiche** della sede.

---

## 8. Cosa NON è stato inserito, volutamente

Nessuno di questi elementi compare nel sito, né come pagina né come voce di menu:

- Pagine sostenibilità, magazine, lavora con noi, area download, newsletter
- ~~referenze~~ — **aggiunta su richiesta successiva**, vedi §5-bis
- Qualunque valore di resistenza al fuoco, luce netta, portata, carico,
  spessore, classe sismica o certificazione
- Fotografie di repertorio: dove manca l'immagine c'è un riquadro dichiarato
- Testo di riempimento non dichiarato

La sezione "Documentazione" della vecchia home, che elencava otto schede PDF
scaricabili, è stata ridotta a un blocco nel piè di pagina come concordato: non
è una route e non compare nel menu.
