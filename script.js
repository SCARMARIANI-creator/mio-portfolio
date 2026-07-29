// Navigazione dinamica tra le sezioni del sito
function switchPage(pageId) {
  if (pageId === 'homePage') {
    document.getElementById('homePage').style.display = 'flex';
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
  } else {
    document.getElementById('homePage').style.display = 'none';
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');
  }
  window.scrollTo(0, 0);
}

// Inserimento dati artista da disegni.js
document.addEventListener("DOMContentLoaded", () => {
  if (typeof infoArtista !== 'undefined') {
    if (infoArtista.nomeLogo) document.getElementById('siteLogo').innerText = infoArtista.nomeLogo;
    if (infoArtista.nome) document.getElementById('siteTitle').innerText = infoArtista.nome;
    if (infoArtista.slogan) document.getElementById('siteSlogan').innerText = infoArtista.slogan;
    if (infoArtista.biografia) document.getElementById('bioText').innerText = infoArtista.biografia;
  }

  // Popolamento dinamico della Galleria
  const galleryGrid = document.getElementById('galleryGrid');
  if (typeof mieiDisegni !== 'undefined' && galleryGrid) {
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
function openLightbox(src, title) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  lightboxImg.src = src;
  lightboxCaption.innerText = title || '';
  lightbox.classList.add('active');
}

function closeLightbox(event) {
  if (event.target.id === 'lightbox' || event.target.classList.contains('lightbox-close')) {
    document.getElementById('lightbox').classList.remove('active');
  }
}
