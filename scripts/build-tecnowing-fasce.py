# -*- coding: utf-8 -*-
"""Genera la variante «a fasce» del configuratore 3D Tecnowing.

    python3 scripts/build-tecnowing-fasce.py

Legge `modelli3d/tecnowing-viewer.html`, scrive
`modelli3d/tecnowing-viewer-fasce.html` e ne mette la copia servita in
`public/soluzioni/tecnowing/configuratore-3d-fasce/index.html`.

PERCHE' UNO SCRIPT E NON UNA MODIFICA A MANO
Il documento esportato dal configuratore e' un bundle: il markup dell'app vive
dentro <script type="__bundler/template"> come UNA stringa JSON su una riga
sola di 36 000 caratteri, con ogni "</" scritto "<\\u002F" (altrimenti il
parser chiuderebbe lo script alla prima chiusura di tag). Si decodifica, si
modifica, si ricodifica con la stessa convenzione.

Ogni sostituzione dichiara quante occorrenze si aspetta e si ferma se non
tornano: quando arrivera' una nuova esportazione, lo script dira' quale pezzo
non c'e' piu' invece di produrre un file rotto in silenzio.

COSA CAMBIA rispetto all'originale, che resta intoccato sotto
/soluzioni/tecnowing:
  1. i pannelli lasciano il modello e diventano due fasce laterali blu
     (griglia a tre colonne, colori da fondo scuro);
  2. il modello gira da solo all'apertura e si ferma al primo gesto;
  3. le inquadrature arretrano quando la cella centrale e' stretta;
  4. sotto i 1000px le colonne diventano righe.
"""
import json, io, os, sys, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'modelli3d', 'tecnowing-viewer.html')
DST = os.path.join(ROOT, 'modelli3d', 'tecnowing-viewer-fasce.html')
PUB = os.path.join(ROOT, 'public', 'soluzioni', 'tecnowing',
                   'configuratore-3d-fasce', 'index.html')
TPL_LINE = 400  # 0-based

lines = io.open(SRC, encoding='utf-8').read().split('\n')
tpl = json.loads(lines[TPL_LINE])
orig = tpl

def sub(old, new, n=1):
    global tpl
    c = tpl.count(old)
    if c != n:
        sys.exit('ATTESE %d occorrenze, trovate %d per:\n%s' % (n, c, old[:160]))
    tpl = tpl.replace(old, new)

# ─────────────────────────────────────────────────────────────────────
# 1. Foglio di stile: da pannelli sovrapposti a griglia con fasce laterali
# ─────────────────────────────────────────────────────────────────────
NEW_CSS = """/* ── Impaginazione a fasce ───────────────────────────────
   Il modello sta al centro, chiaro; l'interfaccia sta sulle due fasce blu ai
   lati e non gli va piu' sopra. La griglia tiene le tre colonne (fascia
   sinistra · modello · fascia destra) e le due bande orizzontali (testata ·
   piede): i pannelli sono celle, non riquadri appoggiati sul modello, quindi
   non ne nascondono piu' un pezzo.

   Le misure stanno qui e non nel markup perche' il layout deve cambiare con
   la larghezza: sotto i 1000px le fasce non ci stanno piu' e le tre colonne
   diventano una pila, con il modello in cima. */
html{height:100%}
body{height:100%;min-height:100vh;overflow:hidden;background:#16203A!important}
/* La runtime monta l'app in #dc-root > .sc-host: senza altezza esplicita su
   questi wrapper, un height:100% sul root si risolve a zero e resta vuoto. */
#dc-root,.sc-host,x-dc{display:block;width:100%;height:100%}

.vp-root{
  width:100%!important;height:100%!important;
  display:grid;
  grid-template-columns:var(--rail-l,300px) minmax(0,1fr) var(--rail-r,272px);
  grid-template-rows:56px minmax(0,1fr) 40px;
  grid-template-areas:"head head head" "left stage right" "foot foot foot";
}
/* In presentazione i pannelli escono dal DOM: le fasce si chiudono da sole e
   il modello prende tutta la larghezza. */
.vp-root:not(:has(.vp-panel-left)){--rail-l:0px;--rail-r:0px}

.vp-header{grid-area:head}
.vp-panel-left{grid-area:left}
.vp-stage{grid-area:stage}
.vp-panel-right{grid-area:right}
.vp-footer{grid-area:foot}
.vp-header,.vp-panel-left,.vp-panel-right,.vp-stage,.vp-footer{
  position:relative;min-width:0;min-height:0;
}
.vp-panel-right{overflow-y:auto;overflow-x:hidden}
.vp-panel-left,.vp-panel-right,.vp-viewbar,.vp-footer{-webkit-overflow-scrolling:touch}
.vp-viewbar::-webkit-scrollbar,.vp-footer::-webkit-scrollbar,
.vp-panel-left ::-webkit-scrollbar,.vp-panel-right::-webkit-scrollbar{height:0;width:0}

/* La barra viste resta sospesa sul modello, ma centrata sul modello e non
   sulla pagina: le due fasce non hanno la stessa larghezza. E dentro il
   modello ci deve stare: piu' larga della cella andrebbe a coprire i
   pannelli, che e' esattamente cio' da cui siamo partiti. Quando non ci sta
   diventa una striscia che scorre. */
.vp-viewbar{
  left:calc(var(--rail-l,300px) + (100% - var(--rail-l,300px) - var(--rail-r,272px)) / 2)!important;
  max-width:calc(100% - var(--rail-l,300px) - var(--rail-r,272px) - 20px);
  overflow-x:auto;justify-content:flex-start;
}
.vp-viewbar > div{flex:0 0 auto}
/* Appena la cella si stringe i sette pulsanti si stringono con lei, invece di
   diventare subito una striscia da far scorrere. */
@media (max-width:1520px){
  .vp-viewbar{gap:8px!important;padding:5px!important}
  .vp-viewbar button{padding:0 11px!important}
}

@media (max-width:1280px){.vp-root{--rail-l:276px;--rail-r:252px}}
@media (max-width:1100px){.vp-root{--rail-l:252px;--rail-r:232px}}

/* Sotto i 1000px le fasce diventano righe: modello, viste, configuratore,
   componenti. Il modello resta in cima e si tiene tutto lo spazio libero. */
@media (max-width:1000px){
  .vp-root{
    grid-template-columns:minmax(0,1fr);
    grid-template-rows:52px minmax(0,1fr) auto auto auto 36px;
    grid-template-areas:"head" "stage" "bar" "right" "left" "foot";
  }
  .vp-header{padding:0 6px 0 12px!important}
  .vp-logo{height:20px!important}
  .vp-title{font-size:15px!important}
  /* In pila ogni riga tolta al modello si vede: i comandi si stringono e
     l'elenco dei componenti parte chiuso (vedi listOpen), cosi' la riga vale
     il suo pulsante finche' non lo si apre. */
  .vp-panel-left{
    border-right:0!important;border-top:1px solid rgba(255,255,255,.10)!important;
    max-height:30vh;
  }
  .vp-panel-right{
    border-left:0!important;border-top:1px solid rgba(255,255,255,.10)!important;
    flex-direction:row!important;flex-wrap:wrap!important;
    gap:8px 18px!important;padding:10px 12px 12px!important;
  }
  .vp-panel-right > div{flex:0 0 auto;gap:5px!important}
  .vp-panel-right button{min-height:38px!important;padding:0 10px!important}
  .vp-viewbar button{min-height:38px!important}
  /* La barra viste smette di galleggiare e diventa una riga sua: dove lo
     schermo e' stretto, coprire il modello costa troppo. */
  .vp-viewbar{
    position:relative!important;left:auto!important;right:auto!important;
    bottom:auto!important;transform:none!important;
    margin:8px 12px 0!important;padding:5px!important;max-width:none;
  }
  .vp-viewbar > div{flex:0 0 auto}
  .vp-footer{gap:14px!important;font-size:10px!important;padding:0 12px!important;overflow-x:auto;white-space:nowrap}
  .vp-footer > div{flex:0 0 auto}
  .vp-exit{right:12px!important;top:64px!important}
}

/* Telefono */
@media (max-width:560px){
  .vp-header{gap:8px}
  .vp-eyebrow,.vp-divider{display:none}
  .vp-brand{gap:10px!important;min-width:0}
  .vp-logo{height:18px!important}
  .vp-panel-left{max-height:26vh}
  .vp-panel-right button,.vp-viewbar button{font-size:10px!important;padding:0 9px!important}
}

/* Telefono in orizzontale: larghezza ce n'e', altezza no. In pila il modello
   resterebbe una striscia, quindi le fasce tornano ai lati. */
@media (max-height:560px) and (orientation:landscape) and (max-width:1000px){
  .vp-root{
    --rail-l:206px;--rail-r:190px;
    grid-template-columns:var(--rail-l) minmax(0,1fr) var(--rail-r);
    grid-template-rows:52px minmax(0,1fr) 32px;
    grid-template-areas:"head head head" "left stage right" "foot foot foot";
  }
  .vp-panel-left{border-right:1px solid rgba(255,255,255,.10)!important;border-top:0!important;max-height:none}
  .vp-panel-right{
    border-left:1px solid rgba(255,255,255,.10)!important;border-top:0!important;
    flex-direction:column!important;gap:14px!important;padding:12px 12px 14px!important;
  }
  .vp-viewbar{
    position:absolute!important;left:50%!important;bottom:8px!important;
    transform:translateX(-50%)!important;margin:0!important;
    max-width:calc(100% - 24px);
  }
  .vp-footer{font-size:9.5px!important}
}
"""

a = tpl.index('/* ── Layout adattivo')
b = tpl.index('</style>', a)
tpl = tpl[:a] + NEW_CSS + tpl[b:]

# ─────────────────────────────────────────────────────────────────────
# 2. Markup: le celle della griglia perdono le misure assolute e passano
#    ai colori da fondo scuro
# ─────────────────────────────────────────────────────────────────────
sub('<div class="vp-root" style="position:relative;width:100%;height:100%;overflow:hidden;background:#F5F6F7;font-family:\'IBM Plex Sans\',sans-serif;color:#3B3F45;-webkit-font-smoothing:antialiased">',
    '<div class="vp-root" style="position:relative;width:100%;height:100%;overflow:hidden;background:#16203A;font-family:\'IBM Plex Sans\',sans-serif;color:rgba(255,255,255,.82);-webkit-font-smoothing:antialiased">')

# Il modello: cella della griglia, con il canvas che la riempie in assoluto.
sub('style="position:absolute;left:0;right:0;top:56px;bottom:40px;background:#F5F6F7"',
    'style="position:relative;background:#F5F6F7"')

sub('style="position:absolute;left:0;right:0;top:0;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 16px 0 20px;background:#16203A;z-index:30"',
    'style="display:flex;align-items:center;justify-content:space-between;padding:0 16px 0 20px;background:#16203A;z-index:30"')

# Fascia sinistra
sub('style="position:absolute;left:20px;top:76px;width:280px;max-height:500px;display:flex;flex-direction:column;background:#FFFFFF;border:1px solid #E1E3E5;border-radius:6px;box-shadow:0 6px 24px rgba(17,25,46,.10);z-index:20;overflow:hidden"',
    'style="display:flex;flex-direction:column;background:transparent;border-right:1px solid rgba(255,255,255,.10);z-index:20;overflow:hidden"')

sub('style="display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:48px;padding:0 16px;background:#FFFFFF;border:0;cursor:pointer;text-align:left"',
    'style="display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:56px;padding:0 20px;background:transparent;border:0;cursor:pointer;text-align:left"')

sub('style="display:flex;align-items:center;gap:10px;width:100%;min-height:48px;padding:0 14px 0 9px;background:#FFFFFF;border:0;border-bottom:1px solid #E1E3E5;cursor:pointer;text-align:left"',
    'style="display:flex;align-items:center;gap:10px;width:100%;min-height:56px;padding:0 16px 0 13px;background:transparent;border:0;border-bottom:1px solid rgba(255,255,255,.12);cursor:pointer;text-align:left"')

sub('style="flex:none;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:5px;background:#F5F6F7;border:1px solid #E1E3E5;color:#1D2A44"',
    'style="flex:none;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:5px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.18);color:#FFFFFF"')

sub('font-weight:600;color:#686F79">Componenti del sistema</span>',
    'font-weight:600;color:rgba(255,255,255,.55)">Componenti del sistema</span>', 2)

sub("<div style=\"font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:#9CA3AF;letter-spacing:.01em\">{{ c.size }}</div>",
    "<div style=\"font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:rgba(255,255,255,.42);letter-spacing:.01em\">{{ c.size }}</div>")

# Scheda elemento
sub('font-weight:600;color:#686F79">Scheda elemento</div>',
    'font-weight:600;color:rgba(255,255,255,.55)">Scheda elemento</div>')
sub("style=\"font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:600;color:#1D2A44;line-height:1.2\">{{ selFam }}",
    "style=\"font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:600;color:#FFFFFF;line-height:1.2\">{{ selFam }}")
sub('color:#B13733;margin-top:3px">{{ selCount }}', 'color:#D98581;margin-top:3px">{{ selCount }}')
sub('<div style="display:grid;grid-template-columns:84px 1fr;gap:10px;padding:6px 0;border-top:1px solid #E1E3E5">',
    '<div style="display:grid;grid-template-columns:84px 1fr;gap:10px;padding:6px 0;border-top:1px solid rgba(255,255,255,.12)">')
sub('color:#9CA3AF;line-height:1.5">{{ s.k }}', 'color:rgba(255,255,255,.45);line-height:1.5">{{ s.k }}')
sub('font-size:11px;color:#3B3F45;line-height:1.45">{{ s.v }}', 'font-size:11px;color:rgba(255,255,255,.82);line-height:1.45">{{ s.v }}')
sub('<div style="margin-top:8px;font-size:12px;line-height:1.5;color:#686F79">Seleziona un elemento per isolarlo nel modello.</div>',
    '<div style="margin-top:8px;font-size:12px;line-height:1.5;color:rgba(255,255,255,.55)">Seleziona un elemento per isolarlo nel modello.</div>')

# Fascia destra
sub('style="position:absolute;right:20px;top:76px;display:flex;flex-direction:column;gap:12px;background:#FFFFFF;border:1px solid #E1E3E5;border-radius:6px;box-shadow:0 6px 24px rgba(17,25,46,.10);padding:14px 16px 16px;z-index:20"',
    'style="display:flex;flex-direction:column;gap:22px;background:transparent;border-left:1px solid rgba(255,255,255,.10);padding:22px 20px 20px;z-index:20"')

for etichetta in ('Interposto', 'Configurazione'):
    sub('font-weight:600;color:#686F79">%s</div>\n      <div style="display:flex;gap:6px">' % etichetta,
        'font-weight:600;color:rgba(255,255,255,.55)">%s</div>\n      <div style="display:flex;gap:6px;flex-wrap:wrap">' % etichetta)

# Piede
sub('style="position:absolute;left:0;right:0;bottom:0;height:40px;display:flex;align-items:center;gap:22px;padding:0 20px;background:#FFFFFF;border-top:1px solid #E1E3E5;font-family:\'IBM Plex Mono\',monospace;font-size:11px;letter-spacing:.02em;color:#686F79;z-index:25"',
    'style="display:flex;align-items:center;gap:22px;padding:0 20px;background:#16203A;border-top:1px solid rgba(255,255,255,.12);font-family:\'IBM Plex Mono\',monospace;font-size:11px;letter-spacing:.02em;color:rgba(255,255,255,.55);z-index:25"')
sub('<span style="color:#1D2A44;font-weight:500">', '<span style="color:#FFFFFF;font-weight:500">', 6)

# ─────────────────────────────────────────────────────────────────────
# 3. Logica: autorotazione e stili dei comandi sulla fascia
# ─────────────────────────────────────────────────────────────────────
# La soglia "compatto" seguiva il puntatore a dito: ora deve seguire il
# punto in cui le fasce diventano righe, altrimenti su iPad in orizzontale
# la scheda prenderebbe tutto il pannello mentre c'e' spazio in abbondanza.
sub("""    view: 'Assonometria',
    listOpen: true,""",
    """    view: 'Assonometria',
    /* Nelle fasce l'elenco sta aperto: c'e' tutta l'altezza della colonna.
       In pila no, sarebbe una riga tolta al modello: parte chiuso e si apre
       col suo pulsante. */
    listOpen: !window.matchMedia('(max-width:1000px)').matches,""")

sub("window.matchMedia('(max-width:1280px),(pointer:coarse)')",
    "window.matchMedia('(max-width:1000px)')", 2)

# Passando la soglia l'elenco segue il layout: aperto nella fascia, chiuso in
# pila. Il valore di partenza da solo non basta — il riquadro puo' nascere
# largo e stringersi subito dopo (dentro un iframe succede), e resterebbe
# aperto a rubare al modello mezza altezza.
sub("""    this.onMq = e => this.setState({ compact: e.matches, detail: e.matches && !!this.state.sel });""",
    """    this.onMq = e => this.setState({
      compact: e.matches,
      detail: e.matches && !!this.state.sel,
      listOpen: !e.matches
    });""")

sub("""    stage.setAttribute('name', 'tecnowing');
    stage.style.cssText = 'display:block;width:100%;height:100%';""",
    """    stage.setAttribute('name', 'tecnowing');
    /* Gira da solo appena la scena e' pronta. three-d-stage spegne
       l'autorotazione al primo 'start' dei controlli, cioe' al primo tocco
       sul modello; stopSpin() fa lo stesso per i comandi dei pannelli, che
       i controlli non vedono passare. */
    stage.setAttribute('autorotate', '');
    /* Riempie la cella della griglia: il :host di three-d-stage nasce
       height:100vh, che dentro una riga alta quanto il suo contenuto
       sarebbe di troppo. */
    stage.style.cssText = 'position:absolute;inset:0;display:block;width:auto;height:auto';""")

sub("""  layer(k) { return this.scene && this.scene.layers[k]; }""",
    """  layer(k) { return this.scene && this.scene.layers[k]; }

  /* Il modello gira finche' non lo si tocca: al primo gesto si ferma dov'e'
     ed e' definitivo, anche il reset vista non lo rimette a girare. */
  stopSpin() {
    const c = this.stage && this.stage._controls;
    if (c) c.autoRotate = false;
  }""")

sub("""  select(key) {
    const s = this.state;""",
    """  select(key) {
    this.stopSpin();
    const s = this.state;""")

sub("""      onCanvasTap: e => {
        this.tapStart""",
    """      onCanvasTap: e => {
        this.stopSpin();
        this.tapStart""")

sub("""      viewOpts: seg(['Assonometria', 'Interno', 'Sezione', 'Prospetto'], s.view, label => {
        this.setState({ view: label }""",
    """      viewOpts: seg(['Assonometria', 'Interno', 'Sezione', 'Prospetto'], s.view, label => {
        this.stopSpin();
        this.setState({ view: label }""")

sub("""        onClick: () => this.setState({ [key]: !s[key] }, () => this.applyVisibility())""",
    """        onClick: () => { this.stopSpin(); this.setState({ [key]: !s[key] }, () => this.applyVisibility()); }""")

sub("""      onReset: () => this.setState({ sel: null, detail: false, view: 'Assonometria' }, () => {
        this.setView('Assonometria');
        this.applyVisibility();
      }),""",
    """      onReset: () => { this.stopSpin(); this.setState({ sel: null, detail: false, view: 'Assonometria' }, () => {
        this.setView('Assonometria');
        this.applyVisibility();
      }); },""")

# Bottoni sulla fascia blu: il pieno navy sparirebbe nel fondo.
sub("""    const INT_LABEL = {""",
    """    /* Gli stessi segmenti, ma sulla fascia blu: acceso = bianco pieno,
       spento = solo contorno. Il navy pieno del btn() qui sparirebbe. */
    const btnRail = (on, w) => `display:flex;align-items:center;justify-content:center;gap:7px;min-height:44px;padding:0 ${w || 16}px;`
      + `font:600 11px/1 'IBM Plex Sans',sans-serif;letter-spacing:.09em;text-transform:uppercase;`
      + `border-radius:5px;cursor:pointer;white-space:nowrap;`
      + (on
        ? `background:#FFFFFF;color:#16203A;border:1px solid #FFFFFF;`
        : `background:transparent;color:rgba(255,255,255,.62);border:1px solid rgba(255,255,255,.24);`);

    const INT_LABEL = {""")

sub("""    const seg = (list, cur, fn, w) => list.map(label => ({
      label, style: btn(cur === label, w), onClick: () => fn(label)
    }));""",
    """    const seg = (list, cur, fn, w, sty) => list.map(label => ({
      label, style: (sty || btn)(cur === label, w), onClick: () => fn(label)
    }));""")

sub("""      interpostoOpts: seg(['Sandwich', 'Coppella piana', 'Coppella curva'], s.interposto, label => {
        this.setState({ interposto: label }""",
    """      interpostoOpts: seg(['Sandwich', 'Coppella piana', 'Coppella curva'], s.interposto, label => {
        this.stopSpin();
        this.setState({ interposto: label }""")
sub("      }, 14),", "      }, 12, btnRail),")

sub("""      configOpts: seg(['Standard', 'Shed'], s.config, label => {
        const keep""",
    """      configOpts: seg(['Standard', 'Shed'], s.config, label => {
        this.stopSpin();
        const keep""")
sub("      }, 22),", "      }, 20, btnRail),")

# Righe dell'elenco componenti, su fondo scuro
sub("""      rowStyle: `display:flex;align-items:center;gap:12px;height:56px;padding:0 16px;cursor:pointer;`
        + `border-bottom:1px solid #F5F6F7;`
        + (s.sel === c.key ? `background:#F1E3E2;box-shadow:inset 3px 0 0 #B13733;` : `background:#FFFFFF;`),
      dotStyle: `flex:none;width:12px;height:12px;border-radius:3px;background:${c.color};border:1px solid rgba(17,25,46,.18);`,
      nameStyle: `font-size:13px;line-height:1.2;color:${s.sel === c.key ? '#B13733' : '#3B3F45'};`""",
    """      rowStyle: `display:flex;align-items:center;gap:12px;min-height:56px;padding:0 20px;cursor:pointer;`
        + `border-bottom:1px solid rgba(255,255,255,.07);`
        + (s.sel === c.key ? `background:rgba(177,55,51,.26);box-shadow:inset 3px 0 0 #B13733;` : `background:transparent;`),
      dotStyle: `flex:none;width:12px;height:12px;border-radius:3px;background:${c.color};border:1px solid rgba(255,255,255,.30);`,
      nameStyle: `font-size:13px;line-height:1.2;color:${s.sel === c.key ? '#FFFFFF' : 'rgba(255,255,255,.80)'};`""")

sub("""      cardStyle: full
        ? `flex:1 1 auto;min-height:0;overflow-y:auto;background:#F5F6F7;padding:14px 16px 18px;`
        : `border-top:1px solid #E1E3E5;background:#F5F6F7;padding:14px 16px 16px;`,""",
    """      cardStyle: full
        ? `flex:1 1 auto;min-height:0;overflow-y:auto;background:rgba(255,255,255,.05);padding:16px 20px 20px;`
        : `border-top:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);padding:16px 20px 20px;`,""")

sub("width:28px;height:28px;color:#9CA3AF;", "width:28px;height:28px;color:rgba(255,255,255,.50);")

sub("`overflow-y:auto;overflow-x:hidden;flex:1 1 auto;min-height:0;border-top:1px solid #E1E3E5;`",
    "`overflow-y:auto;overflow-x:hidden;flex:1 1 auto;min-height:0;border-top:1px solid rgba(255,255,255,.12);`")

# Inquadrature: il modello va messo in mezzo alla cella, non alla finestra
sub("""    const [p, t] = P[name] || P.Assonometria;
    cam.position.set(p[0], p[1], p[2]);
    ctr.target.set(t[0], t[1], t[2]);
    ctr.update();
    void T;
  }""",
    """    const [p, t] = P[name] || P.Assonometria;
    if (name === 'Interno') {
      /* Il punto di vista dall'interno e' scelto a mano: sta dentro
         l'edificio, e inquadrarlo dal suo ingombro vorrebbe dire uscirne. */
      cam.position.set(p[0], p[1], p[2]);
      ctr.target.set(t[0], t[1], t[2]);
      cam.fov = 45;
      cam.near = 0.2;
      cam.far = 1200;
      cam.updateProjectionMatrix();
    } else {
      /* Da fuori si tiene la direzione della vista, non il suo punto: il
         bersaglio diventa il centro di cio' che si vede e la telecamera
         arretra quanto basta perche' ci stia dentro. Con i punti fissi —
         tarati su un riquadro largo — nella cella tra le due fasce il
         modello finiva di lato e piccolo. */
      this.frame(new T.Vector3(p[0] - t[0], p[1] - t[1], p[2] - t[2]));
    }
    ctr.update();
  }

  /* Ingombro di cio' che e' acceso adesso, non dell'edificio intero: in
     sezione tre quarti dei tegoli sono nascosti, e inquadrare tutto
     lascerebbe mezza cella vuota. */
  visibleBox() {
    const T = this.THREE;
    const box = new T.Box3();
    this.scene.root.updateMatrixWorld(true);
    Object.values(this.scene.layers).forEach((g) => {
      if (!g.visible) return;
      g.children.forEach((m) => { if (m.visible) box.expandByObject(m); });
    });
    if (box.isEmpty()) box.setFromObject(this.scene.root);
    return box;
  }

  /* Punta al centro dell'ingombro e cerca la distanza a tentativi: proietta
     gli otto spigoli, guarda di quanto sbordano dai bordi in coordinate
     normalizzate e corregge. Poche passate bastano, e la cosa vale per
     qualunque proporzione della cella senza doverne fissare una. */
  frame(dir) {
    const T = this.THREE;
    const cam = this.stage._camera, ctr = this.stage._controls;
    const box = this.visibleBox();
    const c = box.getCenter(new T.Vector3());
    const raggio = box.getBoundingSphere(new T.Sphere()).radius;
    const n = dir.clone().normalize();
    const spigoli = [];
    for (let i = 0; i < 8; i++) {
      spigoli.push(new T.Vector3(
        i & 1 ? box.max.x : box.min.x,
        i & 2 ? box.max.y : box.min.y,
        i & 4 ? box.max.z : box.min.z
      ));
    }
    /* Quanto dei bordi occupare. 1 sarebbe a filo dell'ingombro, che e' il
       parallelepipedo dell'edificio: visto di sbieco i suoi spigoli stanno
       piu' larghi della copertura, quindi un po' d'aria resta comunque. */
    const PIENO = 0.94;
    /* Angolo stretto, da fotografia di architettura. A 45 gradi — il campo
       con cui nasce three-d-stage — l'estremita' vicina dell'edificio pesa
       molto piu' di quella lontana: l'ingombro resta centrato sul suo centro,
       ma l'occhio lo legge spostato di lato. A 30 la differenza fra i due
       lati si assottiglia e la copertura sta in mezzo davvero. Dentro
       l'edificio serve il contrario, e infatti li' restano 45. */
    cam.fov = 30;
    cam.updateProjectionMatrix();
    /* Due correzioni per volta: la distanza, perche' l'ingombro ci stia, e
       uno scorrimento verticale, perche' ci stia in mezzo. Lo scorrimento e'
       lungo l'asse verticale del mondo e muove insieme telecamera e
       bersaglio: sullo schermo e' un su-e-giu' e basta, e l'asse di rotazione
       resta quello del modello, quindi la rotazione automatica non se ne
       accorge. */
    let d = raggio * 3;
    let alza = 0;
    const mira = new T.Vector3();
    for (let i = 0; i < 12; i++) {
      mira.copy(c).setY(c.y + alza);
      cam.position.copy(mira).addScaledVector(n, d);
      cam.lookAt(mira);
      cam.updateMatrixWorld(true);
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (const v of spigoli) {
        const q = v.clone().project(cam);
        if (q.x < x0) x0 = q.x;
        if (q.x > x1) x1 = q.x;
        if (q.y < y0) y0 = q.y;
        if (q.y > y1) y1 = q.y;
      }
      const fuori = Math.max(Math.abs(x0), Math.abs(x1), Math.abs(y0), Math.abs(y1));
      const scarto = (y0 + y1) / 2;
      const aPosto = Math.abs(fuori - PIENO) < 0.01 && Math.abs(scarto) < 0.006;
      if (aPosto) break;
      alza += scarto * Math.tan((cam.fov * Math.PI / 180) / 2) * d;
      d *= fuori / PIENO;
    }
    mira.copy(c).setY(c.y + alza);
    cam.position.copy(mira).addScaledVector(n, d);
    ctr.target.copy(mira);
    cam.near = 0.2;
    cam.far = (d + raggio) * 3;
    cam.updateProjectionMatrix();
  }""")

sub("""    stage.setObject(this.scene.root);
    this.ghosts = new Map();
    this.applyVisibility();
    this.setView('Assonometria');""",
    """    stage.setObject(this.scene.root);
    this.ghosts = new Map();
    this.applyVisibility();
    this.setView('Assonometria');
    /* Il riquadro cambia proporzione con la finestra — e sotto i 1000px
       passa da colonna a riga: three-d-stage aggiorna l'aspetto della
       telecamera, rifare l'inquadratura tocca a noi. Solo finche' il
       modello gira da solo: dopo il primo tocco la vista e' di chi guarda,
       e un ridimensionamento non gliela deve portare via. */
    this.ro = new ResizeObserver(() => {
      const c = this.stage && this.stage._controls;
      if (this.scene && c && c.autoRotate) this.setView(this.state.view);
    });
    this.ro.observe(this.hostEl);""")

sub("""  componentWillUnmount() {
    if (!this.mq) return;""",
    """  componentWillUnmount() {
    if (this.ro) this.ro.disconnect();
    if (!this.mq) return;""")

# ─────────────────────────────────────────────────────────────────────
# 4. Riscrittura del bundle
# ─────────────────────────────────────────────────────────────────────
enc = json.dumps(tpl, ensure_ascii=True).replace('</', '<\\u002F')
assert '</' not in enc and '\n' not in enc
assert json.loads(enc) == tpl
lines[TPL_LINE] = enc
io.open(DST, 'w', encoding='utf-8').write('\n'.join(lines))
os.makedirs(os.path.dirname(PUB), exist_ok=True)
shutil.copyfile(DST, PUB)
print('scritto  %s' % os.path.relpath(DST, ROOT))
print('copiato  %s' % os.path.relpath(PUB, ROOT))
print('template: %d -> %d caratteri' % (len(orig), len(tpl)))
