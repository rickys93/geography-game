async function addLeaderboardData(leaderboards) {
    for (leaderboard in leaderboards) {
        const tableRows = document.querySelectorAll(
            "#" + leaderboard + " tbody tr"
        );

        for (const [index, entry] of leaderboards[leaderboard].entries()) {
            for (key in entry) {
                let className = key + "-cell";
                let cell =
                    tableRows[index].getElementsByClassName(className)[0];
                cell.textContent = entry[key];
            }
        }
    }
}

async function getLeaderboardData() {
    const res = await fetch(url_base + "leaderboards");
    if (res.status !== 200) {
        console.log("Issue getting json data");
        console.log(await res.json());
        return [];
    }

    let leaderboards = await res.json();
    addLeaderboardData(leaderboards);
}

getLeaderboardData();
