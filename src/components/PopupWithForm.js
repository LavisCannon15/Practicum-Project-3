import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._modalForm = this._popupElement.querySelector("modal__form");
    this._modalFormInput =
      this._popupElement.querySelector("modal__form-input");
    this._modalFormButton =
      this._popupElement.querySelector("modal__form-button");
  }

  _getInputValues() {
    const inputValues = {};
    this._modalFormInput.forEach(
      (inputForm) => (inputValues[inputValues.name] = input.value)
    );
    return inputValues;
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", this.handleSubmit);
  }

  removeEventsListeners() {
    super.removeEventListeners();
    this._modalForm.addEventListener("submit", this.handleSubmit);
  }

  closeModal() {
    super.closeModal();
    this._modalForm.reset();
  }
}
