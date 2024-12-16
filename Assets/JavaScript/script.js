// script for RPS game

// Defining variables for the buttons (Rock, Paper, Scissors, Lizard, Spock)
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const lizardButton = document.getElementById("lizard");
const spockButton = document.getElementById("spock");
const resultDisplay = document.getElementById("result");
const gameMode = document.getElementById("mode");

// Defining round display variables
let currentRound = 1;
const totalRounds = 5;
const roundDisplay = document.getElementById("round");

// Adding event listeners for the player's choices
rockButton.addEventListener("click", () => playRound("rock"));
paperButton.addEventListener("click", () => playRound("paper"));
scissorsButton.addEventListener("click", () => playRound("scissors"));
lizardButton.addEventListener("click", () => playRound("lizard"));
spockButton.addEventListener("click", () => playRound("spock"));
gameMode.addEventListener("click", toggleGameMode);

let isHardMode = true; // Hard mode flag

// Toggle between normal and hard mode
function toggleGameMode() {
  isHardMode = !isHardMode;
  updateChoices(); // Update displayed buttons based on the mode
  gameMode.textContent = isHardMode
    ? "Switch to Normal Mode"
    : "Switch to Hard Mode"; // Toggle button text
}

// Variables for tracking the scores
let playerScore = 0;
let computerScore = 0;
let tieScore = 0;
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const tieScoreDisplay = document.getElementById("tie-game");

// Function to play a round of the game
function playRound(playerChoice) {
  const choices = isHardMode
    ? ["rock", "paper", "scissors", "lizard", "spock"]
    : ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  // Determine the result based on the player's and computer's choices
  if (playerChoice === computerChoice) {
    resultDisplay.textContent = "It's a draw!";
    tieScore++; // Count draws
  } else if (isWinner(playerChoice, computerChoice)) {
    resultDisplay.textContent = "You win!";
    playerScore++; // Increase player score if win
  } else {
    resultDisplay.textContent = "Computer wins!";
    computerScore++; // Increase computer score if win
  }

  // Update the round and score displays
  let roundsLeft = totalRounds - currentRound;
  roundDisplay.textContent = `Round: ${currentRound} of ${totalRounds} (Rounds left: ${roundsLeft})`;
  currentRound++;

  // Update the score displays
  playerScoreDisplay.textContent = `Player Score: ${playerScore}`;
  computerScoreDisplay.textContent = `Computer Score: ${computerScore}`;
  tieScoreDisplay.textContent = `Number of ties: ${tieScore}`;

  if (currentRound > totalRounds) {
    concludeGame(); // Call this function when all rounds are completed
  }
}

// Function to check if the player won
function isWinner(playerChoice, computerChoice) {
  const winConditions = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["rock", "scissors"],
  };

  return (
    winConditions[playerChoice] &&
    winConditions[playerChoice].includes(computerChoice)
  );
}

// Function to end the game and display the final results
function concludeGame() {
  let finalResult = "";
  if (playerScore > computerScore) {
    finalResult = "Congratulations, you won the game!";
  } else if (playerScore < computerScore) {
    finalResult = "Oops! You lose :P";
  } else {
    finalResult = "Tie Game!";
  }
  resultDisplay.textContent = finalResult;

  // Hide the game choices and other UI elements
  const gameContainer = document.getElementById("rps-game");
  const choices = document.getElementById("choices");
  const gameInfo = document.getElementById("game-info");
  const roundRes = document.getElementById("result");

  if (choices) choices.style.display = "none";
  if (gameInfo) gameInfo.style.display = "none";
  if (roundRes) roundRes.style.display = "none";

  // Hide the switch game mode button when the game ends
  if (gameMode) gameMode.style.display = "none"; // Hide the button

  // Create the game conclusion element
  const gameConclusion = document.createElement("div");
  gameConclusion.setAttribute("id", "game-conclusion");

  gameConclusion.innerHTML = `
    <h2>Game Over</h2> 
    <h3>${finalResult}</h3>
    <p>Final Score - You: ${playerScore} | Computer: ${computerScore}</p>
    <button id="restart-btn">Restart Game</button>
  `;

  // Append the conclusion to the main game container
  gameContainer.appendChild(gameConclusion);

  // Add event listener to the restart button
  document.getElementById("restart-btn").addEventListener("click", restartGame);
}

// Function to restart the game
function restartGame() {
  playerScore = 0;
  computerScore = 0;
  tieScore = 0;
  currentRound = 1;

  // Reset displays to 0
  playerScoreDisplay.textContent = "Player Score: 0";
  computerScoreDisplay.textContent = "Computer Score: 0";
  tieScoreDisplay.textContent = "Number of ties: 0";
  roundDisplay.textContent = `Round: 1 of ${totalRounds}`;

  // Reset the UI components
  const choices = document.getElementById("choices");
  const gameInfo = document.getElementById("game-info");
  const roundRes = document.getElementById("result");
  const gameMode = document.getElementById("mode");

  if (choices) choices.style.display = "";
  if (gameInfo) gameInfo.style.display = "";
  if (roundRes) roundRes.style.display = "";
  if (gameMode) gameMode.style.display = "inline-block"; // Make it visible again

  // Reset the game conclusion
  const gameConclusion = document.getElementById("game-conclusion");
  if (gameConclusion) gameConclusion.remove();

  // Make the components visible after completing
  document.getElementById("choices").style.display = "";
  resultDisplay.textContent = "Choose your weapon!";
}

// Function to update the available choices based on the game mode
function updateChoices() {
  if (isHardMode) {
    lizardButton.style.display = "inline-block"; // Show Lizard button
    spockButton.style.display = "inline-block"; // Show Spock button
  } else {
    lizardButton.style.display = "none"; // Hide Lizard button
    spockButton.style.display = "none"; // Hide Spock button
  }
}
