let url_base = "http://localhost:3000/";

async function addLeaderboardData(leaderboard) {
    let leaderboardData = await getLeaderboardData(leaderboard);
    const tableRows = document.querySelectorAll(
        "#" + leaderboard + " tbody tr"
    );

    for (const [index, entry] of leaderboardData.entries()) {
        for (key in entry) {
            let cell = tableRows[index].getElementsByClassName(
                key + "-cell"
            )[0];

            cell.textContent = entry[key];
        }
    }
}

async function getLeaderboardData(leaderboard) {
    const res = await fetch(url_base + "leaderboards/" + leaderboard);
    console.log(await res);
    if (res.status !== 200) {
        console.log("Issue getting json data");
        console.log(await res.json());
        return [];
    }

    let leaderboardData = await res.json();
    return leaderboardData;
}

addLeaderboardData("flagfrenzy");
addLeaderboardData("countryquiz");
