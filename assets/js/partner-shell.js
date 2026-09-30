(function () {
  var base = document.body.getAttribute('data-base') || '';
  var page = document.body.getAttribute('data-page') || '';
  var nav = document.querySelector('[data-partner-nav]');
  var footer = document.querySelector('[data-partner-footer]');

  function link(path, label, key, extra) {
    return '<a' + (page === key ? ' class="active' + (extra ? ' ' + extra : '') + '" aria-current="page"' : (extra ? ' class="' + extra + '"' : '')) + ' href="' + base + path + '">' + label + '</a>';
  }

  if (nav) {
    nav.className = 'bbnav';
    nav.innerHTML =
      '<div class="bbnav-inner">' +
        '<a class="home" href="' + base + 'index.html" aria-label="Universiteit van Nederland — home">' +
          '<span class="partner-logo" aria-hidden="true"></span><span class="sr-only">Universiteit van Nederland</span>' +
        '</a>' +
        '<button class="public-menu" type="button" aria-expanded="false" aria-controls="public-links">Menu</button>' +
        '<div class="links" id="public-links">' +
          link('pages/merk.html', 'Het merk', 'merk') +
          link('pages/huisstijl.html', 'Huisstijl', 'huisstijl') +
          link('pages/examples.html', 'Voorbeelden', 'examples') +
          link('pages/download.html', 'Partnerkit ↓', 'download', 'btn primary cta') +
        '</div>' +
      '</div>';

    var menu = nav.querySelector('.public-menu');
    menu.addEventListener('click', function () {
      var open = nav.classList.toggle('menu-open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  if (footer) {
    footer.className = 'footer';
    footer.innerHTML =
      '<div class="footer-inner public-footer">' +
        '<a class="footer-logo" href="' + base + 'index.html"><span class="partner-logo" aria-hidden="true"></span><span class="sr-only">Universiteit van Nederland</span></a>' +
        '<p class="serif-italic">De universiteit voor iedereen.</p>' +
        '<div class="footer-public-links">' +
          '<a href="' + base + 'pages/merk.html">Het merk</a><a href="' + base + 'pages/huisstijl.html">Huisstijl</a><a href="' + base + 'pages/examples.html">Voorbeelden</a><a href="' + base + 'pages/download.html">Partnerkit</a>' +
        '</div>' +
        '<p class="footer-meta">© 2026 Universiteiten van Nederland<br><a href="mailto:info@studioyoko.nl">info@studioyoko.nl</a></p>' +
      '</div>';
  }

  var hero = document.querySelector('.bb-hero');
  if (nav && hero) {
    function updateNav() {
      nav.classList.toggle('is-hero', window.scrollY < hero.offsetHeight - nav.offsetHeight - 8);
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    window.addEventListener('resize', updateNav);
    updateNav();
  }

  var slides = Array.prototype.slice.call(document.querySelectorAll('.bb-hero .hero-slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.hero-dots button'));
  var current = 0;
  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) { slide.classList.toggle('is-on', i === current); });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === current);
      if (i === current) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current');
    });
  }
  dots.forEach(function (dot, i) { dot.addEventListener('click', function () { showSlide(i); }); });
  if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setInterval(function () { showSlide(current + 1); }, 7000);
  }
})();
