function alertNonUser() {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerText = "User does not exist";
}

async function checkUserExits(username) {
    const userDataApi = `https://api.github.com/users/${username}`;
    const response = await fetch(userDataApi);
    const data = await response.json(); // Convert response to JSON
    if (data.message == "Not Found") {
        alertNonUser();
        return false;
    }
    return true;
}


document.addEventListener("DOMContentLoaded", async function() {
    const searchBox = document.getElementById("usernameInput");
    const submitButton = document.getElementById("submitButton");

    searchBox.addEventListener('keypress', async function(e) { // Add async here
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!await checkUserExits(searchBox.value)) { // Corrected function name
                alertNonUser();
                return;
            }
            window.location.href = `user_page.html?username=${searchBox.value}`;
        }
    });

    submitButton.addEventListener('click', async function() { // Add async here
        if (!await checkUserExits(searchBox.value)) { // Corrected function name
            alertNonUser();
            return;
        }
        window.location.href = `user_page.html?username=${searchBox.value}`;
    });
});