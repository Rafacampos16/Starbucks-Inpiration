//MENU FIXO
const navbar = document.querySelector('.navbar-bottom');
  
window.addEventListener('scroll', () => {
  // Detecta a posição do scroll
  if (window.scrollY > 100) { // Ajuste "100" conforme necessário
    navbar.classList.add('fixed');
  } else {
    navbar.classList.remove('fixed');
  }
});

//CARROSEL DE RESGAT
const rewardButtons = document.querySelectorAll('.reward-btn');
const rewardImage = document.getElementById('reward-image');
const rewardDescription = document.querySelector('.reward-description');

const rewardData = {
  25: {
    image: 'img/rec1.png',
    title: 'Customize sua bebida',
    description: 'Faça sua bebida do jeito certo com um toque extra de espresso ou um toque do seu xarope favorito.',
  },
  100: {
    image: 'img/rec2.png',
    title: 'Café, chá quente ou gelado, item de padaria, lanche embalado e muito mais',
    description: 'Mime-se com um café gelado, um croissant amanteigado, um saco de batatas fritas e muito mais.',
  },
  200: {
    image: 'img/rec3.png',
    title: 'Bebida artesanal (Cold Brew, lattes e mais) ou café da manhã quente',
    description: 'Transforme seu dia com uma deliciosa bebida artesanal à sua escolha, sanduíche de café da manhã ou aveia por nossa conta.',
  },
  300: {
    image: 'img/rec4.png',
    title: 'Sanduíche, caixa de proteína ou café caseiro',
    description: 'Desfrute de um lanche noturno com um sanduíche de almoço, uma caixa de proteínas ou um saquinho de café, incluindo Starbucks VIA Instant®.',
  },
  400: {
    image: 'img/rec5.png',
    title: 'Selecione mercadorias Starbucks®',
    description: 'Leve para casa uma xícara exclusiva, um copo de bebida ou um produto de café de sua preferência por até US$ 20.',
  },
};

rewardButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Remove a classe 'active' de todos os botões
    rewardButtons.forEach((btn) => btn.classList.remove('active'));
    // Adiciona a classe 'active' ao botão clicado
    button.classList.add('active');

    // Atualiza a imagem e descrição
    const stars = button.getAttribute('data-stars');
    rewardImage.src = rewardData[stars].image;
    rewardDescription.querySelector('h3').textContent = rewardData[stars].title;
    rewardDescription.querySelector('p').textContent = rewardData[stars].description;
  });
});

//EXTRAs
// Seleção de elementos
const modal = document.getElementById("modal");
const learnMoreButtons = document.querySelectorAll(".learn-more-btn");
const closeButtons = document.querySelectorAll(".close-modal");
const prevBtns = document.querySelectorAll(".prev-btn");
const nextBtns = document.querySelectorAll(".next-btn");

// Variáveis de controle
let currentIndex = 0;
let currentCarouselId = 1; // Inicializa com o primeiro carrossel

// Função para abrir o modal e o carrossel correto
function openModal(carouselId) {
  currentCarouselId = carouselId; // Atualiza o ID do carrossel
  modal.classList.remove("hidden");

  // Esconde todos os carrosséis e mostra o carrossel correspondente
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach(carousel => {
    carousel.style.display = "none"; // Esconde todos os carrosséis
  });

  const currentCarousel = document.getElementById(`carousel${carouselId}`);
  currentCarousel.style.display = "block"; // Exibe o carrossel correspondente
  createIndicators(carouselId); // Cria os indicadores para o carrossel correto
  showCarouselItem(0, carouselId); // Exibe o primeiro item do carrossel
}

// Função para fechar o modal
function closeModal() {
  modal.classList.add("hidden");
}

// Função para exibir um item do carrossel com base no índice
function showCarouselItem(index, carouselId) {
  const selectedCarousel = document.getElementById(`carousel${carouselId}`);
  const items = selectedCarousel.querySelectorAll(".carousel-item");
  items.forEach((item, i) => {
    item.classList.toggle("hidden", i !== index);
  });

  updateIndicators(index, carouselId);
  currentIndex = index;
}

// Função para criar indicadores para o carrossel correto
function createIndicators(carouselId) {
  const selectedCarousel = document.getElementById(`carousel${carouselId}`);
  const indicatorContainer = selectedCarousel.querySelector(".carousel-controls .indicator-container"); // Agora está no lugar correto

  // Limpa os indicadores antigos
  indicatorContainer.innerHTML = '';

  const items = selectedCarousel.querySelectorAll(".carousel-item");
  items.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    if (index === 0) indicator.classList.add("active");
    indicator.addEventListener("click", () => showCarouselItem(index, carouselId));
    indicatorContainer.appendChild(indicator);
  });
}


// Função para atualizar os indicadores
function updateIndicators(index, carouselId) {
  const indicators = document.querySelectorAll(`#carousel${carouselId} .indicator`);
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index);
  });
}

// Eventos de botão "Saiba mais"
learnMoreButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const carouselId = parseInt(e.target.dataset.id, 10); // Pega o ID do carrossel
    openModal(carouselId); // Abre o modal com o carrossel correspondente
  });
});

// Eventos para fechar o modal
closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

// Eventos para navegação no carrossel
prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const carouselId = btn.closest('.carousel').id.replace('carousel', '');
    const newIndex = (currentIndex - 1 + 3) % 3; // Lógica para garantir a navegação circular
    showCarouselItem(newIndex, carouselId);
  });
});

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const carouselId = btn.closest('.carousel').id.replace('carousel', '');
    const newIndex = (currentIndex + 1) % 3; // Lógica para garantir a navegação circular
    showCarouselItem(newIndex, carouselId);
  });
});

// Inicialização
// Inicializa os indicadores apenas para o primeiro carrossel
document.addEventListener("DOMContentLoaded", function () {
  createIndicators(1); // Cria os indicadores para o primeiro carrossel ao carregar a página
});

//REGARREGAR
window.addEventListener('load', () => {
  // Garante que o loader permaneça visível por pelo menos 2 segundos
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 1500); // 2000 milissegundos = 2 segundos
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
});
