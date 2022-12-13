
/*-------------------------Open/Close Modal------------------------------*/

export function openModal(popup) {
  popup.classList.add("modal__opened");

  popup.addEventListener("mousedown", outsideCloseModal);
  document.addEventListener("keyup", escCloseModal);
}

export function closeModal(popup) {
  popup.classList.remove("modal__opened");

  popup.removeEventListener("mousedown", outsideCloseModal);
  document.removeEventListener("keyup", escCloseModal);
}

 function escCloseModal(event) {
  if (event.key == "Escape") {
    const openedModal = document.querySelector(".modal__opened");
    closeModal(openedModal);
  }
}

function outsideCloseModal(event) {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
}

