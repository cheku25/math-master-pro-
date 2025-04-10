let score = 0;
let timer;
let timeLeft = 10;
let level = 1;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");

const correctSound = new Audio("assets/correct.mp3");
const wrongSound = new Audio("assets/wrong.mp3");
const gameoverSound = new Audio("assets/gameover.mp3");

function generateQuestion() {
  let a, b, operator, question, correctAnswer;

  switch (level) {
    case 1:
      a = Math.floor(Math.random() * 10);
      b = Math.floor(Math.random() * 10);
      operator = ['+', '-'][Math.floor(Math.random() * 2)];
      break;
    case 2:
      a = Math.floor(Math.random() * 20);
      b = Math.floor(Math.random() * 10) + 1;
      operator = ['*', '/'][Math.floor(Math.random() * 2)];
      break;
    default:
      a = Math.floor(Math.random() * 50);
      b = Math.floor(Math.random() * 50) + 1;
      operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
  }

  switch (operator) {
    case '+': correctAnswer = a + b; break;
    case '-': correctAnswer = a - b; break;
    case '*': correctAnswer = a * b; break;
    case '/': correctAnswer = parseFloat((a / b).toFixed(2)); break;
  }

  question = `${a} ${operator} ${b}`;
  questionEl.textContent = question;
  questionEl.dataset.answer = correctAnswer;
}

function startGame() {
  score = 0;
  level = 1;
  timeLeft = 10;
  updateScore();
  generateQuestion();
  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

function updateScore() {
  scoreEl.textContent = `Score: ${score}`;
  if (score >= 5) level = 2;
  if (score >= 10) level = 3;
}

function updateTimer() {
  timeLeft--;
  timerEl.textContent = `Time: ${timeLeft}s`;
  if (timeLeft <= 0) endGame("Time's up!");
}

function checkAnswer() {
  const userAnswer = parseFloat(answerEl.value);
  const correct = parseFloat(questionEl.dataset.answer);

  if (userAnswer === correct) {
    correctSound.play();
    score++;
    updateScore();
    timeLeft = 10;
    generateQuestion();
    answerEl.value = "";
  } else {
    wrongSound.play();
    endGame("Wrong Answer!");
  }
}

function endGame(message) {
  clearInterval(timer);
  gameoverSound.play();
  resultEl.textContent = `${message} Final Score: ${score}`;
  saveScore(score);
}

function saveScore(score) {
  const user = firebase.auth().currentUser;
  if (user) {
    const db = firebase.firestore();
    db.collection("scores").add({
      uid: user.uid,
      score: score,
      time: new Date()
    });
  }
}

document.getElementById("submit").addEventListener("click", checkAnswer);
window.onload = startGame;
