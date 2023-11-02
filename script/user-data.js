function createUserAvater(data, infoBox) {
    var img = document.createElement('img');
    img.src = data.avatar_url;
    infoBox.appendChild(img);
}

function createUserLogin(data, infoBox) {
    var login = document.createElement('a');
    login.href = data.html_url;
    login.addClass('login-link');
    login.innerText = data.login;
    infoBox.appendChild(login);
}


function createUserBox(data) {
    var body = document.querySelector('body');
    var infoBox = document.createElement('div');
    infoBox.addClass('info-box');
    createUserAvater(data, infoBox);
}