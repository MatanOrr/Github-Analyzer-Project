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
        throw new Error('HTTP Error')
    }
    return response.json()
}

async function userNameSubmitted() {
    /**
     * This function is called when the submit button is clicked
     * It fetches the github API and calls createRepoBox for each repository
     */
    const username = usernameInput.value;
    const userApiUrl = `https://api.github.com/users/${username}`;
    const reposApiUrl = `https://api.github.com/users/${username}/repos?per_page=250`;
    try {
        let userData = await fetchData(userApiUrl)
        createUserBox(userData);
    } catch (error) {
        console.log('fetching user data failed')
    }
    try {
        let userRepos = await fetchData(reposApiUrl)
        userRepos.forEach(repo => createRepoBox(repo));
    } catch (error) {
        console.log('fetching repos failed')
    }
}

// Helper Function - End

document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", userNameSubmitted);
});