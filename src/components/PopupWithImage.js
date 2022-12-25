import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._cardTitle = this._popupElement.querySelector(".card__title");
    this._cardImage = this._popupElement.querySelector(".card__image");
  }

  openModal({ link, name }) {
    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._cardTitle.textContent = name;

    super.openModal();
  }
}
