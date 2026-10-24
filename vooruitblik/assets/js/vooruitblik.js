/* De Vooruitblik 2027 — kleine verbeteringen; de site werkt ook zonder JS. */
(function () {
  var d = document, root = d.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* menu op mobiel */
  var btn = d.querySelector('.nav-toggle'), nav = d.getElementById('nav');
  if (btn && nav) {
    var label = btn.textContent, scrollY = 0;
    var mobile = window.matchMedia('(max-width:1240px)');
    var setOpen = function (open) {
      open = open && mobile.matches;
      var wasOpen = nav.classList.contains('open');
      if (open && !wasOpen) {
        scrollY = window.scrollY;
        root.style.setProperty('--nav-scroll-top', -scrollY + 'px');
        nav.scrollTop = 0;
      }
      nav.classList.toggle('open', open);
      root.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Sluiten' : label;
      if (!open && wasOpen) {
        root.style.removeProperty('--nav-scroll-top');
        window.scrollTo({ top: scrollY, behavior: 'instant' });
      }
    };
    btn.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); btn.focus(); }
    });
    window.addEventListener('pageshow', function () { setOpen(false); });
    mobile.addEventListener('change', function (m) { if (!m.matches) setOpen(false); });
  }

  /* onthullen bij scrollen */
  var items = d.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }

  /* de ogen in de titel: de pupil in het gat van de O kijkt mee met de cursor */
  var eyes = [].slice.call(d.querySelectorAll('.vb-title .o'));
  if (eyes.length) {
    var look = function (x, y) {
      eyes.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var dx = x - (r.left + r.width / 2), dy = y - (r.top + r.height / 2);
        var k = Math.min(1, Math.hypot(dx, dy) / 300), a = Math.atan2(dy, dx);
        el.style.setProperty('--px', (Math.cos(a) * k * r.width * 0.085).toFixed(1) + 'px');
        el.style.setProperty('--py', (Math.sin(a) * k * r.height * 0.125).toFixed(1) + 'px');
      });
    };
    if (!reduce) {
      var active = false, idle;
      d.addEventListener('pointermove', function (e) { active = true; look(e.clientX, e.clientY); });
      /* zonder cursor (telefoon) kijken de ogen af en toe rond en knipperen ze */
      idle = setInterval(function () {
        if (active) return;
        var r = eyes[0].getBoundingClientRect();
        look(r.left + (Math.random() * 2 - 1) * 400 + r.width / 2, r.top + (Math.random() * 2 - 1) * 300 + r.height / 2);
      }, 1800);
      setInterval(function () {
        eyes.forEach(function (el) { el.classList.remove('blink'); void el.offsetWidth; el.classList.add('blink'); });
      }, 5200);
    }
  }

  /* afleveringsschema: markeer wat al verschenen is en wat als eerstvolgende komt */
  var eps = d.querySelectorAll('.ep[data-date]');
  if (eps.length) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var nextDone = false;
    eps.forEach(function (e) {
      var tag = e.querySelector('.ep-status');
      if (new Date(e.dataset.date + 'T00:00:00') <= today) { tag.textContent = 'Volgens planning beschikbaar'; }
      else if (!nextDone) { tag.textContent = 'Eerstvolgende'; e.classList.add('is-next'); nextDone = true; }
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
        (c.closest('.card-wrap') || c).hidden = !ok; if (ok) n++;
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
