import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._cardPreviewImage = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._cardPreviewTitle = this._popupElement.querySelector(
      ".modal__preview-title"
    );
  }

  openModal({ link, name }) {
    this._cardPreviewImage.src = link;
    this._cardPreviewImage.alt = name;
    this._cardPreviewTitle.textContent = name;

    super.openModal();
  }
}
