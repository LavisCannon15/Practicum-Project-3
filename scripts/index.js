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
const modalExitButton = document.querySelector(".modal__exit-button");
const modalNameInput = document.querySelector(".modal__form-input-name");
const modalDescriptionInput = document.querySelector(
  ".modal__form-input-description"
);
const modalSaveButton = document.querySelector(".modal__form-button");

//Acessing card list
const cardList = document.querySelector(".cards__list");

//Acessing card template
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function fillModalForm() {
  modalNameInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
}

//Profile Editing
function openModalWindow() {
  modalProfile.classList.add("modal__opened");
}

function closeModalWindow() {
  modalProfile.classList.remove("modal__opened");
}

function saveProfileInput() {
  const modalNameInputValue = modalNameInput.value;
  const modalDescriptionInputValue = modalDescriptionInput.value;

  profileTitle.textContent = modalNameInputValue;
  profileDescription.textContent = modalDescriptionInputValue;

  closeModalWindow();
}

fillModalForm(); //Pre-fills name and description with values displayed on the page into the modal inputs

//Listening to Button inputs
profileEditButton.addEventListener("click", openModalWindow);
modalExitButton.addEventListener("click", closeModalWindow);
modalSaveButton.addEventListener("click", saveProfileInput);

//Displays card
initialCards.forEach(function (data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");

  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;

  cardImage.alt = data.title;

  cardTitle.textContent = data.name;

  cardList.appendChild(cardElement);
});
