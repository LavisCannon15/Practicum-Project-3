/* -------------------------------------------------------------------------- */
/*                               // cards array                               */
/* -------------------------------------------------------------------------- */

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "./images/yosemite-valley.jpg",
  },

  {
    name: "Lake Louise",
    link: "./images/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "./images/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "./images/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "./images/vanoise-national-park.jpg",
  },

  {
    name: "Lago di Braies",
    link: "./images/lago-di-braies.jpg",
  },
];

function openModal(popup) {
  popup.classList.add("modal__opened");
}

function closeModal(popup) {
  popup.classList.remove("modal__opened");
}

/*-------------------------Profile elements------------------------------*/
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

/*------------------------Modal Profile elements--------------------------*/
const modalProfile = document.querySelector("#profileEdit");
const modalProfileExitButton = document.querySelector("#profileExitButton");

const modalProfileForm = document.querySelector("#editProfileForm");

const modalProfileNameInput = modalProfileForm.querySelector("#profileName");
const modalProfileDescriptionInput = modalProfileForm.querySelector(
  "#profileDescription"
);
const modalProfileSaveButton = document.querySelector("#profileSaveButton");

//Profile editing
function fillProfileForm() {
  modalProfileNameInput.value = profileTitle.textContent;
  modalProfileDescriptionInput.value = profileDescription.textContent;
}

//Listening to Button inputs
profileEditButton.addEventListener("click", () => {
  fillProfileForm(); //Pre-fills name and description with values displayed on the page into the modal inputs
  openModal(modalProfile);
});

modalProfileExitButton.addEventListener("click", () => {
  closeModal(modalProfile);
});

modalProfileForm.addEventListener("submit", (evt) => {
  //Saves input data and closes modal
  evt.preventDefault();

  const modalNameInputValue = modalProfileNameInput.value;
  const modalDescriptionInputValue = modalProfileDescriptionInput.value;

  profileTitle.textContent = modalNameInputValue;
  profileDescription.textContent = modalDescriptionInputValue;

  closeModal(modalProfile);

  modalProfile.reset();
});

/*------------------------Modal addCard elements--------------------------*/
const modalAddCard = document.querySelector("#addCard");
const modalAddExitButton = document.querySelector("#addExitButton");

const modalAddForm = document.querySelector("#addCardForm");

const modalAddNameInput = modalAddForm.querySelector("#addName");
const modalAddLinkInput = modalAddForm.querySelector("#addLink");
const modalAddCreateButton = document.querySelector("#addCreateButton");

//Listening to Button inputs
addButton.addEventListener("click", () => {
  //open addCard modal
  openModal(modalAddCard);
});

modalAddExitButton.addEventListener("click", () => {
  //closes addCard Modal
  closeModal(modalAddCard);
});

/*-----------------------------Card list elements------------------------------*/

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector(".cards__list");

//Image Preview
const modalPreview = document.querySelector("#image-preview");
const modalPreviewImage = document.querySelector(".modal__preview-image");
const modalPreviewTitle = document.querySelector(".modal__preview-title");
const modalPreviewExitButton = document.querySelector("#previewExitButton");

modalPreviewExitButton.addEventListener("click", () => {
  closeModal(modalPreview);
});

function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardHeartButton = cardElement.querySelector(".card__heart-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  //Like button
  cardHeartButton.addEventListener("click", () => {
    cardHeartButton.classList.toggle("card__heart-button-active");
  });

  //delete button
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  //modal preview
  cardImage.addEventListener("click", () => {
    modalPreviewTitle.textContent = data.name;
    modalPreviewImage.src = data.link;
    modalPreviewImage.alt = data.name;

    openModal(modalPreview);
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardList.prepend(cardElement);
}

initialCards.forEach(renderCard);

modalAddForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardName = modalAddNameInput.value;
  const newCardLink = modalAddLinkInput.value;

  renderCard({ name: newCardName, link: newCardLink });

  closeModal(modalAddCard);

  modalAddForm.reset();
});
