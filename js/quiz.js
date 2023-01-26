let arr = [...Array(12).keys()];//ordered array of numbers from 0 to 11
let lst = [];
let i = 0;

console.log(lst);

url_base;
let answers = {};
let result;
let runningCount = [];

function set () {
    lst = [];
    for (let i = 0; i < 12; i++){
        let rand = Math.floor(Math.random() * arr.length) // random number dependent on length of arr
        lst.push(arr[rand]);//append random number to list;
        arr.splice(arr.indexOf(arr[rand]), 1);//remove number so it can't be picked again
    }
    arr = [...Array(12).keys()] //reset array
}

function reset () {
    set();
    for (let j = 1; j < 17; j++) {
        document.getElementById(`${j}`).remove();
    }
    document.getElementById("form").reset();
    document.getElementById("")
    startCountdownTimer();
}




//generate country and questions
async function start() {
    document.getElementById("scorecard").setAttribute("class", "");
    //request the countries from the api
    const res = await fetch(url_base + "countries");
    //get data from request
    const countries = await res.json();
    //specify the country from the quiz
    let country = countries[lst[i]];
    console.log(country["population"]);
    answers["hemisphere"] = country["hemisphere"];
    answers["continent"] = country["continent"];
    answers["capital"] = country["capital"];
    answers["languages"] = country["languages"];
    //sort populaiton of country into sections based on the possible answers and assign them the value used in the html for comparison
    if (country["population"] < 50000000) {
        answers["population"] = 0;
    } else if (country["population"] < 100000000) {
        answers["population"] = 1;
    } else if (country["population"] < 200000000) {
        answers["populaiton"] = 2;
    } else if (country["population"] < 500000000) {
        answers["population"] = 3;
    } else {
        answers["population"] = 4;
    }
    console.log(answers);
    //display generated country:
    const countrycard = document.getElementById("countrycard");
    const q = document.createElement("p");
    q.setAttribute("id", 1);
    q.classList.add("countrytext");
    q.textContent = `Country: ${country["country"]}`;
    countrycard.appendChild(q);

    const picture = document.createElement("img");
    picture.classList.add("countryFlag");
    picture.setAttribute("id", "15");
    picture.src = country["flag"];
    picture.alt = `The flag of ${country["country"]}`
    countrycard.appendChild(picture);

    //display questions
    const question1 = document.getElementById("question1");
    const text1 = document.createElement("p");
    text1.setAttribute("id", 2);
    text1.classList.add("qtext");
    text1.textContent = `Question 1: Which Hemisphere is ${country["country"]} in?`;
    question1.appendChild(text1);

    const question2 = document.getElementById("question2");
    const text2 = document.createElement("p");
    text2.setAttribute("id", 3);
    text2.classList.add("qtext");
    text2.textContent = `Question 2: Which continient is ${country["country"]} in?`;
    question2.appendChild(text2);

    const question3 = document.getElementById("question3");
    const text3 = document.createElement("p");
    text3.setAttribute("id", 4);
    text3.classList.add("qtext");
    text3.textContent = `Question 3: What is the capital city of ${country["country"]}?`;
    question3.appendChild(text3);

    const question4 = document.getElementById("question4");
    const text4 = document.createElement("p");
    text4.setAttribute("id", 5);
    text4.classList.add("qtext");
    text4.textContent = `Question 4: What language is spoken in ${country["country"]}?`;
    question4.appendChild(text4);

    const question5 = document.getElementById("question5");
    const text5 = document.createElement("p");
    text5.setAttribute("id", 6);
    text5.classList.add("qtext");
    text5.textContent = `Question 5: Estimate the country's population`;
    question5.appendChild(text5);

    //populate answer boxes:
    //get random data incl correct ans from api
    const res2 = await fetch(url_base + `country-facts/${lst[i]}`);
    const potanswers = await res2.json();

    //question 3:
    let capitals = potanswers["capital"];

    const q3 = document.getElementById("q3");
    const q3a1 = document.createElement("option");
    q3a1.setAttribute("id", 7);
    q3a1.setAttribute("value", capitals[0]);
    q3a1.textContent = `${capitals[0]}`;
    q3.appendChild(q3a1);

    const q3a2 = document.createElement("option");
    q3a2.setAttribute("id", 8);
    q3a2.setAttribute("value", capitals[1]);
    q3a2.textContent = `${capitals[1]}`;
    q3.appendChild(q3a2);

    const q3a3 = document.createElement("option");
    q3a3.setAttribute("id", 9);
    q3a3.setAttribute("value", capitals[2]);
    q3a3.textContent = `${capitals[2]}`;
    q3.appendChild(q3a3);

    const q3a4 = document.createElement("option");
    q3a4.setAttribute("id", 10);
    q3a4.setAttribute("value", capitals[3]);
    q3a4.textContent = `${capitals[3]}`;
    q3.appendChild(q3a4);

    //question 4:
    let languages = potanswers["languages"];

    const q4 = document.getElementById("q4");
    const q4a1 = document.createElement("option");
    q4a1.setAttribute("id", 11);
    q4a1.setAttribute("value", languages[0]);
    q4a1.textContent = `${languages[0]}`;
    q4.appendChild(q4a1);

    const q4a2 = document.createElement("option");
    q4a2.setAttribute("id", 12);
    q4a2.setAttribute("value", languages[1]);
    q4a2.textContent = `${languages[1]}`;
    q4.appendChild(q4a2);

    const q4a3 = document.createElement("option");
    q4a3.setAttribute("id", 13);
    q4a3.setAttribute("value", languages[2]);
    q4a3.textContent = `${languages[2]}`;
    q4.appendChild(q4a3);

    const q4a4 = document.createElement("option");
    q4a4.setAttribute("id", 14);
    q4a4.setAttribute("value", languages[3]);
    q4a4.textContent = `${languages[3]}`;
    q4.appendChild(q4a4);
}

// submit button
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault(); //stop refresh
    result = [];
    //get user input
    const input = {
        hemisphere: e.target.q1.value,
        continent: e.target.q2.value,
        capital: e.target.q3.value,
        languages: e.target.q4.value,
        population: e.target.q5.value,
    };
    console.log(input);
    //record which questions are correct
    for (const x in input) {
        if (input[x] == answers[x]) {
            result.push(1);
        } else {
            result.push(0);
        }
    }
    //array of 5 numbers, corresponding to the order of the 5 questions, 1 for a correct answer and 0 for incorrect
    console.log(result);

    //sum score
    const sum = result.reduce((x, y) => x + y, 0);
    runningCount.push(sum);
    
    // document.getElementById("button").remove();
    for (let j = 1; j < 16; j++) {
        document.getElementById(`${j}`).remove();
    }
    i++;
    document.getElementById("form").reset();
    start();
});

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
    const res = await fetch(url_base + "leaderboards/countryquiz", options);
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

let main = document.getElementById("body");
const button2 = document.getElementById("button2");
// button2.setAttribute("type", "button");
// button2.setAttribute("class", "button2");
// button2.setAttribute("id", "button2");
//button2.style.display = "block"
//button2.textContent = "Start";
// countrycard.appendChild(button2);

closePopupButton.addEventListener("click", closePopup);

document.getElementById("button2").addEventListener("click", () => {
    document.getElementById("button2").remove();
    set()
    start();
    startCountdownTimer();
});

function startCountdownTimer() {
    // perform the game start
    document.getElementById("countdown-timer").textContent = 60;
    intervalId = setInterval(function () {
        const countdownTimer = document.getElementById("countdown-timer");
        let secondsLeft = countdownTimer.textContent;
        countdownTimer.textContent -= 1;
        if (secondsLeft == 1) {
            clearInterval(intervalId);
            // stop the game, add up points etc
            gameOver();
        }
    }, 1000);
}


const gameOver = () => {
    //display card showing user score
    const total = runningCount.reduce((x, y) => x + y, 0);
    addScore(total);

    const card = document.getElementById("scorecard");
    card.setAttribute("class", "scorecard");
    const score = document.createElement("p");
    score.setAttribute("id", "16");
    score.setAttribute("class", "qtext");
    if (runningCount.length) {score.textContent = `You scored ${total}/${runningCount.length * 5}`;}
    else {score.textContent = `Try again!`;}
    card.appendChild(score);
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "button");
    button.setAttribute("id", "button");
    button.textContent = "Play Again";
    card.appendChild(button);
    
    document.getElementById("button").addEventListener("click", () => {
        document.getElementById("button").remove();
        reset();
        i = 0;
        start();
    })
    runningCount = [];
}

