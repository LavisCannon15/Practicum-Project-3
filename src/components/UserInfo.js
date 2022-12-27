export default class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector) {

    this._profileTitle = document.querySelector(".profile__title");
    this._profileDescription = document.querySelector(".profile__description");

    this._modalProfileForm = document.querySelector("#editProfileForm");
    
    this._profileNameElement = this._modalProfileForm.querySelector(profileNameSelector);
    this._profileDescriptionElement = this._modalProfileForm.querySelector(profileDescriptionSelector);
  }

  setProfileInfo() {
    this._profileTitle.textContent = this._profileNameElement.value;
    this._profileDescription.textContent = this._profileDescriptionElement.value;
  }

  getProfileInfo() {
    return {
      name: this._profileNameElement.textContent,
      about: this._profileDescriptionElement.textContent,
    };
  }
}
