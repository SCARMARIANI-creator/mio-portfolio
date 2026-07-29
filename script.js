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

function openLightbox(src, title, desc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightboxCaption.innerHTML = `<strong>${title || ''}</strong>${desc ? `<br><span style="font-size:0.88rem; opacity:0.8; margin-top:4px; display:block;">${desc}</span>` : ''}`;
    lightbox.classList.add('active');
  }
}

function closeLightbox(event) {
  const lightbox = document.getElementById('lightbox');
  if (lightbox && (event.target.id === 'lightbox' || event.target.classList.contains('lightbox-close'))) {
    lightbox.classList.remove('active');
  }
}

function inizializzaSito() {
  // 1. CARICA INFO ARTISTA E SOCIAL
  if (typeof infoArtista !== 'undefined') {
    if (document.getElementById('siteLogo')) document.getElementById('siteLogo').innerText = infoArtista.nomeLogo || "darkmanga";
    if (document.getElementById('siteTitle')) document.getElementById('siteTitle').innerText = infoArtista.nome || "Art by Scar";
    if (document.getElementById('siteSlogan')) document.getElementById('siteSlogan').innerText = infoArtista.slogan || "L'immaginazione è fatta d'inchiostro";
    if (document.getElementById('bioText')) document.getElementById('bioText').innerText = infoArtista.biografia || "";

    const socialBox = document.getElementById('socialBox');
    if (socialBox) {
      socialBox.innerHTML = '';
      if (infoArtista.instagram) socialBox.innerHTML += `<a href="${infoArtista.instagram}" target="_blank" class="social-btn" title="Instagram"><i class="fa-brands fa-instagram"></i></a>`;
      if (infoArtista.email) socialBox.innerHTML += `<a href="mailto:${infoArtista.email}" class="social-btn" title="Email"><i class="fa-regular fa-envelope"></i></a>`;
      if (infoArtista.mastodon) socialBox.innerHTML += `<a href="${infoArtista.mastodon}" target="_blank" class="social-btn" title="Mastodon"><i class="fa-brands fa-mastodon"></i></a>`;
      if (infoArtista.linktree) socialBox.innerHTML += `<a href="${infoArtista.linktree}" target="_blank" class="social-btn" title="Linktree"><i class="fa-regular fa-bookmark"></i></a>`;
    }
  }

  // 2. CARICA GALLERIA IMMAGINI
  const galleryGrid = document.getElementById('galleryGrid');
  if (typeof mieiDisegni !== 'undefined' && Array.isArray(mieiDisegni) && galleryGrid) {
    galleryGrid.innerHTML = '';
    mieiDisegni.forEach(item => {
      const div = document.createElement('div');
      div.className = 'card-item';
      div.onclick = () => openLightbox(item.immagine, item.titolo, item.descrizione);
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
}

// Avvio automatico quando la pagina carica
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inizializzaSito);
} else {
  inizializzaSito();
}
