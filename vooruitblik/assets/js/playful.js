/* Speelse laag: parallax, kantelende kaarten, tellers en de ogenmuur. Werkt alleen als verbetering. */
(function () {
  var d = document, root = d.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ── kaarten poppen op zodra ze in beeld komen ── */
  var cards = [].slice.call(d.querySelectorAll('.card'));
  if (cards.length && 'IntersectionObserver' in window && !reduce) {
    root.classList.add('pj');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('pop'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px' });
    cards.forEach(function (c, i) { c.style.setProperty('--n', i % 4); io.observe(c); });
    setTimeout(function () { cards.forEach(function (c) { c.classList.add('pop'); }); }, 5000);   /* vangnet */
  }

  /* ── kaarten kantelen mee met de cursor; foto en titel schuiven op eigen diepte mee ── */
  if (fine && !reduce) {
    cards.forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.setProperty('--ry', (x * 11).toFixed(1) + 'deg'); c.style.setProperty('--rx', (-y * 11).toFixed(1) + 'deg');
        c.style.setProperty('--tx', (x * 18).toFixed(1) + 'px'); c.style.setProperty('--ty', (y * 18).toFixed(1) + 'px');
      });
      c.addEventListener('pointerleave', function () {
        ['--rx', '--ry', '--tx', '--ty'].forEach(function (k) { c.style.removeProperty(k); });
      });
    });
  }


  /* ── beeld in de cijferkaarten deinst mee met de muis ── */
  if (fine && !reduce) {
    [].slice.call(d.querySelectorAll('[data-react]')).forEach(function (el) {
      var card = el.closest('.cas') || el;
      card.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - .5) * 2));
        var y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - .5) * 2));
        el.style.setProperty('--mx', (-x).toFixed(2)); el.style.setProperty('--my', (-y).toFixed(2));
      });
      card.addEventListener('pointerleave', function () { el.style.removeProperty('--mx'); el.style.removeProperty('--my'); });
    });
  }

  /* ── waaier: 4 kaarten, schudden ── */
  var fan = d.getElementById('fan'), sh = d.getElementById('fan-shuffle');
  if (fan) {
    var stage = fan.querySelector('.fan-stage');
    var layout = function () {
      var vis = [].slice.call(stage.querySelectorAll('.fan-slot:not([hidden])'));
      vis.forEach(function (s, i) {
        var m = (vis.length - 1) / 2;
        s.classList.toggle('is-first', i === 0);
        s.style.setProperty('--rot', ((i - m) * 3.2).toFixed(1) + 'deg');
        s.style.setProperty('--dy', (Math.abs(i - m) * 12 - 10).toFixed(0) + 'px');
      });
    };
    layout();
    if (sh) {
      sh.hidden = false;
      sh.addEventListener('click', function () {
        var all = [].slice.call(stage.querySelectorAll('.fan-slot'));
        for (var i = all.length - 1; i > 0; i--) { var k = Math.floor(Math.random() * (i + 1)); var t = all[i]; all[i] = all[k]; all[k] = t; }
        all.forEach(function (s, i) {
          stage.appendChild(s); s.hidden = i >= 4;
          var c = s.querySelector('.card'); if (c && i < 4 && !reduce) { c.classList.remove('pop'); void c.offsetWidth; setTimeout(function () { c.classList.add('pop'); }, 40 + i * 70); }
          else if (c) c.classList.add('pop');
        });
        layout();
        var img = stage.querySelectorAll('.fan-slot:not([hidden]) img'); [].forEach.call(img, function (m) { m.loading = 'eager'; });
      });
    }
  }

  /* ── parallax voor zwevende objecten ── */
  var px = [].slice.call(d.querySelectorAll('[data-speed]'));
  if (px.length && !reduce) {
    var ticking = false;
    var upd = function () {
      var y = window.scrollY;
      px.forEach(function (el) { el.style.setProperty('--py', (y * parseFloat(el.dataset.speed)).toFixed(1) + 'px'); });
      ticking = false;
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
  }

  /* ── cijfers tellen op ── */
  var nums = [].slice.call(d.querySelectorAll('[data-count]'));
  if (nums.length && 'IntersectionObserver' in window && !reduce) {
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, to = parseInt(el.dataset.count, 10), t0 = performance.now();
        io2.unobserve(el);
        (function step(t) {
          var k = Math.min(1, (t - t0) / 900), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
          el.textContent = v; if (k < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: .6 });
    nums.forEach(function (el) { el.textContent = '0'; io2.observe(el); });
  }

  /* ── ogenmuur: alle pupillen kijken naar de cursor, zonder cursor dwalen ze rond ── */
  var eyes = [].slice.call(d.querySelectorAll('.ew-eye'));
  if (eyes.length && !reduce) {
    var look = function (x, y) {
      eyes.forEach(function (el) {
        var r = el.getBoundingClientRect(), dx = x - (r.left + r.width / 2), dy = y - (r.top + r.height / 2);
        var a = Math.atan2(dy, dx), k = Math.min(1, Math.hypot(dx, dy) / 260), m = r.width * .13 * k;
        el.style.setProperty('--px', (Math.cos(a) * m).toFixed(1) + 'px'); el.style.setProperty('--py', (Math.sin(a) * m).toFixed(1) + 'px');
      });
    };
    var seen = false, active = false, raf = 0;
    new IntersectionObserver(function (es) { seen = es[0].isIntersecting; }).observe(eyes[0].parentNode.parentNode);
    d.addEventListener('pointermove', function (e) {
      active = true; if (!seen || raf) return;
      raf = requestAnimationFrame(function () { raf = 0; look(e.clientX, e.clientY); });
    });
    setInterval(function () {
      if (active || !seen) return;
      var r = eyes[0].getBoundingClientRect();
      look(r.left + (Math.random() * 2 - 1) * 900, r.top + (Math.random() * 2 - 1) * 400);
    }, 1400);
  }

  /* kleuren: klik om de code te kopiëren */
  [].slice.call(d.querySelectorAll('.sw')).forEach(function (b) {
    b.addEventListener('click', function () {
      var hex = b.dataset.hex, done = function () { b.classList.add('copied'); setTimeout(function () { b.classList.remove('copied'); }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(hex).then(done, done); else done();
    });
  });
})();
