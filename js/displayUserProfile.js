const closePopupButton = document.getElementById("close-popup-button");
const popup = document.getElementById("pop-up");

async function displayUserProfile() {
    // get current userProfile data
    let userProfile = await getUserProfile();

    updateNameHTML(userProfile);
}

// call GET user endpoint, to get userProfile data
async function getUserProfile() {
    let res = await fetch(url_base + "user");

    console.log(res);
    if (res.status !== 200) {
        console.log("Could not get user profile data from user endpoint");
        return;
    }

    let userProfile = await res.json();
    console.log(userProfile);

    return userProfile;
}

// update the name and points in the html document
async function updateNameHTML(user) {
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
        if (user.rank) {
            e.textContent = user.rank.name + "!";
        } else {
            e.textContent = "";
        }
    }
    const userStarsElements = document.getElementsByClassName("user-stars");
    console.log(user);
    for (e of userStarsElements) {
        e.textContent = user.rank.stars;
    }
}

function checkNameAdded() {
    const userName = document.getElementsByClassName("user-name")[0];
    return userName.textContent.length > 0;
}

function closePopup(e) {
    e.preventDefault();
    popup.style.visibility = "hidden";
}

function openPopup(rankName) {
    const rankNameText = document.getElementById("rank-name");
    rankNameText.textContent = rankName;
    popup.style.visibility = "visible";
}

async function addScore(score, leaderboard) {
    score = +score;
    if (typeof score !== "number") {
        console.log(
            "Issue with addScore function. Score entry not of type number"
        );
        return;
    }

    addScoreToLeaderboard(score, leaderboard);
    addScoreToProfile(score);
}

async function addScoreToLeaderboard(score, leaderboard) {
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
    const res = await fetch(
        url_base + "leaderboards/" + leaderboard + "/add",
        options
    );
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
        openPopup(data.userProfile.rank.name);
    }
    displayUserProfile();
}

displayUserProfile();
