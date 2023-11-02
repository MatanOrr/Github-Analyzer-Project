import { createRepoBox } from "./repo-box.js";

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
    fetch(`https://api.github.com/users/${username}/repos?per_page=250`)
        .then(response => {
            if (!response.ok) {
                console.log('Network response was not ok', response);
                return;
            }
            return response.json();
        })

    .then(data => {
            clearContainer();
            data.forEach(repo => createRepoBox(repo));
        })
        .catch(error => console.error('Error:', error));
}

/// HELPER FUNCTIONS - END ///

document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", userNameSubmitted);
});