/* Logo-configurator: kies logo, kleur, achtergrond en formaat; één downloadknop. */
(function () {
  var root = document.getElementById('lcfg');
  if (!root) return;
  var BASE = 'assets/vormgeving/';
  var LOGOS = {
    vb: { src: 'logo-vooruitblik-getrimd.png', w: 1506, h: 322, svg: false, name: 'de-vooruitblik' },
    uv: { src: 'uvvl-logo-groen.svg', w: 674.292, h: 140, svg: true, name: 'universiteit-van-vlaanderen' },
    sq: { src: 'uvvl-logo-vierkant-groen.svg', w: 156, h: 195, svg: true, name: 'uvvl-vierkant' },
    wm: { src: 'uvvl-wordmark-groen.svg', w: 155.773, h: 38.9869, svg: true, name: 'uvvl-woordmerk' }
  };
  var FG = [['groen', 'Varsity Green', '#004B36'], ['paars', 'Electric Purple', '#D6ACFF'], ['wit', 'Wit', '#FFFFFF'], ['ballpoint', 'Ballpoint', '#1B0757']];
  var BG = [['transparant', 'Transparant', 'transparent'], ['paper', 'Paper', '#F4F0ED'], ['wit', 'Wit', '#FFFFFF'], ['groen', 'Varsity Green', '#004B36'], ['ballpoint', 'Ballpoint', '#1B0757'], ['blauw', 'Electric Blue', '#585FF1'], ['paars', 'Electric Purple', '#D6ACFF']];
  var state = { logo: 'vb', fg: 'paars', bg: 'blauw', fmt: 'png' };
  var prev = document.getElementById('lcfg-prev'), logoEl = document.getElementById('lcfg-logo');
  var warn = document.getElementById('lcfg-warn'), hint = document.getElementById('lcfg-hint'), dl = document.getElementById('lcfg-dl');

  function hex(list, id) { for (var i = 0; i < list.length; i++) if (list[i][0] === id) return list[i][2]; }
  function mk(list, key) {
    var box = root.querySelector('[data-key="' + key + '"]');
    list.forEach(function (c) {
      var l = document.createElement('label');
      l.className = 'lcfg-s' + (c[0] === 'transparant' ? ' lcfg-s--t' : '');
      l.innerHTML = '<input type="radio" name="' + key + '" value="' + c[0] + '"' + (state[key] === c[0] ? ' checked' : '') + '><i style="background:' + (c[2] === 'transparent' ? '' : c[2]) + '"></i><span>' + c[1] + '</span>';
      box.appendChild(l);
    });
  }
  mk(FG, 'fg'); mk(BG, 'bg');

  function render() {
    var L = LOGOS[state.logo];
    prev.style.setProperty('--bg', hex(BG, state.bg));
    prev.classList.toggle('is-clear', state.bg === 'transparant');
    logoEl.style.backgroundColor = hex(FG, state.fg);
    var url = 'url("' + BASE + L.src + '")';
    logoEl.style.webkitMaskImage = url; logoEl.style.maskImage = url;
    logoEl.style.aspectRatio = L.w + ' / ' + L.h;
    logoEl.className = 'lcfg-logo lcfg-logo--' + state.logo;
    var same = hex(FG, state.fg) === hex(BG, state.bg);
    warn.hidden = !same;
    var noSvg = !L.svg;
    root.querySelector('input[name="fmt"][value="svg"]').disabled = noSvg;
    hint.hidden = !noSvg;
    if (noSvg && state.fmt === 'svg') { state.fmt = 'png'; root.querySelector('input[name="fmt"][value="png"]').checked = true; }
    dl.disabled = same;
  }

  root.addEventListener('change', function (e) {
    var t = e.target; if (t.name && state.hasOwnProperty(t.name)) { state[t.name] = t.value; render(); }
  });

  function fname() { return LOGOS[state.logo].name + '-' + state.fg + (state.bg === 'transparant' ? '' : '-op-' + state.bg) + '.' + state.fmt; }
  function save(blob, name) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  }
  function loadImg(src) { return new Promise(function (ok, no) { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = no; i.src = src; }); }

  function svgText() {
    var L = LOGOS[state.logo], fg = hex(FG, state.fg), bg = hex(BG, state.bg);
    return fetch(BASE + L.src).then(function (r) { return r.text(); }).then(function (t) {
      t = t.replace(/(<svg[^>]*?\sfill=")#[0-9a-fA-F]{3,8}(")/, '$1' + fg + '$2').replace(/(fill=")#[0-9a-fA-F]{3,8}(")/g, '$1' + fg + '$2');
      if (bg !== 'transparent') {
        var m = t.match(/viewBox="([\d.\-\s]+)"/), v = m[1].trim().split(/\s+/).map(Number), pad = Math.max(v[2], v[3]) * 0.12;
        var nv = [v[0] - pad, v[1] - pad, v[2] + 2 * pad, v[3] + 2 * pad].map(function (n) { return +n.toFixed(3); }).join(' ');
        t = t.replace(m[0], 'viewBox="' + nv + '"').replace(/(<svg[^>]*>)/, '$1<rect x="' + (v[0] - pad) + '" y="' + (v[1] - pad) + '" width="' + (v[2] + 2 * pad) + '" height="' + (v[3] + 2 * pad) + '" fill="' + bg + '"/>');
      }
      return t;
    });
  }

  function pngBlob() {
    var L = LOGOS[state.logo], fg = hex(FG, state.fg), bg = hex(BG, state.bg);
    var logoSvgP = L.svg ? fetch(BASE + L.src).then(function (r) { return r.text(); }).then(function (t) {
      t = t.replace(/(fill=")#[0-9a-fA-F]{3,8}(")/g, '$1' + fg + '$2'); return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(t);
    }) : Promise.resolve(BASE + L.src);
    return logoSvgP.then(loadImg).then(function (img) {
      var ar = L.w / L.h, lw = ar >= 1 ? 2400 : Math.round(2400 * ar), lh = Math.round(lw / ar);
      var pad = bg === 'transparent' ? 0 : Math.round(Math.max(lw, lh) * 0.12);
      var c = document.createElement('canvas'); c.width = lw + 2 * pad; c.height = lh + 2 * pad;
      var x = c.getContext('2d');
      if (bg !== 'transparent') { x.fillStyle = bg; x.fillRect(0, 0, c.width, c.height); }
      if (L.svg) { x.drawImage(img, pad, pad, lw, lh); }
      else {
        var o = document.createElement('canvas'); o.width = lw; o.height = lh; var ox = o.getContext('2d');
        ox.drawImage(img, 0, 0, lw, lh); ox.globalCompositeOperation = 'source-in'; ox.fillStyle = fg; ox.fillRect(0, 0, lw, lh);
        x.drawImage(o, pad, pad);
      }
      return new Promise(function (ok) { c.toBlob(ok, 'image/png'); });
    });
  }

  dl.addEventListener('click', function () {
    if (dl.disabled) return;
    var old = dl.innerHTML; dl.disabled = true;
    var job = state.fmt === 'svg' ? svgText().then(function (t) { return new Blob([t], { type: 'image/svg+xml' }); }) : pngBlob();
    job.then(function (b) { save(b, fname()); }).catch(function () { alert('Downloaden is niet gelukt. Probeer het opnieuw.'); }).then(function () { dl.innerHTML = old; render(); });
  });
  render();
})();
