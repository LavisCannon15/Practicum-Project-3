import "../pages/index.css";

import { initialCards, selectors, settings } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";



const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);

function createCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: cardPreviewPopup,
    },
    selectors.cardTemplate
  );
  return card.getView();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = createCard(data);
      cardSection.addItems(card);
    },
  },
  selectors.cardSection
);


/*
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(
        { data: data, handleCardClick: cardPreviewPopup },
        selectors.cardTemplate
      );
      cardSection.addItems(card.getView());
    },
  },
  selectors.cardSection
);
*/

cardSection.renderItems();


/*-------------------------Profile elements------------------------------*/
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

/*------------------------Modal Profile elements--------------------------*/
const modalProfileForm = document.querySelector("#editProfileForm");
const modalProfileNameInput = document.querySelector("#profileName");
const modalProfileDescriptionInput = document.querySelector("#profileDescription");


const userInfo = new UserInfo(selectors.profileName, selectors.profileAbout);
const profileFormValidator = new FormValidator(settings, modalProfileForm);
profileFormValidator.enableValidation();

function fillProfileForm()
{
  const { name, description } = userInfo.getProfileInfo();
  modalProfileNameInput.value = name;
  modalProfileDescriptionInput.value = description;
}


const editProfileModal = new PopupWithForm(selectors.profileModal, () => {
  addCardModal.setEventListeners();
  const inputValues = editProfileModal.getInputValues();

  const name = inputValues.name;
  const description = inputValues.description;

  userInfo.setProfileInfo(name, description);


  editProfileModal.closeModal();
  
});

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  editProfileModal.openModal();
  profileFormValidator.toggleButtonState();
});

/*------------------------Modal addCard elements--------------------------*/


const modalAddForm = document.querySelector("#addCardForm");
const modalAddTitleInput = modalAddForm.querySelector("#addTitle");
const modalAddLinkInput = modalAddForm.querySelector("#addLink");


const addCardFormValidator = new FormValidator(settings, modalAddForm);
addCardFormValidator.enableValidation();

const addCardModal = new PopupWithForm(selectors.addCardModal, () => {
  addCardModal.setEventListeners();
  const cardData = addCardModal.getInputValues();

  const card = createCard(cardData);
  cardSection.addItems(card);

  addCardModal.closeModal();
});

addButton.addEventListener("click", () => {
  addCardModal.openModal();
  addCardFormValidator.toggleButtonState();
});



