document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submitButton");
    const usernameInput = document.getElementById("usernameInput");
    const repoContainer = document.getElementById("repoContainer");

    submitButton.addEventListener("click", function() {
        const username = usernameInput.value;
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => response.json())
            .then(data => {
                // Clear the container first
                repoContainer.innerHTML = "";

                // Create a box for each repository
                data.forEach(repo => {
                    const repoBox = document.createElement("div");
                    repoBox.className = "repo-box";
                    repoBox.innerText = repo.name;

                    // Append to the container
                    repoContainer.appendChild(repoBox);
                });
            })
            .catch(error => console.error('Error:', error));
    });
});