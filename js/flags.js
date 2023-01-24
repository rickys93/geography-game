let url_base = "https://geo-genius-server.onrender.com/";

const getFlagButton = document.getElementById("button");
const guessButton = document.getElementById("form");
//hidden element to store country of flag to compare to user guess
const correctAnswer = document.getElementById("correctAnswer");
//hidden element to store fact related to flag
const funFact = document.getElementById("funFact");
//heading to appear when user guesses correctly
const correctHeading = document.getElementById("correct");
//what flag is this heading to appear when user clicks new flag/click to play
const whatFlagHeader = document.getElementById("whatFlag");
//hint when clicked should display fact related to country
const flagHint = document.querySelector("#hint");

//function to display a random flag from API and store the relative country and fact
async function displayFlag(e) {
    e.preventDefault();
    const response = await fetch(url_base + "flag-facts/random");
    const flag = await response.json();

    const flagImage = document.querySelector("#flag-image");  

    whatFlagHeader.textContent = "What flag is this?";

    getFlagButton.textContent = "NEW FLAG";

    flagImage.src = flag["flagFile"];
    //will appear when guessed correctly
    funFact.textContent = `Hint: ${flag["interestingFact"]}`;

    correctHeading.textContent = "";
    flagHint.textContent = "Click to reveal a hint"
    
    //assign country of flag to correct answer to be used with guess button + form
    correctAnswer.textContent = flag["countryName"];
}

//function for when guess is clicked
async function guessAnswer(e) {
    e.preventDefault();

    let userGuess = e.target.flagGuess.value;
    // if (!guess) {
    //     return;
    // }
    userGuess = userGuess.charAt(0).toUpperCase() + userGuess.slice(1);

    //if their guess is the same as stored correct answer for flag then show correct
    if (userGuess.length === 0) {
        correctHeading.textContent = "Please enter a guess";
    } else if (userGuess === correctAnswer.textContent) {
        correctHeading.textContent = "CORRECT!";
        
    } else {
        correctHeading.textContent = `WRONG! The correct answer was ${correctAnswer.textContent}`;
    }

    document.getElementById("flagGuess").value = "";
}

async function showHint(e) {
    e.preventDefault();

    flagHint.textContent = funFact.textContent;

}


flagHint.addEventListener("click", showHint);

guessButton.addEventListener("submit", guessAnswer);

getFlagButton.addEventListener("click", displayFlag);
