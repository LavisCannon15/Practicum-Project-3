export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._exitButtonElement =
      this._popupElement.querySelector("modal__exit-button");

    this.openedModal = document.querySelector(".modal__opened");
  }

  openModal() {
    this._popupElement.classList.add("modal__opened");
    this.setEventListeners();
  }

  closeModal() {
    this._popupElement.classList.remove("modal__opened");
    this.removeEventListeners();
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", _outsideCloseModal);
    document.addEventListener("keyup", _escCloseModal);
    this._exitButtonElement.addEventListener("click", this.closeModal);
  }

  removeEventListeners() {
    this._popupElement.removeEventListener("mousedown", _outsideCloseModal);
    document.removeEventListener("keyup", escCloseModal);
    this._exitButtonElement.removeEventListener("click", this.closeModal);
  }

  _escCloseModal(event) {
    if (event.key == "Escape") {
      //const openedModal = document.querySelector(".modal__opened");
      this.closeModal(this.openedModal);
    }
  }

  _outsideCloseModal(event) {
    if (event.target.classList.contains("modal")) {
      this.closeModal(event.target);
    }
  }
}
