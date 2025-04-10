// Sound Effects
const correctSound = new Audio("assets/correct.mp3");
const wrongSound = new Audio("assets/wrong.mp3");
const gameOverSound = new Audio("assets/gameover.mp3");

let score = 0;
let level = 1;
let timeLeft = 10;
let timer;
let correctAnswer = 0;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const submitBtn = document.getElementById("submit");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");

function generateQuestion() {
  let a, b, op;
  switch (level) {
    case 1:
      a = Math.floor(Math.random() * 10);
      b = Math.floor(Math.random() * 10);
      op = ['+', '-'][Math.floor(Math.random() * 2)];
      break;
    case 2:
      a = Math.floor(Math.random() * 20);
      b = Math.floor(Math.random() * 10) + 1;
      op = ['*', '/'][Math.floor(Math.random() * 2)];
      break;
    case 3:
      a = Math.floor(Math.random() * 30);
      b = Math.floor(Math.random() * 20) + 1;
      op = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
      break;
    default:
      a = Math.floor(Math.random() * 50);
      b = Math.floor(Math.random() * 40) + 1;
      op = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
  }

  if (op === '/') {
    a = a * b; // Ensure division has integer result
  }

  questionEl.textContent = `${a} ${op} ${b}`;
  correctAnswer = eval(`${a} ${op} ${b}`);
  correctAnswer = Math.round(correctAnswer * 100) / 100; // round to 2 decimals
}

function startGame() {
  score = 0;
  level = 1;
  timeLeft = 10;
  updateUI();
  generateQuestion();
  timer = setInterval(updateTimer, 1000);
}

function updateUI() {
  scoreEl.textContent = `Score: ${score}`;
  timerEl.textContent = `Time: ${timeLeft}s`;
  answerEl.value = "";
  resultEl.textContent = "";
}

function updateTimer() {
  timeLeft--;
  timerEl.textContent = `Time: ${timeLeft}s`;
  if (timeLeft <= 0) {
    endGame("⏰ Time's up!");
  }
}

function checkAnswer() {
  const userAnswer = parseFloat(answerEl.value);
  if (userAnswer === correctAnswer) {
    correctSound.play();
    score++;
    timeLeft = 10;
    updateLevel();
    updateUI();
    generateQuestion();
  } else {
    wrongSound.play();
    endGame("❌ Wrong Answer!");
  }
}

}

function updateLevel() {
  if (score >= 10) level = 3;
  else if (score >= 5) level = 2;
}

function endGame(message) {
  gameOverSound.play();
  clearInterval(timer);
  resultEl.textContent = `${message} Final Score: ${score}`;
  submitBtn.disabled = true;
  answerEl.disabled = true;
}

submitBtn.addEventListener("click", checkAnswer);
window.onload = startGame;
