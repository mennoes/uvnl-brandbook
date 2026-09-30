(function () {
  var header = document.querySelector('[data-header]');
  var menuButton = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');

  function updateHeader() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
  }

  if (menuButton && header && nav) {
    menuButton.addEventListener('click', function () {
      var open = header.classList.toggle('menu-open');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (event) {
      if (!event.target.closest('a')) return;
      header.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('in-view'); });
  }
})();
