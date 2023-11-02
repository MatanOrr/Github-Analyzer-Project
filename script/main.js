import { createRepoBox } from "./repo-box.js";
import { createUserBox } from "./user-data.js";

function clearContainer() {
    let repoContainer = document.getElementById("repoContainer");
    let userInfoBox = document.getElementById("userInfoBox");
    repoContainer.innerHTML = "";
    userInfoBox.innerHTML = "";
}

async function fetchData(data) {
    const response = await fetch(data);
    if (!response.ok) {
        throw new Error(response.status);
    }
    return response.json();
}

async function userNameSubmitted() {
    clearContainer();
    /**
     * This function is called when the submit button is clicked
     * It fetches the github API and calls createRepoBox for each repository
     */
    const username = usernameInput.value;
    const userReposApi = `https://api.github.com/users/${username}/repos`;
    const userDataApi = `https://api.github.com/users/${username}`;

    let userData = await fetchData(userDataApi);
    createUserBox(userData);

    let userRepos = await fetchData(userReposApi);
    userRepos.forEach(repo => { createRepoBox(repo); });
}

/// HELPER FUNCTIONS - END ///

document.addEventListener("DOMContentLoaded", function() {
    const searchBox = document.getElementById("usernameInput");
    const submitButton = document.getElementById("submitButton");
    searchBox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            userNameSubmitted();
        }
    })
    submitButton.addEventListener('click', userNameSubmitted);
});