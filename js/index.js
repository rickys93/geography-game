const submitNameButton = document.getElementById("submit-name-form");
const usernameBox = document.getElementById("userNameInput");
const signUpButton = document.getElementById("sign-up-button");
const logInButton = document.getElementById("log-in-button");
const logOutButton = document.getElementById("log-out-button");
const signupLoginDiv = document.querySelector(".submit-button-div");
const logoutDiv = document.querySelector(".log-out-button-div");

// call the PUT user endpoint to edit the userProfile data
async function updateNewUser(user) {
    const options = {
        method: "PUT",
        body: JSON.stringify(user),
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
        e.textContent = user.username;
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

function displayLogOutButton() {
    signupLoginDiv.style.display = "none";
    logoutDiv.style.display = "flex";
    usernameBox.style.visibility = "hidden";
}

function displaySignupLoginButton() {
    signupLoginDiv.style.display = "flex";
    logoutDiv.style.display = "none";
    usernameBox.style.visibility = "visible";
}

async function signup(e) {
    e.preventDefault();

    usernameEntry = document.getElementById("userNameInput").value;

    if (usernameEntry.length === 0) {
        alert("Must enter a username");
        return;
    } else if (usernameEntry.length > 15) {
        alert("Username must be less than 15 characters");
        return;
    }

    const user = { username: usernameEntry };
    const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    let response = await fetch(url_base + "users", options);

    if (response.status === 409) {
        console.log(response);
        alert("Username already taken!");
        return;
    }
    // display user profile
    displayUserProfile();
    displayLogOutButton();
    alert("Successfully signed up!");
    usernameBox.style.visibility = "hidden";
}

async function login(e) {
    e.preventDefault();

    currentUsername =
        document.getElementsByClassName("user-name")[0].textContent;
    if (currentUsername) {
        alert("Already signed in! Sign out first.");
        return;
    }

    usernameEntry = document.getElementById("userNameInput").value;

    if (usernameEntry.length === 0) {
        alert("Must enter a username");
        return;
    } else if (usernameEntry.length > 15) {
        alert("Username must be less than 15 characters");
        return;
    }

    let response = await fetch(url_base + "users/" + usernameEntry);
    console.log(await response.json());

    if (response.status === 404) {
        console.log(response);
        alert("Username not found! Try different username or sign up.");
        return;
    }

    // display user profile
    displayUserProfile();
    displayLogOutButton();
    alert(usernameEntry + " successfully signed in!");
    usernameBox.style.visibility = "hidden";
}

async function logout(e) {
    e.preventDefault();

    const emptyUser = {
        username: "",
        points: 0,
        rank: "",
    };

    const options = {
        method: "PUT",
        body: JSON.stringify(emptyUser),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    let response = await fetch(url_base + "user", options);
    console.log(await response.json());

    // display user profile
    displayUserProfile();
    displaySignupLoginButton();
    alert("Successfully signed out!");
    usernameBox.style.visibility = "visible";
}

async function displayCorrectButton() {
    // get current userProfile data
    let userProfile = await getUserProfile();
    if (userProfile.username) {
        displayLogOutButton();
    } else {
        displaySignupLoginButton();
    }
}

displayCorrectButton();
newRandomFact();

signUpButton.addEventListener("click", signup);
logInButton.addEventListener("click", login);
logOutButton.addEventListener("click", logout);
// submitNameButton.addEventListener("submit", submitName);
randomiseButton.addEventListener("click", newRandomFact);
