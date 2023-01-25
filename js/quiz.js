//get a random country to start the quiz:
;
let answers={};
let result;

//generate country and questions
async function start() {
    //request the countries from the api
    const res = await fetch("http://localhost:3000/countries");
    //get data from request
    const countries = await res.json();
    //specify the country from the quiz
    let country = countries[i];
    console.log(country["population"])
    answers["hemisphere"] = country["hemisphere"];
    answers["continent"] = country["continent"];
    answers["capital"] = country["capital"];
    answers["languages"] = country["languages"];
    //sort populaiton of country into sections based on the possible answers and assign them the value used in the html for comparison
    if (country["populaiton"] < 50000000){
        answers["population"] = 0;
    }
    else if (country["populaiton"] < 100000000){
        answers["population"] = 1;
    }
    else if (country["population"] < 200000000){
        answers["populaiton"] = 2;
    }
    else if (country["population"] < 500000000){
        answers["population"] = 3;
    }
    else{
        answers["population"] = 4;
    }
    console.log(answers);
    //display generated country:
    const countrycard = document.getElementById("countrycard");
    const q = document.createElement("p");
    q.classList.add("countrytext");
    q.textContent = `Country: ${country["country"]}`;
    countrycard.appendChild(q);

    //display questions
    const question1 = document.getElementById("question1");
    const text1 = document.createElement("p");
    text1.classList.add("qtext");
    text1.textContent = `Question 1: Which Hemisphere is ${country["country"]} in?`;
    question1.appendChild(text1);

    const question2 = document.getElementById("question2");
    const text2 = document.createElement("p");
    text2.classList.add("qtext");
    text2.textContent = `Question 2: Which continient is ${country["country"]} in?`;
    question2.appendChild(text2);

    const question3 = document.getElementById("question3");
    const text3 = document.createElement("p");
    text3.classList.add("qtext");
    text3.textContent = `Question 3: What is the capital city of ${country["country"]}?`;
    question3.appendChild(text3);

    const question4 = document.getElementById("question4");
    const text4 = document.createElement("p");
    text4.classList.add("qtext");
    text4.textContent = `Question 4: What language is spoken in ${country["country"]}?`;
    question4.appendChild(text4);

    const question5 = document.getElementById("question5");
    const text5 = document.createElement("p");
    text5.classList.add("qtext");
    text5.textContent = `Question 5: Estimate the country's population`;
    question5.appendChild(text5);

    //populate answer boxes:
    //get random data incl correct ans from api
    const res2 = await fetch(`http://localhost:3000/country-facts/${i}`)
    const potanswers = await res2.json();

    //question 3:
    let capitals = potanswers["capital"];


    const q3 = document.getElementById("q3");
    const q3a1 = document.createElement("option");
    q3a1.setAttribute("value", capitals[0]);
    q3a1.textContent = `${capitals[0]}`
    q3.appendChild(q3a1);

    const q3a2 = document.createElement("option");
    q3a2.setAttribute("value", capitals[1]);
    q3a2.textContent = `${capitals[1]}`;
    q3.appendChild(q3a2);

    const q3a3 = document.createElement("option");
    q3a3.setAttribute("value", capitals[2]);
    q3a3.textContent = `${capitals[2]}`;
    q3.appendChild(q3a3);

    const q3a4 = document.createElement("option");
    q3a4.setAttribute("value", capitals[3]);
    q3a4.textContent = `${capitals[3]}`;
    q3.appendChild(q3a4);

    //question 4:
    let languages = potanswers["languages"];
    
    const q4 = document.getElementById("q4");
    const q4a1 = document.createElement("option");
    q4a1.setAttribute("value", languages[0]);
    q4a1.textContent = `${languages[0]}`;
    q4.appendChild(q4a1);

    const q4a2 = document.createElement("option");
    q4a2.setAttribute("value", languages[1]);
    q4a2.textContent = `${languages[1]}`;
    q4.appendChild(q4a2);

    const q4a3 = document.createElement("option");
    q4a3.setAttribute("value", languages[2]);
    q4a3.textContent = `${languages[2]}`;
    q4.appendChild(q4a3);

    const q4a4 = document.createElement("option");
    q4a4.setAttribute("value", languages[3]);
    q4a4.textContent = `${languages[3]}`;
    q4.appendChild(q4a4);
    
}

// function feedback() {
    
// }
    
// submit button
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();//stop refresh
    result = [];
    //get user input
    const input = {
    hemisphere: e.target.q1.value,
    continent: e.target.q2.value,
    capital: e.target.q3.value,
    languages: e.target.q4.value,
    population: e.target.q5.value
    }
    console.log(input);
    //record which questions are correct
    for (const x in input){
        if (input[x] == answers[x]){
            result.push(1);
        }
        else {
            result.push(0);
        }
    }
    //array of 5 numbers, corresponding to the order of the 5 questions, 1 for a correct answer and 0 for incorrect
    console.log(result)

    //sum score
    const sum = result.reduce((x, y) => x + y, 0);

    //display card showing user score
    const card = document.getElementById("scorecard");
    card.setAttribute("class", "scorecard");
    const score = document.createElement("p");
    score.setAttribute("class", "qtext");
    score.textContent = `You scored ${sum}/5`
    card.appendChild(score);
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "button");
    button.setAttribute("id", "button");
    button.textContent = "Play Again";
    card.appendChild(button);
})

document.getElementById("scorecard").addEventListener("click", (e) => {
    i++;
    document.getElementById
})

start();