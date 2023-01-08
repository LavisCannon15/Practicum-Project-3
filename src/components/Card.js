export default class Card {
  constructor({ data, handleCardClick, deleteCardModal, api }, cardSelector) {
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCardModal = deleteCardModal;
    this._api = api;

    this._name = data.name;
    this._link = data.link;
    this._id = data._id;

    this._cardTemplate = document.querySelector(
      this._cardSelector
    ).content.firstElementChild;

    this._handleDeleteConfirm = this._handleDeleteConfirm.bind(this);

    this._likes = 0;
  }

  /*
  _handleDeleteConfirm() {
    this._cardElement.remove();
    this._deleteCardModal.closeModal();
  }
  */

  _handleDeleteConfirm(cardElement) {
    cardElement.remove();
    this._api.deleteCard(this._id);
    this._deleteCardModal.closeModal();
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

    if (this._cardHeartButton.classList.contains("card__heart-button-active")) {
      this._likes += 1;
      this._api.addLike(this._id);
    } else {
      this._likes -= 1;
      this._api.removeLike(this._id);
    }
    this._cardLikes.textContent = this._likes;
  };

  /*
  _handleDeleteCard = () => {
    //this._cardElement.remove();
    this._deleteCardModal.openModal();
  };
  */

  _handleDeleteCard = () => {
    this._deleteCardModal.openModal();
    this._deleteCardModal._handleFormSubmit = () => {
      this._handleDeleteConfirm(this._cardElement);
    };
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
    this._cardLikes = this._cardElement.querySelector(".card__likes");

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._cardElement;
  }
}
