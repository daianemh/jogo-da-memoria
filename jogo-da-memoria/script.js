// script.js
document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const scoreDisplay = document.getElementById("score");
    const attemptsDisplay = document.getElementById("attempts");
    const difficultySelect = document.getElementById("difficulty");
    const startGameButton = document.getElementById("start-game");

    let cards = [];
    let revealedCards = [];
    let score = 0;
    let attempts = 0;

    // Configuração do jogo
    const cardSymbols = ["🍎", "🍌", "🍓", "🍇", "🍒", "🥝", "🍍", "🥭"];
    const levels = {
        easy: 4,
        medium: 8,
        hard: 12,
    };

    // Inicializa o jogo
    startGameButton.addEventListener("click", startGame);

    function startGame() {
        const difficulty = difficultySelect.value;
        const cardCount = levels[difficulty];

        score = 0;
        attempts = 0;
        scoreDisplay.textContent = score;
        attemptsDisplay.textContent = attempts;

        // Gerar cartas
        cards = shuffle([...cardSymbols.slice(0, cardCount / 2), ...cardSymbols.slice(0, cardCount / 2)]);
        renderBoard();
    }

    // Renderizar tabuleiro
    function renderBoard() {
        gameBoard.innerHTML = "";
        gameBoard.style.gridTemplateColumns = `repeat(${Math.sqrt(cards.length)}, 1fr)`;
        cards.forEach((symbol, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.index = index;
            card.textContent = symbol;
            card.addEventListener("click", () => revealCard(card, symbol));
            gameBoard.appendChild(card);
        });
    }

    // Revelar carta
    function revealCard(card, symbol) {
        if (card.classList.contains("revealed") || card.classList.contains("matched") || revealedCards.length === 2) return;

        card.classList.add("revealed");
        revealedCards.push({ card, symbol });

        if (revealedCards.length === 2) {
            checkMatch();
        }
    }

    // Verificar correspondência
    function checkMatch() {
        const [firstCard, secondCard] = revealedCards;

        if (firstCard.symbol === secondCard.symbol) {
            firstCard.card.classList.add("matched");
            secondCard.card.classList.add("matched");
            score++;
        } else {
            setTimeout(() => {
                firstCard.card.classList.remove("revealed");
                secondCard.card.classList.remove("revealed");
            }, 1000);
        }

        attempts++;
        scoreDisplay.textContent = score;
        attemptsDisplay.textContent = attempts;
        revealedCards = [];

        // Checar se o jogo terminou
        if (document.querySelectorAll(".card.matched").length === cards.length) {
            setTimeout(() => alert(`Parabéns! Você completou o jogo com ${attempts} tentativas!`), 500);
        }
    }

    // Embaralhar cartas
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
