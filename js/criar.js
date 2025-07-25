// Pega elementos
const btnPostar = document.getElementById('btnPostar');
const telefoneInput = document.getElementById('telefone');

// Se estiver editando oferta, carrega dadosL
const ofertaEditando = JSON.parse(localStorage.getItem('editarOferta'));
if (ofertaEditando) {
  document.getElementById('tipo').value = ofertaEditando.tipo || 'OFERTA';
  document.getElementById('titulo').value = ofertaEditando.titulo;
  document.getElementById('nome').value = ofertaEditando.nome;
  document.getElementById('descricao').value = ofertaEditando.descricao;
  document.getElementById('instagram').value = ofertaEditando.instagram;
  telefoneInput.value = ofertaEditando.telefone;
}

// Máscara e validação do telefone
telefoneInput.addEventListener('input', () => {
  let valor = telefoneInput.value;

  // Remove tudo que não for número
  valor = valor.replace(/\D/g, '');

  // Se tentou digitar letra, já removemos e mostramos alerta
  if (telefoneInput.value.match(/[^\d()\-\s]/)) {
    alert('Por favor, digite apenas números no telefone.');
  }

  // Limita a 11 dígitos
  if (valor.length > 11) {
    alert('Número de telefone deve ter no máximo 11 dígitos.');
    valor = valor.slice(0, 11);
  }

  // Aplica máscara (xx) xxxxx-xxxx
  if (valor.length > 0) {
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
  }
  if (valor.length > 9) {
    valor = valor.replace(/(\d{5})(\d{4})$/, '$1-$2');
  } else if (valor.length > 5) {
    valor = valor.replace(/(\d{4})(\d{1,4})$/, '$1-$2');
  }

  telefoneInput.value = valor;
});

// Função para desmascarar o telefone (remover formatação)
function desmascararTelefone(tel) {
  return tel.replace(/\D/g, '');
}

btnPostar.addEventListener('click', () => {
  const tipo = document.getElementById('tipo').value;
  const titulo = document.getElementById('titulo').value.trim();
  const nome = document.getElementById('nome').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const instagram = document.getElementById('instagram').value.trim();
  const telefone = telefoneInput.value.trim();

  // Validações básicas
  if (!titulo || !nome || !descricao) {
    alert('Preencha todos os campos obrigatórios!');
    return;
  }

  if (!telefone) {
    alert('Por favor, informe o número de telefone.');
    return;
  }

  const telefoneLimpo = desmascararTelefone(telefone);

  if (telefoneLimpo.length < 10) {
    alert('Informe um número de telefone válido com DDD e número.');
    return;
  }

  // Criar objeto oferta
  const novaOferta = { 
    id: ofertaEditando ? ofertaEditando.id : Date.now(),
    tipo,
    titulo,
    nome,
    descricao,
    instagram,
    telefone
  };

  // Pega ofertas atuais do localStorage
  const ofertas = JSON.parse(localStorage.getItem('ofertas') || '[]');

  if (ofertaEditando) {
    // Atualiza oferta existente
    const atualizadas = ofertas.map(o => o.id === ofertaEditando.id ? novaOferta : o);
    localStorage.setItem('ofertas', JSON.stringify(atualizadas));
    localStorage.removeItem('editarOferta');
  } else {
    // Adiciona nova oferta
    ofertas.push(novaOferta);
    localStorage.setItem('ofertas', JSON.stringify(ofertas));
  }

  // Redireciona para a lista
  window.location.href = 'mural.html';
});

const descricaoInput = document.getElementById('descricao');

descricaoInput.addEventListener('input', () => {
  if (descricaoInput.value.length > 130) {
    alert('Descrição deve ter no máximo 130 caracteres.');
    descricaoInput.value = descricaoInput.value.slice(0, 130);
  }
});


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
