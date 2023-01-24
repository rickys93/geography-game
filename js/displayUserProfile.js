url_base = "http://localhost:3000/";

async function displayUserProfile() {
    // get current userProfile data
    let userProfile = await getUserProfile();
    updateNameHTML(userProfile);
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

displayUserProfile();
