export function createUserBox(data) {
    const codeIcon = '<i class="fas fa-code" style="color:  #8338ec;"></i>';
    const followersIcon = '<i class="fas fa-user-friends" style="color: #8338ec;"></i>';

    let infoBoxDiv = document.getElementById("userInfoBox");
    infoBoxDiv = document.getElementById("userInfoBox");
    infoBoxDiv.classList.add("info-box");

    // Create user name
    const userName = document.createElement("h3");
    userName.innerText = data.name;
    if (data.name == null) {
        userName.innerText = data.login;
    } else {
        userName.innerText = data.name;
    }
    infoBoxDiv.appendChild(userName);

    // Create user login
    const userLogin = document.createElement("a");
    userLogin.className = "user-link";
    userLogin.href = data.html_url;
    userLogin.innerText = '@' + data.login;
    infoBoxDiv.appendChild(userLogin);

    // Create user avatar
    const userAvatar = document.createElement("img");
    userAvatar.className = "avatar";
    userAvatar.src = data.avatar_url;
    infoBoxDiv.appendChild(userAvatar);

    //Create user description
    const userDescription = document.createElement("p");
    userDescription.className = "user-text";
    userDescription.innerText = data.bio;
    infoBoxDiv.appendChild(userDescription);

    // Create number of public repos
    const publicRepos = document.createElement("p");
    publicRepos.className = "user-text";
    // minimize bottom margin
    publicRepos.innerHTML = codeIcon + '&nbsp;' + `${data.public_repos} public repos`;
    infoBoxDiv.appendChild(publicRepos);

    // Get the number of followers and following directly from the data object
    const followersNum = data.followers; // These should be provided as numbers
    const followingNum = data.following;

    const followStats = document.createElement("p");
    followStats.style.lineHeight = "0";
    if (followersNum == 0 && followingNum == 0) {
        followStats.innerHTML = followersIcon + '&nbsp;' + 'No followers or following';
    } else if (followersNum == 0) {
        followStats.innerHTML = followersIcon + '&nbsp;' + `${followingNum} following`;
    } else if (followingNum == 0) {
        followStats.innerHTML = followersIcon + '&nbsp;' + `${followersNum} followers`;
    } else
        followStats.innerHTML = followersIcon + '&nbsp;' + `${followersNum} followers \n ${followingNum} following`;
    infoBoxDiv.appendChild(followStats);

    //Create user location
    const userLocation = document.createElement("p");
    userLocation.className = "user-text";
    userLocation.innerText = data.location;
    infoBoxDiv.appendChild(userLocation);

    // Create user mail
    const userMail = document.createElement("a");
    userMail.innerText = data.email;
    infoBoxDiv.appendChild(userMail);

    // Create user blog
    const userBlog = document.createElement("a");
    userBlog.className = "blog-link";
    userBlog.href = data.blog;




}