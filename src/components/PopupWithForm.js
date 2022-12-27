import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._modalFormInput =
      this._popupElement.querySelectorAll(".modal__form-input");
    this._modalFormButton = this._popupElement.querySelector(
      ".modal__form-button"
    );

    this._exitButtonElement = document.querySelector(".modal__exit-button");
  }

  _getInputValues() {
    const inputValues = {};
    this._modalFormInput.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", this._handleSubmit);
  }

  removeEventsListeners() {
    super.removeEventListeners();
    this._modalForm.addEventListener("submit", this._handleSubmit);
  }

  closeModal() {
    super.closeModal();
    this._modalForm.reset();
  }


}
