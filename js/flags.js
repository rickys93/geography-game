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
correctHeading.style.display = "none";
//what flag is this heading to appear when user clicks new flag/click to play
const whatFlagHeader = document.getElementById("whatFlag");
const score = document.getElementById("flag-frenzy-score");
const timer = document.getElementById("countdown-timer");
const flagImage = document.querySelector("#flag-image");
const gameOver = document.querySelector(".game-finished");
const flagHint = document.querySelector("#hint");
flagHint.style.display = "none";
const skipButton = document.querySelector("#skip");
skipButton.style.display = "none";

let wrongSound;
let rightSound;

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

async function getFlags() {
    const response = await fetch(url_base + "flag-facts");
    const flags = await response.json();
    return flags
}

console.log(getFlags())

 function displayFlag() {
    correctHeading.style.display = "block";

    const randomId = Math.floor(Math.random() * flags.length);
    //fact with the random ID
    const randomFlag = flags[randomId];

    flags.splice(flags.indexOf(flags[randomId]), 1);
    console.log(flags)

    const flagImage = document.querySelector("#flag-image");

    whatFlagHeader.style.visibility = "visible";
    skipButton.style.display = "inline";
    flagHint.style.display = "block";

    startResetButton.textContent = "QUIT";

    flagImage.src = randomFlag["flagFile"];
    //will appear when guessed correctly
    funFact.textContent = `Hint: ${randomFlag["interestingFact"]}`;

    //correctHeading.textContent = "";
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
        rightSound.play();
        correctHeading.textContent = "CORRECT!";
        let gameScore = +score.textContent;
        gameScore += 1;
        score.textContent = gameScore;
        displayFlag();
    } else if (userGuess.length === 0) {
        correctHeading.textContent = "Please enter a guess";
    } else {
        wrongSound.play();
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

function skipFlag(e) {
    e.preventDefault();

    displayFlag()
}


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

async function gameStart(e) {
    // if (!checkNameAdded()) {
    //     alert("Please make sure name entered on home page.");
    //     return;
    // }
    flags = await getFlags()
    //console.log(flags)

    if (!displayFlag()) {
        alert("Error while loading flags. Please try again later.");
        return;
    }

    wrongSound = new sound("./sounds/wrong.mp3");
    rightSound = new sound("./sounds/right.mp3")
    guessButton.addEventListener("submit", guessAnswer);
    startResetButton.removeEventListener("click", gameStart);
    startResetButton.addEventListener("click", resetGame);
    startCountdownTimer();
}

// Reset the game countdown timer, points, html object styles etc
function resetGame(e) {
    clearInterval(intervalId);
    score.textContent = 0;
    timer.textContent = 10;
    flagImage.src = "images/question.png";
    flagImage.style.display = "flex";
    flagImage.height = "100%";
    gameOver.style.display = "none";
    guessButton.removeEventListener("submit", guessAnswer);
    guessButton.addEventListener("submit", emptyFunction);
    startResetButton.addEventListener("click", gameStart);
    startResetButton.textContent = "Click to play";
    skipButton.style.display = "none";
    flagHint.style.display = "none";
}

// This is called once the countdown timer hits 0
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
            "Issue with addScore function. Score entry not of type number"
        );
        return;
    }

    addScoreToLeaderboard(score);
    addScoreToProfile(score);
}

async function addScoreToLeaderboard(score) {
    let username = document.getElementsByClassName("user-name")[0].textContent;

    let entry = {
        username,
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
    console.log(res);
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
    const res = await fetch(url_base + "user/addscore", options);
    const data = await res.json();
    if (data.rankUp) {
    }
    displayUserProfile();
}

startResetButton.addEventListener("click", gameStart);
guessButton.addEventListener("submit", emptyFunction);
skipButton.addEventListener("click", skipFlag);
