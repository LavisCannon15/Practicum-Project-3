export default class UserInfo {
  constructor(profileNameSelector, profileAboutSelector) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileDescriptionElement =
      document.querySelector(profileAboutSelector);
  }

  setProfileInfo({ profileName, profileDescription }) {
    this._profileNameElement.textContent = profileName;
    this._profileDescriptionElement.textContent = profileDescription;
  }

  getProfileInfo() {
    return {
      name: this._profileNameElement.textContent,
      about: this._profileDescriptionElement.textContent,
    };
  }

}
