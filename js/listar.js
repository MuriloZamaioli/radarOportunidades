const container = document.querySelector('.app-container');
const ofertas = JSON.parse(localStorage.getItem('ofertas') || '[]');

const renderCard = (oferta) => {
  const card = document.createElement('div');
  card.className = 'box-teste bg-light p-3 rounded shadow-sm mb-3';

  card.innerHTML = `
    <h2 class="h6">${oferta.titulo}</h2>
    <h3 class="h6 text-muted">${oferta.nome}</h3>
    <p class="small">${oferta.descricao}</p>
    <h3 class="h6">Contatos</h3>
    <p class="small">${oferta.instagram}<br>${oferta.telefone}</p>
    <div class="d-flex gap-2 mt-2">
      <button class="btn btn-sm btn-outline-primary editar">Editar</button>
      <button class="btn btn-sm btn-outline-danger deletar">Deletar</button>
    </div>
  `;

  // Editar
  card.querySelector('.editar').addEventListener('click', () => {
    localStorage.setItem('editarOferta', JSON.stringify(oferta));
    window.location.href = 'criar.html';
  });

  // Deletar
  card.querySelector('.deletar').addEventListener('click', () => {
    if (confirm('Deseja deletar esta oferta?')) {
      const novas = ofertas.filter(o => o.id !== oferta.id);
      localStorage.setItem('ofertas', JSON.stringify(novas));
      location.reload();
    }
  });

  return card;
};

// Renderizar se houver ofertas
const renderGrupo = (titulo, lista) => {
  const h = document.createElement('h1');
  h.className = 'h5 mt-4';
  h.textContent = titulo;
  container.appendChild(h);

  lista.forEach(o => container.appendChild(renderCard(o)));
};

const ofertasFiltradas = ofertas.filter(o => o.tipo === 'oferta');
const solicitacoesFiltradas = ofertas.filter(o => o.tipo === 'solicitacao');

if (ofertasFiltradas.length > 0) renderGrupo('OFERTAS', ofertasFiltradas);
if (solicitacoesFiltradas.length > 0) renderGrupo('SOLICITAÇÕES', solicitacoesFiltradas);

const ofertaEditando = JSON.parse(localStorage.getItem('editarOferta'));
const btnPostar = document.getElementById('btnPostar');
const telefoneInput = document.getElementById('telefone');

if (ofertaEditando) {
  document.getElementById('tipo').value = ofertaEditando.tipo;
  document.getElementById('titulo').value = ofertaEditando.titulo;
  document.getElementById('nome').value = ofertaEditando.nome;
  document.getElementById('descricao').value = ofertaEditando.descricao;
  document.getElementById('instagram').value = ofertaEditando.instagram;
  document.getElementById('telefone').value = ofertaEditando.telefone;
}

// Filtro para aceitar só números no telefone
telefoneInput.addEventListener('input', () => {
  telefoneInput.value = telefoneInput.value.replace(/\D/g, '');
});

btnPostar.addEventListener('click', () => {
  const tipo = document.getElementById('tipo').value;
  const titulo = document.getElementById('titulo').value.trim();
  const nome = document.getElementById('nome').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const instagram = document.getElementById('instagram').value.trim();
  const telefone = telefoneInput.value.trim();

  if (!titulo || !nome || !descricao) {
    alert('Preencha todos os campos obrigatórios!');
    return;
  }

  const novaOferta = { tipo, titulo, nome, descricao, instagram, telefone };

  const ofertas = JSON.parse(localStorage.getItem('ofertas') || '[]');

  if (ofertaEditando) {
    novaOferta.id = ofertaEditando.id;
    const atualizadas = ofertas.map(o => o.id === ofertaEditando.id ? novaOferta : o);
    localStorage.setItem('ofertas', JSON.stringify(atualizadas));
    localStorage.removeItem('editarOferta');
  } else {
    novaOferta.id = Date.now();
    ofertas.push(novaOferta);
    localStorage.setItem('ofertas', JSON.stringify(ofertas));
  }

  window.location.href = 'listar.html';
});
