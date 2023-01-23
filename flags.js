const url_base = "https://geo-genius-server.onrender.com/";

const getFlagButton = document.getElementById("button");

async function displayFlag() {
    
    const response = await fetch(url_base + "flag-facts/random")
    const flag = await response.json()
  
    const flagImage = document.querySelector("#flag-image");
    
    const flagFact = document.querySelector("#facts");

    flagImage.src = flag["flagFile"];
    flagFact.textContent = flag["interestingFact"];

    //assign country of flag to correct answer to be used with guess button + form
    const correctAnswer = flag["countryName"];
    return correctAnswer;
  }

 getFlagButton.addEventListener("click", displayFlag);