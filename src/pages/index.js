import "../pages/index.css";

import {
  initialCards,
  selectors,
  settings,
  apiBaseUrl,
  apiRequestOptions,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api";

const api = new Api(apiBaseUrl, apiRequestOptions);


const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);
cardPreviewPopup.setEventListeners();

function createCard(item, handleCardClick, cardSelector) {
  const deleteCardModal = new PopupWithForm(
    selectors.confirmationModal,
    (cardElement) => {
      cardElement.remove();
      deleteCardModal.closeModal();
    }
  );
  deleteCardModal.setEventListeners();

  const card = new Card(
    {
      data: item,
      handleCardClick: handleCardClick,
      deleteCardModal: deleteCardModal,
      api,
    },
    cardSelector
  );
  return card.getView();
}

//Retrives and adds cards from the server
api.getInitialCards().then((initialCardsData) => {
 
  const cardSection = new Section(
    {
      items: initialCardsData,
      renderer: (data) => {
        const card = createCard(data, cardPreviewPopup, selectors.cardTemplate);
        cardSection.addItems(card);
      },
    },
    selectors.cardSection
  );

  cardSection.renderItems();
  //console.log(initialCardsData);
});



/*
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = createCard(data, cardPreviewPopup, selectors.cardTemplate);
      cardSection.addItems(card);
    },
  },
  selectors.cardSection
);


cardSection.renderItems();
*/

/*-------------------------Profile elements------------------------------*/

/*-------------------------Profile button elements------------------------------*/
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profilePictureEditButton = document.querySelector(".profile__image-edit");

/*------------------------Modal Profile elements--------------------------*/
const modalProfileForm = document.querySelector("#editProfileForm");
const modalProfileNameInput = document.querySelector("#profileName");
const modalProfileDescriptionInput = document.querySelector(
  "#profileDescription"
);

const modalProfileSaveButton = document.querySelector("#profileSaveButton");

const userInfo = new UserInfo(selectors.profileName, selectors.profileAbout);
const profileFormValidator = new FormValidator(settings, modalProfileForm);
profileFormValidator.enableValidation();


function fillProfileForm() {
  const { name, description } = userInfo.getProfileInfo();
  modalProfileNameInput.value = name;
  modalProfileDescriptionInput.value = description;
}


api.getUserInfo().then((userData) => {
  //Fills profile form modal from server data
  modalProfileNameInput.value = userData.name;
  modalProfileDescriptionInput.value = userData.about;

  //Updates profile picture from  server data
  profilePicture.src = userData.avatar;
  profilePicture.alt = userData.name;

  //updates profile name and description from server
  userInfo.setProfileInfo(userData.name, userData.about);
});


const editProfileModal = new PopupWithForm(selectors.profileModal, () => {
  const inputValues = editProfileModal.getInputValues();

  const name = inputValues.name;
  const description = inputValues.description;

  userInfo.setProfileInfo(name, description);

  modalProfileSaveButton.textContent = "Saving...";
  api.editUserProfile(inputValues); 

  editProfileModal.closeModal();
});

editProfileModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  editProfileModal.openModal();
  profileFormValidator.toggleButtonState();
});

/*------------------------Modal addCard elements--------------------------*/
const modalAddForm = document.querySelector("#addCardForm");

const addCardFormValidator = new FormValidator(settings, modalAddForm);
addCardFormValidator.enableValidation();

const addCardModal = new PopupWithForm(selectors.addCardModal, () => {
  const cardData = addCardModal.getInputValues();

  const card = createCard(cardData);
  cardSection.addItems(card);

  api.addNewCard(cardData); 

  addCardModal.closeModal();
});


addCardModal.setEventListeners();

addButton.addEventListener("click", () => {
  addCardModal.openModal();
  addCardFormValidator.toggleButtonState();
});

/*------------------------Change profile picture--------------------------*/

const profilePictureForm = document.querySelector("#profilePictureForm");
const profilePicture = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__title");

const profilePictureFormValidator = new FormValidator(
  settings,
  profilePictureForm
);
profilePictureFormValidator.enableValidation();

const profilePictureModal = new PopupWithForm(
  selectors.changeProfilePictureModal,
  () => {
    const inputValues = profilePictureModal.getInputValues();
    const link = inputValues.link;
    profilePicture.src = link;
    profilePicture.alt = profileName.textContent;

    api.updateProfilePicture(inputValues);

    profilePictureModal.closeModal();
  }
);

profilePictureModal.setEventListeners();

profilePictureEditButton.addEventListener("click", () => {
  profilePictureModal.openModal();
  profileFormValidator.toggleButtonState();
});



