export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this._profileName = document.querySelector(nameSelector);
        this._profileAbout = document.querySelector(aboutSelector);
    }

    getUserInfo() {
        return { 
            userName: this._profileName.textContent,  
            userAbout: this._profileAbout.textContent
        };
    }

    setUserInfo(newName, newAbout) {
        this._profileName.textContent = newName;
        this._profileAbout.textContent = newAbout;
    }
}