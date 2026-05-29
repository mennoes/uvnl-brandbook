/* ──────────────────────────────────────────────────────────
   UvNL Merkboek — search index, live search & selection tray
   Root-relative paths are prefixed with window.BB_BASE so the
   same index works from / and /pages/ and /tools/.
   ────────────────────────────────────────────────────────── */
(function () {
  var BASE = window.BB_BASE || '';
  function p(path) { return path ? BASE + path : path; }

  /* ── THE INDEX ──────────────────────────────────────────
     type:  logo | color | font | icon | photo | page
     thumb: 'img:<path>'  or  'color:#hex'  or  'mark'
     dl:    downloadable file (root-relative) or null        */
  var INDEX = [
    /* ── LOGO'S ───────────────────────────────────────── */
    { t: 'UvNL logo — staand', cat: 'Logo', type: 'logo', kw: 'logo staand vertical hoofdlogo groen lockup beeldmerk', href: 'pages/logos.html', thumb: 'img:assets/logos/uvnl-logo.svg', preview: 'paper', dl: 'assets/logos/uvnl-logo.svg' },
    { t: 'UvNL beeldmerk (U)', cat: 'Logo', type: 'logo', kw: 'beeldmerk brandmark icoon u mark favicon symbool groen', href: 'pages/logos.html', thumb: 'img:assets/logos/uvnl-brandmark.svg', preview: 'paper', dl: 'assets/logos/uvnl-brandmark.svg' },
    { t: 'UvNL wordmark', cat: 'Logo', type: 'logo', kw: 'wordmark woordmerk universiteit van nederland tekst', href: 'pages/logos.html', thumb: 'img:assets/logos/uvnl-wordmark.svg', preview: 'paper', dl: 'assets/logos/uvnl-wordmark.svg' },
    { t: 'UvNL vierkant lockup', cat: 'Logo', type: 'logo', kw: 'vierkant square social avatar profielfoto lockup', href: 'pages/logos.html', thumb: 'img:assets/logos/uvnl-logo-square.svg', preview: 'paper', dl: 'assets/logos/uvnl-logo-square.svg' },
    { t: 'Vaandel', cat: 'Logo', type: 'logo', kw: 'vaandel pennant vlag banner u', href: 'pages/logos.html', thumb: 'img:assets/logos/vaandel.svg', preview: 'paper', dl: 'assets/logos/vaandel.svg' },
    { t: 'U-outline', cat: 'Logo', type: 'logo', kw: 'outline lijn u contour open', href: 'pages/logos.html', thumb: 'img:assets/logos/u-outline.svg', preview: 'paper', dl: 'assets/logos/u-outline.svg' },
    { t: 'Logo op groen (wit/paper)', cat: 'Logo', type: 'logo', kw: 'wit logo paper logo op groen donkere achtergrond invers diap negatief', href: 'pages/logos.html', thumb: 'img:assets/logos/uvnl-logo.svg', preview: 'dark', dl: 'assets/logos/uvnl-logo.svg' },

    /* ── KLEUREN ──────────────────────────────────────── */
    { t: 'Varsity Green', cat: 'Kleur', type: 'color', kw: 'groen green varsity primair hoofdkleur 004B36', href: 'pages/colors.html', thumb: 'color:#004B36', hex: '#004B36', dl: null },
    { t: 'Electric Purple', cat: 'Kleur', type: 'color', kw: 'paars purple accent D6ACFF', href: 'pages/colors.html', thumb: 'color:#D6ACFF', hex: '#D6ACFF', dl: null },
    { t: 'Ballpoint (Deep Indigo)', cat: 'Kleur', type: 'color', kw: 'ballpoint indigo donkerblauw collegenacht 1B0757 paars pantone', href: 'pages/colors.html', thumb: 'color:#1B0757', hex: '#1B0757', dl: null },
    { t: 'Printer Ink', cat: 'Kleur', type: 'color', kw: 'printer ink zwart bijna-zwart 2B2B2B neutraal', href: 'pages/colors.html', thumb: 'color:#2B2B2B', hex: '#2B2B2B', dl: null },
    { t: 'Electric Blue', cat: 'Kleur', type: 'color', kw: 'blauw blue secundair 585FF1', href: 'pages/colors.html', thumb: 'color:#585FF1', hex: '#585FF1', dl: null },
    { t: 'Electric Green', cat: 'Kleur', type: 'color', kw: 'groen electric secundair 00A879', href: 'pages/colors.html', thumb: 'color:#00A879', hex: '#00A879', dl: null },
    { t: 'Electric Yellow', cat: 'Kleur', type: 'color', kw: 'geel yellow highlight markeer FBF07A', href: 'pages/colors.html', thumb: 'color:#FBF07A', hex: '#FBF07A', dl: null },
    { t: 'Electric Red', cat: 'Kleur', type: 'color', kw: 'rood red EE5245', href: 'pages/colors.html', thumb: 'color:#EE5245', hex: '#EE5245', dl: null },
    { t: 'Additional Pink', cat: 'Kleur', type: 'color', kw: 'roze pink zacht tint FFC9D7', href: 'pages/colors.html', thumb: 'color:#FFC9D7', hex: '#FFC9D7', dl: null },
    { t: 'Paper', cat: 'Kleur', type: 'color', kw: 'paper cream crème achtergrond warm F4F0ED', href: 'pages/colors.html', thumb: 'color:#F4F0ED', hex: '#F4F0ED', dl: null },

    /* ── TYPOGRAFIE ───────────────────────────────────── */
    { t: 'Oldschool Grotesk', cat: 'Lettertype', type: 'font', kw: 'lettertype font sans body tekst grotesk regular bold', href: 'pages/typography.html', thumb: 'glyph:Aa', dl: 'downloads/uvnl-font-pack.zip' },
    { t: 'Oldschool Grotesk Condensed', cat: 'Lettertype', type: 'font', kw: 'lettertype font display condensed gecondenseerd osgc koppen headlines caps', href: 'pages/typography.html', thumb: 'glyph:AA', dl: 'downloads/uvnl-font-pack.zip' },
    { t: 'Tiempos Text', cat: 'Lettertype', type: 'font', kw: 'lettertype font serif italic cursief quote citaat tiempos', href: 'pages/typography.html', thumb: 'glyph:Aa', dl: 'downloads/uvnl-font-pack.zip' },

    /* ── ICONEN ───────────────────────────────────────── */
    { t: 'Bliksem', cat: 'Icoon', type: 'icon', kw: 'bliksem lightning energie breaking idee icoon ornament', href: 'pages/icons.html', thumb: 'img:assets/icons/bliksem1.png', dl: 'assets/icons/bliksem1.png' },
    { t: 'Pijl', cat: 'Icoon', type: 'icon', kw: 'pijl arrow kijk hier cta navigatie icoon', href: 'pages/icons.html', thumb: 'img:assets/icons/pijl-groen.png', dl: 'assets/icons/pijl-groen.png' },
    { t: 'Pijn', cat: 'Icoon', type: 'icon', kw: 'pijn spike kroon conflict icoon', href: 'pages/icons.html', thumb: 'img:assets/icons/pijn1.png', dl: 'assets/icons/pijn1.png' },
    { t: 'Snaps', cat: 'Icoon', type: 'icon', kw: 'snaps motion lijnen aha snap icoon', href: 'pages/icons.html', thumb: 'img:assets/icons/snaps1.png', dl: 'assets/icons/snaps1.png' },
    { t: 'Spark', cat: 'Icoon', type: 'icon', kw: 'spark sparkle nieuw magie diamant icoon', href: 'pages/icons.html', thumb: 'img:assets/icons/spark1.png', dl: 'assets/icons/spark1.png' },
    { t: 'Circle', cat: 'Icoon', type: 'icon', kw: 'circle cirkel ring omcirkel highlight icoon', href: 'pages/icons.html', thumb: 'img:assets/icons/circle1.png', dl: 'assets/icons/circle1.png' },
    { t: 'Grid', cat: 'Icoon', type: 'icon', kw: 'grid ruitjes raster millimeter wetenschap icoon achtergrond', href: 'pages/icons.html', thumb: 'img:assets/icons/grid1.png', dl: 'assets/icons/grid1.png' },

    /* ── FOTOGRAFIE ───────────────────────────────────── */
    { t: 'Fotografie-richtlijnen', cat: 'Fotografie', type: 'photo', kw: 'foto fotografie beeld echte mensen wetenschappers stijl', href: 'pages/photography.html', thumb: 'img:assets/photos/scientist1.png', preview: 'photo', dl: null },

    /* ── FORMATS / SUBMERKEN ──────────────────────────── */
    { t: 'Formats & submerken', cat: 'Formats', type: 'page', kw: 'format submerk sub-brand lockup wetensnap collegenacht werkplaats onderzoekt legt uit hey u live voorkennis even denken', href: 'pages/formats.html', thumb: 'mark', dl: null },
    { t: 'Collegenacht', cat: 'Formats', type: 'logo', kw: 'collegenacht college nacht format avond live indigo', href: 'pages/formats.html', thumb: 'img:assets/formats/collegenacht.png', preview: 'paper', dl: 'assets/formats/collegenacht.png' },
    { t: 'Wetensnap', cat: 'Formats', type: 'logo', kw: 'wetensnap snap kort format blauw', href: 'pages/formats.html', thumb: 'img:assets/formats/wetensnap.png', preview: 'paper', dl: 'assets/formats/wetensnap.png' },
    { t: 'De Werkplaats', cat: 'Formats', type: 'logo', kw: 'werkplaats maken format rood', href: 'pages/formats.html', thumb: 'img:assets/formats/werkplaats.png', preview: 'paper', dl: 'assets/formats/werkplaats.png' },
    { t: 'UvNL onderzoekt', cat: 'Formats', type: 'logo', kw: 'onderzoekt onderzoek format groen', href: 'pages/formats.html', thumb: 'img:assets/formats/onderzoekt.png', preview: 'paper', dl: 'assets/formats/onderzoekt.png' },
    { t: 'UvNL legt uit', cat: 'Formats', type: 'logo', kw: 'legt uit uitleg format rood', href: 'pages/formats.html', thumb: 'img:assets/formats/legtuit.png', preview: 'paper', dl: 'assets/formats/legtuit.png' },
    { t: 'Even Denken!', cat: 'Formats', type: 'logo', kw: 'even denken vraag prikkel format rood', href: 'pages/formats.html', thumb: 'img:assets/formats/evendenken.png', preview: 'paper', dl: 'assets/formats/evendenken.png' },
    { t: 'Voorkennis', cat: 'Formats', type: 'logo', kw: 'voorkennis achtergrond context format paars purple', href: 'pages/formats.html', thumb: 'img:assets/formats/voorkennis.png', preview: 'paper', dl: 'assets/formats/voorkennis.png' },
    { t: 'Hey U', cat: 'Formats', type: 'logo', kw: 'hey u aanspreek format groen', href: 'pages/formats.html', thumb: 'img:assets/formats/heyu.png', preview: 'paper', dl: 'assets/formats/heyu.png' },
    { t: 'UvNL Live', cat: 'Formats', type: 'logo', kw: 'live lockup evenement u', href: 'pages/formats.html', thumb: 'img:assets/formats/uvnl-live.png', preview: 'paper', dl: 'assets/formats/uvnl-live.png' },
    { t: 'UvNL &', cat: 'Formats', type: 'logo', kw: 'ampersand samenwerking lockup u', href: 'pages/formats.html', thumb: 'img:assets/formats/uvnl-amp.png', preview: 'paper', dl: 'assets/formats/uvnl-amp.png' },
    { t: 'UvNL +', cat: 'Formats', type: 'logo', kw: 'plus extra lockup u', href: 'pages/formats.html', thumb: 'img:assets/formats/uvnl-plus.png', preview: 'paper', dl: 'assets/formats/uvnl-plus.png' },
    { t: 'UvNL Studio+', cat: 'Formats', type: 'logo', kw: 'studio plus productie lockup u', href: 'pages/formats.html', thumb: 'img:assets/formats/uvnl-studio.png', preview: 'paper', dl: 'assets/formats/uvnl-studio.png' },
    { t: 'Partners', cat: 'Resources', type: 'page', kw: 'partners universiteiten leden samenwerking co-branding', href: 'pages/formats.html#partners', thumb: 'mark', dl: null },
    { t: 'Voorbeelden', cat: 'Hoe we eruitzien', type: 'page', kw: 'voorbeelden examples poster thumbnail quote slide story toepassing in het wild posters social', href: 'pages/examples.html', thumb: 'mark', dl: null },

    /* ── PAGINA'S ─────────────────────────────────────── */
    { t: 'Over UvNL', cat: 'Wie we zijn', type: 'page', kw: 'over story verhaal missie wie we zijn hema wetenschap merk', href: 'pages/about.html', thumb: 'mark', dl: null },
    { t: 'Tone of voice', cat: 'Hoe we spreken', type: 'page', kw: 'tone of voice schrijfstijl tekst stem taal nederlands toon', href: 'pages/tone-of-voice.html', thumb: 'mark', dl: null },
    { t: "Do's & don'ts", cat: 'Richtlijnen', type: 'page', kw: 'dos donts richtlijnen regels correct fout gebruik', href: 'pages/guidelines.html', thumb: 'mark', dl: null }
  ];

  window.BB_INDEX = INDEX;

  /* ── SEARCH ─────────────────────────────────────────── */
  function score(item, q) {
    var hay = (item.t + ' ' + item.cat + ' ' + item.kw).toLowerCase();
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    var s = 0;
    for (var i = 0; i < terms.length; i++) {
      if (hay.indexOf(terms[i]) === -1) return 0;       // every term must match
      if (item.t.toLowerCase().indexOf(terms[i]) !== -1) s += 3;
      else s += 1;
    }
    return s;
  }

  function search(q) {
    if (!q || !q.trim()) return [];
    return INDEX.map(function (it) { return { it: it, s: score(it, q) }; })
      .filter(function (r) { return r.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .map(function (r) { return r.it; });
  }

  function thumbHTML(item) {
    var tk = item.thumb || 'mark';
    if (tk.indexOf('color:') === 0) {
      return '<span class="sr-thumb" style="background:' + tk.slice(6) + '"></span>';
    }
    if (tk.indexOf('img:') === 0) {
      var cls = item.preview === 'photo' ? 'sr-thumb full' : 'sr-thumb';
      var bg = item.preview === 'dark' ? ' style="background:#004B36"' : '';
      return '<span class="' + cls + '"' + bg + '><img src="' + p(tk.slice(4)) + '" alt=""></span>';
    }
    if (tk.indexOf('glyph:') === 0) {
      return '<span class="sr-thumb" style="font-family:var(--font-display);font-size:20px;color:var(--fg)">' + tk.slice(6) + '</span>';
    }
    return '<span class="sr-thumb"><svg viewBox="0 0 156 140" style="width:22px;color:var(--fg)"><path fill="currentColor" d="M0 0H44V92H111V0H156V138H112V98H105.629C102.676 121.678 82.4777 140 52 140C22.4903 140 0 117.5 0 85.5V0Z"/></svg></span>';
  }

  function resultRowHTML(item) {
    var meta = item.hex ? item.hex : item.cat;
    return '<a class="sr-item" href="' + p(item.href) + '">' +
      thumbHTML(item) +
      '<span class="sr-body"><span class="sr-title">' + item.t + '</span>' +
      '<span class="sr-meta">' + meta + '</span></span>' +
      '<span class="sr-cat">' + item.cat + '</span></a>';
  }

  function renderResults(container, q) {
    var res = search(q);
    if (!q.trim()) { container.classList.remove('open'); container.innerHTML = ''; return; }
    container.classList.add('open');
    if (!res.length) {
      container.innerHTML = '<div class="sr-empty">Niets gevonden voor "<b>' + q + '</b>". Probeer: groen, logo, paars, geel, font, bliksem.</div>';
      return;
    }
    // group by cat, keep score order of first appearance
    var order = [], groups = {};
    res.forEach(function (it) { if (!groups[it.cat]) { groups[it.cat] = []; order.push(it.cat); } groups[it.cat].push(it); });
    var html = '';
    order.forEach(function (cat) {
      html += '<div class="sr-group-label">' + cat + '</div>';
      groups[cat].forEach(function (it) { html += resultRowHTML(it); });
    });
    container.innerHTML = html;
  }

  function wireSearch(input, container) {
    if (!input || !container) return;
    input.addEventListener('input', function () { renderResults(container, input.value); });
    input.addEventListener('focus', function () { if (input.value.trim()) renderResults(container, input.value); });
    document.addEventListener('click', function (e) {
      if (!container.contains(e.target) && e.target !== input) container.classList.remove('open');
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { container.classList.remove('open'); input.blur(); }
      if (e.key === 'Enter') { var first = container.querySelector('.sr-item'); if (first) first.click(); }
    });
  }

  /* ── SELECTION TRAY (combine & download) ────────────── */
  var KEY = 'uvnl-selectie';
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function save(arr) { try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch (e) {} }

  function add(item) {
    var arr = load();
    if (arr.some(function (x) { return x.t === item.t && x.dl === item.dl; })) return;
    arr.push({ t: item.t, dl: item.dl || '', hex: item.hex || '' });
    save(arr); renderTray();
  }
  function remove(idx) { var arr = load(); arr.splice(idx, 1); save(arr); renderTray(); }
  function clear() { save([]); renderTray(); }

  function downloadFile(url, name) {
    var a = document.createElement('a');
    a.href = url; a.download = name || ''; document.body.appendChild(a); a.click(); a.remove();
  }
  function downloadSelection() {
    var arr = load();
    var files = arr.filter(function (x) { return x.dl; });
    if (!files.length) { UVNL.toast('Geen downloadbare bestanden in selectie'); return; }
    files.forEach(function (x, i) {
      setTimeout(function () { downloadFile(p(x.dl), x.dl.split('/').pop()); }, i * 350);
    });
    UVNL.toast(files.length + ' bestanden gedownload');
  }
  function copySelection() {
    var arr = load();
    var lines = arr.map(function (x) { return '• ' + x.t + (x.hex ? '  ' + x.hex : '') + (x.dl ? '  ' + x.dl : ''); });
    UVNL.copy(lines.join('\n'), 'Selectie');
  }

  function renderTray() {
    var arr = load();
    var tray = document.querySelector('.tray');
    var toggle = document.querySelector('.tray-toggle');
    if (!tray || !toggle) return;
    toggle.querySelector('.count').textContent = arr.length;
    tray.querySelector('.tray-head .count').textContent = arr.length;
    toggle.classList.toggle('show', arr.length > 0 && !tray.classList.contains('open'));
    if (arr.length === 0) tray.classList.remove('open');
    var box = tray.querySelector('.tray-items');
    box.innerHTML = arr.map(function (x, i) {
      var sw = x.hex ? '<span class="sr-thumb" style="width:26px;height:26px;background:' + x.hex + '"></span>' : '';
      return '<div class="tray-item">' + sw + '<span class="ti-name">' + x.t + '</span>' +
        '<button class="ti-x" data-rm="' + i + '" title="Verwijder">×</button></div>';
    }).join('') || '<div class="sr-empty" style="padding:16px">Nog niets geselecteerd.<br>Voeg logo\'s, kleuren of iconen toe.</div>';
    // mark add-buttons on the page that are in the selection
    document.querySelectorAll('[data-add]').forEach(function (btn) {
      var t = btn.getAttribute('data-add-title');
      var on = arr.some(function (x) { return x.t === t; });
      btn.classList.toggle('added', on);
      btn.textContent = on ? '✓ In selectie' : '+ Selecteer';
    });
  }

  function mountTray() {
    if (document.body.hasAttribute('data-no-tray')) return;
    if (document.querySelector('.tray')) return;
    var tray = document.createElement('div');
    tray.className = 'tray';
    tray.innerHTML =
      '<div class="tray-head"><span class="t">Selectie <span class="count">0</span></span>' +
      '<button class="ti-x" data-tray-close style="font-size:20px">×</button></div>' +
      '<div class="tray-items"></div>' +
      '<div class="tray-foot">' +
      '<button class="btn primary" data-tray-dl>Download selectie</button>' +
      '<div style="display:flex;gap:8px">' +
      '<button class="btn ghost" style="flex:1" data-tray-copy>Kopieer lijst</button>' +
      '<button class="btn ghost" style="flex:1" data-tray-clear>Leeg</button></div></div>';
    document.body.appendChild(tray);
    var toggle = document.createElement('button');
    toggle.className = 'tray-toggle';
    toggle.innerHTML = 'Selectie <span class="count">0</span>';
    document.body.appendChild(toggle);

    toggle.addEventListener('click', function () { tray.classList.add('open'); toggle.classList.remove('show'); });
    tray.addEventListener('click', function (e) {
      if (e.target.closest('[data-tray-close]')) { tray.classList.remove('open'); renderTray(); }
      if (e.target.closest('[data-tray-dl]')) downloadSelection();
      if (e.target.closest('[data-tray-copy]')) copySelection();
      if (e.target.closest('[data-tray-clear]')) clear();
      var rm = e.target.closest('[data-rm]');
      if (rm) remove(parseInt(rm.getAttribute('data-rm'), 10));
    });

    // wire any [data-add] buttons on the page
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-add]');
      if (!btn) return;
      e.preventDefault();
      var item = {
        t: btn.getAttribute('data-add-title'),
        dl: btn.getAttribute('data-add-dl') || '',
        hex: btn.getAttribute('data-add-hex') || ''
      };
      var arr = load();
      var existing = arr.findIndex(function (x) { return x.t === item.t; });
      if (existing !== -1) { remove(existing); }
      else { add(item); tray.classList.add('open'); toggle.classList.remove('show'); }
    });
    renderTray();
  }

  window.BB = { search: search, add: add, downloadSelection: downloadSelection };

  /* ── SVG INLINER ────────────────────────────────────────
     <img src="*.svg"> renders fill="currentColor" as black.
     Inline the markup so it inherits color from its parent. */
  function inlineSvgs() {
    var imgs = document.querySelectorAll('img[src$=".svg"]');
    imgs.forEach(function (img) {
      // only inline inside brand surfaces, keep favicons etc. alone
      if (!img.closest('.preview, .sr-thumb, .dd-vis, .asset, .home, .bbnav')) return;
      fetch(img.getAttribute('src')).then(function (r) { return r.text(); }).then(function (txt) {
        var doc = new DOMParser().parseFromString(txt, 'image/svg+xml');
        var svg = doc.querySelector('svg');
        if (!svg) return;
        // carry over sizing/style from the img
        if (img.getAttribute('alt')) svg.setAttribute('aria-label', img.getAttribute('alt'));
        svg.style.cssText = img.style.cssText;
        if (!svg.style.maxWidth && !svg.style.width) svg.style.maxWidth = '78%';
        svg.style.maxHeight = svg.style.maxHeight || '78%';
        // <text> based logos need the brand font + currentColor fill
        svg.querySelectorAll('text').forEach(function (t) {
          t.style.fontFamily = 'var(--font-display)';
          t.style.fontWeight = '700';
          t.style.textTransform = 'uppercase';
          t.style.letterSpacing = '-0.02em';
          t.setAttribute('fill', 'currentColor');
          t.style.fontSize = t.closest('svg').getAttribute('viewBox').split(' ')[3] > 210 ? '92px' : '88px';
        });
        img.replaceWith(svg);
      }).catch(function () {});
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    wireSearch(document.getElementById('bb-search'), document.getElementById('bb-results'));
    wireSearch(document.getElementById('bb-nav-search'), document.getElementById('bb-nav-results'));
    mountTray();
    setTimeout(inlineSvgs, 60); // after page scripts have built galleries
  });
})();
