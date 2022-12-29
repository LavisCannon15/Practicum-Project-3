const yosemiteValleyImage = new URL(
  "../images/yosemite-valley.jpg",
  import.meta.url
);
const lakeLouiseImage = new URL("../images/lake-louise.jpg", import.meta.url);
const baldMountainImage = new URL(
  "../images/bald-mountains.jpg",
  import.meta.url
);
const latemarImage = new URL("../images/latemar.jpg", import.meta.url);
const vanoiseNationalParkImage = new URL(
  "../images/vanoise-national-park.jpg",
  import.meta.url
);
const lagoDiBraiesImage = new URL(
  "../images/lago-di-braies.jpg",
  import.meta.url
);

export const initialCards = [
  {
    name: "Yosemite Valley",
    link: yosemiteValleyImage,
  },

  {
    name: "Lake Louise",
    link: lakeLouiseImage,
  },

  {
    name: "Bald Mountains",
    link: baldMountainImage,
  },

  {
    name: "Latemar",
    link: latemarImage,
  },

  {
    name: "Vanoise National Park",
    link: vanoiseNationalParkImage,
  },

  {
    name: "Lago di Braies",
    link: lagoDiBraiesImage,
  },
];

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

export const selectors = {
  cardSection: ".cards__list",
  cardTemplate: "#card-template",
  previewPopup: "#image-preview",
  profileModal: "#profileEdit",
  addCardModal: "#addCard",
  profileName: ".profile__title",
  profileAbout: ".profile__description",
};
