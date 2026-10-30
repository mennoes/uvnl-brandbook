/* Onthoud sluiten alleen binnen dit tabblad/bezoek. */
(function () {
  var notice = document.querySelector('.toolkit-notice');
  if (!notice) return;
  var close = notice.querySelector('.toolkit-notice-close');
  var key = 'vooruitblik-notice-dismissed';
  try { if (sessionStorage.getItem(key) === '1') notice.hidden = true; } catch (_) {}
  close.hidden = false;
  function syncNoticeHeight() {
    document.documentElement.style.setProperty('--toolkit-notice-height', notice.hidden ? '0px' : notice.getBoundingClientRect().height + 'px');
  }
  syncNoticeHeight();
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(syncNoticeHeight).observe(notice);
  window.addEventListener('resize', syncNoticeHeight);
  close.addEventListener('click', function () {
    notice.hidden = true;
    syncNoticeHeight();
    try { sessionStorage.setItem(key, '1'); } catch (_) {}
  });
})();

/* Beeldbank: een onderwerp opent in een venster (dialog) in plaats van de lijst te laten verspringen.
   Directe links werken ook: fotos-en-visuals.html?onderwerp=5 en fotos-en-visuals.html#naam-van-spreker. */
(function () {
  'use strict';
  var topics = [].slice.call(document.querySelectorAll('.topic-material'));
  if (!topics.length || typeof HTMLDialogElement === 'undefined') {
    /* Zonder dialog-ondersteuning blijft het gewone uitklappen werken. */
    var legacy = function () {
      var id; try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
      var t = id && document.getElementById(id); var g = t && t.closest('.topic-material');
      if (g) { g.open = true; t.scrollIntoView({ block: 'start' }); }
    };
    window.addEventListener('hashchange', legacy); legacy(); return;
  }

  var dlg = document.createElement('dialog');
  dlg.className = 'topic-dialog';
  dlg.setAttribute('aria-labelledby', 'topic-dialog-title');
  dlg.innerHTML = '<div class="topic-dialog-bar"><button type="button" class="topic-dialog-close">Sluiten <span aria-hidden="true">✕</span></button></div><div class="topic-dialog-body"></div>';
  document.body.appendChild(dlg);
  var body = dlg.querySelector('.topic-dialog-body');
  var lastFocus = null;

  function open(topic, personSlug) {
    var head = topic.querySelector('.topic-heading');
    var files = topic.querySelector('.topic-files');
    if (!head || !files) return;
    var h = head.cloneNode(true);
    var title = h.querySelector('h2'); if (title) title.id = 'topic-dialog-title';
    var f = files.cloneNode(true);
    [].slice.call(f.querySelectorAll('[id]')).forEach(function (n) { n.setAttribute('data-id', n.id); n.removeAttribute('id'); });
    body.innerHTML = '';
    var top = document.createElement('div'); top.className = 'topic-dialog-head'; top.appendChild(h);
    body.appendChild(top); body.appendChild(f);
    lastFocus = document.activeElement;
    document.documentElement.classList.add('modal-open');
    dlg.showModal();
    dlg.scrollTop = 0;
    if (personSlug) {
      var p = f.querySelector('[data-id="' + personSlug + '"]');
      if (p) p.scrollIntoView({ block: 'start' });
    }
  }

  topics.forEach(function (t) {
    var s = t.querySelector('summary');
    t.open = false;
    s.addEventListener('click', function (e) { e.preventDefault(); t.open = false; open(t); });
  });
  dlg.querySelector('.topic-dialog-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  function afterClose() {
    if (!document.documentElement.classList.contains('modal-open')) return;
    document.documentElement.classList.remove('modal-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  /* Sluiten via knop, achtergrond, Esc of script: het attribuut open verdwijnt altijd. */
  new MutationObserver(function () { if (!dlg.open) afterClose(); }).observe(dlg, { attributes: true, attributeFilter: ['open'] });
  dlg.addEventListener('close', afterClose);

  function fromUrl() {
    var q = null; try { q = new URLSearchParams(location.search).get('onderwerp'); } catch (_) {}
    var id = ''; try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) {}
    if (id) {
      var el = document.getElementById(id), g = el && el.closest('.topic-material');
      if (g) { open(g, id); return; }
    }
    if (q) {
      var n = parseInt(q, 10);
      var m = topics.filter(function (t) { return parseInt(t.getAttribute('data-topic'), 10) === n; })[0];
      if (m) { m.scrollIntoView({ block: 'center' }); open(m); }
    }
  }
  window.addEventListener('hashchange', fromUrl);
  fromUrl();
})();
