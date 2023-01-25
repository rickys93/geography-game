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

async function getFlags() {
    //fetch array of flag objects
    const response = await fetch(url_base + "flag-facts");
    const flags = await response.json();
    return flags
}
getFlags()
flags = getFlags()
console.log(flags)

function displayFlag(flags) {
    console.log(flags)

    const randomId = Math.floor(Math.random() * flags.length);
    //fact with the random ID
    const randomFlag = flags[randomId];

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

    return true;
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

function gameStart(e) {
    // if (!checkNameAdded()) {
    //     alert("Please make sure name entered on home page.");
    //     return;
    // }

    if (!displayFlag()) {
        alert("Error while loading flags. Please try again later.");
        return;
    }

    guessButton.addEventListener("submit", guessAnswer);
    startResetButton.removeEventListener("click", gameStart);
    startResetButton.addEventListener("click", resetGame);
    startCountdownTimer();
}

function resetGame(e) {
    clearInterval(intervalId);
    score.textContent = 0;
    timer.textContent = 60;
    flagImage.src = "images/question.png";
    flagImage.style.display = "flex";
    flagImage.height = "100%";
    gameOver.style.display = "none";
    guessButton.removeEventListener("submit", guessAnswer);
    guessButton.addEventListener("submit", emptyFunction);
    startResetButton.addEventListener("click", gameStart);
    startResetButton.textContent = "Click to play";
}

function gameFinished() {
    flagImage.style.display = "none";
    gameOver.style.display = "flex";

    guessButton.removeEventListener("submit", guessAnswer);
    guessButton.addEventListener("submit", emptyFunction);
    document.getElementById("final-score").textContent = score.textContent;
    addScore(score.textContent);
}

function endGame() {
    resetGame();
    startResetButton.addEventListener("click", gameStart);
    guessButton.removeEventListener("submit", guessAnswer);
}

function emptyFunction(e) {
    e.preventDefault();
}

async function addScore(score) {
    score = +score;
    if (typeof score !== "number") {
        console.log(
            "Issue with addScore funciton. Score entry not of type number"
        );
        return;
    }

    addScoreToLeaderboard(score);
    addScoreToProfile(score);
}

async function addScoreToLeaderboard(score) {
    let name = document.getElementsByClassName("user-name")[0].textContent;

    let entry = {
        name,
        score,
    };
    let options = {
        method: "POST",
        body: JSON.stringify(entry),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    console.log(options);
    const res = await fetch(url_base + "leaderboards/flagfrenzy", options);
    const data = await res.json();

    console.log(data);
}

async function addScoreToProfile(score) {
    score = +score;
    let entry = {
        score,
    };
    let options = {
        method: "POST",
        body: JSON.stringify(entry),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    console.log(options);
    const res = await fetch(url_base + "user/addscore", options);
    const data = await res.json();
    displayUserProfile();
}

startResetButton.addEventListener("click", gameStart);
guessButton.addEventListener("submit", emptyFunction);
