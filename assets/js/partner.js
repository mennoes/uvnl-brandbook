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

  var hero = document.querySelector('[data-hero]');
  if (hero) {
    var heroSlides = Array.prototype.slice.call(hero.querySelectorAll('.hero-slide'));
    var heroButtons = Array.prototype.slice.call(hero.querySelectorAll('.hero-carousel-nav button'));
    var heroIndex = 0;
    var heroTimer;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function showHeroSlide(index) {
      heroIndex = (index + heroSlides.length) % heroSlides.length;
      heroSlides.forEach(function (slide, slideIndex) {
        slide.classList.toggle('is-active', slideIndex === heroIndex);
      });
      heroButtons.forEach(function (button, buttonIndex) {
        var active = buttonIndex === heroIndex;
        button.classList.toggle('is-active', active);
        if (active) button.setAttribute('aria-current', 'true');
        else button.removeAttribute('aria-current');
      });
    }

    function stopHeroCarousel() {
      window.clearInterval(heroTimer);
    }

    function startHeroCarousel() {
      stopHeroCarousel();
      if (reduceMotion || heroSlides.length < 2) return;
      heroTimer = window.setInterval(function () {
        showHeroSlide(heroIndex + 1);
      }, 7000);
    }

    heroButtons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        showHeroSlide(index);
        startHeroCarousel();
      });
    });
    hero.addEventListener('mouseenter', stopHeroCarousel);
    hero.addEventListener('mouseleave', startHeroCarousel);
    hero.addEventListener('focusin', stopHeroCarousel);
    hero.addEventListener('focusout', startHeroCarousel);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopHeroCarousel();
      else startHeroCarousel();
    });
    startHeroCarousel();
  }

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
