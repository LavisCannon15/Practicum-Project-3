export default class userInfo {
  constructor(profileNameSelector, profileAboutSelector) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileDescriptionElement =
      document.querySelector(profileAboutSelector);
  }

  getProfileInfo() {
    return {
      name: this._profileNameElement.textContent,
      about: this._profileDescriptionElement.textContent,
    };
  }

  setProfileInfo({ profileName, profileDescription }) {
    this._profileNameElement.textContent = profileName;
    this._profileDescriptionElement.textContent = profileDescription;
  }
}
