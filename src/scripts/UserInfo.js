export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._profileName = document.querySelector(nameSelector);
        this._profileAbout = document.querySelector(aboutSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return { 
            userName: this._profileName.textContent,  
            userAbout: this._profileAbout.textContent
        };
    }

    setUserAvatar(userData) {
        this._profileAvatar.src = userData.avatar;
    }

    setUserInfo(userData) {
        this._profileName.textContent = userData.name;
        this._profileAbout.textContent = userData.about;

    }
}