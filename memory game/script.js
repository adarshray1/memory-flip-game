const icons = ['🍕', '🍔', '🍟', '🌮', '🍩', '🍪', '🍓', '🍎'];
let cards = [...icons, ...icons]; // Duplicate for matching pairs
let moves = 0;
let flippedCards = [];
let matchedCount = 0;
let timer;
let time = 0;
let started = false;

const board = document.getElementById('game-board');
const movesText = document.getElementById('moves');
const timeText = document.getElementById('time');
const winMsg = document.getElementById('win-message');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  cards = shuffle([...icons, ...icons]);
  board.innerHTML = '';
  flippedCards = [];
  matchedCount = 0;
  moves = 0;
  time = 0;
  started = false;
  movesText.textContent = moves;
  timeText.textContent = time;
  winMsg.style.display = 'none';

  clearInterval(timer);

  cards.forEach((icon, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.dataset.index = index;
    card.innerHTML = '';
    board.appendChild(card);

    card.addEventListener('click', () => flipCard(card));
  });
}

function startTimer() {
  timer = setInterval(() => {
    time++;
    timeText.textContent = time;
  }, 1000);
}

function flipCard(card) {
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

  if (!started) {
    startTimer();
    started = true;
  }

  card.classList.add('flipped');
  card.innerHTML = card.dataset.icon;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesText.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.icon === card2.dataset.icon) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCount += 2;
    if (matchedCount === cards.length) {
      clearInterval(timer);
      setTimeout(() => {
        winMsg.style.display = 'block';
      }, 500);
    }
    flippedCards = [];
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.innerHTML = '';
      card2.innerHTML = '';
      flippedCards = [];
    }, 800);
  }
}

startGame();
