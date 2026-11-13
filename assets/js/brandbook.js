/* The mobile menu is a disclosure, not a second page or a horizontal scroller. */
(() => {
  const nav = document.querySelector('.bbnav');
  const button = nav?.querySelector('.nav-toggle');
  const menu = nav?.querySelector('.links');
  if (!button || !menu) return;
  const narrow = matchMedia('(max-width: 960px)');
  function setOpen(open, restoreFocus = false) {
    nav.classList.toggle('nav-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.innerHTML = open ? 'Sluiten <span aria-hidden="true">×</span>' : 'Menu <span aria-hidden="true">☰</span>';
    menu.inert = narrow.matches && !open;
    if (restoreFocus) button.focus();
  }
  function resize() {
    button.hidden = !narrow.matches;
    setOpen(false);
  }
  document.body.classList.add('nav-ready');
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('nav-open')) setOpen(false, true);
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target)) setOpen(false);
  });
  nav.addEventListener('focusout', event => {
    if (event.relatedTarget && !nav.contains(event.relatedTarget)) setOpen(false);
  });
  narrow.addEventListener('change', resize);
  resize();
})();
