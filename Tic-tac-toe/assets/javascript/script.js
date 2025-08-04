// Elements
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const themeToggle = document.getElementById('themeToggle');
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');
const xScore = document.getElementById("xScore");
const oScore = document.getElementById("oScore");
const tieScore = document.getElementById("tieScore");

// Game state
let xWins = 0;
let oWins = 0;
let ties = 0;
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Handle click
function handleClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer);

  clickSound.play();
  checkResult();
}

// Check win/tie
function checkResult() {
  let roundWon = false;

  for (const [a, b, c] of winConditions) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.querySelector(`.cell[data-index="${a}"]`).classList.add("win");
      document.querySelector(`.cell[data-index="${b}"]`).classList.add("win");
      document.querySelector(`.cell[data-index="${c}"]`).classList.add("win");
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins the Game! 🏆`;
    gameActive = false;

    if (currentPlayer === "X") {
      xWins++;
      xScore.textContent = xWins;
    } else {
      oWins++;
      oScore.textContent = oWins;
    }

    winSound.play();
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "😬 It's a Tie! No one wins.";
    ties++;
    tieScore.textContent = ties;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn ${currentPlayer === "X" ? "🔵" : "🔴"}`;
}

// Reset game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's Turn 🔵";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win", "X", "O");
  });
}

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.textContent = isLight ? "Switch to Dark Mode 🌙" : "Switch to Light Mode 🌞";
});

// Events
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);
