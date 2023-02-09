const homeBtn = document.querySelector('[data-homepage]');
const libraryBtn = document.querySelector('[data-library]');
const header = document.querySelector('header');
const libraryDiv = document.querySelector('.header__library-container');
const headerSearchDiv = document.querySelector('.header__homepage-container');
const watchedBtn = document.querySelector('[data-watched]');
const queueBtn = document.querySelector('[data-queue]');
const libraryBtns = document.querySelectorAll('.library-container__btn');

export const mainHeaderDisplay = e => {
  e.currentTarget.removeEventListener('click', mainHeaderDisplay);
  libraryDiv.style.display = 'none';
  headerSearchDiv.style.display = 'block';
  header.classList.remove('library');
  e.currentTarget.classList.add('nav__btn--active');
  libraryBtn.classList.remove('nav__btn--active');
  libraryBtn.addEventListener('click', libraryHeaderDisplay);
};

export const libraryHeaderDisplay = e => {
  e.currentTarget.removeEventListener('click', libraryHeaderDisplay);
  header.classList.add('library');
  headerSearchDiv.style.display = 'none';
  libraryDiv.style.display = 'flex';
  e.currentTarget.classList.add('nav__btn--active');
  homeBtn.classList.remove('nav__btn--active');
  homeBtn.addEventListener('click', mainHeaderDisplay);
  if (queueBtn.classList.contains('library-container__btn--active')) {
    queueBtn.classList.remove('library-container__btn--active');
    watchedBtn.classList.add('library-container__btn--active');
  }
};

export const activateLibraryBtn = e => {
  e.currentTarget.removeEventListener('click', activateLibraryBtn);
  if (e.currentTarget.classList.contains('library-container__btn--active')) {
    return;
  }
  if (e.currentTarget === libraryBtns[0]) {
    libraryBtns[0].classList.add('library-container__btn--active');
    libraryBtns[1].classList.remove('library-container__btn--active');
    libraryBtns[1].addEventListener('click', activateLibraryBtn);
  } else {
    libraryBtns[1].classList.add('library-container__btn--active');
    libraryBtns[0].classList.remove('library-container__btn--active');
    libraryBtns[0].addEventListener('click', activateLibraryBtn);
  }
};
