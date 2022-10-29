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

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");


const modal = document.querySelector(".modal");
const modalExitButton = document.querySelector(".modal__exit-button");
const modalNameInput = document.querySelector(".modal__form-input-name");
const modalDescriptionInput = document.querySelector(".modal__form-input-description");
const modalSaveButton = document.querySelector(".modal__form-button");


const cardList = document.querySelector(".card__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;




function fillModalForm() {
  modalNameInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
}

//Profile Editing

function openModalWindow() {
  modal.classList.add("modal__opened");
}

function closeModalWindow() {
  modal.classList.remove("modal__opened");
}

function saveProfileInput() {
  let modalNameInputValue = modalNameInput.value;
  let modalDescriptionInputValue = modalDescriptionInput.value;

  profileTitle.textContent = modalNameInputValue;
  profileDescription.textContent = modalDescriptionInputValue;

  closeModalWindow();
}



closeModalWindow(); //Keeps modal hidden by default
fillModalForm(); //Fills name and description with values displayed on the page



profileEditButton.addEventListener("click", openModalWindow);
modalExitButton.addEventListener("click", closeModalWindow);
modalSaveButton.addEventListener("click", saveProfileInput);


function getCardElement(data)
{
  for (let i= 0; i < data.length; i++)
  {
      const cardElement = cardTemplate.cloneNode(true);

      const cardTitle = cardElement.querySelector(".card__title");

      const cardImage = cardElement.querySelector(".card__image");

      cardImage.src = data[i].link;

      cardImage.alt = data[i].title;

      cardTitle.textContent = data[i].name;

      cardList.appendChild(cardElement);

  }
}

getCardElement(initialCards);















/*
initialCards.forEach(function(data) 
{
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;

  cardImage.alt = data.title;

  cardTitle.textContent = data.name;

  cardList.appendChild(cardElement);

});
*/