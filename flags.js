const url_base = "https://geo-genius-server.onrender.com/";

//this works
const getFlagButton = document.getElementById("button");
// const submitGuess = document.getElementById("form");
const guessButton = document.getElementById("form");
const correctAnswer = document.getElementById("correctAnswer");
const correctHeading = document.getElementById("correct");

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
        }
    
    }

guessButton.addEventListener("submit", guessAnswer);

getFlagButton.addEventListener("click", displayFlag);