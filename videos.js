(function () {
  const listEl = document.getElementById('video-list');
  if (!listEl) return;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  fetch('./videos.json')
    .then((r) => r.json())
    .then((videos) => {
      listEl.innerHTML = '';
      videos.forEach((v) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'video-link';
        a.href = v.link;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        a.innerHTML = `
          <i class="fa-solid fa-play" aria-hidden="true"></i>
          <span class="video-text">
            <span class="video-title">${escapeHtml(v.title)}</span>
            <span class="video-desc">${escapeHtml(v.description || '')}</span>
          </span>
        `;

        li.appendChild(a);
        listEl.appendChild(li);
      });
    })
    .catch((err) => {
      listEl.innerHTML = `<li>Failed to load videos. ${escapeHtml(err?.message || String(err))}</li>`;
    });
})();


