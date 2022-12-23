import { initialCards, selectors } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal } from "../utils/utils.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";

/* -------------------------------------------------------------------------- */
/*                               // cards array                               */
/* -------------------------------------------------------------------------- */

// Create instances of the classes

const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);
const CardSection = new Section({
  renderer: (data) => {
    const cardEl = new Card(
      {
        data,
        handleImageClick: (imgData) => {
          cardPreviewPopup.open(imgData);
        },
      },
      selectors.cardTemplate
    );
    CardSection.addItems(cardEl.getView());
  },
  selector: selectors.cardSection,
});

//initialize all my instances
CardSection.renderItems(initialCards);
cardPreviewPopup.setEventListeners();

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

  modalProfileForm.reset();
});

/*------------------------Modal addCard elements--------------------------*/
const modalAddCard = document.querySelector("#addCard");
const modalAddExitButton = document.querySelector("#addExitButton");

const modalAddForm = document.querySelector("#addCardForm");

const modalAddTitleInput = modalAddForm.querySelector("#addTitle");
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

const cardSelector = "#card-template";

const cardTemplate =
  document.querySelector(cardSelector).content.firstElementChild;
const cardList = document.querySelector(".cards__list");

//Image Preview
export const cardPreview = document.querySelector("#image-preview");
export const cardPreviewImage = document.querySelector(".modal__preview-image");
export const cardPreviewTitle = document.querySelector(".modal__preview-title");
export const cardPreviewExitButton =
  document.querySelector("#previewExitButton");

cardPreviewExitButton.addEventListener("click", () => {
  closeModal(cardPreview);
});

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

const profileFormValidator = new FormValidator(settings, modalProfileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, modalAddForm);
addCardFormValidator.enableValidation();

function renderCard(data) {
  const card = new Card(data, cardSelector);
  cardList.prepend(card.getView());
}

initialCards.forEach(renderCard);

modalAddForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardName = modalAddTitleInput.value;
  const newCardLink = modalAddLinkInput.value;

  renderCard({ name: newCardName, link: newCardLink });

  closeModal(modalAddCard);

  modalAddForm.reset();

  addCardFormValidator.toggleButtonState();
});
