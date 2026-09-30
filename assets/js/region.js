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
    swapLogos();
  }

  // Vervang de inhoud van de inline nav-logo door de Vlaamse variant.
  // We houden het een inline <svg> (met fill="currentColor"), zodat de
  // groen/wit-theming uit de CSS intact blijft.
  function swapLogos() {
    var logos = document.querySelectorAll('svg.navlogo');
    if (!logos.length) return;
    var base = (window.BB_BASE != null ? window.BB_BASE : '');
    fetch(base + 'assets/logos/uvvl-logo.svg')
      .then(function (r) { return r.text(); })
      .then(function (txt) {
        var src = new DOMParser().parseFromString(txt, 'image/svg+xml').querySelector('svg');
        if (!src) return;
        var vb = src.getAttribute('viewBox');
        var inner = src.innerHTML;
        for (var i = 0; i < logos.length; i++) {
          if (vb) logos[i].setAttribute('viewBox', vb);
          logos[i].setAttribute('aria-label', 'Universiteit van Vlaanderen');
          logos[i].innerHTML = inner;
        }
      })
      .catch(function () {});
  }

  function makeToggle(active, extraCss) {
    var wrap = document.createElement('div');
    wrap.className = 'region-toggle';
    wrap.setAttribute('data-region-lock', '');
    wrap.style.cssText =
      'display:inline-flex;border:1.5px solid var(--line,#ddd);border-radius:999px;overflow:hidden;' +
      'font-family:var(--font-sans);font-weight:700;font-size:12px;' + (extraCss || '');
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
    return wrap;
  }

  function buildToggle(active) {
    if (document.querySelector('.region-toggle')) return;
    // In de nav
    var links = document.querySelector('.bbnav .links');
    if (links) links.insertBefore(makeToggle(active), links.firstChild);
    // En in de homepage-hero (gecentreerd, onder het logo)
    var heroLogo = document.querySelector('.bb-hero .hero-logo');
    if (heroLogo && heroLogo.parentNode) {
      var t = makeToggle(active, 'margin:18px auto 4px');
      heroLogo.parentNode.insertBefore(t, heroLogo.nextSibling);
    }
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
            var ts = document.querySelectorAll('.region-toggle');
            for (var i = 0; i < ts.length; i++) ts[i].remove();
            buildToggle('vl');
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
