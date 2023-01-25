url_base = "http://localhost:3000/";

async function displayUserProfile() {
    // get current userProfile data
    let userProfile = await getUserProfile();
    updateNameHTML(userProfile);
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
async function updateNameHTML(user) {
    console.log(user);
    const userNameElements = document.getElementsByClassName("user-name");
    for (e of userNameElements) {
        e.textContent = user.username;
    }
    const userPointsElements = document.getElementsByClassName("user-points");
    for (e of userPointsElements) {
        e.textContent = user.points;
    }
    const userRankElements = document.getElementsByClassName("user-rank");
    for (e of userRankElements) {
        console.log(user.rank);
        if (user.rank) {
            e.textContent = user.rank + "!";
        } else {
            e.textContent = "";
        }
    }

    let stars;
    if (user.rank === "Geo Novice") {
        stars = "⭐";
    } else if (user.rank === "Geo Scout") {
        stars = "⭐⭐";
    } else if (user.rank === "Geo Discoverer") {
        stars = "⭐⭐⭐";
    } else if (user.rank === "Geo Genius") {
        stars = "🌟🌟🌟";
    } else {
        stars = "";
    }

    const userStarsElements = document.getElementsByClassName("user-stars");
    for (e of userStarsElements) {
        e.textContent = stars;
    }
}

function checkNameAdded() {
    const userName = document.getElementsByClassName("user-name")[0];
    return userName.textContent.length > 0;
}

displayUserProfile();
