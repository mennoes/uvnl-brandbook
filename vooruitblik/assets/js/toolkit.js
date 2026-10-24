/* Search the pre-rendered library. Every download works without JavaScript. */
(function () {
  'use strict';
  const form = document.querySelector('.library-filters');
  if (!form) return;
  const search = document.getElementById('media-search');
  const uni = document.getElementById('media-uni');
  const topic = document.getElementById('media-topic');
  const groups = [...document.querySelectorAll('.topic-material')];
  const count = document.getElementById('media-count');
  const empty = document.getElementById('media-empty');
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’']/g, '');
  function filter() {
    const words = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    let n = 0, people = 0;
    groups.forEach(group => {
      const match = words.every(word => normalize(group.dataset.search).includes(word)) && (!uni.value || group.dataset.unis.split('|').includes(uni.value)) && (!topic.value || group.dataset.topic === topic.value);
      group.hidden = !match;
      if (match) { n++; people += group.querySelectorAll('.person-downloads').length; }
    });
    count.textContent = `${n} ${n === 1 ? 'onderwerp' : 'onderwerpen'} · ${people} sprekers`;
    empty.hidden = n > 0;
    const params = new URLSearchParams();
    if (search.value.trim()) params.set('zoek', search.value.trim());
    if (uni.value) params.set('universiteit', uni.value);
    if (topic.value) params.set('onderwerp', topic.value);
    history.replaceState(null, '', location.pathname + (params.size ? '?' + params : '') + location.hash);
  }
  const params = new URLSearchParams(location.search);
  search.value = params.get('zoek') || '';
  uni.value = params.get('universiteit') || '';
  topic.value = params.get('onderwerp') || '';
  search.addEventListener('input', filter);
  uni.addEventListener('change', filter);
  topic.addEventListener('change', filter);
  form.addEventListener('reset', () => setTimeout(filter, 0));
  document.getElementById('media-reset').addEventListener('click', () => { form.reset(); search.focus(); });
  filter();
})();
