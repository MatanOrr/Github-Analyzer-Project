export function createUserBox(data) {
    const infoBoxDiv = initializeInfoBox();

    appendUserName(infoBoxDiv, data);
    appendUserLogin(infoBoxDiv, data);
    appendUserAvatar(infoBoxDiv, data);
    appendUserDescription(infoBoxDiv, data);
    appendPublicRepos(infoBoxDiv, data);
    appendFollowStats(infoBoxDiv, data);
    appendUserLocation(infoBoxDiv, data);
    appendUserEmail(infoBoxDiv, data);
    appendUserBlog(infoBoxDiv, data);
}

function initializeInfoBox() {
    let infoBoxDiv = document.getElementById("userInfoBox");
    infoBoxDiv.classList.add("info-box");
    return infoBoxDiv;
}

function appendUserName(parent, data) {
    const userName = document.createElement("h3");
    userName.innerText = data.name || data.login;
    parent.appendChild(userName);
}

function appendUserLogin(parent, data) {
    const userLogin = document.createElement("a");
    userLogin.className = "user-link";
    userLogin.href = data.html_url;
    userLogin.innerText = '@' + data.login;
    parent.appendChild(userLogin);
}

function appendUserAvatar(parent, data) {
    const userAvatar = document.createElement("img");
    userAvatar.className = "avatar";
    userAvatar.src = data.avatar_url;
    parent.appendChild(userAvatar);
}

function appendUserDescription(parent, data) {
    const userDescription = document.createElement("p");
    userDescription.className = "user-text";
    userDescription.innerText = data.bio;
    parent.appendChild(userDescription);
}

function appendPublicRepos(parent, data) {
    const publicRepos = document.createElement("p");
    publicRepos.className = "user-text";
    publicRepos.innerHTML = createIconHTML("fas fa-code", "#8338ec") + '&nbsp;' + `${data.public_repos} public repos`;
    parent.appendChild(publicRepos);
}

function appendFollowStats(parent, data) {
    const followersNum = data.followers;
    const followingNum = data.following;

    const followStats = document.createElement("p");
    followStats.style.lineHeight = "0";
    if (followersNum == 0 && followingNum == 0) {
        followStats.innerHTML = createIconHTML("fas fa-user-friends", "#8338ec") + '&nbsp;' + 'No followers or following';
    } else if (followersNum == 0) {
        followStats.innerHTML = createIconHTML("fas fa-user-friends", "#8338ec") + '&nbsp;' + `${followingNum} following`;
    } else if (followingNum == 0) {
        followStats.innerHTML = createIconHTML("fas fa-user-friends", "#8338ec") + '&nbsp;' + `${followersNum} followers`;
    } else
        followStats.innerHTML = createIconHTML("fas fa-user-friends", "#8338ec") + '&nbsp;' + `${followersNum} followers \n ${followingNum} following`;
    parent.appendChild(followStats);
}

function appendUserLocation(parent, data) {
    const userLocation = document.createElement("p");
    userLocation.className = "user-text";
    userLocation.innerText = data.location;
    parent.appendChild(userLocation);
}

function appendUserEmail(parent, data) {
    const userMail = document.createElement("a");
    userMail.innerText = data.email;
    parent.appendChild(userMail);
}

function appendUserBlog(parent, data) {
    const userBlog = document.createElement("a");
    userBlog.className = "blog-link";
    userBlog.href = data.blog;
}

function createIconHTML(iconClass, color) {
    return `<i class="${iconClass}" style="color: ${color};"></i>`;
}