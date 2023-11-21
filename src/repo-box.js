const starIcon = '<i class="fa-solid fa-star fa-flip" style="color: #f9ce4d;"></i>';
const languageIcon = '<i class="fa-regular fa-file-code"></i>'
const noStarIcon = '<i class="fa-regular fa-star" style="color: #f9ce4d;"></i>'
const forkIcon = '<i class="fa fa-code-fork" aria-hidden="true"></i>'
const dateIcon = '<i class="fa-regular fa-calendar"></i>'

function addRepoTitle(repoBox, repo) {
    const repoTitle = document.createElement("h3");
    repoTitle.innerText = repo.name;
    repoBox.appendChild(repoTitle);
}

function addRepoDescription(repoBox, repo) {
    const repoDescription = document.createElement("p");
    repoDescription.innerText = repo.description;
    repoDescription.className = "repo-text";
    if (repo.description == null) {
        repoDescription.innerText = "No description provided";
    }
    repoBox.appendChild(repoDescription);
}

function addRepoLanguage(repoBox, repo) {
    const repoLanguage = document.createElement("p");
    repoLanguage.className = "repo-text";
    if (repo.language == null) {
        repoLanguage.innerHTML = languageIcon + '&nbsp;' + '&nbsp;' + 'No language specified';
    } else { repoLanguage.innerHTML = languageIcon + '&nbsp;' + '&nbsp;' + repo.language; }
    repoBox.appendChild(repoLanguage);
}

function addNumberofStars(repoBox, repo) {
    const repoStars = document.createElement("p");
    const starNumbers = repo.stargazers_count;
    repoStars.className = "repo-text";
    if (starNumbers == 0) {
        repoStars.innerHTML = noStarIcon + " " + 'No stars yet';
        repoBox.appendChild(repoStars);
    } else {
        repoStars.innerHTML = starIcon + " " + starNumbers + " " + 'stars';
    }
    repoBox.appendChild(repoStars);
}

function addNumberOfForks(repoBox, repo) {
    const repoForks = document.createElement("p");
    repoForks.className = "repo-text";
    let forkNumbers = repo.forks_count;
    if (forkNumbers == 0) {
        forkNumbers = "No";
    }
    repoForks.innerHTML = forkIcon + " " + forkNumbers + " " + 'forks';
    repoBox.appendChild(repoForks);
}

function addRepoDate(repoBox, repo) {
    const repoDate = document.createElement("p");
    const formattedRepoDate = new Date(repo.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    repoDate.className = "repo-text";
    repoDate.innerHTML = dateIcon + " " + formattedRepoDate;
    repoBox.appendChild(repoDate);
}

function openInGitButton(repoBox, repo) {
    const openInGitLink = document.createElement("a");
    const gitLinkButton = document.createElement("button");
    openInGitLink.href = repo.html_url;
    openInGitLink.className = "github-link";
    gitLinkButton.className = "gitlink-button ";
    gitLinkButton.role = "button";
    gitLinkButton.innerText = "Open in GitHub";
    openInGitLink.appendChild(gitLinkButton);
    repoBox.appendChild(openInGitLink);
}

//#endregion Repo Creation Functions - END //


export function createRepoBox(repo) {
    const repoBox = document.createElement("div");
    repoBox.className = "repo-box";
    addRepoTitle(repoBox, repo);
    addRepoLanguage(repoBox, repo);
    addNumberofStars(repoBox, repo);
    addNumberOfForks(repoBox, repo);
    addRepoDate(repoBox, repo);
    addRepoDescription(repoBox, repo);
    openInGitButton(repoBox, repo);
    repoContainer.appendChild(repoBox);
}