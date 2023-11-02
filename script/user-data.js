export function createUserBox(data) {

    let infoBoxDiv = document.getElementById("userInfoBox");
    infoBoxDiv = document.getElementById("userInfoBox");
    infoBoxDiv.classList.add("info-box");

    // Create user name
    const userName = document.createElement("h2");
    userName.innerText = data.name;
    if (data.name == null) {
        userName.innerText = data.login;
    } else {
        userName.innerText = data.name;
    }
    infoBoxDiv.appendChild(userName);

    // Create user login
    const userLogin = document.createElement("a");
    userLogin.className = "login-link";
    userLogin.href = data.html_url;
    userLogin.innerText = '@' + data.login;
    infoBoxDiv.appendChild(userLogin);

    //Create user description
    const userDescription = document.createElement("p");
    userDescription.innerText = data.bio;
    infoBoxDiv.appendChild(userDescription);

    // Create user avatar
    const userAvatar = document.createElement("img");
    userAvatar.className = "avatar";
    userAvatar.src = data.avatar_url;
    infoBoxDiv.appendChild(userAvatar);

    // Get the number of followers and following directly from the data object
    const followersNum = data.followers; // These should be provided as numbers
    const followingNum = data.following;

    const followStats = document.createElement("p");
    if (followersNum == 0 && followingNum == 0) {
        followStats.innerText = 'No followers or following';
    } else if (followersNum == 0) {
        followStats.innerText = `${followingNum} following`;
    } else if (followingNum == 0) {
        followStats.innerText = `${followersNum} followers`;
    } else
        followStats.innerText = `${followersNum} followers | ${followingNum} following`;
    infoBoxDiv.appendChild(followStats);
}