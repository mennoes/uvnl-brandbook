/* Open the matching subject when following a direct speaker link. */
(function () {
  'use strict';
  function revealHash() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    if (!id) return;
    const target = document.getElementById(id);
    const group = target && target.closest('.topic-material');
    if (group) { group.open = true; target.scrollIntoView({ block: 'start' }); }
  }
  window.addEventListener('hashchange', revealHash);
  revealHash();
})();
