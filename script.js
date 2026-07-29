// Navigazione tra le pagine
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

// Inizializzazione dati e contenuto al caricamento del DOM
document.addEventListener('DOMContentLoaded', () => {
  
  // Popolamento Dati Artista
  if (typeof infoArtista !== 'undefined') {
    if (infoArtista.nomeLogo) document.getElementById('siteLogo').innerText = infoArtista.nomeLogo;
    if (infoArtista.nome) document.getElementById('siteTitle').innerText = infoArtista.nome;
    if (infoArtista.slogan) document.getElementById('siteSlogan').innerText = infoArtista.slogan;
    if (infoArtista.biografia) document.getElementById('bioText').innerText = infoArtista.biografia;

    // Generazione dinamica link Social
    const socialBox = document.getElementById('socialBox');
    if (socialBox) {
      socialBox.innerHTML = '';
      if (infoArtista.instagram) {
        socialBox.innerHTML += `<a href="${infoArtista.instagram}" target="_blank" class="social-btn" title="Instagram"><i class="fa-brands fa-instagram"></i></a>`;
      }
      if (infoArtista.email) {
        socialBox.innerHTML += `<a href="mailto:${infoArtista.email}" class="social-btn" title="Email"><i class="fa-regular fa-envelope"></i></a>`;
      }
      if (infoArtista.mastodon) {
        socialBox.innerHTML += `<a href="${infoArtista.mastodon}" target="_blank" class="social-btn" title="Mastodon"><i class="fa-brands fa-mastodon"></i></a>`;
      }
      if (infoArtista.linktree) {
        socialBox.innerHTML += `<a href="${infoArtista.linktree}" target="_blank" class="social-btn" title="Linktree"><i class="fa-regular fa-bookmark"></i></a>`;
      }
    }
  }

  // Popolamento Galleria
  const galleryGrid = document.getElementById('galleryGrid');
  if (typeof mieiDisegni !== 'undefined' && galleryGrid) {
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

  // Popolamento Eventi
  const eventsGrid = document.getElementById('eventsGrid');
  if (typeof mieiEventi !== 'undefined' && eventsGrid) {
    eventsGrid.innerHTML = '';
    if (mieiEventi.length === 0) {
      eventsGrid.innerHTML = '<p style="color:#666;">Nessun evento in programma al momento.</p>';
    } else {
      mieiEventi.forEach(ev => {
        const div = document.createElement('div');
        div.className = 'card-item';
        div.innerHTML = `
          <div class="card-body">
            <h3>${ev.titolo}</h3>
            <p><strong>Data:</strong> ${ev.data}<br><strong>Luogo:</strong> ${ev.luogo}</p>
            <p style="margin-top:8px;">${ev.descrizione || ''}</p>
          </div>
        `;
        eventsGrid.appendChild(div);
      });
    }
  }

  // Popolamento Shop
  const shopGrid = document.getElementById('shopGrid');
  if (typeof mieiProdotti !== 'undefined' && shopGrid) {
    shopGrid.innerHTML = '';
    if (mieiProdotti.length === 0) {
      shopGrid.innerHTML = '<p style="color:#666;">Lo shop aprirà presto con nuove stampe e originali.</p>';
    } else {
      mieiProdotti.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'card-item';
        div.innerHTML = `
          <img src="${prod.immagine}" alt="${prod.titolo}">
          <div class="card-body">
            <h3>${prod.titolo}</h3>
            <p style="font-weight:600; margin-bottom:8px;">${prod.prezzo}</p>
            <a href="${prod.link}" target="_blank" style="display:inline-block; padding:6px 12px; background:#111; color:#fff; text-decoration:none; border-radius:4px; font-size:0.8rem;">Acquista</a>
          </div>
        `;
        shopGrid.appendChild(div);
      });
    }
  }
});

// Gestione Modale Lightbox
function openLightbox(src, title, desc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  lightboxImg.src = src;
  lightboxCaption.innerHTML = `<strong>${title || ''}</strong>${desc ? `<br><span style="font-size:0.88rem; opacity:0.8; margin-top:4px; display:block;">${desc}</span>` : ''}`;
  lightbox.classList.add('active');
}

function closeLightbox(event) {
  if (event.target.id === 'lightbox' || event.target.classList.contains('lightbox-close')) {
    document.getElementById('lightbox').classList.remove('active');
  }
}
