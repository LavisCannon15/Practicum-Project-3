import { initialCards, selectors, settings } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

/* -------------------------------------------------------------------------- */
/*                               // cards array                               */
/* -------------------------------------------------------------------------- */

const cardSelector = "#card-template";
const cardTemplate = document.querySelector(cardSelector).content.firstElementChild;

// Create instances of the classes

const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);

const CardSection = new Section(
  {
  items: initialCards,
  renderer: (data) => {
    const card = new Card({ data: data }, selectors.cardTemplate);
    CardSection.addItems(card.getView());
  },
}, selectors.cardSection);

CardSection.renderItems();

//initialize all my instances
//CardSection.renderItems(initialCards);
//cardPreviewPopup.setEventListeners();

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



const editProfileModal = new PopupWithForm(modalProfileForm, function(evt) {
  evt.preventDefault();

  const userInfo = new UserInfo("#profileName", "#profileDescription");
  userInfo.setProfileInfo({
    profileName: modalProfileNameInput.value,
    profileDescription: modalProfileDescriptionInput.value,
  });

  editProfileModal.closeModal();
});

editProfileModal.setEventListeners();


profileEditButton.addEventListener("click", () => {
  editProfileModal.openModal();
});




/*------------------------Modal addCard elements--------------------------*/
const modalAddCard = document.querySelector("#addCard");
const modalAddExitButton = document.querySelector("#addExitButton");

const modalAddForm = document.querySelector("#addCardForm");

const modalAddTitleInput = modalAddForm.querySelector("#addTitle");
const modalAddLinkInput = modalAddForm.querySelector("#addLink");
const modalAddCreateButton = document.querySelector("#addCreateButton");


const addCardModal = new PopupWithForm(modalAddForm, function (evt) {
  evt.preventDefault();

  const cardData = {
    name: modalAddNameInput.value,
    link: modalAddLinkInput.value,
  };
  const newCard = new Card(
    {
      data: cardData,
      handleImageClick: (imgData) => {
        cardPreviewPopup.open(imgData);
      },
    },
    selectors.cardTemplate
  );

  CardSection.addItem(newCard.getView());

  addCardModal.closeModal();
});


addCardModal.setEventListeners();


addButton.addEventListener("click", () => {
  addCardModal.openModal();
});





/*-----------------------------Card list elements------------------------------*/

//const cardSelector = "#card-template";

//const cardTemplate = document.querySelector(cardSelector).content.firstElementChild;
//const cardList = document.querySelector(".cards__list");

//Image Preview
export const cardPreview = document.querySelector("#image-preview");
export const cardPreviewImage = document.querySelector(".modal__preview-image");
export const cardPreviewTitle = document.querySelector(".modal__preview-title");
export const cardPreviewExitButton =
  document.querySelector("#previewExitButton");

cardPreviewExitButton.addEventListener("click", () => {
  closeModal(cardPreview);
});



const profileFormValidator = new FormValidator(settings, modalProfileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, modalAddForm);
addCardFormValidator.enableValidation();



modalAddForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardName = modalAddTitleInput.value;
  const newCardLink = modalAddLinkInput.value;

  renderCard({ name: newCardName, link: newCardLink });

  closeModal(modalAddCard);

  modalAddForm.reset();

  addCardFormValidator.toggleButtonState();
});
