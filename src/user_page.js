import { createRepoBox } from "./repo-box.js";
import { createUserBox } from "./user-data.js";
import { getMetrics } from "./charts.js";

function clearContainer() {
    let repoContainer = document.getElementById("repoContainer");
    let userInfoBox = document.getElementById("userInfoBox");
    repoContainer.innerHTML = "";
    userInfoBox.innerHTML = "";
    // destory canvas
    let barChartBox = document.getElementById("barChartBox");
    if (barChartBox != null) {
        barChartBox.innerHTML = "";
    }

    let pieChartBox = document.getElementById("pieChartBox");
    if (pieChartBox != null) {
        pieChartBox.innerHTML = "";
    }
}

export async function fetchData(data) {
    const response = await fetch(data);
    if (!response.ok) {
        throw new Error(response.status);
    }
    return response.json();
}

async function fetchAndDisplayUserData(username) {
    const userReposApi = `https://api.github.com/users/${username}/repos?per_page=1000'`;
    const userDataApi = `https://api.github.com/users/${username}`;

    let userData = await fetchData(userDataApi);
    createUserBox(userData);

    getMetrics(username);

    let userRepos = await fetchData(userReposApi);
    userRepos.forEach(repo => { createRepoBox(repo); });
}

async function userNameSubmitted() {
    window.history.pushState({}, '', `?username=${usernameInput.value}`);
    const pageTitle = document.getElementById("pageTitle");
    pageTitle.innerText = 'Git Analyzer - ' + usernameInput.value;
    clearContainer();

    const username = usernameInput.value;
    await fetchAndDisplayUserData(username);
}

async function initialSearch() {
    clearContainer();

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username == null) {
        return;
    }

    await fetchAndDisplayUserData(username);
}

/// HELPER FUNCTIONS - END ///

document.addEventListener("DOMContentLoaded", function() {
    const searchBox = document.getElementById("usernameInput");
    const submitButton = document.getElementById("submitButton");
    initialSearch();
    searchBox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            userNameSubmitted();
        }
    })
    submitButton.addEventListener('click', userNameSubmitted);
});