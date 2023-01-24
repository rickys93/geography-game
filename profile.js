let url_base = "http://localhost:3000/";

const submitNameButton = document.getElementById("submit-name-form");

// event listener function that gets added to submit button
async function submitName(e) {
    e.preventDefault();

    // if no name entered into box, return
    let name = e.target.userNameInput.value;
    if (!name) {
        return;
    }

    // capitalize the name
    name = name.charAt(0).toUpperCase() + name.slice(1);

    // get current userProfile data
    let userProfile = await getUserProfile();

    if (!updateUserName(name)) {
        // error updating the same for same reason
        console.log("Name not changed");
        return;
    }

    updateNameHTML(name);
    document.getElementById("userNameInput").value = "";

    if (userProfile.name) {
        // there was already name in database
        alert("Name successfully changed!");
        return;
    }
    // name added to database
    alert("Name successfully added!");
}

async function displayUserProfile() {
    // get current userProfile data
    let userProfile = await getUserProfile();
    console.log(userProfile);
    updateNameHTML(userProfile);
}

// call the PUT user endpoint to edit the userProfile data
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

    // return true if worked, else return false
    return response.status === 200;
}

// call GET user endpoint, to get userProfile data
async function getUserProfile() {
    let res = await fetch(url_base + "user");

    console.log(await res);

    if (res.status !== 200) {
        console.log("Could not get user profile data from user endpoint");
        return;
    }

    let userProfile = await res.json();

    return userProfile;
}

// update the name and points in the html document
function updateNameHTML(user) {
    const userNameElements = document.getElementsByClassName("user-name");
    for (e of userNameElements) {
        e.textContent = user.name;
    }
    const userPointsElements = document.getElementsByClassName("user-points");
    for (e of userPointsElements) {
        e.textContent = user.points;
    }
}

const randomiseButton = document.getElementById("randomise-button");

// event listener function added to randomise button to get a random fun fact
async function newRandomFact() {
    const randomFact = await getRandomFact();

    if (randomFact) {
        const funFact = document.getElementById("fun-fact-text");
        funFact.textContent = randomFact.fact;
    }
}

// call GET random fact endpoint
async function getRandomFact() {
    const res = await fetch(url_base + "fun-facts/random");

    const randomFact = await res.json();
    if (!randomFact) {
        return;
    }

    return await randomFact;
}

newRandomFact();

submitNameButton.addEventListener("submit", submitName);
randomiseButton.addEventListener("click", newRandomFact);
