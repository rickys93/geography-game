let url_base = "https://geo-genius-server.onrender.com/";

//this works
const startResetButton = document.getElementById("button");
// const submitGuess = document.getElementById("form");
const guessButton = document.getElementById("form");
//hidden element to store country of flag to compare to user guess
const correctAnswer = document.getElementById("correctAnswer");
//hidden element to store fact related to flag
const funFact = document.getElementById("funFact");
//heading to appear when user guesses correctly
const correctHeading = document.getElementById("correct");
//what flag is this heading to appear when user clicks new flag/click to play
const whatFlagHeader = document.getElementById("whatFlag");
const score = document.getElementById("flag-frenzy-score");
const timer = document.getElementById("countdown-timer");
const flagImage = document.querySelector("#flag-image");
const gameOver = document.querySelector(".game-finished");
const flagHint = document.querySelector("#hint");

async function displayFlag() {
    //fetch array of flag objects
    const response = await fetch(url_base + "flag-facts"); 
    const flags = await response.json();

    const randomId = Math.floor(Math.random() * flags.length);
    //fact with the random ID
    const randomFlag = flags[randomId];
    


    // const flag = await response.json();

     const flagImage = document.querySelector("#flag-image");

    whatFlagHeader.style.visibility = "visible";

    startResetButton.textContent = "RESET";

    flagImage.src = randomFlag["flagFile"];
     //will appear when guessed correctly
    funFact.textContent = `Hint: ${randomFlag["interestingFact"]}`;

    correctHeading.textContent = "";
    flagHint.textContent = "Click to reveal a hint";

    //assign country of flag to correct answer to be used with guess button + form
    correctAnswer.textContent = randomFlag["countryName"];
}

//function for when guess is clicked
async function guessAnswer(e) {
    e.preventDefault();

    let userGuess = e.target.flagGuess.value;

    // if (!guess) {
    //     return;
    // }
    userGuess = userGuess.charAt(0).toUpperCase() + userGuess.slice(1);

    if (userGuess.toLowerCase() === correctAnswer.textContent.toLowerCase()) {
        correctHeading.textContent = "CORRECT!";
        let gameScore = +score.textContent;
        gameScore += 1;
        score.textContent = gameScore;
        displayFlag();
    } else if (userGuess.length === 0) {
        correctHeading.textContent = "Please enter a guess";
    } else if (userGuess === correctAnswer.textContent) {
        correctHeading.textContent = "CORRECT!";
    } else {
        correctHeading.textContent = `WRONG! The correct answer was ${correctAnswer.textContent}`;
        displayFlag();
    }

    document.getElementById("flagGuess").value = "";
}

function showHint(e) {
    e.preventDefault();

    flagHint.textContent = funFact.textContent;
}

flagHint.addEventListener("click", showHint);

let intervalId;

function startCountdownTimer() {
    // perform the game start
    intervalId = setInterval(function () {
        const countdownTimer = document.getElementById("countdown-timer");
        let secondsLeft = countdownTimer.textContent;
        countdownTimer.textContent -= 1;
        if (secondsLeft == 1) {
            clearInterval(intervalId);
            // stop the game, add up points etc
            gameFinished();
        }
    }, 1000);
}

function resetGame(e) {
    clearInterval(intervalId);
    score.textContent = 0;
    timer.textContent = 60;
    flagImage.src = "images/question.png";
    flagImage.style.display = "flex";
    gameOver.style.display = "none";
    guessButton.removeEventListener("submit", guessAnswer);
    guessButton.addEventListener("submit", emptyFunction);
    startResetButton.addEventListener("click", gameStart);
    startResetButton.textContent = "Click to play";
}

function gameStart(e) {
    displayFlag();
    guessButton.addEventListener("submit", guessAnswer);
    startResetButton.removeEventListener("click", gameStart);
    startResetButton.addEventListener("click", resetGame);
    startCountdownTimer();
}

function gameFinished() {
    flagImage.style.display = "none";
    gameOver.style.display = "flex";

    guessButton.removeEventListener("submit", guessAnswer);
    guessButton.addEventListener("submit", emptyFunction);
    document.getElementById("final-score").textContent = score.textContent;
}

function endGame() {
    resetGame();
    startResetButton.addEventListener("click", gameStart);
    guessButton.removeEventListener("submit", guessAnswer);
}

function emptyFunction(e) {
    e.preventDefault();
}

startResetButton.addEventListener("click", gameStart);
guessButton.addEventListener("submit", emptyFunction);
