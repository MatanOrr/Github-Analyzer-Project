import { createRepoBox } from "./repo-box.js";
import { createUserBox } from "./user-data.js";

function clearContainer() {
    /**
     * This function clears the repoContainer
     */
    repoContainer.innerHTML = "";
}

async function fetchData(data) {
    const response = await fetch(data);
    if (!response.ok) {
        throw new Error(response.status);
    }
    return response.json();
}

async function userNameSubmitted() {
    /**
     * This function is called when the submit button is clicked
     * It fetches the github API and calls createRepoBox for each repository
     */
    const username = usernameInput.value;
    const userReposApi = `https://api.github.com/users/${username}/repos`;
    const userDataApi = `https://api.github.com/users/${username}`;
    clearContainer();

    let userData = await fetchData(userDataApi);
    createUserBox(userData);

    let userRepos = await fetchData(userReposApi);
    userRepos.forEach(repo => { createRepoBox(repo); });
}

/// HELPER FUNCTIONS - END ///

document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", userNameSubmitted);
});