async function fetchData(data) {
    const response = await fetch(data);
    if (!response.ok) {
        throw new Error(response.status);
    }
    return response.json();
}

//#region User Languages Pie

function trimUserLanguages(result) {
    let sortedLanguages = Object.keys(result).sort((a, b) => result[b] - result[a]);
    if (sortedLanguages.length > 5) {
        let otherCount = sortedLanguages.slice(5).reduce((sum, language) => {
            sum += result[language];
            return sum;
        }, 0);

        sortedLanguages = sortedLanguages.slice(0, 5); // Keep only the top 5
        let trimmedResult = sortedLanguages.reduce((obj, language) => {
            obj[language] = result[language];
            return obj;
        }, {});

        if (otherCount > 0) {
            trimmedResult['other'] = otherCount;
        }
        return trimmedResult;
    }
    return result;
}

function getUserLanguages(userRepos) {
    let result = {};
    userRepos.forEach(repo => {
        const language = repo.language || 'None'; // Assign 'None' if null
        result[language] = (result[language] || 0) + 1;
    });
    return trimUserLanguages(result);
}

function createPieChart(languages) {
    const data = {
        labels: [],
        datasets: [{
            label: 'Language',
            data: [],
            borderWidth: 1,
            backgroundColor: ['#462749', '#19647E', '#28AFB0', '#CE93D8', '#F4D35E', '#EE964B']

        }]
    };

    for (let language in languages) {
        data.labels.push(language);
        data.datasets[0].data.push(languages[language]);
    }

    // Config Block
    const config = {
        data,
        type: 'doughnut',
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const pieChartBox = document.getElementById('pieChartBox');

    const pieChart = document.createElement('canvas');
    pieChart.id = 'languagesPie';
    pieChartBox.appendChild(pieChart);

    // Render init block
    const myChart = new Chart(
        document.getElementById('languagesPie'),
        config
    );
}

//#endregion

//# region User Activity Bar
function getUserActivity(userRepos) {

    // last six months from current month
    let result = {};
    const now = new Date();
    let sixMonthsAgo = []
    for (let i = 0; i < 6; i++) {
        let month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        month = month.toLocaleString("default", { month: "long" });
        sixMonthsAgo.push(month);

    }
    sixMonthsAgo.forEach(month => {
        result[month] = 0;
    });

    // Count repos created in each month
    userRepos.forEach(repo => {
        const created = new Date(repo.created_at);
        let month = new Date(created.getFullYear(), created.getMonth(), 1);
        month = created.toLocaleString("default", { month: "long" });
        if (result[month] != undefined) {
            result[month] += 1;
        }
    });
    return result;
}

function createBarChart(userActivity) {
    // last six months from current month
    const data = {
        labels: [],
        datasets: [{
            label: 'Repos Created:',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
    for (let monthActivity in userActivity) {
        data.labels.push(monthActivity);
        data.datasets[0].data.push(userActivity[monthActivity]);
    }

    // Config Block
    const config = {
        type: 'line',
        data: data,
    };

    const barChartBox = document.getElementById('barChartBox');
    const barChart = document.createElement('canvas');
    barChart.id = 'activityBar';

    barChartBox.appendChild(barChart);

    // Render init block
    const myChart = new Chart(
        document.getElementById('activityBar'),
        config
    );
}


export async function getMetrics(username) {
    const userReposApi = await fetchData(`https://api.github.com/users/${username}/repos?per_page=100'`);
    let userData = {}
        //Creating a pie chart
    userData.languages = getUserLanguages(userReposApi)
    createPieChart(userData.languages)
    userData.repoActivity = getUserActivity(userReposApi)
    createBarChart(userData.repoActivity)
}