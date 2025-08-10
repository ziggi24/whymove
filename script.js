// Lightweight, no-dependency script
(function () {
  /**
   * List of image paths relative to index.html
   * Keeping it explicit avoids needing any backend or directory listing.
   */
  const images = [
    "./Img/Screenshot 2025-08-10 at 11.58.32.png",
    "./Img/Screenshot 2025-08-10 at 11.59.18.png",
    "./Img/Screenshot 2025-08-10 at 12.01.10.png",
    "./Img/Screenshot 2025-08-10 at 12.03.14.png",
    "./Img/Screenshot 2025-08-10 at 12.16.11.png",
    "./Img/Screenshot 2025-08-10 at 12.16.53.png",
    "./Img/Screenshot 2025-08-10 at 12.19.22.png",
    "./Img/Screenshot 2025-08-10 at 12.21.19.png",
    "./Img/Screenshot 2025-08-10 at 12.22.41.png",
    "./Img/Screenshot 2025-08-10 at 12.23.43.png",
    "./Img/Screenshot 2025-08-10 at 12.28.35.png",
    "./Img/Screenshot 2025-08-10 at 12.30.50.png",
    "./Img/Screenshot 2025-08-10 at 12.32.28.png",
    "./Img/Screenshot 2025-08-10 at 12.35.02.png",
    "./Img/Screenshot 2025-08-10 at 12.39.37.png",
    "./Img/Screenshot 2025-08-10 at 12.39.57.png",
    "./Img/Screenshot 2025-08-10 at 12.41.09.png",
    "./Img/Screenshot 2025-08-10 at 12.42.36.png",
    "./Img/Screenshot 2025-08-10 at 12.45.17.png",
  ];

  const imgEl = document.getElementById("photo");
  const prevBtn = document.querySelector(".nav-btn.prev");
  const nextBtn = document.querySelector(".nav-btn.next");

  if (!imgEl || !prevBtn || !nextBtn) return;

  // Start at the first image; deterministic order on every load
  let index = 0;

  function showCurrent() {
    const src = images[index];
    imgEl.src = src;
  }

  function showNext() {
    index = (index + 1) % images.length;
    showCurrent();
  }

  function showPrev() {
    index = (index - 1 + images.length) % images.length;
    showCurrent();
  }

  // Keyboard support
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  // Button events
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  // Prevent image drag ghost on desktop
  imgEl.addEventListener("dragstart", (e) => e.preventDefault());

  // Initial render
  showCurrent();
})();


