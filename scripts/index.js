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

const profileEditButton = document.querySelector(".profile__edit-button");
const modal = document.querySelector(".modal");
const modalExitButton = document.querySelector(".modal__exit-button");

modal.classList.remove("modal__opened");

function openModalWindow() {
  modal.classList.add("modal__opened");
}

function closeModalWindow() {
  modal.classList.remove("modal__opened");
}

profileEditButton.addEventListener("click", openModalWindow);
modalExitButton.addEventListener("click", closeModalWindow);
