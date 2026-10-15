/* plus.js — speelse laag: actieve nav, ogen in de footer, pop-in en kantelende kaarten. Alleen als verbetering. */
(function () {
  var d = document, root = d.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* actieve pagina in de nav */
  var here = location.pathname.split('/').pop() || 'index.html';
  var group = { 'colors.html': 'logos.html', 'typography.html': 'logos.html' };
  [].forEach.call(d.querySelectorAll('.bbnav .links a:not(.cta)'), function (a) {
    var f = (a.getAttribute('href') || '').split('/').pop();
    if (f === here || f === group[here]) a.classList.add('active');
  });

  /* pop-in zodra iets in beeld komt */
  var items = [].slice.call(d.querySelectorAll('.hp-card, .gl, .spot, .fmt-strip img, .tile, .fact, .cmp > div, .rl, .dl-band'));
  items.forEach(function (el) { el.classList.add('pp'); });
  if (items.length && 'IntersectionObserver' in window && !reduce) {
    root.classList.add('pj');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('pop'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el, i) { el.style.setProperty('--n', i % 4); io.observe(el); });
    setTimeout(function () { items.forEach(function (el) { el.classList.add('pop'); }); }, 6000);
  }

  /* kaarten kantelen met de cursor */
  if (fine && !reduce) {
    [].forEach.call(d.querySelectorAll('.hp-card'), function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.setProperty('--ry', (x * 10).toFixed(1) + 'deg'); c.style.setProperty('--rx', (-y * 10).toFixed(1) + 'deg');
      });
      c.addEventListener('pointerleave', function () { c.style.removeProperty('--rx'); c.style.removeProperty('--ry'); });
    });
  }
})();
