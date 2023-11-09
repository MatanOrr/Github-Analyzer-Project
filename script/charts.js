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
            backgroundColor: ['pink', 'blue', 'yellow', 'green', 'purple', 'orange']
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

    const charts = document.getElementById('charts');
    const pieChart = document.createElement('canvas');
    pieChart.classList.add('stats-box');
    pieChart.id = 'languagesPie';
    charts.appendChild(pieChart);

    // Render init block
    const myChart = new Chart(
        document.getElementById('languagesPie'),
        config
    );
}

//#endregion

//# region User Activity Bar


export async function getMetrics(username) {
    const userReposApi = await fetchData(`https://api.github.com/users/${username}/repos?per_page=100'`);
    let userData = {}
        //Creating a pie chart
    userData.languages = getUserLanguages(userReposApi)
    createPieChart(userData.languages)
}