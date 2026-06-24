/*
 * region.js — regio-gedreven branding voor het merkboek.
 *
 * De markup is in het Nederlands geschreven ("Universiteit van Nederland").
 * Dit script bepaalt de regio en vervangt — als de bezoeker in Vlaanderen
 * (België) zit, of dat handmatig kiest — overal de merknaam door
 * "Universiteit van Vlaanderen".
 *
 * Volgorde van bepaling:
 *   1. Handmatige keuze (localStorage 'uvnl-region') — heeft altijd voorrang.
 *   2. IP-land via geojs.io (BE → Vlaanderen, anders Nederland).
 *   3. Standaard: Nederland.
 *
 * Elementen met data-region-lock (en hun kinderen) worden NOOIT vertaald —
 * gebruikt voor o.a. de beeldbank-koppen, waar "Universiteit van Nederland"
 * en "Universiteit van Vlaanderen" als losse folders naast elkaar staan.
 */
(function () {
  var SWAP_ATTRS = ['aria-label', 'alt', 'title', 'placeholder', 'content'];

  function toVL(s) {
    return s
      .replace(/Universiteiten van Nederland/g, 'Universiteiten van Vlaanderen')
      .replace(/Universiteit van Nederland/g, 'Universiteit van Vlaanderen');
  }

  function walk(node) {
    if (!node) return;
    if (node.nodeType === 1) {
      var tag = node.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE') return;
      if (node.hasAttribute && node.hasAttribute('data-region-lock')) return;
      for (var i = 0; i < SWAP_ATTRS.length; i++) {
        var a = SWAP_ATTRS[i];
        if (node.hasAttribute && node.hasAttribute(a)) {
          var v = node.getAttribute(a);
          if (v.indexOf('Nederland') >= 0) node.setAttribute(a, toVL(v));
        }
      }
      for (var c = node.firstChild; c; c = c.nextSibling) walk(c);
    } else if (node.nodeType === 3) {
      if (node.nodeValue.indexOf('Nederland') >= 0) node.nodeValue = toVL(node.nodeValue);
    }
  }

  function applyVlaanderen() {
    document.documentElement.setAttribute('data-region', 'vl');
    if (document.title.indexOf('Nederland') >= 0) document.title = toVL(document.title);
    walk(document.body);
  }

  function buildToggle(active) {
    var links = document.querySelector('.bbnav .links');
    if (!links || document.getElementById('region-toggle')) return;
    var wrap = document.createElement('div');
    wrap.id = 'region-toggle';
    wrap.setAttribute('data-region-lock', '');
    wrap.style.cssText =
      'display:inline-flex;border:1.5px solid var(--line,#ddd);border-radius:999px;overflow:hidden;font-family:var(--font-sans);font-weight:700;font-size:12px';
    [['nl', 'NL'], ['vl', 'VL']].forEach(function (opt) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = opt[1];
      b.title = opt[0] === 'nl' ? 'Universiteit van Nederland' : 'Universiteit van Vlaanderen';
      var on = opt[0] === active;
      b.style.cssText =
        'border:0;cursor:pointer;padding:5px 11px;line-height:1;' +
        (on
          ? 'background:var(--uvnl-green-bright,#16a34a);color:#fff'
          : 'background:transparent;color:var(--fg-mute,#666)');
      b.addEventListener('click', function () {
        localStorage.setItem('uvnl-region', opt[0]);
        location.reload();
      });
      wrap.appendChild(b);
    });
    links.insertBefore(wrap, links.firstChild);
  }

  function run() {
    var manual = null;
    try { manual = localStorage.getItem('uvnl-region'); } catch (e) {}

    if (manual === 'vl') { applyVlaanderen(); }
    buildToggle(manual === 'vl' ? 'vl' : 'nl');

    // Alleen automatisch detecteren als er nog geen handmatige keuze is.
    if (manual) return;
    try {
      fetch('https://get.geojs.io/v1/ip/country.json')
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d && d.country === 'BE') {
            applyVlaanderen();
            var t = document.getElementById('region-toggle');
            if (t) { t.remove(); buildToggle('vl'); }
          }
        })
        .catch(function () {});
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
