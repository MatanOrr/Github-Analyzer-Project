export function createUserBox(data) {

    let infoBoxDiv = document.getElementById("userInfoBox");
    infoBoxDiv = document.getElementById("userInfoBox");
    infoBoxDiv.classList.add("info-box");

    // Create user avatar
    const userAvatar = document.createElement("img");
    userAvatar.className = "avatar";
    userAvatar.src = data.avatar_url;
    infoBoxDiv.appendChild(userAvatar);

    // Create user login
    const userLogin = document.createElement("a");
    userLogin.className = "login-link";
    userLogin.href = data.html_url;
    userLogin.innerText = '@' + data.login;
    infoBoxDiv.appendChild(userLogin);
}

function getFollowStats(data, infoBoxDiv) {
    // Get the number of followers and following directly from the data object
    const followersNum = data.followers; // These should be provided as numbers
    const followingNum = data.following;

    const followStats = document.createElement("p");
    followStats.innerText = `${followersNum} followers · ${followingNum} following`;
    infoBoxDiv.appendChild(followStats);
}