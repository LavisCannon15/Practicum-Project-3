/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Card; }
/* harmony export */ });
class Card {
  constructor({
    data,
    handleCardClick
  }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._cardTemplate = document.querySelector(this._cardSelector).content.firstElementChild;
    this._exitButtonElement = document.querySelector(".modal__exit-button");
  }
  _setEventListeners() {
    //Like button
    this._cardHeartButton.addEventListener("click", this._handleHeartIcon);

    //delete button
    this._cardDeleteButton.addEventListener("click", this._handleDeleteCard);

    //modal preview
    this._cardImage.addEventListener("click", this._handlePreviewPicture);
  }
  _handleHeartIcon = () => {
    this._cardHeartButton.classList.toggle("card__heart-button-active");
  };
  _handleDeleteCard = () => {
    this._cardElement.remove();
  };
  _handlePreviewPicture = () => {
    this._handleCardClick.openModal({
      link: this._link,
      name: this._name
    });
  };
  getView() {
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardHeartButton = this._cardElement.querySelector(".card__heart-button");
    this._cardDeleteButton = this._cardElement.querySelector(".card__delete-button");
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    return this._cardElement;
  }
}

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FormValidator; }
/* harmony export */ });
class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }
  _showInputError(inputElement) {
    const errorMessageEl = this._form.querySelector("#" + inputElement.id + "-error");
    inputElement.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputElement.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }
  _hideInputError(inputElement) {
    const errorMessageEl = this._form.querySelector("#" + inputElement.id + "-error");
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = " ";
    errorMessageEl.classList.remove(this._errorClass);
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }
  _hasInvalidInput() {
    return !this._inputEls.every(inputElement => inputElement.validity.valid);
  }
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
  _setEventListeners() {
    this._inputEls.forEach(inputElement => {
      inputElement.addEventListener("input", e => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._form.addEventListener("submit", e => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Popup; }
/* harmony export */ });
class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.openedModal = document.querySelector(".modal__opened");
  }
  openModal() {
    this._popupElement.classList.add("modal__opened");
    this._exitButtonElement = this._popupElement.querySelector(".modal__exit-button");
    this.setEventListeners();
  }
  closeModal() {
    this._popupElement.classList.remove("modal__opened");
    this.removeEventListeners();
  }
  setEventListeners() {
    this._popupElement.addEventListener("mousedown", this._outsideCloseModal.bind(this));
    document.addEventListener("keyup", this._escCloseModal.bind(this));
    this._exitButtonElement.addEventListener("click", this.closeModal.bind(this));
  }
  removeEventListeners() {
    this._popupElement.removeEventListener("mousedown", this._outsideCloseModal.bind(this));
    document.removeEventListener("keyup", this._escCloseModal.bind(this));
    this._exitButtonElement.removeEventListener("click", this.closeModal.bind(this));
  }
  _escCloseModal(event) {
    if (event.key == "Escape") {
      //const openedModal = document.querySelector(".modal__opened");
      this.closeModal(this.openedModal);
    }
  }
  _outsideCloseModal(event) {
    if (event.target.classList.contains("modal")) {
      this.closeModal(event.target);
    }
  }
}

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PopupWithForm; }
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");

class PopupWithForm extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._modalFormInput = this._popupElement.querySelectorAll(".modal__form-input");
    this._modalFormButton = this._popupElement.querySelector(".modal__form-button");
    this._exitButtonElement = document.querySelector(".modal__exit-button");
  }
  _getInputValues() {
    const inputValues = {};
    this._modalFormInput.forEach(input => inputValues[input.name] = input.value);
    return inputValues;
  }
  _handleSubmit = evt => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };
  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", this._handleSubmit);
  }
  removeEventsListeners() {
    super.removeEventListeners();
    this._modalForm.addEventListener("submit", this._handleSubmit);
  }
  closeModal() {
    super.closeModal();
    this._modalForm.reset();
  }
}

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PopupWithImage; }
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");

class PopupWithImage extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardPreviewImage = this._popupElement.querySelector(".modal__preview-image");
    this._cardPreviewTitle = this._popupElement.querySelector(".modal__preview-title");
    this._exitButtonElement = document.querySelector("#previewExitButton");
  }
  openModal({
    link,
    name
  }) {
    this._cardPreviewImage.src = link;
    this._cardPreviewImage.alt = name;
    this._cardPreviewTitle.textContent = name;
    super.openModal();
  }
}

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Section; }
/* harmony export */ });
class Section {
  constructor({
    items,
    renderer
  }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach(this._renderer);
  }
  addItems(element) {
    this._container.prepend(element);
  }
}

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ UserInfo; }
/* harmony export */ });
class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector) {
    this._profileTitle = document.querySelector(".profile__title");
    this._profileDescription = document.querySelector(".profile__description");
    this._modalProfileForm = document.querySelector("#editProfileForm");
    this._profileNameElement = this._modalProfileForm.querySelector(profileNameSelector);
    this._profileDescriptionElement = this._modalProfileForm.querySelector(profileDescriptionSelector);
  }
  setProfileInfo() {
    this._profileTitle.textContent = this._profileNameElement.value;
    this._profileDescription.textContent = this._profileDescriptionElement.value;
  }
  getProfileInfo() {
    return {
      name: this._profileNameElement.textContent,
      about: this._profileDescriptionElement.textContent
    };
  }
}

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initialCards": function() { return /* binding */ initialCards; },
/* harmony export */   "selectors": function() { return /* binding */ selectors; },
/* harmony export */   "settings": function() { return /* binding */ settings; }
/* harmony export */ });
const initialCards = [{
  name: "Yosemite Valley",
  link: "./images/yosemite-valley.jpg"
}, {
  name: "Lake Louise",
  link: "./images/lake-louise.jpg"
}, {
  name: "Bald Mountains",
  link: "./images/bald-mountains.jpg"
}, {
  name: "Latemar",
  link: "./images/latemar.jpg"
}, {
  name: "Vanoise National Park",
  link: "./images/vanoise-national-park.jpg"
}, {
  name: "Lago di Braies",
  link: "./images/lago-di-braies.jpg"
}];
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible"
};
const selectors = {
  cardSection: ".cards__list",
  cardTemplate: "#card-template",
  previewPopup: "#image-preview",
  profileModal: "#profileEdit",
  addCardModal: "#addCard"
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants.js */ "./src/utils/constants.js");
/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Card.js */ "./src/components/Card.js");
/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FormValidator.js */ "./src/components/FormValidator.js");
/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Section.js */ "./src/components/Section.js");
/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/PopupWithImage.js */ "./src/components/PopupWithImage.js");
/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PopupWithForm.js */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/UserInfo.js */ "./src/components/UserInfo.js");







const cardPreviewPopup = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__["default"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.selectors.previewPopup);
const CardSection = new _components_Section_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
  items: _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.initialCards,
  renderer: data => {
    const card = new _components_Card_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      data: data,
      handleCardClick: cardPreviewPopup
    }, _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.selectors.cardTemplate);
    CardSection.addItems(card.getView());
  }
}, _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.selectors.cardSection);
CardSection.renderItems();

/*-------------------------Profile elements------------------------------*/
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

/*------------------------Modal Profile elements--------------------------*/
const modalProfileForm = document.querySelector("#editProfileForm");
const profileFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__["default"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.settings, modalProfileForm);
profileFormValidator.enableValidation();
const editProfileModal = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__["default"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.selectors.profileModal, function (evt) {
  //evt.preventDefault();

  const userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_6__["default"]("#profileName", "#profileDescription");
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
const addCardFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__["default"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.settings, modalAddForm);
addCardFormValidator.enableValidation();
const addCardModal = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__["default"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.selectors.addCardModal, function (evt) {
  const cardData = {
    name: modalAddTitleInput.value,
    link: modalAddLinkInput.value
  };
  const newCard = new _components_Card_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    data: cardData,
    handleCardClick: cardPreviewPopup
  }, _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.selectors.cardTemplate);
  CardSection.addItems(newCard.getView());
  addCardModal.closeModal();
});
addButton.addEventListener("click", () => {
  addCardModal.openModal();
  addCardFormValidator.toggleButtonState();
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBb0IsQ0FBQ2hGLGlCQUFpQixFQUFFO0FBQzFDLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJhY3RpY3VtLXByb2plY3QtOC8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLXByb2plY3QtOC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLXByb2plY3QtOC8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS1wcm9qZWN0LTgvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS1wcm9qZWN0LTgvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0tcHJvamVjdC04Ly4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0tcHJvamVjdC04Ly4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLXByb2plY3QtOC8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLXByb2plY3QtOC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wcmFjdGljdW0tcHJvamVjdC04L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wcmFjdGljdW0tcHJvamVjdC04L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLXByb2plY3QtOC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3ByYWN0aWN1bS1wcm9qZWN0LTgvLi9zcmMvcGFnZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IoeyBkYXRhLCBoYW5kbGVDYXJkQ2xpY2sgfSwgY2FyZFNlbGVjdG9yKSB7XHJcbiAgICB0aGlzLl9uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5fbGluayA9IGRhdGEubGluaztcclxuXHJcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XHJcbiAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2sgPSBoYW5kbGVDYXJkQ2xpY2s7XHJcblxyXG4gICAgdGhpcy5fY2FyZFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgdGhpcy5fY2FyZFNlbGVjdG9yXHJcbiAgICApLmNvbnRlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcblxyXG4gICAgdGhpcy5fZXhpdEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19leGl0LWJ1dHRvblwiKTtcclxuICB9XHJcblxyXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIC8vTGlrZSBidXR0b25cclxuICAgIHRoaXMuX2NhcmRIZWFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5faGFuZGxlSGVhcnRJY29uKTtcclxuXHJcbiAgICAvL2RlbGV0ZSBidXR0b25cclxuICAgIHRoaXMuX2NhcmREZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2hhbmRsZURlbGV0ZUNhcmQpO1xyXG5cclxuICAgIC8vbW9kYWwgcHJldmlld1xyXG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9oYW5kbGVQcmV2aWV3UGljdHVyZSk7XHJcblxyXG4gIH1cclxuXHJcbiAgX2hhbmRsZUhlYXJ0SWNvbiA9ICgpID0+IHtcclxuICAgIHRoaXMuX2NhcmRIZWFydEJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9faGVhcnQtYnV0dG9uLWFjdGl2ZVwiKTtcclxuICB9O1xyXG5cclxuICBfaGFuZGxlRGVsZXRlQ2FyZCA9ICgpID0+IHtcclxuICAgIHRoaXMuX2NhcmRFbGVtZW50LnJlbW92ZSgpO1xyXG4gIH07XHJcblxyXG4gIF9oYW5kbGVQcmV2aWV3UGljdHVyZSA9ICgpID0+IHtcclxuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljay5vcGVuTW9kYWwoeyBsaW5rOiB0aGlzLl9saW5rLCBuYW1lOiB0aGlzLl9uYW1lIH0pO1xyXG4gIH07XHJcblxyXG5cclxuICBnZXRWaWV3KCkge1xyXG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSB0aGlzLl9jYXJkVGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgdGhpcy5fY2FyZFRpdGxlID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKTtcclxuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XHJcbiAgICB0aGlzLl9jYXJkSGVhcnRCdXR0b24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jYXJkX19oZWFydC1idXR0b25cIlxyXG4gICAgKTtcclxuICAgIHRoaXMuX2NhcmREZWxldGVCdXR0b24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jYXJkX19kZWxldGUtYnV0dG9uXCJcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5fbGluaztcclxuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl9uYW1lO1xyXG4gICAgdGhpcy5fY2FyZFRpdGxlLnRleHRDb250ZW50ID0gdGhpcy5fbmFtZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fY2FyZEVsZW1lbnQ7XHJcbiAgfVxyXG59XHJcblxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtVmFsaWRhdG9yIHtcclxuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybUVsZW1lbnQpIHtcclxuICAgIHRoaXMuX2Zvcm0gPSBmb3JtRWxlbWVudDtcclxuXHJcbiAgICB0aGlzLl9pbnB1dFNlbGVjdG9yID0gc2V0dGluZ3MuaW5wdXRTZWxlY3RvcjtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yID0gc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3I7XHJcbiAgICB0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzID0gc2V0dGluZ3MuaW5hY3RpdmVCdXR0b25DbGFzcztcclxuICAgIHRoaXMuX2lucHV0RXJyb3JDbGFzcyA9IHNldHRpbmdzLmlucHV0RXJyb3JDbGFzcztcclxuICAgIHRoaXMuX2Vycm9yQ2xhc3MgPSBzZXR0aW5ncy5lcnJvckNsYXNzO1xyXG5cclxuICAgIHRoaXMuX2lucHV0RWxzID0gWy4uLnRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKV07XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3IodGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCkge1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlRWwgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiI1wiICsgaW5wdXRFbGVtZW50LmlkICsgXCItZXJyb3JcIlxyXG4gICAgKTtcclxuICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XHJcbiAgICBlcnJvck1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IGlucHV0RWxlbWVudC52YWxpZGF0aW9uTWVzc2FnZTtcclxuICAgIGVycm9yTWVzc2FnZUVsLmNsYXNzTGlzdC5hZGQodGhpcy5fZXJyb3JDbGFzcyk7XHJcbiAgfVxyXG5cclxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KSB7XHJcbiAgICBjb25zdCBlcnJvck1lc3NhZ2VFbCA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjXCIgKyBpbnB1dEVsZW1lbnQuaWQgKyBcIi1lcnJvclwiXHJcbiAgICApO1xyXG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcclxuICAgIGVycm9yTWVzc2FnZUVsLnRleHRDb250ZW50ID0gXCIgXCI7XHJcbiAgICBlcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Vycm9yQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpIHtcclxuICAgIGlmICghaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIF9oYXNJbnZhbGlkSW5wdXQoKSB7XHJcbiAgICByZXR1cm4gIXRoaXMuX2lucHV0RWxzLmV2ZXJ5KChpbnB1dEVsZW1lbnQpID0+IGlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVCdXR0b25TdGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoKSkge1xyXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9pbnB1dEVscy5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcclxuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGVuYWJsZVZhbGlkYXRpb24oKSB7XHJcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XHJcbiAgICB0aGlzLm9wZW5lZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fb3BlbmVkXCIpO1xyXG4gIH1cclxuXHJcbiAgb3Blbk1vZGFsKCkge1xyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJtb2RhbF9fb3BlbmVkXCIpO1xyXG4gICAgdGhpcy5fZXhpdEJ1dHRvbkVsZW1lbnQgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIubW9kYWxfX2V4aXQtYnV0dG9uXCJcclxuICAgICk7XHJcbiAgICB0aGlzLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBjbG9zZU1vZGFsKCkge1xyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9fb3BlbmVkXCIpO1xyXG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJtb3VzZWRvd25cIixcclxuICAgICAgdGhpcy5fb3V0c2lkZUNsb3NlTW9kYWwuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLl9lc2NDbG9zZU1vZGFsLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5fZXhpdEJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjbGlja1wiLFxyXG4gICAgICB0aGlzLmNsb3NlTW9kYWwuYmluZCh0aGlzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwibW91c2Vkb3duXCIsXHJcbiAgICAgIHRoaXMuX291dHNpZGVDbG9zZU1vZGFsLmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5fZXNjQ2xvc2VNb2RhbC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuX2V4aXRCdXR0b25FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwiY2xpY2tcIixcclxuICAgICAgdGhpcy5jbG9zZU1vZGFsLmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBfZXNjQ2xvc2VNb2RhbChldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmtleSA9PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgIC8vY29uc3Qgb3BlbmVkTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19vcGVuZWRcIik7XHJcbiAgICAgIHRoaXMuY2xvc2VNb2RhbCh0aGlzLm9wZW5lZE1vZGFsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9vdXRzaWRlQ2xvc2VNb2RhbChldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbFwiKSkge1xyXG4gICAgICB0aGlzLmNsb3NlTW9kYWwoZXZlbnQudGFyZ2V0KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3RvciwgaGFuZGxlRm9ybVN1Ym1pdCkge1xyXG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XHJcbiAgICB0aGlzLl9tb2RhbEZvcm0gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcclxuICAgIHRoaXMuX21vZGFsRm9ybUlucHV0ID1cclxuICAgICAgdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW9kYWxfX2Zvcm0taW5wdXRcIik7XHJcbiAgICB0aGlzLl9tb2RhbEZvcm1CdXR0b24gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIubW9kYWxfX2Zvcm0tYnV0dG9uXCJcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fZXhpdEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19leGl0LWJ1dHRvblwiKTtcclxuICB9XHJcblxyXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcclxuICAgIGNvbnN0IGlucHV0VmFsdWVzID0ge307XHJcbiAgICB0aGlzLl9tb2RhbEZvcm1JbnB1dC5mb3JFYWNoKChpbnB1dCkgPT4gKGlucHV0VmFsdWVzW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWUpKTtcclxuICAgIHJldHVybiBpbnB1dFZhbHVlcztcclxuICB9XHJcblxyXG4gIF9oYW5kbGVTdWJtaXQgPSAoZXZ0KSA9PiB7XHJcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XHJcbiAgfTtcclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xyXG4gICAgdGhpcy5fbW9kYWxGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5faGFuZGxlU3VibWl0KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUV2ZW50c0xpc3RlbmVycygpIHtcclxuICAgIHN1cGVyLnJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB0aGlzLl9tb2RhbEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLl9oYW5kbGVTdWJtaXQpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2VNb2RhbCgpIHtcclxuICAgIHN1cGVyLmNsb3NlTW9kYWwoKTtcclxuICAgIHRoaXMuX21vZGFsRm9ybS5yZXNldCgpO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xyXG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5fY2FyZFByZXZpZXdJbWFnZSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5tb2RhbF9fcHJldmlldy1pbWFnZVwiXHJcbiAgICApO1xyXG4gICAgdGhpcy5fY2FyZFByZXZpZXdUaXRsZSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5tb2RhbF9fcHJldmlldy10aXRsZVwiXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2V4aXRCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmV2aWV3RXhpdEJ1dHRvblwiKTtcclxuICB9XHJcblxyXG4gIG9wZW5Nb2RhbCh7IGxpbmssIG5hbWUgfSkge1xyXG5cclxuXHJcbiAgICB0aGlzLl9jYXJkUHJldmlld0ltYWdlLnNyYyA9IGxpbms7XHJcbiAgICB0aGlzLl9jYXJkUHJldmlld0ltYWdlLmFsdCA9IG5hbWU7XHJcbiAgICB0aGlzLl9jYXJkUHJldmlld1RpdGxlLnRleHRDb250ZW50ID0gbmFtZTtcclxuXHJcbiAgICBzdXBlci5vcGVuTW9kYWwoKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcclxuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XHJcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XHJcbiAgfVxyXG5cclxuICByZW5kZXJJdGVtcygpIHtcclxuICAgIHRoaXMuX2l0ZW1zLmZvckVhY2godGhpcy5fcmVuZGVyZXIpO1xyXG4gIH1cclxuXHJcbiAgYWRkSXRlbXMoZWxlbWVudCkge1xyXG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcclxuICBjb25zdHJ1Y3Rvcihwcm9maWxlTmFtZVNlbGVjdG9yLCBwcm9maWxlRGVzY3JpcHRpb25TZWxlY3Rvcikge1xyXG5cclxuICAgIHRoaXMuX3Byb2ZpbGVUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fdGl0bGVcIik7XHJcbiAgICB0aGlzLl9wcm9maWxlRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2Rlc2NyaXB0aW9uXCIpO1xyXG5cclxuICAgIHRoaXMuX21vZGFsUHJvZmlsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXRQcm9maWxlRm9ybVwiKTtcclxuICAgIFxyXG4gICAgdGhpcy5fcHJvZmlsZU5hbWVFbGVtZW50ID0gdGhpcy5fbW9kYWxQcm9maWxlRm9ybS5xdWVyeVNlbGVjdG9yKHByb2ZpbGVOYW1lU2VsZWN0b3IpO1xyXG4gICAgdGhpcy5fcHJvZmlsZURlc2NyaXB0aW9uRWxlbWVudCA9IHRoaXMuX21vZGFsUHJvZmlsZUZvcm0ucXVlcnlTZWxlY3Rvcihwcm9maWxlRGVzY3JpcHRpb25TZWxlY3Rvcik7XHJcbiAgfVxyXG5cclxuICBzZXRQcm9maWxlSW5mbygpIHtcclxuICAgIHRoaXMuX3Byb2ZpbGVUaXRsZS50ZXh0Q29udGVudCA9IHRoaXMuX3Byb2ZpbGVOYW1lRWxlbWVudC52YWx1ZTtcclxuICAgIHRoaXMuX3Byb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRoaXMuX3Byb2ZpbGVEZXNjcmlwdGlvbkVsZW1lbnQudmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXRQcm9maWxlSW5mbygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IHRoaXMuX3Byb2ZpbGVOYW1lRWxlbWVudC50ZXh0Q29udGVudCxcclxuICAgICAgYWJvdXQ6IHRoaXMuX3Byb2ZpbGVEZXNjcmlwdGlvbkVsZW1lbnQudGV4dENvbnRlbnQsXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgaW5pdGlhbENhcmRzID0gW1xyXG4gIHtcclxuICAgIG5hbWU6IFwiWW9zZW1pdGUgVmFsbGV5XCIsXHJcbiAgICBsaW5rOiBcIi4vaW1hZ2VzL3lvc2VtaXRlLXZhbGxleS5qcGdcIixcclxuICB9LFxyXG5cclxuICB7XHJcbiAgICBuYW1lOiBcIkxha2UgTG91aXNlXCIsXHJcbiAgICBsaW5rOiBcIi4vaW1hZ2VzL2xha2UtbG91aXNlLmpwZ1wiLFxyXG4gIH0sXHJcblxyXG4gIHtcclxuICAgIG5hbWU6IFwiQmFsZCBNb3VudGFpbnNcIixcclxuICAgIGxpbms6IFwiLi9pbWFnZXMvYmFsZC1tb3VudGFpbnMuanBnXCIsXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYXRlbWFyXCIsXHJcbiAgICBsaW5rOiBcIi4vaW1hZ2VzL2xhdGVtYXIuanBnXCIsXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgbmFtZTogXCJWYW5vaXNlIE5hdGlvbmFsIFBhcmtcIixcclxuICAgIGxpbms6IFwiLi9pbWFnZXMvdmFub2lzZS1uYXRpb25hbC1wYXJrLmpwZ1wiLFxyXG4gIH0sXHJcblxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGFnbyBkaSBCcmFpZXNcIixcclxuICAgIGxpbms6IFwiLi9pbWFnZXMvbGFnby1kaS1icmFpZXMuanBnXCIsXHJcbiAgfSxcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcclxuICBmb3JtU2VsZWN0b3I6IFwiLm1vZGFsX19mb3JtXCIsXHJcbiAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2Zvcm0taW5wdXRcIixcclxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIubW9kYWxfX2Zvcm0tYnV0dG9uXCIsXHJcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fZm9ybS1idXR0b25fZGlzYWJsZWRcIixcclxuICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2Zvcm0taW5wdXRfdHlwZV9lcnJvclwiLFxyXG4gIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yX3Zpc2libGVcIixcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZWxlY3RvcnMgPSB7XHJcbiAgY2FyZFNlY3Rpb246IFwiLmNhcmRzX19saXN0XCIsXHJcbiAgY2FyZFRlbXBsYXRlOiBcIiNjYXJkLXRlbXBsYXRlXCIsXHJcbiAgcHJldmlld1BvcHVwOiBcIiNpbWFnZS1wcmV2aWV3XCIsXHJcbiAgcHJvZmlsZU1vZGFsOiBcIiNwcm9maWxlRWRpdFwiLFxyXG4gIGFkZENhcmRNb2RhbDogXCIjYWRkQ2FyZFwiLFxyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBpbml0aWFsQ2FyZHMsIHNlbGVjdG9ycywgc2V0dGluZ3MgfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzLmpzXCI7XHJcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmQuanNcIjtcclxuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qc1wiO1xyXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzXCI7XHJcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qc1wiO1xyXG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XHJcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mby5qc1wiO1xyXG5cclxuXHJcblxyXG5jb25zdCBjYXJkUHJldmlld1BvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKHNlbGVjdG9ycy5wcmV2aWV3UG9wdXApO1xyXG5cclxuY29uc3QgQ2FyZFNlY3Rpb24gPSBuZXcgU2VjdGlvbihcclxuICB7XHJcbiAgICBpdGVtczogaW5pdGlhbENhcmRzLFxyXG4gICAgcmVuZGVyZXI6IChkYXRhKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChcclxuICAgICAgICB7IGRhdGE6IGRhdGEsIGhhbmRsZUNhcmRDbGljazogY2FyZFByZXZpZXdQb3B1cCB9LFxyXG4gICAgICAgIHNlbGVjdG9ycy5jYXJkVGVtcGxhdGVcclxuICAgICAgKTtcclxuICAgICAgQ2FyZFNlY3Rpb24uYWRkSXRlbXMoY2FyZC5nZXRWaWV3KCkpO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIHNlbGVjdG9ycy5jYXJkU2VjdGlvblxyXG4pO1xyXG5cclxuQ2FyZFNlY3Rpb24ucmVuZGVySXRlbXMoKTtcclxuXHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Qcm9maWxlIGVsZW1lbnRzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuY29uc3QgcHJvZmlsZUVkaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2VkaXQtYnV0dG9uXCIpO1xyXG5jb25zdCBhZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2FkZC1idXR0b25cIik7XHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLU1vZGFsIFByb2ZpbGUgZWxlbWVudHMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmNvbnN0IG1vZGFsUHJvZmlsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXRQcm9maWxlRm9ybVwiKTtcclxuXHJcblxyXG5cclxuY29uc3QgcHJvZmlsZUZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgbW9kYWxQcm9maWxlRm9ybSk7XHJcbnByb2ZpbGVGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcclxuXHJcbmNvbnN0IGVkaXRQcm9maWxlTW9kYWwgPSBuZXcgUG9wdXBXaXRoRm9ybShzZWxlY3RvcnMucHJvZmlsZU1vZGFsLCBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgLy9ldnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgY29uc3QgdXNlckluZm8gPSBuZXcgVXNlckluZm8oXCIjcHJvZmlsZU5hbWVcIiwgXCIjcHJvZmlsZURlc2NyaXB0aW9uXCIpO1xyXG4gIHVzZXJJbmZvLnNldFByb2ZpbGVJbmZvKCk7XHJcblxyXG4gIGVkaXRQcm9maWxlTW9kYWwuY2xvc2VNb2RhbCgpO1xyXG4gIFxyXG59KTtcclxuXHJcbnByb2ZpbGVFZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgZWRpdFByb2ZpbGVNb2RhbC5vcGVuTW9kYWwoKTtcclxuICBwcm9maWxlRm9ybVZhbGlkYXRvci50b2dnbGVCdXR0b25TdGF0ZSgpO1xyXG59KTtcclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tTW9kYWwgYWRkQ2FyZCBlbGVtZW50cy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblxyXG5jb25zdCBtb2RhbEFkZEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZENhcmRGb3JtXCIpO1xyXG5jb25zdCBtb2RhbEFkZFRpdGxlSW5wdXQgPSBtb2RhbEFkZEZvcm0ucXVlcnlTZWxlY3RvcihcIiNhZGRUaXRsZVwiKTtcclxuY29uc3QgbW9kYWxBZGRMaW5rSW5wdXQgPSBtb2RhbEFkZEZvcm0ucXVlcnlTZWxlY3RvcihcIiNhZGRMaW5rXCIpO1xyXG5cclxuXHJcbmNvbnN0IGFkZENhcmRGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3Ioc2V0dGluZ3MsIG1vZGFsQWRkRm9ybSk7XHJcbmFkZENhcmRGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcclxuXHJcbmNvbnN0IGFkZENhcmRNb2RhbCA9IG5ldyBQb3B1cFdpdGhGb3JtKHNlbGVjdG9ycy5hZGRDYXJkTW9kYWwsIGZ1bmN0aW9uIChldnQpIHtcclxuICBjb25zdCBjYXJkRGF0YSA9IHtcclxuICAgIG5hbWU6IG1vZGFsQWRkVGl0bGVJbnB1dC52YWx1ZSxcclxuICAgIGxpbms6IG1vZGFsQWRkTGlua0lucHV0LnZhbHVlLFxyXG4gIH07XHJcbiAgY29uc3QgbmV3Q2FyZCA9IG5ldyBDYXJkKFxyXG4gICAge1xyXG4gICAgICBkYXRhOiBjYXJkRGF0YSxcclxuICAgICAgaGFuZGxlQ2FyZENsaWNrOiBjYXJkUHJldmlld1BvcHVwLCBcclxuICAgIH0sXHJcbiAgICBzZWxlY3RvcnMuY2FyZFRlbXBsYXRlXHJcbiAgKTtcclxuXHJcbiAgQ2FyZFNlY3Rpb24uYWRkSXRlbXMobmV3Q2FyZC5nZXRWaWV3KCkpO1xyXG5cclxuICBhZGRDYXJkTW9kYWwuY2xvc2VNb2RhbCgpO1xyXG59KTtcclxuXHJcbmFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGFkZENhcmRNb2RhbC5vcGVuTW9kYWwoKTtcclxuICBhZGRDYXJkRm9ybVZhbGlkYXRvci50b2dnbGVCdXR0b25TdGF0ZSgpO1xyXG59KTtcclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbIkNhcmQiLCJjb25zdHJ1Y3RvciIsImRhdGEiLCJoYW5kbGVDYXJkQ2xpY2siLCJjYXJkU2VsZWN0b3IiLCJfbmFtZSIsIm5hbWUiLCJfbGluayIsImxpbmsiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUNhcmRDbGljayIsIl9jYXJkVGVtcGxhdGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZW50IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJfZXhpdEJ1dHRvbkVsZW1lbnQiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJfY2FyZEhlYXJ0QnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9oYW5kbGVIZWFydEljb24iLCJfY2FyZERlbGV0ZUJ1dHRvbiIsIl9oYW5kbGVEZWxldGVDYXJkIiwiX2NhcmRJbWFnZSIsIl9oYW5kbGVQcmV2aWV3UGljdHVyZSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIl9jYXJkRWxlbWVudCIsInJlbW92ZSIsIm9wZW5Nb2RhbCIsImdldFZpZXciLCJjbG9uZU5vZGUiLCJfY2FyZFRpdGxlIiwic3JjIiwiYWx0IiwidGV4dENvbnRlbnQiLCJGb3JtVmFsaWRhdG9yIiwic2V0dGluZ3MiLCJmb3JtRWxlbWVudCIsIl9mb3JtIiwiX2lucHV0U2VsZWN0b3IiLCJpbnB1dFNlbGVjdG9yIiwiX3N1Ym1pdEJ1dHRvblNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJfaW5hY3RpdmVCdXR0b25DbGFzcyIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJfaW5wdXRFcnJvckNsYXNzIiwiaW5wdXRFcnJvckNsYXNzIiwiX2Vycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiX2lucHV0RWxzIiwicXVlcnlTZWxlY3RvckFsbCIsIl9zdWJtaXRCdXR0b24iLCJfc2hvd0lucHV0RXJyb3IiLCJpbnB1dEVsZW1lbnQiLCJlcnJvck1lc3NhZ2VFbCIsImlkIiwiYWRkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGlkZUlucHV0RXJyb3IiLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9oYXNJbnZhbGlkSW5wdXQiLCJldmVyeSIsInRvZ2dsZUJ1dHRvblN0YXRlIiwiZGlzYWJsZWQiLCJmb3JFYWNoIiwiZSIsImVuYWJsZVZhbGlkYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cEVsZW1lbnQiLCJvcGVuZWRNb2RhbCIsInNldEV2ZW50TGlzdGVuZXJzIiwiY2xvc2VNb2RhbCIsInJlbW92ZUV2ZW50TGlzdGVuZXJzIiwiX291dHNpZGVDbG9zZU1vZGFsIiwiYmluZCIsIl9lc2NDbG9zZU1vZGFsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwia2V5IiwidGFyZ2V0IiwiY29udGFpbnMiLCJQb3B1cFdpdGhGb3JtIiwiaGFuZGxlRm9ybVN1Ym1pdCIsIl9oYW5kbGVGb3JtU3VibWl0IiwiX21vZGFsRm9ybSIsIl9tb2RhbEZvcm1JbnB1dCIsIl9tb2RhbEZvcm1CdXR0b24iLCJfZ2V0SW5wdXRWYWx1ZXMiLCJpbnB1dFZhbHVlcyIsImlucHV0IiwidmFsdWUiLCJfaGFuZGxlU3VibWl0IiwiZXZ0IiwicmVtb3ZlRXZlbnRzTGlzdGVuZXJzIiwicmVzZXQiLCJQb3B1cFdpdGhJbWFnZSIsIl9jYXJkUHJldmlld0ltYWdlIiwiX2NhcmRQcmV2aWV3VGl0bGUiLCJTZWN0aW9uIiwiaXRlbXMiLCJyZW5kZXJlciIsImNvbnRhaW5lclNlbGVjdG9yIiwiX2l0ZW1zIiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsInJlbmRlckl0ZW1zIiwiYWRkSXRlbXMiLCJlbGVtZW50IiwicHJlcGVuZCIsIlVzZXJJbmZvIiwicHJvZmlsZU5hbWVTZWxlY3RvciIsInByb2ZpbGVEZXNjcmlwdGlvblNlbGVjdG9yIiwiX3Byb2ZpbGVUaXRsZSIsIl9wcm9maWxlRGVzY3JpcHRpb24iLCJfbW9kYWxQcm9maWxlRm9ybSIsIl9wcm9maWxlTmFtZUVsZW1lbnQiLCJfcHJvZmlsZURlc2NyaXB0aW9uRWxlbWVudCIsInNldFByb2ZpbGVJbmZvIiwiZ2V0UHJvZmlsZUluZm8iLCJhYm91dCIsImluaXRpYWxDYXJkcyIsImZvcm1TZWxlY3RvciIsInNlbGVjdG9ycyIsImNhcmRTZWN0aW9uIiwiY2FyZFRlbXBsYXRlIiwicHJldmlld1BvcHVwIiwicHJvZmlsZU1vZGFsIiwiYWRkQ2FyZE1vZGFsIiwiY2FyZFByZXZpZXdQb3B1cCIsIkNhcmRTZWN0aW9uIiwiY2FyZCIsInByb2ZpbGVFZGl0QnV0dG9uIiwiYWRkQnV0dG9uIiwibW9kYWxQcm9maWxlRm9ybSIsInByb2ZpbGVGb3JtVmFsaWRhdG9yIiwiZWRpdFByb2ZpbGVNb2RhbCIsInVzZXJJbmZvIiwibW9kYWxBZGRGb3JtIiwibW9kYWxBZGRUaXRsZUlucHV0IiwibW9kYWxBZGRMaW5rSW5wdXQiLCJhZGRDYXJkRm9ybVZhbGlkYXRvciIsImNhcmREYXRhIiwibmV3Q2FyZCJdLCJzb3VyY2VSb290IjoiIn0=