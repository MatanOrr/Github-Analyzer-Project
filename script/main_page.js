async function userExits(username) {
    const userDataApi = `https://api.github.com/users/${username}`;
    const response = await fetch(userDataApi);
    if (response.ok) {
        return true;
    }
    return false;
}

function alertNonUser() {
    const userNotFound = document.createElement("p");
    userNotFound.innerText = "User not found";
    userNotFound.className = "user-not-found";
    searchBox.appendChild(userNotFound);
}

document.addEventListener("DOMContentLoaded", async function() {
    const searchBox = document.getElementById("usernameInput");
    const submitButton = document.getElementById("submitButton");
    searchBox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!userExits(searchBox.value)) {
                alertNonUser();
                return;
            }
            window.location.href = `user_page.html?username=${searchBox.value}`;
        }
    })
    submitButton.addEventListener('click', function() {
        if (!userExits(searchBox.value)) {
            alertNonUser();
            return;
        }
        window.location.href = `user_page.html?username=${searchBox.value}`;
    });
});