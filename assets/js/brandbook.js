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

/* Vooruitblik hover depth, including dynamically loaded album cards. */
(() => {
 const enabled=matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
 const selector='.choice-bar, .album-cover, .brand-photo, .asset, .lg-card, .showpiece .media-link';
 const keys=['--depth-rx','--depth-ry','--depth-x','--depth-y','--depth-small-x','--depth-small-y'];
 let active=null,bounds=null,frame=0,lastX=0,lastY=0;
 function reset(){
  cancelAnimationFrame(frame);frame=0;
  if(active){keys.forEach(k=>active.style.removeProperty(k));active.classList.remove('depth-active');}
  active=null;bounds=null;
 }
 document.addEventListener('pointerover',e=>{
  if(!enabled.matches||e.pointerType==='touch')return;
  const card=e.target.closest(selector);if(!card||card===active)return;
  reset();active=card;bounds=card.getBoundingClientRect();card.classList.add('has-depth','depth-active');
 });
 document.addEventListener('pointermove',e=>{
  if(!active||!enabled.matches)return;lastX=e.clientX;lastY=e.clientY;if(frame)return;
  frame=requestAnimationFrame(()=>{
   frame=0;if(!active||!bounds)return;
   const x=Math.max(-.5,Math.min(.5,(lastX-bounds.left)/bounds.width-.5)),y=Math.max(-.5,Math.min(.5,(lastY-bounds.top)/bounds.height-.5));
   active.style.setProperty('--depth-ry',(x*11).toFixed(2)+'deg');active.style.setProperty('--depth-rx',(-y*11).toFixed(2)+'deg');
   active.style.setProperty('--depth-x',(x*16).toFixed(2)+'px');active.style.setProperty('--depth-y',(y*16).toFixed(2)+'px');
   active.style.setProperty('--depth-small-x',(x*5).toFixed(2)+'px');active.style.setProperty('--depth-small-y',(y*5).toFixed(2)+'px');
  });
 },{passive:true});
 document.addEventListener('pointerout',e=>{if(active&&!active.contains(e.relatedTarget))reset();});
 enabled.addEventListener('change',reset);window.addEventListener('blur',reset);
})();

