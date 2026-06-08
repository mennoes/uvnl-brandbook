/* UvNL Platform — small shared helpers */

window.UVNL = (function () {
  function toast(msg, kind) {
    var t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove('show'); }, 1600);
  }

  function copy(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        toast((label ? label + ' · ' : '') + 'gekopieerd');
      });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast('gekopieerd'); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  // Attach to any [data-copy] element. Optional [data-copy-label].
  function wireCopy() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-copy]');
      if (!el) return;
      copy(el.getAttribute('data-copy'), el.getAttribute('data-copy-label') || '');
      el.classList.add('copied');
      setTimeout(function () { el.classList.remove('copied'); }, 1100);
    });
  }

  // Color utils
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(hex, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }
  function relLum(rgb) {
    var srgb = [rgb.r, rgb.g, rgb.b].map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  }
  function contrast(hex1, hex2) {
    var L1 = relLum(hexToRgb(hex1));
    var L2 = relLum(hexToRgb(hex2));
    var hi = Math.max(L1, L2), lo = Math.min(L1, L2);
    return (hi + 0.05) / (lo + 0.05);
  }

  function urlParam(name) {
    var p = new URLSearchParams(location.search);
    return p.get(name);
  }

  // Theme — dark by default, toggle persists in localStorage
  function getTheme() {
    try { return localStorage.getItem('uvnl-theme') || 'light'; } catch (e) { return 'light'; }
  }
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('uvnl-theme', t); } catch (e) {}
    var btns = document.querySelectorAll('.theme-toggle button');
    btns.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-theme') === t); });
  }
  function mountThemeToggle() {
    if (document.querySelector('.theme-toggle')) return;
    // Skip when inside tools (they render full-bleed canvases)
    if (document.body && document.body.hasAttribute('data-no-theme-toggle')) return;
    var wrap = document.createElement('div');
    wrap.className = 'theme-toggle';
    wrap.setAttribute('aria-label', 'Theme');
    wrap.innerHTML =
      '<button data-theme="dark" title="Donker"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>Dark</button>' +
      '<button data-theme="light" title="Licht"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>Licht</button>';
    document.body.appendChild(wrap);
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-theme]');
      if (!b) return;
      setTheme(b.getAttribute('data-theme'));
    });
    setTheme(getTheme());
  }

  // Set theme ASAP to avoid flicker
  (function () {
    try {
      var t = localStorage.getItem('uvnl-theme') || 'light';
      document.documentElement.setAttribute('data-theme', t);
    } catch (e) {}
  })();

  function mountNavDrop() {
    var drops = document.querySelectorAll('.bbnav .navdrop');
    drops.forEach(function (d) {
      var btn = d.querySelector('.navdrop-btn');
      if (!btn) return;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = d.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    document.addEventListener('click', function () {
      document.querySelectorAll('.bbnav .navdrop.open').forEach(function (d) {
        d.classList.remove('open');
        var b = d.querySelector('.navdrop-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.bbnav .navdrop.open').forEach(function (d) { d.classList.remove('open'); });
      }
    });
  }

  // nav transparant zolang de beeldvullende paginakop achter de nav loopt; lichte balk zodra je eronder scrolt
  function mountHeroNav() {
    var nav = document.querySelector('.bbnav');
    var band = document.querySelector('.page-hero .ph-visual');
    if (!nav || !band) return;
    function upd() {
      var b = band.getBoundingClientRect();
      nav.classList.toggle('is-hero', b.bottom > nav.offsetHeight + 6);
    }
    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  }

  document.addEventListener('DOMContentLoaded', function () {
    wireCopy();
    mountThemeToggle();
    mountNavDrop();
    mountHeroNav();
  });

  return { toast: toast, copy: copy, hexToRgb: hexToRgb, rgbToHsl: rgbToHsl, contrast: contrast, urlParam: urlParam, setTheme: setTheme, getTheme: getTheme };
})();
