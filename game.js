// Sound Effects
const correctSound = new Audio("assets/correct.mp3");
const wrongSound = new Audio("assets/wrong.mp3");
const gameOverSound = new Audio("assets/gameover.mp3");

// DOM Elements
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const levelEl = document.getElementById("level");

let score = 0;
let level = 1;
let timeLeft = 10;
let correctAnswer = 0;
let timer;

// Start game
startGame();

function startGame() {
  generateQuestion();
  updateUI();
  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏱️ ${timeLeft}s`;
    if (timeLeft <= 0) {
      endGame("⏰ Time's up!");
    }
  }, 1000);
}

function generateQuestion() {
  const operators = ["+", "-", "*", "/", "BODMAS"];
  let op = operators[Math.floor(Math.random() * operators.length)];

  let a, b, c, question;

  switch (op) {
    case "+":
      a = getRandom(10, 20);
      b = getRandom(1, 10);
      correctAnswer = a + b;
      question = `${a} + ${b}`;
      break;
    case "-":
      a = getRandom(10, 20);
      b = getRandom(1, a);
      correctAnswer = a - b;
      question = `${a} - ${b}`;
      break;
    case "*":
      a = getRandom(2, 10);
      b = getRandom(2, 10);
      correctAnswer = a * b;
      question = `${a} × ${b}`;
      break;
    case "/":
      b = getRandom(2, 10);
      correctAnswer = getRandom(2, 10);
      a = correctAnswer * b;
      question = `${a} ÷ ${b}`;
      break;
    case "BODMAS":
      a = getRandom(1, 10);
      b = getRandom(1, 10);
      c = getRandom(1, 5);
      correctAnswer = a + b * c;
      question = `${a} + ${b} × ${c}`;
      break;
  }

  questionEl.textContent = `🧠 ${question}`;
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
    answerEl.value = "";
  } else {
    wrongSound.play();
    endGame("❌ Wrong Answer!");
  }
}

function endGame(message) {
  gameOverSound.play();
  clearInterval(timer);
  resultEl.textContent = `${message} Final Score: ${score}`;
  submitBtn.disabled = true;
  answerEl.disabled = true;
}

function updateLevel() {
  if (score > 0 && score % 5 === 0) {
    level++;
  }
}

function updateUI() {
  scoreEl.textContent = `🏆 Score: ${score}`;
  levelEl.textContent = `🎮 Level: ${level}`;
  timerEl.textContent = `⏱️ ${timeLeft}s`;
}

// Random number helper
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Event listener
submitBtn.addEventListener("click", checkAnswer);
answerEl.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    checkAnswer();
  }
});
