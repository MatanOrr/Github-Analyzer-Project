starIcon = '<i class="fa-solid fa-star fa-flip" style="color: #f9ce4d;"></i>';

function addRepoTitle(repoBox, repo) {
    const repoTitle = document.createElement("h3");
    repoTitle.innerText = repo.name;
    repoBox.appendChild(repoTitle);
}

function addRepoDescription(repoBox, repo) {
    const repoDescription = document.createElement("p");
    repoDescription.innerText = repo.description;
    if (!repoDescription.innerText == null) {
        repoBox.appendChild(repoDescription);
    }
}

function addRepoLanguage(repoBox, repo) {
    const repoLanguage = document.createElement("p");
    repoLanguage.innerText = 'Repo Language: ' + repo.language;
    repoBox.appendChild(repoLanguage);
}

function addNumberofStars(repoBox, repo) {
    const repoStars = document.createElement("p");
    const starNumbers = repo.stargazers_count;
    if (starNumbers == 0) {
        repoStars.innerHTML = 'No stars yet';
        // set class
        repoStars.className = "small-text";
        repoBox.appendChild(repoStars);
    } else {
        repoStars.innerHTML = starIcon + " " + starNumbers + " " + 'stars';
    }
    repoBox.appendChild(repoStars);
}

function openInGitButton(repoBox, repo) {
    const openInGitLink = document.createElement("a");
    openInGitLink.href = repo.html_url;
    openInGitLink.innerText = "Open in GitHub";
    repoBox.appendChild(openInGitLink);
}

//#endregion Repo Creation Functions - END //


function createRepoBox(repo) {
    /**
     * This function creates a div element with the class "repo-box" and appends it to the repoContainer
     * @param {Object} repo - The repository object from the github API JSON response
     */
    const repoBox = document.createElement("div");
    repoBox.className = "repo-box";
    addRepoTitle(repoBox, repo);
    addRepoDescription(repoBox, repo);
    addRepoLanguage(repoBox, repo);
    addNumberofStars(repoBox, repo);
    openInGitButton(repoBox, repo);
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
    const usernameInput = document.getElementById("usernameInput");
    const repoContainer = document.getElementById("repoContainer");

    submitButton.addEventListener("click", userNameSubmitted);
});