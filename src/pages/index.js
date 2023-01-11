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
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api";

const api = new Api(apiBaseUrl, apiRequestOptions);

const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);
cardPreviewPopup.setEventListeners();

const deleteCardModal = new PopupWithConfirmation(selectors.confirmationModal);
deleteCardModal.setEventListeners();

const confirmationModalSaveButton = document.querySelector(
  "#confirmationSaveButton"
);


function createCard(data) {
  const card = new Card(
    {
      data: data,
      handleImageClick: () => {
        cardPreviewPopup.openModal(data.name, data.link);
      },
      deleteCardModal: () => {
        deleteCardModal.openModal(() => {
          renderSaving(confirmationModalSaveButton, true);
          api
            .deleteCard(data._id)
            .then(() => {
              deleteCardModal.closeModal();
              card.handleDeleteCard();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              renderSaving(confirmationModalSaveButton, false);
            });
        });
      },
      handleLike: () => {
        if (card.isLiked()) {
          api
            .removeLike(card._id)
            .then((response) => {
              card.updateLikes(response.likes);
            })
            .catch(() => (err) => console.log(err));
        } else {
          api
            .addLike(card._id)
            .then((response) => {
              card.updateLikes(response.likes);
            })
            .catch(() => (err) => console.log(err));
        }
      },
    },
    selectors.cardTemplate,
    userId
  );
  return card.getView();
}


let cardSection;
let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setProfileInfo(userData.name, userData.about);
    userInfo.setProfileImage(userData.avatar);
    userId = userData._id; // set user id
    cardSection = new Section(
      {
        items: initialCards,
        renderer: (data) => {
          const card = createCard(data);
          cardSection.addItems(card); //Keep in mind the card is added to the bottom of the page.
        },
      },
      selectors.cardSection
    );

    cardSection.renderItems();
  })
  .catch((err) => console.log(err));



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

const userInfo = new UserInfo(
  selectors.profileName,
  selectors.profileAbout,
  selectors.profileImage
);
const profileFormValidator = new FormValidator(settings, modalProfileForm);
profileFormValidator.enableValidation();

function fillProfileForm() {
  const { name, description } = userInfo.getProfileInfo();
  modalProfileNameInput.value = name;
  modalProfileDescriptionInput.value = description;

}

const profileModalSaveButton = document.querySelector("#profileSaveButton");

const editProfileModal = new PopupWithForm(selectors.profileModal, () => {
  const inputValues = editProfileModal.getInputValues();

  renderSaving(profileModalSaveButton, true);
  api
    .editUserProfile(inputValues)
    .then(() => {
      const name = inputValues.name;
      const description = inputValues.description;

      userInfo.setProfileInfo(name, description);
      editProfileModal.closeModal();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderSaving(profileModalSaveButton, false);
    });
});

editProfileModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  editProfileModal.openModal();
  profileFormValidator.toggleButtonState();
});

/*------------------------Modal addCard elements--------------------------*/
const modalAddForm = document.querySelector("#addCardForm");
const addModalSaveButton = document.querySelector("#addCreateButton");

const addCardFormValidator = new FormValidator(settings, modalAddForm);
addCardFormValidator.enableValidation();

const addCardModal = new PopupWithForm(selectors.addCardModal, () => {
  const inputValues = addCardModal.getInputValues();

  renderSaving(addModalSaveButton, true);
  api
    .addNewCard(inputValues)
    .then((response) => {
      const card = createCard(response);
      cardSection.addItems(card);
      //api.addNewCard(inputValues);
      addCardModal.closeModal();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderSaving(addModalSaveButton, false);
    });
});

addCardModal.setEventListeners();

addButton.addEventListener("click", () => {
  addCardModal.openModal();
  addCardFormValidator.toggleButtonState();
});

/*------------------------Change profile picture--------------------------*/

const profilePictureForm = document.querySelector("#profilePictureForm");
const profilePictureSaveButton = document.querySelector("#profilePictureSave");

const profilePictureFormValidator = new FormValidator(
  settings,
  profilePictureForm
);
profilePictureFormValidator.enableValidation();

const profilePictureModal = new PopupWithForm(
  selectors.changeProfilePictureModal,
  () => {
    const inputValues = profilePictureModal.getInputValues();

    renderSaving(profilePictureSaveButton, true);
    api
      .updateProfilePicture(inputValues)
      .then(() => {
        const image = inputValues.link;
        userInfo.setProfileImage(image);
        profilePictureModal.closeModal();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderSaving(profilePictureSaveButton, false);
      });
  }
);

profilePictureModal.setEventListeners();

profilePictureEditButton.addEventListener("click", () => {
  //fillProfileImage();
  profilePictureModal.openModal();
  profileFormValidator.toggleButtonState();
});

let initialText;
function renderSaving(button, isSaving) {
  //const initialText = button.textContent;
  if (isSaving) {
    initialText = button.textContent;
    button.textContent = "Saving...";
  } else {
    button.textContent = initialText;
  }
}
