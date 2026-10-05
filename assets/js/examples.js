(() => {
  const videos = [...document.querySelectorAll('[data-preview]')];
  const toggle = document.querySelector('.motion-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  const visible = new Set();
  function sync() {
    toggle.textContent = paused ? 'Speel previews af' : 'Pauzeer previews';
    toggle.setAttribute('aria-pressed', String(paused));
    videos.forEach(video => {
      if (!paused && !document.hidden && visible.has(video)) video.play().catch(() => {});
      else video.pause();
    });
  }
  if ('IntersectionObserver' in window) {
    toggle.hidden = false;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      sync();
    }, { threshold: .2 });
    videos.forEach(video => observer.observe(video));
    toggle.addEventListener('click', () => { paused = !paused; sync(); });
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', () => { paused = reduced.matches; sync(); });
    sync();
  }
  const dialog = document.querySelector('.example-viewer');
  let opener;
  document.querySelectorAll('[data-enlarge]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      dialog.querySelector('img').src = link.href;
      dialog.querySelector('img').alt = link.querySelector('img').alt;
      dialog.querySelector('p').textContent = link.closest('figure').querySelector('figcaption').textContent;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if(event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); }});
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus(); });
})();
