let url_base = "http://localhost:3000/";

async function addLeaderboardData(leaderboard) {
    leaderboardData = getLeaderboardData(leaderboard);

    const tableRows = document.getElementById("flagfrenzy");

    for (entry of leaderboardData) {
    }
}

async function getLeaderboardData(leaderboard) {
    const res = await fetch(url_base + "/leaderboards/" + leaderboard);
    if (res.status !== 200) {
        console.log("Issue getting json data");
        console.log(await res.json());
        return [];
    }

    let leaderboardData = await res.json();
    return leaderboardData;
}
