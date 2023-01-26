async function addLeaderboardData(leaderboard) {
    let leaderboardData = await getLeaderboardData(leaderboard);
    const tableRows = document.querySelectorAll(
        "#" + leaderboard + " tbody tr"
    );

    for (const [index, entry] of leaderboardData.entries()) {
        for (key in entry) {
            let className = key + "-cell";
            let cell = tableRows[index].getElementsByClassName(className)[0];
            cell.textContent = entry[key];
        }
    }
}

async function getLeaderboardData(leaderboard) {
    const res = await fetch(url_base + "leaderboards/" + leaderboard);
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
