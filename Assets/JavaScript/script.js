// script for rps game

//creating the basic functionallity of the game
// defining variables for rock paper and scissors
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const resultDisplay = document.getElementById("result");

//defing round display varibales
let currentRound = 1;
const totalRounds = 5;
const roundDisplay = document.getElementById("round");

//adding listeners for the choices of the player
rockButton.addEventListener("click", () => playRound("rock"));
paperButton.addEventListener("click", () => playRound("paper"));
scissorsButton.addEventListener("click", () => playRound("scissors"));

// Now this section will be used to track the scoring and create a best of 5 series

//variables for the score for player and coputer

let playerScore = 0;
let computerScore = 0;
let tieScore = 0;
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const tieScoreDisplay = document.getElementById("tie-game");

//creating the game logic. making the choices of the computer random
function playRound(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  // this will determin what round is it and the winner and updates scores accordingly
  if (currentRound <= totalRounds) {
    roundDisplay.textContent = `Round: ${currentRound} of ${totalRounds}`;
    currentRound++;
  }
  //This will tell who won and show it on a display. if player choices matches the computer it's a draw
  if (playerChoice === computerChoice) {
    resultDisplay.textContent = "It's a draw!";
    tieScore++; //counts draws
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    resultDisplay.textContent = "You win!";
    playerScore++; //Increase player score if win
  } else {
    resultDisplay.textContent = "Computer wins!";
    computerScore++; //increase computer score if win
  }

  // updating score display
  playerScoreDisplay.textContent = `Player Score: ${playerScore}`;
  computerScoreDisplay.textContent = `Computer Score: ${computerScore}`;
  tieScoreDisplay.textContent = `Number of ties: ${tieScore}`;

  if (currentRound > totalRounds) {
    concludeGame(); // Call this function when all rounds are completed
  }
  //create a function to end the game and display the final results
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
    // adding ability to provide a summary of the game outcomes
    // connects to the main container
    const gameContainer = document.getElementById("rps-game");
    // clearing up the game area to hide choices
    const choices = document.getElementById("choices");
    const gameInfo = document.getElementById("game-info");
    const roundRes = document.getElementById("result");
    if (choices) {
      choices.style.display = "none";
    }

    if (gameInfo) {
      gameInfo.style.display = "none";
    }

    if (roundRes) {
      roundRes.style.display = "none";
    }
    //now we create the game conclusion element
    const gameConclusion = document.createElement("div");
    gameConclusion.setAttribute("id", "game-conclusion");

    let finalMessage = "";
    if (playerScore > computerScore) {
      finalMessage = "Congratulations, you won the game!";
    } else if (playerScore < computerScore) {
      finalMessage = "Oops! You lost :P";
    } else {
      finalMessage = "Tie Game!";
    }
    //adding another section to html doc for final message and restart button
    gameConclusion.innerHTML = `<h2>Game Over</h2> 
    <p>${finalMessage}</p>
  <p>Final Score - You: ${playerScore} | Computer: ${computerScore}</p>
  <button id="restart-btn">Restart Game</button>`;

    // Append the conclusion to the main game container
    gameContainer.appendChild(gameConclusion);

    // Add event listener to the restart button
    document
      .getElementById("restart-btn")
      .addEventListener("click", restartGame);
  }
}

//ccode for the restart function

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  tieScore = 0;
  currentRound = 1;

  // reset displays to 0
  playerScoreDisplay.textContent = "Player Score: 0";
  computerScoreDisplay.textContent = "Computer Score: 0";
  tieScoreDisplay.textContent = "Number of ties: 0";
  roundDisplay.textContent = `Round: 1 of ${totalRounds}`;

  const choices = document.getElementById("choices");
  const gameInfo = document.getElementById("game-info");
  const roundRes = document.getElementById("result");
  if (choices) {
    choices.style.display = "";
  }

  if (gameInfo) {
    gameInfo.style.display = "";
  }

  if (roundRes) {
    roundRes.style.display = "";
  }

  // reset the game conclusion
  const gameConclusion = document.getElementById("game-conclusion");
  if (gameConclusion) {
    gameConclusion.remove();
  }

  // Make the components visble after completing
  document.getElementById("choices").style.display = "";
  resultDisplay.textContent = "Choose your weapon!";
}

//accessibility text contrast feature variables
/*let textColor = document.getElementById("text-color");
let bgColor = document.getElementById("bg-color").value;

bgColor.addEventListener("onchange");

function setBgcolor() {
  document.body.style.backgroundColor = bgColor;
}*/
