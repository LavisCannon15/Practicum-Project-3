import "../pages/index.css";

import { initialCards, selectors, settings } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";



const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);

const CardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(
        { data: data, handleCardClick: cardPreviewPopup },
        selectors.cardTemplate
      );
      CardSection.addItems(card.getView());
    },
  },
  selectors.cardSection
);

CardSection.renderItems();


/*-------------------------Profile elements------------------------------*/
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

/*------------------------Modal Profile elements--------------------------*/
const modalProfileForm = document.querySelector("#editProfileForm");



const profileFormValidator = new FormValidator(settings, modalProfileForm);
profileFormValidator.enableValidation();

const editProfileModal = new PopupWithForm(selectors.profileModal, function (evt) {
  //evt.preventDefault();

  const userInfo = new UserInfo("#profileName", "#profileDescription");
  userInfo.setProfileInfo();

  editProfileModal.closeModal();
  
});

profileEditButton.addEventListener("click", () => {
  editProfileModal.openModal();
  profileFormValidator.toggleButtonState();
});

/*------------------------Modal addCard elements--------------------------*/


const modalAddForm = document.querySelector("#addCardForm");
const modalAddTitleInput = modalAddForm.querySelector("#addTitle");
const modalAddLinkInput = modalAddForm.querySelector("#addLink");


const addCardFormValidator = new FormValidator(settings, modalAddForm);
addCardFormValidator.enableValidation();

const addCardModal = new PopupWithForm(selectors.addCardModal, function (evt) {
  const cardData = {
    name: modalAddTitleInput.value,
    link: modalAddLinkInput.value,
  };
  const newCard = new Card(
    {
      data: cardData,
      handleCardClick: cardPreviewPopup, 
    },
    selectors.cardTemplate
  );

  CardSection.addItems(newCard.getView());

  addCardModal.closeModal();
});

addButton.addEventListener("click", () => {
  addCardModal.openModal();
  addCardFormValidator.toggleButtonState();
});



