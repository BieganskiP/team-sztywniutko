export function attachModal() {
  document.querySelector('.movie-set').addEventListener('click', openModal);
}

const modal = document.querySelector('.backdrop');

function openModal(event) {
  let movie = event.target.parentNode;
  if (movie.nodeName == 'DIV') {
    movie = movie.parentNode;
  }
  console.log(movie.dataset.movieId);
  modal.classList.remove('is-hidden');
  document
    .querySelector('.movie-modal__button--close')
    .addEventListener('click', closeModal);
}

function closeModal() {
  modal.classList.add('is-hidden');
  document
    .querySelector('.movie-modal__button--close')
    .removeEventListener('click', closeModal);
}

function closeModalWithEscapeKey(event) {
  if (event.key === 'Escape') {
    closeModal();
    document.removeEventListener('keydown', event);
  }
}
