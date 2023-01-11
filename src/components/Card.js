export default class Card {
  constructor(
    { data, handleImageClick, deleteCardModal, handleLike },
    cardSelector,
    userId
  ) {
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._deleteCardModal = deleteCardModal;
    this._handleLike = handleLike;

    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;

    this._cardTemplate = document.querySelector(
      this._cardSelector
    ).content.firstElementChild;

    //this._handleDeleteConfirm = this._handleDeleteConfirm.bind(this);
  }

  _setEventListeners() {
    //Like button
    this._cardHeartButton.addEventListener("click", this._handleLike);

    //delete button
    this._cardDeleteButton.addEventListener("click", this._deleteCardModal);

    //modal preview
    this._cardImage.addEventListener("click", this._handleImageClick);
  }

  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.isLiked()) {
      this._cardHeartButton.classList.add("card__heart-button-active");
    } else {
      this._cardHeartButton.classList.remove("card__heart-button-active");
    }
    this._cardLikes.textContent = this._likes.length;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  handleDeleteCard = () => {
    this._cardElement.remove();
    //this._deleteCardModal.openModal();
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

    this._renderLikes();

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    //Using the code below will remove the trash button from cards from the server
    //Will not remove trash button if user (Me) adds cards
    if (this._userId != this._ownerId) {
      this._cardDeleteButton.remove();
    }

    console.log("UserID: " + this._userId);
    console.log("OwnerID: " + this._ownerId);

    return this._cardElement;
  }
}
