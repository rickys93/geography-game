const url_base = "https://geo-genius-server.onrender.com/";

//this works
const getFlagButton = document.getElementById("button");
const submitGuess = document.getElementById("form");

async function displayFlag(e) {
    
    e.preventDefault();
    const response = await fetch(url_base + "flag-facts/random")
    const flag = await response.json()
  
    const flagImage = document.querySelector("#flag-image");
    
    const flagFact = document.querySelector("#facts");

    flagImage.src = flag["flagFile"];
    //make this a hint or change the fact to not include country name or appear when guessed correctly
    flagFact.textContent = flag["interestingFact"];

    //assign country of flag to correct answer to be used with guess button + form
    const correctAnswer = flag["countryName"];
    return correctAnswer;
  }

  //started function for when guess is clicked
const guess = document.getElementById("form");

async function guessAnswer(e) {

    e.preventDefault()

    let guess = e.target.flagGuess.value;
    // if (!guess) {
    //     return;
    // }

    guess = guess.charAt(0).toUpperCase() + guess.slice(1);

    if (guess === correctAnswer) {
        console.log("correct")
    }

}

submitGuess.addEventListener("submit", guessAnswer);
getFlagButton.addEventListener("click", displayFlag);