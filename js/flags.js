let url_base = "https://geo-genius-server.onrender.com/";

//this works
const getFlagButton = document.getElementById("button");
const guessButton = document.getElementById("form");
const correctAnswer = document.getElementById("correctAnswer");
const correctHeading = document.getElementById("correct");
const whatFlagHeader = document.getElementById("whatFlag");

async function displayFlag(e) {
    e.preventDefault();
    const response = await fetch(url_base + "flag-facts/random");
    const flag = await response.json();

    const flagImage = document.querySelector("#flag-image");

    const flagFact = document.querySelector("#facts");

    whatFlagHeader.textContent = "What flag is this?";

    getFlagButton.textContent = "NEW FLAG";

    flagImage.src = flag["flagFile"];
    //make this a hint or change the fact to not include country name or appear when guessed correctly
    flagFact.textContent = flag["interestingFact"];

    //assign country of flag to correct answer to be used with guess button + form
    correctAnswer.textContent = flag["countryName"];
}

//started function for when guess is clicked
async function guessAnswer(e) {
    e.preventDefault();

    let userGuess = e.target.flagGuess.value;

    // if (!guess) {
    //     return;
    // }

    userGuess = userGuess.charAt(0).toUpperCase() + userGuess.slice(1);

    if (userGuess === correctAnswer.textContent) {
        correctHeading.textContent = "CORRECT!";
    } else if (userGuess.length === 0) {
        correctHeading.textContent = "Please enter a guess";
    } else {
        correctHeading.textContent = `WRONG! The correct answer was ${correctAnswer.textContent}`;
    }

    document.getElementById("flagGuess").value = "";
}

guessButton.addEventListener("submit", guessAnswer);

getFlagButton.addEventListener("click", displayFlag);
