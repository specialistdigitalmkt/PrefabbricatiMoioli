/* Raccolta dati Moioli — logica della pagina.
   Le domande sono dati: aggiungerne una significa aggiungere un oggetto qui. */
(function () {
  'use strict';

  const SOLUZIONI = ['Tecnoshed', 'Stegos', 'Tecnowing', 'Tegolo TT', 'Bacacier', 'Doppia falda', 'Coverplan'];
  const CONSEGNE_DISEGNI = [
    'Sezione trasversale della copertura',
    'Stratigrafia del pacchetto (strato per strato)',
    'Soluzioni e varianti (interposti, lucernari, fotovoltaico…)',
  ];

  const REPARTI = [
    { id: 'UT', nome: 'Ufficio tecnico' },
    { id: 'MC', nome: 'Commerciale e marketing' },
    { id: 'LW', nome: 'Legale e web' },
  ];

  const DOMANDE = [
    {
      id: 'PR-01', reparto: 'UT', tipo: 'promemoria',
      titolo: 'Check dati cataloghi tecnici',
      testo: 'I valori dei sei cataloghi — resistenza al fuoco, luci libere, pendenze, altezze delle travi — sono in verifica. Finché questa voce non è spuntata, i numeri pubblicati sul sito restano marcati come da approvare.',
      spunta: 'Verifica completata: i valori in pagina sono corretti',
    },

    ...SOLUZIONI.map((s, i) => ({
      id: 'UT-0' + (i + 1), reparto: 'UT', tipo: 'file',
      titolo: 'Disegni 2D — ' + s,
      testo: s === 'Coverplan'
        ? 'È l’unica soluzione senza alcun materiale. Con i disegni può nascere la sua pagina.'
        : 'Sul sito sostituiscono lo schema segnaposto della sezione interattiva. Servono anche fuori dal sito: offerte, schede tecniche, presentazioni.',
      dove: s === 'Coverplan' ? 'Pagina Coverplan (da creare)' : 'Scheda ' + s + ' › sezione 02',
      consegne: CONSEGNE_DISEGNI,
      formati: 'DWG, DXF, PDF vettoriale o SVG',
    })),

    {
      id: 'MC-01', reparto: 'MC', tipo: 'realizzazioni',
      titolo: 'Realizzazioni: nomi e dati di commessa',
      testo: 'Venticinque lavori sono in pagina con le foto, ma 19 non hanno un nome e nessuno ha i dati. I primi sei hanno il nome della cartella d’archivio: confermalo o correggilo.',
      dove: 'Progetti › griglia e schede',
    },
    {
      id: 'MC-02', reparto: 'MC', tipo: 'rivestimenti',
      facoltativa: true,
      titolo: 'Rivestimenti: codici delle finiture',
      testo: 'Facoltativa. I nomi li recuperiamo noi; se per qualche campione il codice esiste, scrivilo qui. Tutti i campi si possono lasciare vuoti.',
      dove: 'Soluzioni › Rivestimenti',
    },
    {
      id: 'MC-03', reparto: 'MC', tipo: 'testo-file',
      titolo: 'Lavori realizzati in chiavi in mano',
      testo: 'Foto e dati dei lavori consegnati chiavi in mano. In pagina compaiono solo col marchio Moioli.',
      dove: 'Chiavi in mano › Realizzazioni',
      campi: [{ k: 'elenco', label: 'Un lavoro per riga: committente, comune, anno', righe: 5, esempio: 'Nome committente — Comune — 2023' }],
      formati: 'JPG, almeno 2000 px sul lato lungo',
    },


    {
      id: 'LW-01', reparto: 'LW', tipo: 'testo',
      titolo: 'Chi riceve le richieste dal modulo contatti',
      testo: 'Oggi il modulo controlla i campi ma non invia nulla.',
      dove: 'Contatti › modulo',
      campi: [{ k: 'email', label: 'Indirizzo email di destinazione', righe: 1, esempio: 'nome@prefabbricatimoioli.it' }],
    },
    {
      id: 'LW-02', reparto: 'LW', tipo: 'testo-file',
      titolo: 'Informativa privacy e cookie policy',
      testo: 'Obbligatoria prima della messa online, perché il modulo raccoglie dati personali.',
      dove: 'Piè di pagina e modulo contatti',
      campi: [{ k: 'link', label: 'Link alla versione in uso, se esiste', righe: 1, esempio: 'https://…' }],
      formati: 'PDF o DOCX',
    },
    {
      id: 'LW-03', reparto: 'LW', tipo: 'file',
      titolo: 'Schede tecniche da scaricare',
      testo: 'Il piè di pagina ha un blocco documentazione con le voci segnate «non ancora disponibile». Conviene caricarle dopo il check dei cataloghi.',
      dove: 'Piè di pagina › Documentazione',
      formati: 'PDF',
    },
  ];

  const MEDIA = window.MEDIA || { real: [], riv: [] };

  /* ---------------- stato ---------------- */
  const stato = { risposte: {}, realizzazioni: {}, rivestimenti: {} };
  /* Cartella condivisa per disegni e foto: i file non passano dal sito. */
  const DRIVE = 'https://drive.google.com/drive/folders/1l7m9fmNjsR6x4r4UPu3M1L0VH7x-C2uX?usp=sharing';
  const API = '/api/raccolta';
  let chiave = '';
  let collegato = false;
  let filtro = 'tutti';
  let soloDaFare = false;

  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, attrs = {}, ...figli) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? '' : v);
    }
    for (const f of figli.flat()) if (f != null) n.append(f.nodeType ? f : document.createTextNode(f));
    return n;
  };

  const nome = () => { try { return localStorage.getItem('moioli-raccolta-nome') || ''; } catch { return ''; } };

  /* ---------------- salvataggio ---------------- */
  const coda = new Map();
  let inVolo = 0;
  function mostraSalvataggio(t, cls) {
    const s = $('#salvataggio');
    s.textContent = t;
    s.dataset.stato = cls;
  }
  function salva(collezione, id, dati) {
    stato[collezione][id] = { ...(stato[collezione][id] || {}), ...dati, da: nome() || null, aggiornato: new Date().toISOString() };
    aggiornaAvanzamento();
    if (!collegato) return;
    const chiaveCoda = collezione + '/' + id;
    clearTimeout(coda.get(chiaveCoda));
    mostraSalvataggio('Modifiche in corso…', 'lavoro');
    coda.set(chiaveCoda, setTimeout(async () => {
      coda.delete(chiaveCoda);
      inVolo++;
      mostraSalvataggio('Salvataggio…', 'lavoro');
      try {
        const r = await chiama('PUT', { collezione, id, dati: stato[collezione][id] });
        if (!r.ok) throw new Error(r.messaggio || 'errore ' + r.status);
        inVolo--;
        if (!inVolo && !coda.size) mostraSalvataggio('Tutto salvato', 'ok');
      } catch (e) {
        inVolo--;
        mostraSalvataggio('Non salvato: ' + (e && e.message ? e.message : 'riprova tra poco'), 'errore');
      }
    }, 700));
  }

  /* ---------------- completezza ---------------- */
  function fatta(d) {
    const r = stato.risposte[d.id] || {};
    return !!r.verificato;
  }
  function compilata(d) {
    const r = stato.risposte[d.id] || {};
    if (d.tipo === 'realizzazioni') return MEDIA.real.some((x) => (stato.realizzazioni[x.slug] || {}).nome);
    if (d.tipo === 'rivestimenti') return MEDIA.riv.some((x) => (stato.rivestimenti[x.id] || {}).codice);
    const v = r.valori || {};
    return Object.values(v).some((x) => x && (typeof x !== 'object' || Object.keys(x).length)) || (r.file && r.file.length) || !!r.nota;
  }
  function statoDomanda(d) {
    if (fatta(d)) return ['Verificato', 'ok'];
    if (compilata(d)) return ['Bozza', 'bozza'];
    return ['Da fare', 'vuota'];
  }

  function aggiornaAvanzamento() {
    let tot = 0, ok = 0;
    for (const rep of REPARTI) {
      const qs = DOMANDE.filter((d) => d.reparto === rep.id && !d.facoltativa);
      const n = qs.filter(fatta).length;
      tot += qs.length; ok += n;
      const voce = $('[data-rep="' + rep.id + '"]');
      if (voce) {
        voce.querySelector('.rep-conto').textContent = n + '/' + qs.length;
        voce.querySelector('.rep-barra i').style.width = (100 * n / qs.length) + '%';
      }
    }
    $('#tot-conto').textContent = ok + ' di ' + tot;
    $('#tot-barra i').style.width = (100 * ok / tot) + '%';
    for (const d of DOMANDE) {
      const card = document.getElementById('q-' + d.id);
      if (!card) continue;
      const [t, c] = d.facoltativa && !fatta(d) && !compilata(d) ? ['Facoltativa', 'vuota'] : statoDomanda(d);
      const chip = card.querySelector('.chip');
      chip.textContent = t;
      chip.dataset.stato = c;
      card.hidden = (filtro !== 'tutti' && d.reparto !== filtro) || (soloDaFare && fatta(d));
      if (d.tipo === 'realizzazioni') card.querySelector('.griglia-conto').textContent = MEDIA.real.filter((x) => (stato.realizzazioni[x.slug] || {}).nome).length + ' di ' + MEDIA.real.length + ' con nome';
      if (d.tipo === 'rivestimenti') card.querySelector('.griglia-conto').textContent = MEDIA.riv.filter((x) => (stato.rivestimenti[x.id] || {}).codice).length + ' di ' + MEDIA.riv.length + ' con codice';
    }
    for (const sez of document.querySelectorAll('.reparto')) {
      sez.hidden = ![...sez.querySelectorAll('.domanda')].some((c) => !c.hidden);
    }
    const vuoto = ![...document.querySelectorAll('.domanda')].some((c) => !c.hidden);
    $('#nulla').hidden = !vuoto;
  }

  /* ---------------- campi ---------------- */
  const valori = (d) => (stato.risposte[d.id] || {}).valori || {};
  function setValore(d, k, v) {
    salva('risposte', d.id, { valori: { ...valori(d), [k]: v } });
  }

  function campoTesto(d, c) {
    const id = 'f-' + d.id + '-' + c.k;
    const attrs = { id, 'data-q': d.id, 'data-k': c.k, placeholder: c.esempio || '', oninput: (e) => setValore(d, c.k, e.target.value) };
    const input = c.righe > 1 ? el('textarea', { ...attrs, rows: c.righe }) : el('input', { ...attrs, type: 'text' });
    return el('div', { class: 'campo' }, el('label', { for: id, text: c.label }), input);
  }

  function blocoScelta(d) {
    const nomeGruppo = 'f-' + d.id + '-scelta';
    const wrap = el('fieldset', { class: 'scelte' }, el('legend', { class: 'vh', text: d.titolo }));
    d.opzioni.forEach((o, i) => {
      const id = nomeGruppo + '-' + i;
      wrap.append(el('label', { class: 'scelta', for: id },
        el('input', { type: 'radio', name: nomeGruppo, id, value: String(i), 'data-q': d.id, 'data-k': 'scelta', onchange: () => { setValore(d, 'scelta', o); sincronizzaAltro(d); } }),
        el('span', { text: o })));
    });
    if (d.altro != null) {
      const id = 'f-' + d.id + '-altro';
      wrap.append(el('div', { class: 'campo altro', 'data-altro': d.id, hidden: true },
        el('label', { for: id, text: 'Scrivi quale' }),
        el('input', { type: 'text', id, 'data-q': d.id, 'data-k': 'altro', oninput: (e) => setValore(d, 'altro', e.target.value) })));
    }
    return wrap;
  }
  function sincronizzaAltro(d) {
    if (d.altro == null) return;
    const box = document.querySelector('[data-altro="' + d.id + '"]');
    if (box) box.hidden = valori(d).scelta !== d.opzioni[d.altro];
  }

  function bloccoConferme(d) {
    const lista = el('div', { class: 'conferme' });
    for (const v of d.voci) {
      const base = 'f-' + d.id + '-' + v.k;
      const riga = el('div', { class: 'conferma' },
        el('div', { class: 'conferma-attuale' },
          el('span', { class: 'conf-it', text: v.it }),
          el('span', { class: 'conf-freccia', 'aria-hidden': 'true', text: '→' }),
          el('code', { text: v.en })),
        el('div', { class: 'conferma-azioni', role: 'group', 'aria-label': 'Valutazione di ' + v.it },
          el('button', { type: 'button', class: 'mini', 'data-conf': base, 'data-val': 'ok', onclick: () => { setValore(d, v.k, { esito: 'confermo' }); sincronizzaConferme(d); } }, 'Confermo'),
          el('button', { type: 'button', class: 'mini', 'data-conf': base, 'data-val': 'no', onclick: () => { setValore(d, v.k, { esito: 'correggo', con: (valori(d)[v.k] || {}).con || '' }); sincronizzaConferme(d); document.getElementById(base + '-con')?.focus(); } }, 'Correggo')),
        el('div', { class: 'campo correzione', hidden: true, 'data-corr': base },
          el('label', { for: base + '-con', text: 'Valore corretto' }),
          el('input', { type: 'text', id: base + '-con', oninput: (e) => setValore(d, v.k, { esito: 'correggo', con: e.target.value }) })));
      lista.append(riga);
    }
    return lista;
  }
  function sincronizzaConferme(d) {
    if (d.tipo !== 'conferme') return;
    for (const v of d.voci) {
      const base = 'f-' + d.id + '-' + v.k;
      const val = valori(d)[v.k] || {};
      document.querySelectorAll('[data-conf="' + base + '"]').forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.val === 'ok' && val.esito === 'confermo') || (b.dataset.val === 'no' && val.esito === 'correggo'))));
      const corr = document.querySelector('[data-corr="' + base + '"]');
      if (corr) corr.hidden = val.esito !== 'correggo';
      const inp = document.getElementById(base + '-con');
      if (inp && document.activeElement !== inp) inp.value = val.con || '';
    }
  }

  function bloccoConsegne(d) {
    const box = el('fieldset', { class: 'consegne' }, el('legend', { text: 'Cosa serve' }));
    d.consegne.forEach((c, i) => {
      const id = 'f-' + d.id + '-cons-' + i;
      box.append(el('label', { class: 'spunta', for: id },
        el('input', { type: 'checkbox', id, 'data-q': d.id, 'data-cons': i, onchange: (e) => { const arr = [...(valori(d).consegne || [])]; arr[i] = e.target.checked; setValore(d, 'consegne', arr); } }),
        el('span', { text: c })));
    });
    return box;
  }

  function bloccoFile(d) {
    const id = 'f-' + d.id + '-caricati';
    return el('div', { class: 'file-zona', 'data-zona': d.id },
      el('p', { class: 'file-formati' },
        'Carica i file nella cartella condivisa, in una sottocartella chiamata ',
        el('code', { text: d.id + ' ' + d.titolo.replace(/^Disegni 2D — /, '') }),
        '. Formati: ' + (d.formati || 'qualsiasi') + '.'),
      el('a', { class: 'bottone secondario', href: DRIVE, target: '_blank', rel: 'noopener' }, 'Apri la cartella Drive ↗'),
      el('label', { class: 'spunta', for: id },
        el('input', { type: 'checkbox', id, 'data-q': d.id, 'data-k': 'caricati', onchange: (e) => setValore(d, 'caricati', e.target.checked) }),
        el('span', { text: 'File caricati nella cartella' })));
  }

  function bloccoRealizzazioni(d) {
    const coperture = ['—', ...SOLUZIONI, 'Altra / mista'];
    const wrap = el('div', { class: 'griglia-wrap' }, el('p', { class: 'griglia-conto' }));
    const lista = el('div', { class: 'realizzazioni' });
    for (const r of MEDIA.real) {
      const b = 'r-' + r.slug;
      const inp = (k, label, extra = {}) => el('div', { class: 'campo stretto' },
        el('label', { for: b + '-' + k, text: label }),
        el('input', { type: 'text', id: b + '-' + k, 'data-real': r.slug, 'data-k': k, oninput: (e) => salva('realizzazioni', r.slug, { [k]: e.target.value }), ...extra }));
      lista.append(el('article', { class: 'real' },
        el('img', { src: r.thumb, alt: 'Fotografia della ' + r.etichetta.toLowerCase(), width: 240, height: 160, loading: 'lazy' }),
        el('div', { class: 'real-campi' },
          el('p', { class: 'real-etichetta' }, el('code', { text: r.slug }), r.titolo ? el('span', { text: 'nome d’archivio: ' + r.titolo }) : null),
          el('div', { class: 'real-riga' },
            inp('nome', 'Nome da pubblicare', { placeholder: r.titolo || '' }),
            r.titolo ? el('button', { type: 'button', class: 'mini', onclick: () => { document.getElementById(b + '-nome').value = r.titolo; salva('realizzazioni', r.slug, { nome: r.titolo }); } }, 'Usa quello d’archivio') : null),
          el('div', { class: 'real-riga' },
            inp('comune', 'Comune'),
            inp('anno', 'Anno', { inputmode: 'numeric', maxlength: 4 }),
            inp('superficie', 'Superficie m²', { inputmode: 'numeric' }),
            el('div', { class: 'campo stretto' },
              el('label', { for: b + '-copertura', text: 'Copertura' }),
              el('select', { id: b + '-copertura', 'data-real': r.slug, 'data-k': 'copertura', onchange: (e) => salva('realizzazioni', r.slug, { copertura: e.target.value }) },
                coperture.map((c) => el('option', { value: c === '—' ? '' : c, text: c }))))))));
    }
    wrap.append(lista);
    return wrap;
  }

  function bloccoRivestimenti(d) {
    const wrap = el('div', { class: 'griglia-wrap' }, el('p', { class: 'griglia-conto' }));
    const lista = el('div', { class: 'rivestimenti' });
    for (const v of MEDIA.riv) {
      const b = 'v-' + v.id;
      lista.append(el('article', { class: 'riv' },
        el('img', { src: v.thumb, alt: 'Campione di finitura ' + v.id, width: 112, height: 112, loading: 'lazy' }),
        el('div', { class: 'riv-campi' },
          el('code', { class: 'riv-id', text: v.id }),
          el('label', { for: b + '-codice', class: 'vh', text: 'Codice di ' + v.id }),
          el('input', { type: 'text', id: b + '-codice', placeholder: 'Codice', 'data-riv': v.id, 'data-k': 'codice', oninput: (e) => salva('rivestimenti', v.id, { codice: e.target.value }) }),
          el('label', { for: b + '-nome', class: 'vh', text: 'Nome di ' + v.id }),
          el('input', { type: 'text', id: b + '-nome', placeholder: 'Nome', 'data-riv': v.id, 'data-k': 'nome', oninput: (e) => salva('rivestimenti', v.id, { nome: e.target.value }) }),
          el('label', { for: b + '-famiglia', class: 'vh', text: 'Famiglia di ' + v.id }),
          el('input', { type: 'text', id: b + '-famiglia', placeholder: 'Famiglia (facolt.)', 'data-riv': v.id, 'data-k': 'famiglia', oninput: (e) => salva('rivestimenti', v.id, { famiglia: e.target.value }) }))));
    }
    wrap.append(lista);
    return wrap;
  }

  /* ---------------- domanda ---------------- */
  function domanda(d) {
    const corpo = el('div', { class: 'corpo' });
    if (d.tipo === 'testo' || d.tipo === 'testo-file') d.campi.forEach((c) => corpo.append(campoTesto(d, c)));
    if (d.tipo === 'scelta' || d.tipo === 'scelta-file') corpo.append(blocoScelta(d));
    if (d.tipo === 'conferme') corpo.append(bloccoConferme(d));
    if (d.consegne) corpo.append(bloccoConsegne(d));
    if (d.tipo === 'file' || d.tipo === 'testo-file' || d.tipo === 'scelta-file') corpo.append(bloccoFile(d));
    if (d.tipo === 'realizzazioni') corpo.append(bloccoRealizzazioni(d));
    if (d.tipo === 'rivestimenti') corpo.append(bloccoRivestimenti(d));

    const notaId = 'f-' + d.id + '-nota';
    const verId = 'f-' + d.id + '-verificato';
    const piede = el('div', { class: 'piede' });
    if (d.tipo !== 'promemoria') {
      piede.append(el('div', { class: 'campo nota' },
        el('label', { for: notaId, text: 'Nota (facoltativa)' }),
        el('input', { type: 'text', id: notaId, 'data-q': d.id, 'data-k': '__nota', placeholder: 'Dubbi, dove trovare i file, chi sentire…', oninput: (e) => salva('risposte', d.id, { nota: e.target.value }) })));
    }
    piede.append(el('label', { class: 'verifica', for: verId },
      el('input', { type: 'checkbox', id: verId, 'data-q': d.id, 'data-k': '__verificato', onchange: (e) => salva('risposte', d.id, { verificato: e.target.checked }) }),
      el('span', { text: d.spunta || 'Confermo: questi dati sono verificati e si possono pubblicare' })));

    return el('article', { class: 'domanda' + (d.tipo === 'promemoria' ? ' promemoria' : ''), id: 'q-' + d.id },
      el('header', { class: 'domanda-testa' },
        el('div', { class: 'domanda-meta' },
          el('code', { class: 'codice', text: d.id }),
          el('span', { class: 'chip', 'data-stato': 'vuota', text: 'Da fare' })),
        el('h3', { text: d.titolo }),
        el('p', { class: 'domanda-testo', text: d.testo }),
        d.dove ? el('p', { class: 'dove' }, el('span', { text: 'Dove va: ' }), d.dove) : null),
      corpo,
      piede);
  }

  /* ---------------- applica i dati salvati ai campi ---------------- */
  function applica() {
    for (const d of DOMANDE) {
      const r = stato.risposte[d.id] || {};
      const v = r.valori || {};
      document.querySelectorAll('[data-q="' + d.id + '"]').forEach((n) => {
        if (n === document.activeElement) return;
        const k = n.dataset.k;
        if (n.dataset.cons != null) { n.checked = !!(v.consegne || [])[+n.dataset.cons]; return; }
        if (k === '__verificato') { n.checked = !!r.verificato; return; }
        if (k === '__nota') { n.value = r.nota || ''; return; }
        if (n.type === 'radio') { n.checked = v.scelta === d.opzioni[+n.value]; return; }
        if (n.type === 'checkbox') { n.checked = !!v[k]; return; }
        if (k && typeof v[k] === 'string') n.value = v[k];
      });
      sincronizzaAltro(d);
      sincronizzaConferme(d);
    }
    for (const [coll, attr] of [['realizzazioni', 'data-real'], ['rivestimenti', 'data-riv']]) {
      document.querySelectorAll('[' + attr + ']').forEach((n) => {
        if (n === document.activeElement) return;
        const doc = stato[coll][n.getAttribute(attr)] || {};
        n.value = doc[n.dataset.k] || '';
      });
    }
    aggiornaAvanzamento();
  }

  /* ---------------- impaginazione ---------------- */
  function monta() {
    const nav = $('#reparti');
    nav.append(el('button', { type: 'button', class: 'rep attivo', 'data-filtro': 'tutti', 'aria-pressed': 'true', onclick: () => scegliFiltro('tutti') },
      el('span', { class: 'rep-nome', text: 'Tutti i reparti' })));
    for (const rep of REPARTI) {
      nav.append(el('button', { type: 'button', class: 'rep', 'data-rep': rep.id, 'data-filtro': rep.id, 'aria-pressed': 'false', onclick: () => scegliFiltro(rep.id) },
        el('span', { class: 'rep-sigla', text: rep.id }),
        el('span', { class: 'rep-nome', text: rep.nome }),
        el('span', { class: 'rep-conto', text: '0/0' }),
        el('span', { class: 'rep-barra', 'aria-hidden': 'true' }, el('i'))));
    }
    const main = $('#domande');
    for (const rep of REPARTI) {
      const qs = DOMANDE.filter((d) => d.reparto === rep.id);
      main.append(el('section', { class: 'reparto', 'aria-labelledby': 'h-' + rep.id },
        el('h2', { id: 'h-' + rep.id }, el('span', { class: 'rep-sigla', text: rep.id }), rep.nome),
        qs.map(domanda)));
    }

    const campoNome = $('#chi');
    campoNome.value = nome();
    campoNome.addEventListener('input', (e) => { try { localStorage.setItem('moioli-raccolta-nome', e.target.value); } catch {} });
    $('#solo-da-fare').addEventListener('change', (e) => { soloDaFare = e.target.checked; aggiornaAvanzamento(); });
    aggiornaAvanzamento();
  }
  function scegliFiltro(f) {
    filtro = f;
    document.querySelectorAll('.rep').forEach((b) => {
      const on = b.dataset.filtro === f;
      b.classList.toggle('attivo', on);
      b.setAttribute('aria-pressed', String(on));
    });
    aggiornaAvanzamento();
    $('#domande').scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  /* ---------------- avvio ---------------- */
  monta();
  mostraSalvataggio('Collegamento…', 'lavoro');

  async function chiama(metodo, corpo) {
    try {
      const r = await fetch(API, {
        method: metodo,
        headers: { 'x-raccolta-chiave': chiave, ...(corpo ? { 'content-type': 'application/json' } : {}) },
        body: corpo ? JSON.stringify(corpo) : undefined,
        cache: 'no-store',
      });
      const j = await r.json().catch(() => ({}));
      return { ok: r.ok, status: r.status, errore: j.errore, messaggio: j.messaggio, stato: j.stato };
    } catch {
      return { ok: false, status: 0, messaggio: 'connessione assente' };
    }
  }

  function ricevi(remoto) {
    for (const coll of ['risposte', 'realizzazioni', 'rivestimenti']) {
      for (const [id, doc] of Object.entries(remoto[coll] || {})) {
        if (coda.has(coll + '/' + id)) continue; /* modifica locale non ancora inviata: vince la locale */
        stato[coll][id] = doc;
      }
    }
    applica();
  }

  async function aggiorna() {
    if (!collegato || document.hidden || coda.size || inVolo) return;
    const r = await chiama('GET');
    if (r.ok) ricevi(r.stato);
    else if (r.status === 401) esci('La password è cambiata: inseriscila di nuovo.');
  }

  function esci(msg) {
    collegato = false;
    try { sessionStorage.removeItem('moioli-raccolta-chiave'); } catch {}
    $('#accesso').hidden = false;
    $('#accesso-errore').textContent = msg || '';
    $('#accesso-password').focus();
  }

  async function entra(pw) {
    const btn = $('#accesso-invia');
    btn.disabled = true;
    btn.textContent = 'Verifico…';
    $('#accesso-errore').textContent = '';
    chiave = pw;
    const r = await chiama('GET');
    btn.disabled = false;
    btn.textContent = 'Entra';
    if (!r.ok) {
      esci(r.status === 401 ? 'Password non corretta.' : (r.messaggio || 'Archivio non raggiungibile, riprova tra poco.'));
      return;
    }
    try { sessionStorage.setItem('moioli-raccolta-chiave', pw); } catch {}
    collegato = true;
    $('#accesso').hidden = true;
    mostraSalvataggio('Tutto salvato', 'ok');
    ricevi(r.stato);
  }

  $('#accesso-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const pw = $('#accesso-password').value;
    if (pw) entra(pw);
  });
  setInterval(aggiorna, 45000);
  document.addEventListener('visibilitychange', aggiorna);

  let salvata = '';
  try { salvata = sessionStorage.getItem('moioli-raccolta-chiave') || ''; } catch {}
  if (salvata) entra(salvata);
  else mostraSalvataggio('In attesa della password', 'lavoro');
})();
