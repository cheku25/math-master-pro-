let score = 0;
let timeLeft = 10;
let timer;
let currentAnswer = 0;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const gameOverBox = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");

// Sounds
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const gameoverSound = document.getElementById("gameover-sound");

function startGame() {
  score = 0;
  timeLeft = 10;
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  gameOverBox.classList.add("hidden");
  document.getElementById("question-box").classList.remove("hidden");
  nextQuestion();
  startTimer();
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      gameOver();
    }
  }, 1000);
}

function nextQuestion() {
  answerEl.value = "";
  timeLeft = 10;
  timerEl.textContent = timeLeft;

  let level = Math.floor(score / 5) + 1;
  let num1 = getRandom(1, 10 * level);
  let num2 = getRandom(1, 10 * level);
  let operator = getOperator(level);

  let question = `${num1} ${operator} ${num2}`;
  currentAnswer = eval(question);
  currentAnswer = Math.round(currentAnswer * 100) / 100; // Round to 2 decimals
  questionEl.textContent = question;
}

function checkAnswer() {
  const userAnswer = parseFloat(answerEl.value);

  if (isNaN(userAnswer)) return;

  if (Math.abs(userAnswer - currentAnswer) < 0.01) {
    score++;
    correctSound.play();
    scoreEl.textContent = score;
    nextQuestion();
  } else {
    wrongSound.play();
    gameOver();
  }
}

function getOperator(level) {
  if (level < 2) return ["+", "-"][Math.floor(Math.random() * 2)];
  if (level < 4) return ["+", "-", "*"][Math.floor(Math.random() * 3)];
  const ops = ["+", "-", "*", "/"];
  return ops[Math.floor(Math.random() * ops.length)];
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameOver() {
  clearInterval(timer);
  gameoverSound.play();
  document.getElementById("question-box").classList.add("hidden");
  gameOverBox.classList.remove("hidden");
  finalScore.textContent = score;
}

function restartGame() {
  startGame();
}

window.onload = startGame;
