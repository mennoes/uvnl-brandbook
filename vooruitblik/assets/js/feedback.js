/* Feedback & reacties op de website, met pins op exacte plekken (zoals comments in Figma). Geen dependencies.
 * - Algemene reactie per pagina, of een pin op een precieze plek; op een pin kun je antwoorden.
 * - Een pin hangt aan het element waarop is geklikt (positie binnen dat element), met de
 *   paginapositie als reserve. Daardoor blijft hij op de juiste plek bij ander schermformaat.
 * - Alleen voor de redactie: de knop verschijnt pas na ?redactie in de URL (blijft onthouden; ?redactie=uit zet hem weer uit).
 * - Opslag: Supabase (REST) als die is ingesteld, anders localStorage (voorbeeldmodus).
 * - Reacties worden altijd als tekst getoond (nooit als HTML).
 */
(function () {
  var cfg = window.VB_FEEDBACK || {};
  if (cfg.enabled === false) return;
  var d = document, de = d.documentElement;
  var remote = !!(cfg.supabaseUrl && cfg.supabaseKey);
  var LS_ED = 'vb-redactie', LS_DONE = 'vb-feedback-done';
  var LS = 'vb-feedback-v2', LS_NAME = 'vb-feedback-name', LS_LAST = 'vb-feedback-last', LS_PINS = 'vb-feedback-pins';
  var MAX = 1000, MIN_GAP = 8000;
  var FIELDS = 'id,page,name,body,created_at,sel,ox,oy,xp,yp,parent_id,ctx,done';
  try {
    var em = /[?&](?:redactie|feedback)(?:=([^&#]*))?/.exec(location.search);
    if (em) { if (em[1] === 'uit' || em[1] === '0') localStorage.removeItem(LS_ED); else localStorage.setItem(LS_ED, '1'); }
  } catch (e) { /* geen opslag beschikbaar */ }
  if (cfg.editorOnly !== false && lsGet(LS_ED) !== '1') return;

  /* ── opslaghulpjes (localStorage kan ontbreken of geblokkeerd zijn) ── */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* negeren */ } }

  /* sleutel van de huidige pagina, onafhankelijk van waar de site staat */
  var page = (function () {
    var p = location.pathname.replace(/index\.html$/, '');
    var i = p.indexOf('/vooruitblik/');
    if (i > -1) p = p.slice(i + 13);
    p = p.replace(/^\/+|\/+$/g, '');
    return p || 'home';
  })();

  /* ── data-laag ── */
  function headers(extra) {
    var h = { apikey: cfg.supabaseKey, 'Content-Type': 'application/json' };
    if (/^eyJ/.test(cfg.supabaseKey)) h.Authorization = 'Bearer ' + cfg.supabaseKey;
    for (var k in extra) h[k] = extra[k];
    return h;
  }
  function api(path, opts) {
    return fetch(cfg.supabaseUrl.replace(/\/+$/, '') + '/rest/v1/' + (cfg.table || 'comments') + path, opts).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }
  function list(scope) {
    if (remote) {
      var q = '?select=' + FIELDS + '&order=created_at.asc&limit=500' + (scope === 'page' ? '&page=eq.' + encodeURIComponent(page) : '');
      return api(q, { headers: headers({}) });
    }
    var all = [];
    try { all = JSON.parse(lsGet(LS) || '[]'); } catch (e) { all = []; }
    return Promise.resolve(all.filter(function (c) { return scope !== 'page' || c.page === page; }).sort(function (a, b) { return a.created_at < b.created_at ? -1 : 1; }));
  }
  function add(name, body, extra) {
    var row = { page: page, name: name || null, body: body };
    for (var k in (extra || {})) row[k] = extra[k];
    if (remote) return api('', { method: 'POST', headers: headers({ Prefer: 'return=representation' }), body: JSON.stringify(row) }).then(function (r) { return r[0] || row; });
    row.id = Date.now() + '' + Math.floor(Math.random() * 1000); row.created_at = new Date().toISOString();
    var all = [];
    try { all = JSON.parse(lsGet(LS) || '[]'); } catch (e) { all = []; }
    all.push(row); lsSet(LS, JSON.stringify(all));
    return Promise.resolve(row);
  }

  function patch(c, fields) {
    if (remote) {
      return fetch(cfg.supabaseUrl.replace(/\/+$/, '') + '/rest/v1/' + (cfg.table || 'comments') + '?id=eq.' + encodeURIComponent(c.id),
        { method: 'PATCH', headers: headers({ Prefer: 'return=minimal' }), body: JSON.stringify(fields) }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); });
    }
    var all = [];
    try { all = JSON.parse(lsGet(LS) || '[]'); } catch (e) { all = []; }
    all.forEach(function (x) { if (x.id == c.id) for (var k in fields) x[k] = fields[k]; });
    lsSet(LS, JSON.stringify(all));
    return Promise.resolve();
  }

  /* ── kleine DOM-helper ── */
  function h(tag, attrs, kids) {
    var el = d.createElement(tag);
    for (var k in (attrs || {})) {
      if (k === 'text') el.textContent = attrs[k];
      else if (k === 'class') el.className = attrs[k];
      else el.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { el.appendChild(typeof c === 'string' ? d.createTextNode(c) : c); });
    return el;
  }
  function ago(iso) {
    var s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
    if (s < 60) return 'zojuist';
    if (s < 3600) return Math.floor(s / 60) + ' min geleden';
    if (s < 86400) return Math.floor(s / 3600) + ' uur geleden';
    if (s < 86400 * 7) return Math.floor(s / 86400) + ' d geleden';
    return new Date(iso).toLocaleDateString('nl-BE', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function initials(n) { var w = (n || 'Anoniem').trim().split(/\s+/); return ((w[0][0] || '?') + (w.length > 1 ? w[w.length - 1][0] : '')).toUpperCase(); }
  function pageLabel(p) { return p === 'home' ? 'Home' : p.replace(/^hoofdstuk\//, 'Hoofdstuk: ').replace(/\.html$/, '').replace(/-/g, ' '); }
  var COLORS = ['purple', 'yellow', 'pink', 'blue'];
  function rootOf(c, items) { return c.parent_id == null ? c : (items.find(function (x) { return x.id == c.parent_id; }) || c); }
  function isDone(c, items) { return !!rootOf(c, items).done; }
  function isPin(c) { return c.sel != null || c.xp != null; }
  function inWidget(el) { return !!(el && el.closest && el.closest('[data-fb]')); }

  /* ── pins: een element terugvinden en positie bepalen ── */
  function cssEsc(s) { return (window.CSS && CSS.escape) ? CSS.escape(s) : s.replace(/[^\w-]/g, '\\$&'); }
  function pathFor(el) {
    var parts = [];
    while (el && el.nodeType === 1 && el !== d.body) {
      if (el.id) { parts.unshift('#' + cssEsc(el.id)); return parts.join(' > '); }
      var n = 1, s = el;
      while ((s = s.previousElementSibling)) if (s.tagName === el.tagName) n++;
      parts.unshift(el.tagName.toLowerCase() + ':nth-of-type(' + n + ')');
      el = el.parentElement;
    }
    return 'body > ' + parts.join(' > ');
  }
  function anchorFrom(e) {
    var el = e.target, r = el.getBoundingClientRect(), out = { xp: +(e.pageX / de.scrollWidth).toFixed(4), yp: Math.round(e.pageY), ctx: ((el.innerText || el.getAttribute('alt') || '').replace(/\s+/g, ' ').trim().slice(0, 160)) || null };
    if (r.width > 0 && r.height > 0) {
      out.sel = pathFor(el);
      out.ox = +((e.clientX - r.left) / r.width).toFixed(4);
      out.oy = +((e.clientY - r.top) / r.height).toFixed(4);
    }
    return out;
  }
  function posOf(c) {
    if (c.sel) {
      var el = null;
      try { el = d.querySelector(c.sel); } catch (e) { el = null; }
      if (el) {
        var r = el.getBoundingClientRect();
        if (r.width > 0 || r.height > 0) return { x: r.left + window.scrollX + c.ox * r.width, y: r.top + window.scrollY + c.oy * r.height };
      }
    }
    return { x: (c.xp || 0) * de.scrollWidth, y: c.yp || 0 };
  }

  /* ── toestand ── */
  var scope = 'page', timer = null, open = false, pinning = false, showPins = lsGet(LS_PINS) !== '0', showDone = lsGet(LS_DONE) === '1';
  var pageItems = [], allItems = [], activePin = null, draft = null;

  /* ── interface: knop en paneel ── */
  var badge = h('span', { class: 'fb-badge', 'aria-hidden': 'true', hidden: '' });
  var toggle = h('button', { class: 'fb-toggle', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'fb-panel', 'data-fb': '' }, [h('span', { text: 'Feedback' }), badge]);
  var tabPage = h('button', { class: 'fb-tab', type: 'button', 'aria-pressed': 'true', text: 'Deze pagina' });
  var tabAll = h('button', { class: 'fb-tab', type: 'button', 'aria-pressed': 'false', text: 'Alle pagina’s' });
  var closeBtn = h('button', { class: 'fb-close', type: 'button', 'aria-label': 'Feedback sluiten', text: '×' });
  var pinBtn = h('button', { class: 'fb-pinbtn', type: 'button', text: 'Pin plaatsen' });
  var pinsChk = h('input', { type: 'checkbox', id: 'fb-showpins' }); pinsChk.checked = showPins;
  var doneChk = h('input', { type: 'checkbox', id: 'fb-showdone' }); doneChk.checked = showDone;
  var copyBtn = h('button', { class: 'fb-copy', type: 'button', text: 'Kopieer open feedback' });
  var exitLink = h('button', { class: 'fb-exit', type: 'button', text: 'Redactiemodus uitzetten' });
  var ul = h('ul', { class: 'fb-list', 'aria-live': 'polite' });
  var nameIn = h('input', { id: 'fb-name', type: 'text', maxlength: '60', autocomplete: 'name', placeholder: 'Je naam (optioneel)' });
  var bodyIn = h('textarea', { id: 'fb-body', maxlength: String(MAX), rows: '3', placeholder: 'Algemene opmerking over deze pagina…', required: '' });
  var trap = h('input', { class: 'fb-trap', type: 'text', name: 'website', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true' });
  var count = h('span', { class: 'fb-count', text: '0 / ' + MAX });
  var send = h('button', { class: 'fb-send', type: 'submit', text: 'Plaats feedback' });
  var status = h('p', { class: 'fb-status', role: 'status' });
  var form = h('form', { class: 'fb-form', novalidate: '' }, [
    h('label', { class: 'sr', for: 'fb-name', text: 'Je naam' }), nameIn,
    h('label', { class: 'sr', for: 'fb-body', text: 'Je feedback' }), bodyIn, trap,
    h('div', { class: 'fb-row' }, [count, send]), status
  ]);
  var notice = remote ? null : h('p', { class: 'fb-notice', text: 'Voorbeeldmodus: reacties en pins blijven alleen in deze browser staan. Koppel een database om ze met iedereen te delen.' });
  var panel = h('aside', { class: 'fb-panel', id: 'fb-panel', role: 'dialog', 'aria-label': 'Feedback op de website', hidden: '', 'data-fb': '' }, [
    h('div', { class: 'fb-head' }, [h('h2', { text: 'Feedback' }), closeBtn]),
    h('div', { class: 'fb-tabs', role: 'group', 'aria-label': 'Bereik' }, [tabPage, tabAll]),
    h('div', { class: 'fb-tools' }, [pinBtn, h('label', { class: 'fb-chk', for: 'fb-showpins' }, [pinsChk, h('span', { text: 'Pins' })]), h('label', { class: 'fb-chk', for: 'fb-showdone' }, [doneChk, h('span', { text: 'Verwerkt' })])]),
    h('div', { class: 'fb-tools fb-tools2' }, [copyBtn, exitLink])
  ].concat(notice ? [notice] : []).concat([ul, form]));
  var pinLayer = h('div', { class: 'fb-pins', 'data-fb': '' });
  var hint = h('div', { class: 'fb-hint', role: 'status', 'data-fb': '', hidden: '' }, [h('span', { text: 'Klik op de plek waar je feedback wilt achterlaten' }), h('button', { type: 'button', text: 'Stoppen' })]);
  var pop = h('div', { class: 'fb-pop', role: 'dialog', 'aria-label': 'Pin', hidden: '', 'data-fb': '' });

  /* ── paneel: lijst ── */
  function roots(items) { return items.filter(function (c) { return isPin(c) && c.parent_id == null; }); }
  function pinNumber(c) { var r = roots(pageItems), i = r.findIndex(function (x) { return x.id == c.id; }); return i + 1; }

  function render() {
    var src = scope === 'page' ? pageItems : allItems;
    var items = src.filter(function (c) { return showDone || !isDone(c, src); }).reverse();
    ul.textContent = '';
    if (!items.length) {
      ul.appendChild(h('li', { class: 'fb-empty', text: scope === 'page' ? 'Geen openstaande feedback op deze pagina.' : 'Geen openstaande feedback.' }));
      return;
    }
    items.forEach(function (c, i) {
      var who = c.name || 'Anoniem', pinned = isPin(c) && c.parent_id == null, onThisPage = c.page === page;
      var meta = [h('b', { text: who }), h('span', { text: ' · ' + ago(c.created_at) })];
      var tags = [];
      if (c.parent_id != null) tags.push(h('span', { class: 'fb-tag', text: 'Antwoord' }));
      if (pinned) tags.push(h('span', { class: 'fb-tag fb-tag-pin', text: onThisPage ? 'Pin ' + pinNumber(c) : 'Pin' }));
      if (scope === 'all') tags.push(h('a', { class: 'fb-page', href: pageHref(c.page), text: pageLabel(c.page) }));
      var done = isDone(c, src), isRoot = c.parent_id == null;
      if (done && isRoot) tags.push(h('span', { class: 'fb-tag fb-tag-done', text: 'Verwerkt' }));
      var tog = isRoot ? h('button', { class: 'fb-done', type: 'button', text: done ? 'Heropenen' : 'Verwerkt' }) : null;
      if (tog) tog.addEventListener('click', function (e) { e.stopPropagation(); setDone(c, !done); });
      var li = h('li', { class: 'fb-item' + (pinned && onThisPage ? ' fb-go' : '') + (done ? ' is-done' : '') }, [
        h('span', { class: 'fb-av fb-' + COLORS[(who.length + i) % 4], 'aria-hidden': 'true', text: initials(who) }),
        h('div', {}, [h('div', { class: 'fb-meta' }, meta), h('div', { class: 'fb-tags' }, tags), h('p', { class: 'fb-text', text: c.body })].concat(tog ? [tog] : []))
      ]);
      if (pinned && onThisPage) li.addEventListener('click', function (e) { if (e.target.tagName !== 'A') { show(false); goToPin(c); } });
      ul.appendChild(li);
    });
  }
  function pageHref(p) {
    var base = location.pathname.replace(/\/vooruitblik\/.*$/, '/vooruitblik/');
    if (base === location.pathname) base = location.pathname.replace(/[^/]*$/, '').replace(/hoofdstuk\/$/, '');
    return (p === 'home' ? base : base + p);
  }
  function setBadge(n) { badge.textContent = n > 99 ? '99+' : String(n); if (n) badge.removeAttribute('hidden'); else badge.setAttribute('hidden', ''); }

  function refreshPage() {
    return list('page').then(function (items) { pageItems = items; setBadge(items.filter(function (c) { return c.parent_id == null && !c.done; }).length); renderPins(); if (scope === 'page') render(); if (activePin) refreshPop(); });
  }
  function refreshAll() {
    return list('all').then(function (items) { allItems = items; if (scope === 'all') render(); });
  }
  function loadScope() {
    var p = scope === 'page' ? refreshPage() : refreshAll();
    return p.catch(function () { ul.textContent = ''; ul.appendChild(h('li', { class: 'fb-empty', text: 'Feedback laden lukt nu niet. Probeer het later opnieuw.' })); });
  }

  /* ── pins op de pagina ── */
  function renderPins() {
    pinLayer.textContent = '';
    pinLayer.style.display = showPins ? '' : 'none';
    roots(pageItems).forEach(function (c, i) {
      if (c.done && !showDone) return;
      var p = posOf(c);
      var b = h('button', { class: 'fb-pin' + (c.done ? ' done' : '') + (activePin && activePin.id == c.id ? ' on' : ''), type: 'button', 'aria-label': 'Pin ' + (i + 1) + ': ' + c.body.slice(0, 60), text: String(i + 1), 'data-fb': '' });
      b.style.left = p.x + 'px'; b.style.top = p.y + 'px';
      b.addEventListener('click', function (e) { e.stopPropagation(); openPop(c); });
      pinLayer.appendChild(b);
    });
    if (draft) {
      var dp = h('span', { class: 'fb-pin draft', 'aria-hidden': 'true', text: String(roots(pageItems).length + 1) });
      dp.style.left = draft.pos.x + 'px'; dp.style.top = draft.pos.y + 'px';
      pinLayer.appendChild(dp);
    }
  }
  function goToPin(c) {
    var p = posOf(c);
    window.scrollTo({ top: Math.max(0, p.y - window.innerHeight / 2), behavior: 'smooth' });
    setTimeout(function () { openPop(c); }, 450);
  }

  /* ── popover bij een pin (nieuwe pin of bestaande draad) ── */
  function placePop(pos) {
    pop.removeAttribute('hidden');
    var w = pop.offsetWidth, left = pos.x + 34, maxLeft = de.scrollWidth - w - 10;
    if (left > maxLeft) left = Math.max(10, pos.x - w - 14);
    pop.style.left = Math.max(10, left) + 'px';
    pop.style.top = Math.max(10, pos.y - 30) + 'px';
  }
  function thread(root) { return [root].concat(pageItems.filter(function (c) { return c.parent_id == root.id; })); }
  function postForm(placeholder, submitLabel, onSubmit, onCancel) {
    var n = h('input', { type: 'text', maxlength: '60', placeholder: 'Je naam (optioneel)', 'aria-label': 'Je naam' }); n.value = lsGet(LS_NAME) || '';
    var t = h('textarea', { rows: '3', maxlength: String(MAX), placeholder: placeholder, 'aria-label': 'Je opmerking' });
    var st = h('p', { class: 'fb-status', role: 'status' });
    var go = h('button', { class: 'fb-send', type: 'submit', text: submitLabel });
    var kids = [n, t, h('div', { class: 'fb-row' }, [onCancel ? h('button', { class: 'fb-cancel', type: 'button', text: 'Annuleren' }) : h('span'), go]), st];
    var f = h('form', { class: 'fb-form fb-form-pop', novalidate: '' }, kids);
    if (onCancel) f.querySelector('.fb-cancel').addEventListener('click', onCancel);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var body = t.value.trim(), name = n.value.trim();
      st.className = 'fb-status';
      if (!body) { st.textContent = 'Schrijf eerst iets.'; st.className += ' err'; t.focus(); return; }
      if (Date.now() - parseInt(lsGet(LS_LAST) || '0', 10) < MIN_GAP) { st.textContent = 'Even rustig, probeer het zo opnieuw.'; st.className += ' err'; return; }
      go.disabled = true; st.textContent = 'Versturen…';
      onSubmit(name, body).then(function () { lsSet(LS_NAME, name); lsSet(LS_LAST, String(Date.now())); })
        .catch(function () { st.textContent = 'Versturen lukt nu niet. Probeer het later opnieuw.'; st.className += ' err'; go.disabled = false; });
    });
    setTimeout(function () { t.focus(); }, 30);
    return f;
  }
  function closePop() { pop.setAttribute('hidden', ''); activePin = null; draft = null; pop.textContent = ''; renderPins(); }
  function openPop(c) {
    activePin = c; draft = null; refreshPop(); renderPins();
  }
  function refreshPop() {
    var root = pageItems.find(function (x) { return x.id == activePin.id; });
    if (!root) { closePop(); return; }
    activePin = root;
    pop.textContent = '';
    var close = h('button', { class: 'fb-close', type: 'button', 'aria-label': 'Pin sluiten', text: '×' }); close.addEventListener('click', closePop);
    pop.appendChild(h('div', { class: 'fb-head' }, [h('h3', { text: 'Pin ' + pinNumber(root) }), close]));
    var tl = h('ul', { class: 'fb-list fb-thread' });
    thread(root).forEach(function (c, i) {
      var who = c.name || 'Anoniem';
      tl.appendChild(h('li', { class: 'fb-item' }, [h('span', { class: 'fb-av fb-' + COLORS[who.length % 4], 'aria-hidden': 'true', text: initials(who) }),
        h('div', {}, [h('div', { class: 'fb-meta' }, [h('b', { text: who }), h('span', { text: ' · ' + ago(c.created_at) })]), h('p', { class: 'fb-text', text: c.body })])]));
    });
    pop.appendChild(tl);
    var dn = h('button', { class: 'fb-done fb-done-pop', type: 'button', text: root.done ? 'Heropenen' : 'Markeer als verwerkt' });
    dn.addEventListener('click', function () { setDone(root, !root.done).then(function () { if (root.done && !showDone) closePop(); }); });
    pop.appendChild(dn);
    pop.appendChild(postForm('Antwoord…', 'Antwoord', function (name, body) {
      return add(name, body, { parent_id: root.id }).then(function () { return refreshPage(); });
    }));
    placePop(posOf(root));
  }
  function openDraft(anchor, pos) {
    activePin = null; draft = { anchor: anchor, pos: pos }; pop.textContent = '';
    var close = h('button', { class: 'fb-close', type: 'button', 'aria-label': 'Annuleren', text: '×' }); close.addEventListener('click', closePop);
    pop.appendChild(h('div', { class: 'fb-head' }, [h('h3', { text: 'Nieuwe pin' }), close]));
    pop.appendChild(postForm('Wat valt je hier op?', 'Plaats pin', function (name, body) {
      return add(name, body, anchor).then(function (row) { return refreshPage().then(function () { openPop(pageItems.find(function (x) { return x.id == row.id; }) || row); }); });
    }, closePop));
    renderPins(); placePop(pos);
  }

  function setDone(c, v) {
    return patch(c, { done: v }).then(function () { c.done = v; return refreshPage().then(function () { if (scope === 'all') return refreshAll(); }); })
      .catch(function () { status.textContent = 'Bijwerken lukt nu niet.'; status.className = 'fb-status err'; });
  }
  function exportOpen() {
    return list('all').then(function (all) {
      var open = all.filter(function (c) { return c.parent_id == null && !c.done; }), byPage = {};
      open.forEach(function (c) { (byPage[c.page] = byPage[c.page] || []).push(c); });
      var out = ['# Open feedback De Vooruitblik (' + new Date().toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' }) + ')', ''];
      Object.keys(byPage).forEach(function (pg) {
        out.push('## ' + pageLabel(pg) + ' (' + (pg === 'home' ? 'index.html' : pg) + ')');
        byPage[pg].forEach(function (c) {
          var where = isPin(c) ? '[Pin' + (c.ctx ? ' bij “' + c.ctx + '”' : '') + (c.sel ? ' – ' + c.sel : '') + ']' : '[Algemeen]';
          out.push('- ' + where + ' ' + (c.name || 'Anoniem') + ': ' + c.body.replace(/\n+/g, ' '));
          all.filter(function (r) { return r.parent_id == c.id; }).forEach(function (r) { out.push('  - antwoord ' + (r.name || 'Anoniem') + ': ' + r.body.replace(/\n+/g, ' ')); });
        });
        out.push('');
      });
      if (!open.length) out.push('Geen openstaande feedback.');
      return out.join('\n');
    });
  }
  copyBtn.addEventListener('click', function () {
    exportOpen().then(function (txt) {
      var done = function () { copyBtn.textContent = 'Gekopieerd'; setTimeout(function () { copyBtn.textContent = 'Kopieer open feedback'; }, 2200); };
      if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(txt).then(done);
      var ta = h('textarea', { 'aria-hidden': 'true' }); ta.value = txt; ta.style.cssText = 'position:fixed;left:-9999px'; d.body.appendChild(ta); ta.select(); try { d.execCommand('copy'); done(); } catch (e) { /* negeren */ } ta.remove();
    }).catch(function () { copyBtn.textContent = 'Kopiëren mislukt'; });
  });
  exitLink.addEventListener('click', function () { try { localStorage.removeItem(LS_ED); } catch (e) { /* negeren */ } location.search = ''; });
  doneChk.addEventListener('change', function () { showDone = doneChk.checked; lsSet(LS_DONE, showDone ? '1' : '0'); renderPins(); render(); });

  /* ── pin plaatsen ── */
  function startPinning() { show(false); closePop(); pinning = true; de.classList.add('fb-pinning'); hint.removeAttribute('hidden'); }
  function stopPinning() { pinning = false; de.classList.remove('fb-pinning'); hint.setAttribute('hidden', ''); }
  d.addEventListener('click', function (e) {
    if (!pinning || inWidget(e.target)) return;
    e.preventDefault(); e.stopPropagation();
    stopPinning();
    if (!showPins) { showPins = true; pinsChk.checked = true; lsSet(LS_PINS, '1'); }
    openDraft(anchorFrom(e), { x: e.pageX, y: e.pageY });
  }, true);
  hint.querySelector('button').addEventListener('click', stopPinning);
  pinBtn.addEventListener('click', startPinning);
  pinsChk.addEventListener('change', function () { showPins = pinsChk.checked; lsSet(LS_PINS, showPins ? '1' : '0'); renderPins(); });

  /* ── paneel openen/sluiten ── */
  function setScope(s) { scope = s; tabPage.setAttribute('aria-pressed', s === 'page'); tabAll.setAttribute('aria-pressed', s === 'all'); render(); loadScope(); }
  function show(v) {
    open = v;
    if (v) { closePop(); panel.removeAttribute('hidden'); toggle.setAttribute('aria-expanded', 'true'); loadScope(); setTimeout(function () { bodyIn.focus(); }, 30); }
    else { panel.setAttribute('hidden', ''); toggle.setAttribute('aria-expanded', 'false'); if (!pinning) toggle.focus(); }
  }
  toggle.addEventListener('click', function () { if (pinning) { stopPinning(); return; } show(!open); });
  closeBtn.addEventListener('click', function () { show(false); });
  tabPage.addEventListener('click', function () { setScope('page'); });
  tabAll.addEventListener('click', function () { setScope('all'); });
  d.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (pinning) stopPinning(); else if (!pop.hasAttribute('hidden')) closePop(); else if (open) show(false);
  });
  d.addEventListener('click', function (e) { if (!pop.hasAttribute('hidden') && !pinning && !inWidget(e.target)) closePop(); });
  bodyIn.addEventListener('input', function () { count.textContent = bodyIn.value.length + ' / ' + MAX; });
  nameIn.value = lsGet(LS_NAME) || '';

  /* ── algemene reactie plaatsen ── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var body = bodyIn.value.trim(), name = nameIn.value.trim();
    status.className = 'fb-status';
    if (!body) { status.textContent = 'Schrijf eerst iets.'; status.className += ' err'; bodyIn.focus(); return; }
    if (trap.value) { bodyIn.value = ''; return; }                       /* honeypot: bots vullen dit veld in */
    if (Date.now() - parseInt(lsGet(LS_LAST) || '0', 10) < MIN_GAP) { status.textContent = 'Even rustig, probeer het zo opnieuw.'; status.className += ' err'; return; }
    send.disabled = true; status.textContent = 'Versturen…';
    add(name, body).then(function () {
      lsSet(LS_NAME, name); lsSet(LS_LAST, String(Date.now()));
      bodyIn.value = ''; count.textContent = '0 / ' + MAX; status.textContent = 'Bedankt voor je feedback!';
      if (scope !== 'page') setScope('page'); else refreshPage();
    }).catch(function () {
      status.textContent = 'Versturen lukt nu niet. Probeer het later opnieuw.'; status.className += ' err';
    }).then(function () { send.disabled = false; });
  });

  /* ── opstarten ── */
  function init() {
    d.body.appendChild(pinLayer); d.body.appendChild(pop); d.body.appendChild(hint); d.body.appendChild(toggle); d.body.appendChild(panel);
    refreshPage().catch(function () { /* badge blijft leeg */ });
    var re = function () { renderPins(); if (activePin) placePop(posOf(activePin)); else if (draft) placePop(draft.pos); };
    window.addEventListener('resize', re); window.addEventListener('load', re);
    if (window.ResizeObserver) new ResizeObserver(re).observe(d.body);
    setInterval(re, 2500);                                                 /* animaties kunnen elementen verschuiven */
    if (remote) setInterval(function () { if (!pinning && pop.hasAttribute('hidden')) refreshPage().catch(function () {}); if (open && scope === 'all') refreshAll().catch(function () {}); }, 25000);
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
