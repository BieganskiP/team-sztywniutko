import axios from 'axios';
import Notify from 'notiflix';

import { displayHomePage } from './js/header';
import { displayLibrary } from './js/header';
import { swtichLibrary } from './js/header';

import { openModal } from './js/modal';
import { closeModal } from './js/modal';
import { closeModalWithEscapeKey } from './js/modal';

import { getMovie, getPopular } from './js/api-data';

const homeBtn = document.querySelector('[data-homepage]');
const libraryBtn = document.querySelector('[data-library]');
const header = document.querySelector('header');
const libraryDiv = document.querySelector('.header__library-container');
const headerSearchDiv = document.querySelector('.header__homepage-container');
const watchedBtn = document.querySelector('[data-watched]');
const queueBtn = document.querySelector('[data-queue]');
const libraryBtns = document.querySelectorAll('.library-container__btn');
const homepageMoviesContainer = document.querySelector('.movie-container');
const watchedMoviesContainer = document.querySelector('.watched');
const queuedMoviesContainer = document.querySelector('.queued');
const libraryContainer = document.querySelector('.library-container');

libraryBtn.addEventListener('click', displayLibrary);
queueBtn.addEventListener('click', swtichLibrary);
const libraryItem = document.querySelector('.modal-open');
const closeModalButton = document.querySelector('.modal-close');

// libraryItem.addEventListener('click', openModal);
// closeModalButton.addEventListener('click', closeModal);
// document.addEventListener('keydown', closeModalWithEscapeKey);

const input = document.querySelector('.search-form__input');
const searchButton = document.querySelector('.search-form');

getPopular(1);
searchButton.addEventListener('submit', event => {
  console.log(input.value);
  input.innerHTML = '';
  event.preventDefault();
  if (input.value == '') {
    return;
  } else {
    getMovie(input.value);
  }
});
