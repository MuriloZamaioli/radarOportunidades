const container = document.querySelector('.app-container');
const ofertas = JSON.parse(localStorage.getItem('ofertas') || '[]');

const renderCard = (oferta) => {
  const card = document.createElement('div');
  card.className = 'corpo-anuncio bg-light p-3 rounded shadow-sm mb-3';
  card.innerHTML = `
    <h2 class="h6">${oferta.titulo}</h2>
    <h3 class="h6 text-muted">${oferta.nome}</h3>
    <p class="small descricao-card">${oferta.descricao}</p>
    <h3 class="h6">Contatos</h3>
    <p class="small">${oferta.instagram}<br>${oferta.telefone}</p>
  `;
  return card;
};

const ofertasFiltradas = ofertas.filter(o => o.tipo === 'oferta');

if (ofertasFiltradas.length > 0) {
  const h = document.createElement('h1');
  h.className = 'tipo-card h5 mt-4';
  h.textContent = 'OFERTAS';
  container.appendChild(h);

  ofertasFiltradas.forEach(o => container.appendChild(renderCard(o)));
}

const menu = document.getElementById("sideMenu");
const menuBtn = document.getElementById("menuBtn");
const overlay = document.getElementById("overlay");

function toggleMenu() {
  const isOpen = menu.classList.toggle("active");
  overlay.classList.toggle("active", isOpen);
  menuBtn.classList.toggle("hidden", isOpen);
}

document.addEventListener("click", function(event) {
  const isClickInsideMenu = menu.contains(event.target);
  const isClickOnButton = menuBtn.contains(event.target);

  if (!isClickInsideMenu && !isClickOnButton && menu.classList.contains("active")) {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    menuBtn.classList.remove("hidden");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item => {
    const itemPage = item.getAttribute("href");
    if (itemPage === currentPage) {
      item.classList.add("active");
    }
  });
});
