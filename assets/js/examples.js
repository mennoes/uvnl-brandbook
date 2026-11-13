(() => {
 const header=document.querySelector('.examples-banner video'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let visible=true;
 function sync(){if(!header)return;if(reduced.matches||document.hidden||!visible)header.pause();else header.play().catch(()=>{});}
 if(header){
  header.muted=true;
  if('IntersectionObserver'in window)new IntersectionObserver(es=>{visible=es[0].isIntersecting;sync();}).observe(header);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);sync();
 }
 const films=[...document.querySelectorAll('video[controls]')];
 films.forEach(f=>f.addEventListener('play',()=>films.forEach(other=>{if(other!==f)other.pause();})));
 const dialog=document.querySelector('.example-viewer');if(!dialog)return;let opener;
 document.querySelectorAll('[data-enlarge]').forEach(link=>link.addEventListener('click',e=>{
  if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  e.preventDefault();opener=link;dialog.querySelector('img').src=link.href;
  dialog.querySelector('img').alt=link.querySelector('img').alt;
  dialog.querySelector('p').textContent=link.closest('figure').querySelector('figcaption')?.textContent||'';
  dialog.showModal();document.body.style.overflow='hidden';
 }));
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus();});
})();
