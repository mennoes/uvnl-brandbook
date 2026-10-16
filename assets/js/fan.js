/* fan.js — waaier van eigenschapskaarten: schikken, kantelen met de cursor en parallax bij scrollen. */
(function () {
  var d = document;
  [].forEach.call(d.querySelectorAll('.tf'), setup);
  function setup(fan) {
  var slots = [].slice.call(fan.querySelectorAll('.tf-slot'));
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* waaier: draai en hoogte per kaart */
  var m = (slots.length - 1) / 2;
  slots.forEach(function (s, i) {
    s.style.setProperty('--rot', ((i - m) * 4.2).toFixed(1) + 'deg');
    s.style.setProperty('--dy', (Math.abs(i - m) * 14 - 8).toFixed(0) + 'px');
    if (i === 0) s.classList.add('is-first');
  });

  if (reduce) return;

  /* kaarten poppen op zodra de waaier in beeld komt */
  if ('IntersectionObserver' in window) {
    fan.classList.add('tf-wait');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { fan.classList.add('tf-in'); io.disconnect(); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(fan);
    setTimeout(function () { fan.classList.add('tf-in'); }, 4000);
  }

  /* parallax bij scrollen: elke kaart beweegt met een eigen snelheid */
  var speeds = [0.06, -0.04, 0.05, -0.07];
  var ticking = false;
  function onScroll() {
    var r = fan.getBoundingClientRect();
    var c = (r.top + r.height / 2) - window.innerHeight / 2;   /* afstand tot het midden van het scherm */
    slots.forEach(function (s, i) { s.style.setProperty('--sy', (c * speeds[i % speeds.length]).toFixed(1) + 'px'); });
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* kantelen met de cursor; foto, titel en tekst schuiven op eigen diepte mee */
  if (fine) {
    slots.forEach(function (s) {
      var c = s.querySelector('.tf-card');
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
  }
})();
