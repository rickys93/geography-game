const url_base = "https://geo-genius-server.onrender.com/";

const submitNameButton = document.getElementById("submit-name-form");

async function submitName(e) {
    e.preventDefault();

    let name = e.target.userNameInput.value;
    if (!name) {
        return;
    }

    name = name.charAt(0).toUpperCase() + name.slice(1);

    let userProfile = await getUserProfile();

    if (!updateUserName(name)) {
        console.log("Name not changed");
        return;
    }

    updateNameHTML(name);
    document.getElementById("userNameInput").value = "";

    if (userProfile.name) {
        alert("Name succesfully changed!");
        return;
    }
    alert("Name succesfully added!");
}

async function updateUserName(name) {
    const options = {
        method: "PUT",
        body: JSON.stringify({ name }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    let response = await fetch(url_base + "user", options);

    return response.status === 200;
}

async function getUserProfile() {
    let res = await fetch(url_base + "user");

    if (res.status !== 200) {
        console.log("Could not get user profile data from user endpoint");
        return;
    }

    let userProfile = await res.json();
    return userProfile;
}

function updateNameHTML(name) {
    const userNameElements = document.getElementsByClassName("user-name");
    for (e of userNameElements) {
        e.textContent = name;
    }
    const userPointsElements = document.getElementsByClassName("user-points");
    for (e of userPointsElements) {
        e.textContent = 0;
    }
}

const randomiseButton = document.getElementById("randomise-button");
console.log(randomiseButton);

async function newRandomFact() {
    const randomFact = await getRandomFact();

    if (randomFact) {
        const funFact = document.getElementById("fun-fact-text");
        funFact.textContent = randomFact.fact;
    }
}

async function getRandomFact() {
    const res = await fetch(url_base + "fun-facts/random");

    const randomFact = await res.json();
    if (!randomFact) {
        return;
    }

    return await randomFact;
}

submitNameButton.addEventListener("submit", submitName);
randomiseButton.addEventListener("click", newRandomFact);
