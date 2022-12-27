export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.openedModal = document.querySelector(".modal__opened");
  }

  openModal() {
    this._popupElement.classList.add("modal__opened");
    this._exitButtonElement = this._popupElement.querySelector(
      ".modal__exit-button"
    );
    this.setEventListeners();
  }

  closeModal() {
    this._popupElement.classList.remove("modal__opened");
    this.removeEventListeners();
  }

  setEventListeners() {
    this._popupElement.addEventListener(
      "mousedown",
      this._outsideCloseModal.bind(this)
    );
    document.addEventListener("keyup", this._escCloseModal.bind(this));
    this._exitButtonElement.addEventListener(
      "click",
      this.closeModal.bind(this)
    );
  }

  removeEventListeners() {
    this._popupElement.removeEventListener(
      "mousedown",
      this._outsideCloseModal.bind(this)
    );
    document.removeEventListener("keyup", this._escCloseModal.bind(this));
    this._exitButtonElement.removeEventListener(
      "click",
      this.closeModal.bind(this)
    );
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
