const closeModalButton = document.querySelector('.modal-close');
const modal = document.querySelector('.backdrop');

export const openModal = () => {
  modal.classList.remove('is-hidden');
};

export const closeModal = () => {
  modal.classList.add('is-hidden');
};

export const closeModalWithEscapeKey = event => {
  if (event.key === 'Escape') {
    closeModal();
    document.removeEventListener('keydown', event);
  }
};
