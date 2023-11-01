function createRepoBox(repo) {
    /**
     * This function creates a div element with the class "repo-box" and appends it to the repoContainer
     * @param {Object} repo - The repository object from the github API JSON response
     * @param {string} repo.name - The name of the repository
     */
    const repoBox = document.createElement("div");
    repoBox.className = "repo-box";
    repoBox.innerText = repo.name;
    repoContainer.appendChild(repoBox);
}

function clearContainer() {
    /**
     * This function clears the repoContainer
     */
    repoContainer.innerHTML = "";
}

function userNameSubmitted() {
    /**
     * This function is called when the submit button is clicked
     * It fetches the github API and calls createRepoBox for each repository
     */
    const username = usernameInput.value;
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            clearContainer();
            data.forEach(repo => createRepoBox(repo));
        })
        .catch(error => console.error('Error:', error));
}

/// HELPER FUNCTIONS - END ///

document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submitButton");
    const usernameInput = document.getElementById("usernameInput");
    const repoContainer = document.getElementById("repoContainer");

    submitButton.addEventListener("click", userNameSubmitted);
});