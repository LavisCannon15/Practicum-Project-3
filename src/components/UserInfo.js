export default class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector, profileImageSelector) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileDescriptionElement = document.querySelector(
      profileDescriptionSelector
    );

    this._profileImageElement = document.querySelector(profileImageSelector);
  }

  setProfileInfo(name, description) {
    this._profileNameElement.textContent = name;
    this._profileDescriptionElement.textContent = description;
  }

  setProfileImage(avatar) {
      this._profileImageElement.src = avatar;
      this._profileImageElement.alt = this._profileNameElement.textContent;
  }


  getProfileInfo() {
    return {
      name: this._profileNameElement.textContent,
      description: this._profileDescriptionElement.textContent,
    }
  }
}
