(function () {
  const toggle = document.querySelector('.menu-toggle');
  const panel = document.getElementById('menu-panel');

  if (!toggle || !panel) return;

  function closePanel() {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKey);
    document.body.style.overflow = '';
  }

  function openPanel() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
  }

  function onKey(e) {
    if (e.key === 'Escape') closePanel();
  }

  toggle.addEventListener('click', () => {
    if (panel.hidden) openPanel(); else closePanel();
  });

  document.addEventListener('click', (e) => {
    if (!panel.hidden && !panel.contains(e.target) && !toggle.contains(e.target)) {
      closePanel();
    }
  });
})();


