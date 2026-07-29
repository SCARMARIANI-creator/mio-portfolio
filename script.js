// Navigazione dinamica tra le sezioni del sito (definita globalmente)
window.switchPage = function(pageId) {
  const home = document.getElementById('homePage');
  const pages = document.querySelectorAll('.page-content');
  const navLinks = document.querySelectorAll('nav a');

  // Gestione visibilità sezioni
  if (pageId === 'homePage') {
    if (home) home.style.display = 'flex';
    pages.forEach(p => p.classList.remove('active'));
  } else {
    if (home) home.style.display = 'none';
    pages.forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');
  }

  // Gestione underline attivo nel menu
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(pageId)) {
      link.classList.add('active');
    }
  });

  window.scrollTo(0, 0);
};

// Popolamento dinamico all'avvio
document.addEventListener("DOMContentLoaded", () => {
  // Inserimento dati artista
  if (typeof infoArtista !== 'undefined') {
    if (infoArtista.nomeLogo) document.getElementById('siteLogo').innerText = infoArtista.nomeLogo;
    if (infoArtista.nome) document.getElementById('siteTitle').innerText = infoArtista.nome;
    if (infoArtista.slogan) document.getElementById('siteSlogan').innerText = infoArtista.slogan;
    if (infoArtista.biografia) document.getElementById('bioText').innerText = infoArtista.biografia;
  }

  // Popolamento dinamico della Galleria
  const galleryGrid = document.getElementById('galleryGrid');
  if (typeof mieiDisegni !== 'undefined' && galleryGrid) {
    galleryGrid.innerHTML = ''; // Pulizia griglia iniziale
    mieiDisegni.forEach(item => {
      const div = document.createElement('div');
      div.className = 'card-item';
      div.onclick = () => openLightbox(item.immagine, item.titolo);
      div.innerHTML = `
        <img src="${item.immagine}" alt="${item.titolo}">
        <div class="card-body">
          <h3>${item.titolo}</h3>
          <p>${item.tecnica || ''}</p>
        </div>
      `;
      galleryGrid.appendChild(div);
    });
  }
});

// Funzioni Lightbox per l'ingrandimento delle immagini
window.openLightbox = function(src, title) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.innerText = title || '';
    lightbox.classList.add('active');
  }
};

window.closeLightbox = function(event) {
  if (event.target.id === 'lightbox' || event.target.classList.contains('lightbox-close')) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('active');
  }
};
