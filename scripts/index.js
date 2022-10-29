const initialCards = [
  {
    name: "Yosemite Valley",
    link: "./images/yosemite-valley.png",
  },

  {
    name: "Lake Louise",
    link: "./images/lake-louise.png",
  },

  {
    name: "Bald Mountains",
    link: "./images/bald-mountains.png",
  },

  {
    name: "Latemar",
    link: "./images/latemar.png",
  },

  {
    name: "Vanoise National Park",
    link: "./images/vanoise-national-park.png",
  },

  {
    name: "Lago di Braies",
    link: "./images/lago-di-braies.png",
  },
];

//Acessing profile elements
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");

//Acessing model elements
const modalProfile = document.querySelector(".modal");
const modalProfileExitButton = document.querySelector(".modal__exit-button");
const modalProfileNameInput = document.querySelector(".modal__form-input-name");
const modalProfileDescriptionInput = document.querySelector(
  ".modal__form-input-description"
);
const modalProfileSaveButton = document.querySelector(".modal__form-button");

//Acessing card list
const cardList = document.querySelector(".cards__list");

//Acessing card template
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function fillModalForm() {
  modalProfileNameInput.value = profileTitle.textContent;
  modalProfileDescriptionInput.value = profileDescription.textContent;
}

//Profile Editing
function openModalWindow() {
  fillModalForm(); //Pre-fills name and description with values displayed on the page into the modal inputs
  modalProfile.classList.add("modal__opened");
}

function closeModalWindow() {
  modalProfile.classList.remove("modal__opened");
}

function saveProfileInput() {
  const modalNameInputValue = modalProfileNameInput.value;
  const modalDescriptionInputValue = modalProfileDescriptionInput.value;

  profileTitle.textContent = modalNameInputValue;
  profileDescription.textContent = modalDescriptionInputValue;

  closeModalWindow();
}

//Listening to Button inputs
profileEditButton.addEventListener("click", openModalWindow);
modalProfileExitButton.addEventListener("click", closeModalWindow);
modalProfileSaveButton.addEventListener("click", saveProfileInput);

function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.title;
  cardTitle.textContent = data.name;

  return cardElement;
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardList.prepend(cardElement);
}

initialCards.forEach(renderCard);
