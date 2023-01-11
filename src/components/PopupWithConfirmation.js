import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    //this._handleFormSubmit = handleFormSubmit;
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._modalFormButton = this._popupElement.querySelector(
      ".modal__form-button"
    );
  }

  openModal(handleFormSubmit)
  {
    this._handleFormSubmit = handleFormSubmit
    super.openModal();
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", this._handleSubmit);
  }


  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit();
  };

  closeModal() {
    super.closeModal();
    this._modalForm.reset();
  }
}
