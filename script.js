document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("gallery-grid");

  // Indice dell'immagine attualmente aperta nel Lightbox
  let currentIndex = 0;

  // 1. Struttura del Lightbox con frecce e pannello informazioni a destra
  const modalHTML = `
    <div id="lightbox-modal" class="lightbox-modal">
      <span class="lightbox-close">&times;</span>
      
      <!-- Freccia Sinistra -->
      <button class="lightbox-nav prev-btn" id="lightbox-prev">&#10094;</button>
      
      <div class="lightbox-container">
        <div class="lightbox-img-wrapper">
          <img id="lightbox-img" src="" alt="Opera ingrandita">
        </div>
        <div class="lightbox-sidebar">
          <h3 id="lightbox-title"></h3>
          <p id="lightbox-desc"></p>
        </div>
      </div>

      <!-- Freccia Destra -->
      <button class="lightbox-nav next-btn" id="lightbox-next">&#10095;</button>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Elementi del Lightbox
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");
  const modalTitle = document.getElementById("lightbox-title");
  const modalDesc = document.getElementById("lightbox-desc");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  // Funzione per aggiornare il contenuto del Lightbox
  function updateLightbox(index) {
    if (typeof disegni === "undefined" || !disegni[index]) return;
    
    currentIndex = index;
    const item = disegni[currentIndex];
    
    modalImg.src = item.immagine;
    modalTitle.textContent = item.titolo || "Senza Titolo";
    modalDesc.textContent = item.descrizione || "";
  }

  // Funzioni di navigazione (Avanti / Indietro)
  function showNext() {
    const nextIndex = (currentIndex + 1) % disegni.length;
    updateLightbox(nextIndex);
  }

  function showPrev() {
    const prevIndex = (currentIndex - 1 + disegni.length) % disegni.length;
    updateLightbox(prevIndex);
  }

  // 2. Popolamento Galleria
  if (typeof disegni !== "undefined" && galleryGrid) {
    disegni.forEach((disegno, index) => {
      const card = document.createElement("div");
      card.classList.add("gallery-item");

      card.innerHTML = `
        <img src="${disegno.immagine}" alt="${disegno.titolo}" loading="lazy">
        <div class="overlay">
          <span>${disegno.titolo}</span>
        </div>
      `;

      // Apertura Lightbox sull'immagine cliccata
      card.addEventListener("click", () => {
        updateLightbox(index);
        modal.classList.add("active");
      });

      galleryGrid.appendChild(card);
    });
  }

  // 3. Eventi Pulsanti
  closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showNext();
  });
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrev();
  });

  // Chiusura cliccando sullo sfondo nero
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Navigazione da tastiera (Tasti Direzionali + ESC)
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") modal.classList.remove("active");
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
});
