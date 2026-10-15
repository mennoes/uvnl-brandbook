/* De Vooruitblik 2027 — kleine verbeteringen; de site werkt ook zonder JS. */
(function () {
  var d = document, root = d.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* menu op mobiel */
  var btn = d.querySelector('.nav-toggle'), nav = d.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    });
  }

  /* onthullen bij scrollen */
  var items = d.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }

  /* de ogen in de titel kijken mee met de cursor */
  var eyes = d.querySelectorAll('.oo');
  if (eyes.length && !reduce) {
    d.addEventListener('pointermove', function (e) {
      eyes.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        var a = Math.atan2(dy, dx), m = Math.min(1, Math.hypot(dx, dy) / 400) * r.width * 0.17;
        el.style.setProperty('--px', (Math.cos(a) * m) + 'px');
        el.style.setProperty('--py', (Math.sin(a) * m) + 'px');
      });
    });
  }

  /* filter + zoeken op de vragenpagina */
  var grid = d.getElementById('vragen-grid');
  if (grid) {
    var cards = [].slice.call(grid.querySelectorAll('.card'));
    var chips = [].slice.call(d.querySelectorAll('.chip'));
    var q = d.getElementById('zoek'), empty = d.getElementById('leeg'), uni = 'alle';
    var apply = function () {
      var t = (q.value || '').toLowerCase().trim(), n = 0;
      cards.forEach(function (c) {
        var ok = (uni === 'alle' || c.dataset.uni.indexOf(uni) > -1) && (!t || c.dataset.zoek.indexOf(t) > -1);
        c.hidden = !ok; if (ok) n++;
      });
      empty.style.display = n ? 'none' : 'block';
      var cnt = d.getElementById('telling'); if (cnt) cnt.textContent = n + (n === 1 ? ' vraag' : ' vragen');
    };
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        uni = c.dataset.uni; chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); }); apply();
      });
    });
    q.addEventListener('input', apply);
  }
})();
