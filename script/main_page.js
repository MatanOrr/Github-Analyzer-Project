document.addEventListener("DOMContentLoaded", function() {
    const searchBox = document.getElementById("usernameInput");
    const submitButton = document.getElementById("submitButton");
    searchBox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            window.location.href = `user_page.html?username=${searchBox.value}`;
        }
    })
});