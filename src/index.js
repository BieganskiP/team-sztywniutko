// https://api.themoviedb.org/3/movie/550?api_key=bfe21f4061b2869ccff2b4c323a3a257

// bfe21f4061b2869ccff2b4c323a3a257
import { displayHomePage } from './js/header';
import { displayLibrary } from './js/header';
import { swtichLibrary } from './js/header';

import { openModal } from './js/modal';
import { closeModal } from './js/modal';
import { closeModalWithEscapeKey } from './js/modal';

const homeBtn = document.querySelector('[data-homepage]');
const libraryBtn = document.querySelector('[data-library]');
const header = document.querySelector('header');
const libraryDiv = document.querySelector('.header__library-container');
const headerSearchDiv = document.querySelector('.header__homepage-container');
const watchedBtn = document.querySelector('[data-watched]');
const queueBtn = document.querySelector('[data-queue]');
const libraryBtns = document.querySelectorAll('.library-container__btn');
const watchedMoviesContainer = document.querySelector('.watched');
const queuedMoviesContainer = document.querySelector('.queued');
const libraryContainer = document.querySelector('.library-container');

libraryBtn.addEventListener('click', displayLibrary);
queueBtn.addEventListener('click', swtichLibrary);
const libraryItem = document.querySelector('.modal-open');
const closeModalButton = document.querySelector('.modal-close');

document.addEventListener('keydown', closeModalWithEscapeKey);

import {
  nextPageDisplay,
  prevPageDisplay,
  selectPage,
  pagination,
} from './js/main';

const nextPage = document.querySelector('.next-button');
const prevPage = document.querySelector('.prev-button');
const pageNumbers = document.querySelector('.page-numbers');

nextPage.addEventListener('click', nextPageDisplay);
prevPage.addEventListener('click', prevPageDisplay);
pageNumbers.addEventListener('click', selectPage);
pagination();
