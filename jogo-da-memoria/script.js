const gameContainer = document.querySelector('.game-container');
const frutas = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥝', '🍑', '🥥'];

// Duplica as frutas para criar pares
const cartas = [...frutas, ...frutas];

// Embaralha as cartas
function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Cria as cartas no HTML
function criarCartas(cartas) {
  const cartasEmbaralhadas = embaralhar(cartas);

  cartasEmbaralhadas.forEach(fruta => {
    const carta = document.createElement('div');
    carta.classList.add('card');
    carta.dataset.fruta = fruta;

    const frente = document.createElement('div');
    frente.classList.add('card-front');
    frente.textContent = fruta;

    const verso = document.createElement('div');
    verso.classList.add('card-back');

    carta.appendChild(frente);
    carta.appendChild(verso);
    gameContainer.appendChild(carta);

    carta.addEventListener('click', virarCarta);
  });
}

// Lógica do jogo
let cartaVirada = null;
let travaJogo = false;

function virarCarta() {
  if (travaJogo || this === cartaVirada) return;

  this.classList.add('flip');

  if (!cartaVirada) {
    cartaVirada = this;
    return;
  }

  travaJogo = true;

  const fruta1 = cartaVirada.dataset.fruta;
  const fruta2 = this.dataset.fruta;

  if (fruta1 === fruta2) {
    cartaVirada = null;
    travaJogo = false;
  } else {
    setTimeout(() => {
      this.classList.remove('flip');
      cartaVirada.classList.remove('flip');
      cartaVirada = null;
      travaJogo = false;
    }, 1000);
  }
}

criarCartas(cartas);