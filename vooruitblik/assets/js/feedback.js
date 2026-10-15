/* Feedback & reacties op de website. Geen dependencies.
 * - Per pagina een reactiedraad, plus een tab "Alles" om alle feedback te zien.
 * - Opslag: Supabase (REST) als die is ingesteld, anders localStorage (voorbeeldmodus).
 * - Reacties worden altijd als tekst getoond (nooit als HTML).
 */
(function () {
  var cfg = window.VB_FEEDBACK || {};
  if (cfg.enabled === false) return;
  var d = document;
  var remote = !!(cfg.supabaseUrl && cfg.supabaseKey);
  var LS = 'vb-feedback-v1', LS_NAME = 'vb-feedback-name', LS_LAST = 'vb-feedback-last';
  var MAX = 1000, MIN_GAP = 8000;

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
      var q = '?select=id,page,name,body,created_at&order=created_at.desc&limit=200' + (scope === 'page' ? '&page=eq.' + encodeURIComponent(page) : '');
      return api(q, { headers: headers({}) });
    }
    var all = [];
    try { all = JSON.parse(lsGet(LS) || '[]'); } catch (e) { all = []; }
    return Promise.resolve(all.filter(function (c) { return scope !== 'page' || c.page === page; }).sort(function (a, b) { return b.created_at < a.created_at ? -1 : 1; }));
  }
  function add(name, body) {
    var row = { page: page, name: name || null, body: body };
    if (remote) return api('', { method: 'POST', headers: headers({ Prefer: 'return=representation' }), body: JSON.stringify(row) }).then(function (r) { return r[0] || row; });
    row.id = Date.now() + '' + Math.floor(Math.random() * 1000); row.created_at = new Date().toISOString();
    var all = [];
    try { all = JSON.parse(lsGet(LS) || '[]'); } catch (e) { all = []; }
    all.push(row); lsSet(LS, JSON.stringify(all));
    return Promise.resolve(row);
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

  /* ── interface ── */
  var scope = 'page', timer = null, open = false;
  var badge = h('span', { class: 'fb-badge', 'aria-hidden': 'true', hidden: '' });
  var toggle = h('button', { class: 'fb-toggle', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'fb-panel' }, [h('span', { text: 'Feedback' }), badge]);
  var tabPage = h('button', { class: 'fb-tab', type: 'button', 'aria-pressed': 'true', text: 'Deze pagina' });
  var tabAll = h('button', { class: 'fb-tab', type: 'button', 'aria-pressed': 'false', text: 'Alle pagina’s' });
  var closeBtn = h('button', { class: 'fb-close', type: 'button', 'aria-label': 'Feedback sluiten', text: '×' });
  var ul = h('ul', { class: 'fb-list', 'aria-live': 'polite' });
  var nameIn = h('input', { id: 'fb-name', type: 'text', maxlength: '60', autocomplete: 'name', placeholder: 'Je naam (optioneel)' });
  var bodyIn = h('textarea', { id: 'fb-body', maxlength: String(MAX), rows: '3', placeholder: 'Wat valt je op? Wat kan beter?', required: '' });
  var trap = h('input', { class: 'fb-trap', type: 'text', name: 'website', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true' });
  var count = h('span', { class: 'fb-count', text: '0 / ' + MAX });
  var send = h('button', { class: 'fb-send', type: 'submit', text: 'Plaats feedback' });
  var status = h('p', { class: 'fb-status', role: 'status' });
  var form = h('form', { class: 'fb-form', novalidate: '' }, [
    h('label', { class: 'sr', for: 'fb-name', text: 'Je naam' }), nameIn,
    h('label', { class: 'sr', for: 'fb-body', text: 'Je feedback' }), bodyIn, trap,
    h('div', { class: 'fb-row' }, [count, send]), status
  ]);
  var notice = remote ? null : h('p', { class: 'fb-notice', text: 'Voorbeeldmodus: reacties blijven alleen in deze browser staan. Koppel een database om ze met iedereen te delen.' });
  var panel = h('aside', { class: 'fb-panel', id: 'fb-panel', role: 'dialog', 'aria-label': 'Feedback op de website', hidden: '' }, [
    h('div', { class: 'fb-head' }, [h('h2', { text: 'Feedback' }), closeBtn]),
    h('div', { class: 'fb-tabs', role: 'group', 'aria-label': 'Bereik' }, [tabPage, tabAll])
  ].concat(notice ? [notice] : []).concat([ul, form]));

  function render(items) {
    ul.textContent = '';
    if (!items.length) {
      ul.appendChild(h('li', { class: 'fb-empty', text: scope === 'page' ? 'Nog geen feedback op deze pagina. Wees de eerste.' : 'Nog geen feedback.' }));
      return;
    }
    items.forEach(function (c, i) {
      var who = c.name || 'Anoniem';
      var meta = [h('b', { text: who }), h('span', { text: ' · ' + ago(c.created_at) })];
      ul.appendChild(h('li', { class: 'fb-item' }, [
        h('span', { class: 'fb-av fb-' + COLORS[(who.length + i) % 4], 'aria-hidden': 'true', text: initials(who) }),
        h('div', {}, [h('div', { class: 'fb-meta' }, meta)]
          .concat(scope === 'all' ? [h('a', { class: 'fb-page', href: pageHref(c.page), text: pageLabel(c.page) })] : [])
          .concat([h('p', { class: 'fb-text', text: c.body })]))
      ]));
    });
  }
  function pageHref(p) {
    var base = location.pathname.replace(/\/vooruitblik\/.*$/, '/vooruitblik/');
    if (base === location.pathname) base = location.pathname.replace(/[^/]*$/, '').replace(/hoofdstuk\/$/, '');
    return (p === 'home' ? base : base + p);
  }
  function load() {
    return list(scope).then(function (items) { render(items); if (scope === 'page') setBadge(items.length); }).catch(function () {
      ul.textContent = ''; ul.appendChild(h('li', { class: 'fb-empty', text: 'Feedback laden lukt nu niet. Probeer het later opnieuw.' }));
    });
  }
  function setBadge(n) { badge.textContent = n > 99 ? '99+' : String(n); if (n) badge.removeAttribute('hidden'); else badge.setAttribute('hidden', ''); }

  function setScope(s) {
    scope = s; tabPage.setAttribute('aria-pressed', s === 'page'); tabAll.setAttribute('aria-pressed', s === 'all'); load();
  }
  function show(v) {
    open = v;
    if (v) { panel.removeAttribute('hidden'); toggle.setAttribute('aria-expanded', 'true'); load(); setTimeout(function () { bodyIn.focus(); }, 30);
      if (remote) timer = setInterval(load, 20000); }
    else { panel.setAttribute('hidden', ''); toggle.setAttribute('aria-expanded', 'false'); clearInterval(timer); toggle.focus(); }
  }

  toggle.addEventListener('click', function () { show(!open); });
  closeBtn.addEventListener('click', function () { show(false); });
  tabPage.addEventListener('click', function () { setScope('page'); });
  tabAll.addEventListener('click', function () { setScope('all'); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) show(false); });
  bodyIn.addEventListener('input', function () { count.textContent = bodyIn.value.length + ' / ' + MAX; });
  nameIn.value = lsGet(LS_NAME) || '';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var body = bodyIn.value.trim(), name = nameIn.value.trim();
    status.className = 'fb-status';
    if (!body) { status.textContent = 'Schrijf eerst iets.'; status.className += ' err'; bodyIn.focus(); return; }
    if (trap.value) { bodyIn.value = ''; return; }                       /* honeypot: bots vullen dit veld in */
    var last = parseInt(lsGet(LS_LAST) || '0', 10);
    if (Date.now() - last < MIN_GAP) { status.textContent = 'Even rustig, probeer het zo opnieuw.'; status.className += ' err'; return; }
    send.disabled = true; status.textContent = 'Versturen…';
    add(name, body).then(function () {
      lsSet(LS_NAME, name); lsSet(LS_LAST, String(Date.now()));
      bodyIn.value = ''; count.textContent = '0 / ' + MAX; status.textContent = 'Bedankt voor je feedback!';
      if (scope !== 'page') setScope('page'); else load();
    }).catch(function () {
      status.textContent = 'Versturen lukt nu niet. Probeer het later opnieuw.'; status.className += ' err';
    }).then(function () { send.disabled = false; });
  });

  function init() {
    d.body.appendChild(toggle); d.body.appendChild(panel);
    list('page').then(function (items) { setBadge(items.length); }).catch(function () { /* badge blijft leeg */ });
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
