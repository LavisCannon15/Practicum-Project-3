export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

    this._cardTemplate = document.querySelector(
      this._cardSelector
    ).content.firstElementChild;
  }

  _setEventListeners() {
    //Like button
    this._cardHeartButton.addEventListener("click", this._handleHeartIcon);

    //delete button
    this._cardDeleteButton.addEventListener("click", this._handleDeleteCard);

    //modal preview
    this._cardImage.addEventListener("click", this._handlePreviewPicture);
  }

  _handleHeartIcon = () => {
    this._cardHeartButton.classList.toggle("card__heart-button-active");
  };

  _handleDeleteCard = () => {
    this._cardElement.remove();
  };

  _handlePreviewPicture = () => {
    this._handleCardClick.openModal({ link: this._link, name: this._name });
  };

  getView() {
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardHeartButton = this._cardElement.querySelector(
      ".card__heart-button"
    );
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._cardElement;
  }
}
