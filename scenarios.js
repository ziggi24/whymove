// Scenarios page logic: load JSON, render one card at a time, with list overlay
(function () {
  const cardEl = document.getElementById("scenario-card");
  const prevBtn = document.querySelector(".nav-btn.prev");
  const nextBtn = document.querySelector(".nav-btn.next");
  const listBtn = document.querySelector(".nav-btn.list");
  const overlay = document.getElementById("scenario-overlay");
  const overlayClose = document.getElementById("overlay-close");
  const listEl = document.getElementById("scenario-list");

  if (!cardEl || !prevBtn || !nextBtn || !listBtn || !overlay || !overlayClose || !listEl) {
    return;
  }

  let scenarios = [];
  let flatScenarios = [];
  let index = 0;

  function renderCard() {
    const s = flatScenarios[index];
    if (!s) return;
    cardEl.innerHTML = "";

    const header = document.createElement("header");
    header.className = "scenario-card-header";
    header.innerHTML = `<div class="scenario-title">${s.scenarioNumber}: ${escapeHtml(s.title)}</div>`;

    const body = document.createElement("div");
    body.className = "scenario-card-body";
    if (s.description) {
      const p = document.createElement("p");
      p.textContent = s.description;
      body.appendChild(p);
    }

    if (Array.isArray(s.timeline) && s.timeline.length > 0) {
      const dl = document.createElement("div");
      dl.className = "timeline";
      s.timeline.forEach((t) => {
        const row = document.createElement("div");
        row.className = "timeline-row";
        const tf = document.createElement("div");
        tf.className = "timeframe";
        tf.textContent = t.timeframe;
        const ev = document.createElement("div");
        ev.className = "events";
        ev.textContent = t.events;
        row.appendChild(tf);
        row.appendChild(ev);
        dl.appendChild(row);
      });
      body.appendChild(dl);
    }

    cardEl.appendChild(header);
    cardEl.appendChild(body);
  }

  function showNext() {
    index = (index + 1) % flatScenarios.length;
    renderCard();
  }

  function showPrev() {
    index = (index - 1 + flatScenarios.length) % flatScenarios.length;
    renderCard();
  }

  function openList() {
    populateList();
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeList() {
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  function populateList() {
    listEl.innerHTML = "";
    flatScenarios.forEach((s, i) => {
      const li = document.createElement("li");
      li.className = "scenario-list-item";
      const btn = document.createElement("button");
      btn.className = "scenario-jump";
      btn.innerHTML = `<span class="num">#${s.scenarioNumber}</span> <span class="t">${escapeHtml(s.title)}</span>`;
      btn.addEventListener("click", () => {
        index = i;
        closeList();
        renderCard();
      });
      li.appendChild(btn);
      listEl.appendChild(li);
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Events
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);
  listBtn.addEventListener("click", openList);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeList();
  });
  overlayClose.addEventListener("click", closeList);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) closeList();
    if (e.key === "ArrowRight" && overlay.hidden) showNext();
    if (e.key === "ArrowLeft" && overlay.hidden) showPrev();
    if ((e.key === "l" || e.key === "L") && overlay.hidden) openList();
  });

  // Load scenarios JSON and flatten all parts into a single array of scenarios
  fetch("./scenarios.json")
    .then((r) => r.json())
    .then((data) => {
      scenarios = data?.relocationPlan?.parts || [];
      flatScenarios = scenarios.flatMap((p) => p.scenarios || []);
      index = 0;
      renderCard();
    })
    .catch((err) => {
      cardEl.innerHTML = `<div class="error">Failed to load scenarios. ${escapeHtml(err?.message || String(err))}</div>`;
    });
})();


