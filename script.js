document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("gallery-grid");

  // 1. Creiamo dinamicamente la finestra sovrapposta (Lightbox) nel DOM
  const modalHTML = `
    <div id="lightbox-modal" class="lightbox-modal">
      <span class="lightbox-close">&times;</span>
      <div class="lightbox-content">
        <img id="lightbox-img" src="" alt="Opera ingrandita">
        <div class="lightbox-info">
          <h3 id="lightbox-title"></h3>
          <p id="lightbox-desc"></p>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Elementi del Lightbox
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");
  const modalTitle = document.getElementById("lightbox-title");
  const modalDesc = document.getElementById("lightbox-desc");
  const closeBtn = document.querySelector(".lightbox-close");

  // 2. Popoliamo la Galleria leggendo i dati da disegni.js
  if (typeof disegni !== "undefined" && galleryGrid) {
    disegni.forEach((disegno) => {
      const card = document.createElement("div");
      card.classList.add("gallery-item");

      card.innerHTML = `
        <img src="${disegno.immagine}" alt="${disegno.titolo}" loading="lazy">
        <div class="overlay">
          <span>${disegno.titolo}</span>
        </div>
      `;

      // Evento Click: Apre la finestra sovrapposta con i dati del disegno
      card.addEventListener("click", () => {
        modalImg.src = disegno.immagine;
        modalTitle.textContent = disegno.titolo;
        modalDesc.textContent = disegno.descrizione || ""; // Se non c'è descrizione, lascia vuoto
        modal.classList.add("active");
      });

      galleryGrid.appendChild(card);
    });
  }

  // 3. Chiusura del Lightbox (clic sulla X o sullo sfondo scuro)
  closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Chiusura premendo il tasto ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
    }
  });
});
