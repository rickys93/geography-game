const url_base = "http://localhost:3000/";

const submitNameButton = document.getElementById("submit-name-form");

async function submitName(e) {
    e.preventDefault();

    const name = e.target.userNameInput.value;
    if (!name) {
        return;
    }

    let userProfile = await getUserProfile();

    if (userProfile.name) {
        console.log("Name already added to DB");
        alert(
            "You have already entered a name. Please refresh page to enter new one."
        );
        return;
    }

    if (!updateUserName(name)) {
        console.log("Name not changed");
        return;
    }

    updateNameHTML(name);

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

submitNameButton.addEventListener("submit", submitName);
