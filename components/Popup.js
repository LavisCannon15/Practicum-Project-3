export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._exitButtonElement = this._popupElement.querySelector(
      ".modal__exit-button"
    );

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openModal() {
    this._popupElement.classList.add("modal__opened");
    document.addEventListener("keyup", this._handleEscClose);
    this.setEventListeners();
  }

  closeModal() {
    this._popupElement.classList.remove("modal__opened");
    document.removeEventListener("keyup", this._handleEscClose);
    //this._modalForm.reset();
  }

  setEventListeners() {
    this._popupElement.addEventListener(
      "mousedown",
      this._handleOutsideClose.bind(this)
    );
    this._exitButtonElement.addEventListener(
      "click",
      this.closeModal.bind(this)
    );
  }

  _handleEscClose(event) {
    if (event.key == "Escape") {
      this.closeModal();
    }
  }

  _handleOutsideClose(event) {
    if (event.target.classList.contains("modal")) {
      this.closeModal();
    }
  }
}
