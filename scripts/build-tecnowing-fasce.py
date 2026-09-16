# -*- coding: utf-8 -*-
"""Genera la variante «a fasce» del configuratore 3D Tecnowing.

    python3 scripts/build-tecnowing-fasce.py

Legge `modelli3d/tecnowing-viewer.html`, scrive
`modelli3d/tecnowing-viewer-fasce.html` e ne mette la copia servita in
`public/soluzioni/tecnowing/configuratore-3d-fasce/index.html`.

PERCHE' UNO SCRIPT E NON UNA MODIFICA A MANO
Il documento esportato dal configuratore e' un bundle: il markup dell'app vive
dentro <script type="__bundler/template"> come UNA stringa JSON su una riga
sola di 54 000 caratteri, con ogni "</" scritto "<\\u002F" (altrimenti il
parser chiuderebbe lo script alla prima chiusura di tag). Si decodifica, si
modifica, si ricodifica con la stessa convenzione.

Ogni sostituzione dichiara quante occorrenze si aspetta e si ferma se non
tornano: quando arrivera' una nuova esportazione, lo script dira' quale pezzo
non c'e' piu' invece di produrre un file rotto in silenzio.

COSA CAMBIA rispetto all'originale, che resta intoccato sotto
/soluzioni/tecnowing:
  1. da 821px in su i pannelli lasciano il modello e diventano due fasce
     laterali blu (griglia a tre colonne, colori da fondo scuro);
  2. sotto, e sul telefono sdraiato, resta l'impaginazione a fogli
     dell'esportazione, intatta;
  3. le viste da fuori si inquadrano sul volume visibile, a 30 gradi, e si
     rifanno quando cambia la geometria;
  4. il primo comando ferma la rotazione automatica, non solo il primo
     trascinamento;
  5. in sezione il tamponamento della facciata vicina non si disegna, e il
     taglio resta anche dopo aver cambiato interposto o posa.

Le versioni dell'esportazione precedenti a settembre 2026 non avevano
rotazione automatica, posature dei tamponamenti, inquadratura adattiva ne'
fogli su telefono: lo script le aggiungeva, anche nel modulo della scena.
Ora ci sono gia', e qui si tocca solo il template.
"""
import json, io, os, sys, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'modelli3d', 'tecnowing-viewer.html')
DST = os.path.join(ROOT, 'modelli3d', 'tecnowing-viewer-fasce.html')
PUB = os.path.join(ROOT, 'public', 'soluzioni', 'tecnowing',
                   'configuratore-3d-fasce', 'index.html')

lines = io.open(SRC, encoding='utf-8').read().split('\n')
# Il template e' la riga subito dopo il suo tag di apertura: si cerca il tag
# invece di fidarsi di un numero di riga, che cambia a ogni esportazione.
TPL_LINE = lines.index('  <script type="__bundler/template">') + 1
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
NEW_CSS = """
/* ── Impaginazione a fasce ───────────────────────────────
   Il modello sta al centro, chiaro; l'interfaccia sta sulle due fasce blu ai
   lati e non gli va piu' sopra. La griglia tiene le tre colonne (fascia
   sinistra · modello · fascia destra) e le due bande orizzontali (testata ·
   piede): i pannelli sono celle, non riquadri appoggiati sul modello.

   Vale solo fuori dall'impaginazione a fogli dell'esportazione, cioe' il
   contrario esatto della sua condizione `mobile` — (max-width:820px) oppure
   (max-height:520px) sdraiato. Li' sotto i pannelli restano fogli bianchi
   richiamati dalla barra schede, com'erano: due colonne da 250px su un
   telefono lascerebbero al modello una fessura.

   I pannelli nascono in position:absolute con le misure nello style del
   markup, e i fogli ne hanno bisogno: qui si scavalcano con !important invece
   di toglierle. I colori passano per variabili (--f-*) che il markup legge
   con il valore originale come ripiego: definite solo dentro le fasce, fuori
   — fogli, barra viste — non esistono e resta il bianco. */
@media (min-width:821px) and (min-height:521px), (min-width:821px) and (orientation:portrait){
  .vp-root.vp-root{
    display:grid;
    grid-template-columns:var(--rail-l,300px) minmax(0,1fr) var(--rail-r,272px);
    grid-template-rows:56px minmax(0,1fr) 40px;
    grid-template-areas:"head head head" "left stage right" "foot foot foot";
    background:#16203A!important;
  }
  /* In presentazione i pannelli escono dal DOM: le fasce si chiudono da sole
     e il modello prende tutta la larghezza. */
  .vp-root:not(:has(.vp-panel-left)){--rail-l:0px;--rail-r:0px}

  .vp-root .vp-header,.vp-root .vp-stage,.vp-root .vp-panel-left,
  .vp-root .vp-panel-right,.vp-root .vp-footer{
    position:relative!important;left:auto!important;right:auto!important;
    top:auto!important;bottom:auto!important;width:auto!important;
    height:auto!important;max-height:none!important;min-width:0;min-height:0;
  }
  .vp-root .vp-header{grid-area:head}
  .vp-root .vp-stage{grid-area:stage}
  .vp-root .vp-footer{grid-area:foot;background:#16203A!important;border-top-color:rgba(255,255,255,.12)!important}
  .vp-root .vp-panel-left,.vp-root .vp-panel-right{
    background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;
  }
  .vp-root .vp-panel-left{grid-area:left;border-right:1px solid rgba(255,255,255,.10)!important}
  .vp-root .vp-panel-right{
    grid-area:right;border-left:1px solid rgba(255,255,255,.10)!important;
    gap:22px!important;padding:22px 20px 20px!important;overflow-y:auto;overflow-x:hidden;
  }
  .vp-root .vp-panel-right > div > div{flex-wrap:wrap}
  /* Barre di scorrimento scure, o sulla fascia blu resta una striscia chiara. */
  .vp-root .vp-panel-left,.vp-root .vp-panel-right{color-scheme:dark}

  .vp-panel-left,.vp-panel-right,.vp-footer{
    --f-testo:rgba(255,255,255,.82);--f-muto:rgba(255,255,255,.55);
    --f-tenue:rgba(255,255,255,.45);--f-forte:#FFFFFF;--f-rosso:#D98581;
    --f-sel-testo:#FFFFFF;--f-filo:rgba(255,255,255,.12);--f-fondo:transparent;
    --f-grigio:rgba(255,255,255,.05);--f-riga:rgba(255,255,255,.07);
    --f-sel:rgba(177,55,51,.26);--f-pallino:rgba(255,255,255,.30);
    --f-icona-filo:rgba(255,255,255,.18);
    /* Segmenti: acceso = bianco pieno, spento = solo contorno. Il navy pieno
       dei pulsanti originali sparirebbe nel fondo. */
    --f-on-fondo:#FFFFFF;--f-on-testo:#16203A;
    --f-off-testo:rgba(255,255,255,.62);--f-off-filo:rgba(255,255,255,.24);
  }

  /* La barra viste resta sospesa sul modello, ma centrata sul modello e non
     sulla pagina: le due fasce non hanno la stessa larghezza. E dentro il
     modello ci deve stare: piu' larga della cella coprirebbe i pannelli.
     Quando non ci sta diventa una striscia che scorre. */
  .vp-root .vp-viewbar{
    left:calc(var(--rail-l,300px) + (100% - var(--rail-l,300px) - var(--rail-r,272px)) / 2)!important;
    right:auto!important;transform:translateX(-50%)!important;
    max-width:calc(100% - var(--rail-l,300px) - var(--rail-r,272px) - 20px);
    overflow-x:auto;justify-content:flex-start;
  }
  .vp-root .vp-viewbar > div{flex:0 0 auto}
}
/* Appena la cella si stringe i pulsanti si stringono con lei, invece di
   diventare subito una striscia da far scorrere. */
@media (min-width:821px) and (min-height:521px) and (max-width:1520px){
  .vp-root .vp-viewbar{gap:8px!important;padding:5px!important}
  .vp-root .vp-viewbar button{padding:0 11px!important}
}
@media (min-width:821px) and (min-height:521px) and (max-width:1280px){.vp-root{--rail-l:276px;--rail-r:252px}}
@media (min-width:821px) and (min-height:521px) and (max-width:1100px){.vp-root{--rail-l:240px;--rail-r:224px}}
@media (min-width:821px) and (min-height:521px) and (max-width:940px){.vp-root{--rail-l:220px;--rail-r:206px}}
"""

a = tpl.index('/* ── Layout adattivo')
b = tpl.index('</style>', a)
tpl = tpl[:b] + NEW_CSS + tpl[b:]

# ─────────────────────────────────────────────────────────────────────
# 2. Markup: i colori dei pannelli passano per le variabili delle fasce
# ─────────────────────────────────────────────────────────────────────
sub('font-weight:600;color:#686F79">Componenti del sistema</span>',
    'font-weight:600;color:var(--f-muto,#686F79)">Componenti del sistema</span>', 2)
sub('min-height:48px;padding:0 16px;background:#FFFFFF;border:0;cursor:pointer',
    'min-height:48px;padding:0 16px;background:var(--f-fondo,#FFFFFF);border:0;cursor:pointer')
sub('padding:0 14px 0 9px;background:#FFFFFF;border:0;border-bottom:1px solid #E1E3E5;',
    'padding:0 14px 0 9px;background:var(--f-fondo,#FFFFFF);border:0;border-bottom:1px solid var(--f-filo,#E1E3E5);')
sub('border-radius:5px;background:#F5F6F7;border:1px solid #E1E3E5;color:#1D2A44"',
    'border-radius:5px;background:var(--f-grigio,#F5F6F7);border:1px solid var(--f-icona-filo,#E1E3E5);color:var(--f-forte,#1D2A44)"')
sub('color:#9CA3AF;letter-spacing:.01em">{{ c.size }}',
    'color:var(--f-tenue,#9CA3AF);letter-spacing:.01em">{{ c.size }}')
sub('font-weight:600;color:#686F79">Scheda elemento</div>',
    'font-weight:600;color:var(--f-muto,#686F79)">Scheda elemento</div>')
sub('color:#1D2A44;line-height:1.2">{{ selFam }}', 'color:var(--f-forte,#1D2A44);line-height:1.2">{{ selFam }}')
sub('color:#B13733;margin-top:3px">{{ selCount }}', 'color:var(--f-rosso,#B13733);margin-top:3px">{{ selCount }}')
sub('gap:10px;padding:6px 0;border-top:1px solid #E1E3E5">',
    'gap:10px;padding:6px 0;border-top:1px solid var(--f-filo,#E1E3E5)">')
sub('color:#9CA3AF;line-height:1.5">{{ s.k }}', 'color:var(--f-tenue,#9CA3AF);line-height:1.5">{{ s.k }}')
sub('color:#3B3F45;line-height:1.45">{{ s.v }}', 'color:var(--f-testo,#3B3F45);line-height:1.45">{{ s.v }}')
sub('color:#686F79">Seleziona un elemento', 'color:var(--f-muto,#686F79)">Seleziona un elemento')
for etichetta in ('Interposto', 'Tamponamento', 'Configurazione'):
    sub('font-weight:600;color:#686F79">%s</div>' % etichetta,
        'font-weight:600;color:var(--f-muto,#686F79)">%s</div>' % etichetta)

# Piede
sub('letter-spacing:.02em;color:#686F79;z-index:25"', 'letter-spacing:.02em;color:var(--f-muto,#686F79);z-index:25"')
sub('<span style="color:#1D2A44;font-weight:500">', '<span style="color:var(--f-forte,#1D2A44);font-weight:500">', 6)

# ─────────────────────────────────────────────────────────────────────
# 3. Logica
# ─────────────────────────────────────────────────────────────────────
# Stili costruiti in JS: stesse variabili, stesso ripiego.
sub("""        ? `background:#1D2A44;color:#FFFFFF;border:1px solid #1D2A44;`
        : `background:#FFFFFF;color:#686F79;border:1px solid #E1E3E5;`);""",
    """        ? `background:var(--f-on-fondo,#1D2A44);color:var(--f-on-testo,#FFFFFF);border:1px solid var(--f-on-fondo,#1D2A44);`
        : `background:var(--f-fondo,#FFFFFF);color:var(--f-off-testo,#686F79);border:1px solid var(--f-off-filo,#E1E3E5);`);""")

sub("""        + `border-bottom:1px solid #F5F6F7;`
        + (s.sel === c.key ? `background:#F1E3E2;box-shadow:inset 3px 0 0 #B13733;` : `background:#FFFFFF;`),
      dotStyle: `flex:none;width:12px;height:12px;border-radius:3px;background:${c.color};border:1px solid rgba(17,25,46,.18);`,
      nameStyle: `font-size:13px;line-height:1.2;color:${s.sel === c.key ? '#B13733' : '#3B3F45'};`""",
    """        + `border-bottom:1px solid var(--f-riga,#F5F6F7);`
        + (s.sel === c.key ? `background:var(--f-sel,#F1E3E2);box-shadow:inset 3px 0 0 #B13733;` : `background:var(--f-fondo,#FFFFFF);`),
      dotStyle: `flex:none;width:12px;height:12px;border-radius:3px;background:${c.color};border:1px solid var(--f-pallino,rgba(17,25,46,.18));`,
      nameStyle: `font-size:13px;line-height:1.2;color:${s.sel === c.key ? 'var(--f-sel-testo,#B13733)' : 'var(--f-testo,#3B3F45)'};`""")

sub("""        ? `flex:1 1 auto;min-height:0;overflow-y:auto;background:#F5F6F7;padding:14px 16px 18px;`
        : `border-top:1px solid #E1E3E5;background:#F5F6F7;padding:14px 16px 16px;`,""",
    """        ? `flex:1 1 auto;min-height:0;overflow-y:auto;background:var(--f-grigio,#F5F6F7);padding:14px 16px 18px;`
        : `border-top:1px solid var(--f-filo,#E1E3E5);background:var(--f-grigio,#F5F6F7);padding:14px 16px 16px;`,""")
sub("width:28px;height:28px;color:#9CA3AF;", "width:28px;height:28px;color:var(--f-tenue,#9CA3AF);")
sub("min-height:0;border-top:1px solid #E1E3E5;`", "min-height:0;border-top:1px solid var(--f-filo,#E1E3E5);`")

# La scheda a tutto pannello serviva perche' su tablet il riquadro era basso.
# Nella fascia la colonna e' alta quanto lo schermo e lista e scheda ci stanno
# insieme: il modo compatto resta solo per i fogli.
sub("window.matchMedia('(max-width:1280px),(pointer:coarse)')",
    "window.matchMedia(Component.MOBILE)", 2)

sub("""    stage.style.cssText = 'display:block;width:100%;height:100%';""",
    """    /* Riempie la cella della griglia: il :host di three-d-stage nasce
       height:100vh, che dentro una riga della griglia sarebbe di troppo. */
    stage.style.cssText = 'position:absolute;inset:0;display:block;width:auto;height:auto';""")

# L'inquadratura segue la cella anche quando cambia senza che cambi la
# finestra — il carattere che arriva, le fasce che si allargano.
sub("""    this.setView('Assonometria');
    this.setState({ ready: true });""",
    """    this.setView('Assonometria');
    this.ro = new ResizeObserver(() => this.onResize());
    this.ro.observe(this.hostEl);
    this.setState({ ready: true });""")
sub("""    if (this.tween) cancelAnimationFrame(this.tween);
    clearTimeout(this.tweenEnd);""",
    """    if (this.ro) this.ro.disconnect();
    if (this.tween) cancelAnimationFrame(this.tween);
    clearTimeout(this.tweenEnd);""")

# Rotazione automatica: l'esportazione la ferma al primo trascinamento. Qui
# anche al primo comando dei pannelli, che i controlli non vedono passare.
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
sub("""s.view, label => {
        this.setState({ view: label }""",
    """s.view, label => {
        this.stopSpin();
        this.setState({ view: label }""")
sub("""s.interposto, label => {
        this.setState({ interposto: label }""",
    """s.interposto, label => {
        this.stopSpin();
        this.setState({ interposto: label }""")
sub("""        const spegni = s.tamp && s.tamponamento === label;""",
    """        this.stopSpin();
        const spegni = s.tamp && s.tamponamento === label;""")
sub("""s.config, label => {
        const keep""",
    """s.config, label => {
        this.stopSpin();
        const keep""")
sub("""        onClick: () => this.setState({ [key]: !s[key] }, () => {
          this.applyVisibility();
          if (this.state.mobile) this.reframe(true);
        })""",
    """        onClick: () => {
          this.stopSpin();
          this.setState({ [key]: !s[key] }, () => {
            this.applyVisibility();
            this.reframe(true);
          });
        }""")
sub("""      onReset: () => this.setState({ sel: null, detail: false, view: 'Assonometria' }, () => {
        this.setView('Assonometria');
        this.applyVisibility();
      }),""",
    """      onReset: () => {
        this.stopSpin();
        this.setState({ sel: null, detail: false, view: 'Assonometria' }, () => {
          this.setView('Assonometria');
          this.applyVisibility();
        });
      },""")

# Sezione: la facciata vicina sta fra chi guarda e il taglio.
sub("""        m.visible = !sez || Math.abs(m.position.x + dims.LX / 2 - dims.PITCH * 3) < dims.PITCH * 2.2;""",
    """        const dentroTaglio = Math.abs(m.position.x + dims.LX / 2 - dims.PITCH * 3) < dims.PITCH * 2.2;
        /* Il tamponamento nord e' quello verso la camera: con l'involucro
           chiuso la sezione diventava un muro grigio e basta. Si toglie;
           quello di fondo resta, e fa da quinta. */
        const muroDavanti = g === this.scene.layers.pannelli_tamponamento && m.name.indexOf('_nord_') >= 0;
        m.visible = !sez || (dentroTaglio && !muroDavanti);""")

# Cambiare interposto, configurazione o posa ricostruisce i pezzi da capo, e
# i pezzi nuovi nascono visibili: senza rifare il taglio il tetto ricompariva
# intero mentre la vista era ancora la sezione.
sub("""          this.scene.setInterposto(map[label], this.state.config);
          this.applyVisibility();""",
    """          this.scene.setInterposto(map[label], this.state.config);
          this.setVisible(this.state.view);
          this.applyVisibility();""")
sub("""          this.scene.setInterposto(map[this.state.interposto], label);
          this.applyVisibility();""",
    """          this.scene.setInterposto(map[this.state.interposto], label);
          this.setVisible(this.state.view);
          this.applyVisibility();""")
sub("""          this.scene.setTamponamenti(label);
          this.applyVisibility();""",
    """          this.scene.setTamponamenti(label);
          this.setVisible(this.state.view);
          this.applyVisibility();""")

# Inquadrature. L'esportazione tiene i punti di vista composti a mano per
# l'iPad e si stringe sul volume visibile solo su telefono. Fra le due fasce la
# cella e' quasi quadrata: con i punti fissi il modello finiva piccolo e di
# lato. Qui vale ovunque la regola del telefono — mira al centro di cio' che
# si vede, distanza quanto basta — e ogni cambio di geometria reinquadra.
sub("""    const fov = (360 / Math.PI) * Math.atan(half(this.fov0) * wide);""",
    """    /* Da fuori, angolo stretto da fotografia di architettura. A 45 gradi
       l'estremita' vicina dell'edificio pesa molto piu' di quella lontana:
       l'ingombro resta centrato, ma l'occhio lo legge spostato di lato. */
    const fov = inside ? (360 / Math.PI) * Math.atan(half(this.fov0) * wide) : 30;""")
sub("""    let aim;
    if (dir && !this.state.mobile) {
      aim = this.stage._controls.target.clone();
    } else {
      aim = tv.clone();
      if (this.state.mobile && !inside && !box.isEmpty()) {
        const c0 = box.getCenter(new T.Vector3()).sub(tv);
        aim.addScaledVector(rt, c0.dot(rt)).addScaledVector(upv, c0.dot(upv));
      }
    }""",
    """    const aim = tv.clone();
    if (!inside && !box.isEmpty()) {
      const c0 = box.getCenter(new T.Vector3()).sub(tv);
      aim.addScaledVector(rt, c0.dot(rt)).addScaledVector(upv, c0.dot(upv));
    }""")
sub("""    if (!inside) {
      if (this.state.mobile) {
        radius = Math.min(Lp * 4, Math.max(Lp * 0.4, fit * 1.06));
      } else {
        const ref = reach(half(this.fov0) * 1.6, half(this.fov0));
        radius = Lp * (ref > 0 ? Math.max(1, fit / ref) : 1);
      }
    }""",
    """    if (!inside) radius = Math.min(Lp * 4, Math.max(Lp * 0.4, fit * 1.06));""")
sub("""          if (this.state.mobile) this.reframe(true);""",
    """          this.reframe(true);""", 3)

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
