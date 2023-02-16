import { displayLibrary, swtichLibrary } from './js/header';
import { closeModalWithEscapeKey } from './js/modal';
import {
  nextPageDisplay,
  prevPageDisplay,
  selectPage,
  pagination,
} from './js/main';


const libraryBtn = document.querySelector('[data-library]');
const queueBtn = document.querySelector('[data-queue]');
const nextPage = document.querySelector('.next-button');
const prevPage = document.querySelector('.prev-button');
const pageNumbers = document.querySelector('.page-numbers');

libraryBtn.addEventListener('click', displayLibrary);
queueBtn.addEventListener('click', swtichLibrary);
document.addEventListener('keydown', closeModalWithEscapeKey);
nextPage.addEventListener('click', nextPageDisplay);
prevPage.addEventListener('click', prevPageDisplay);
pageNumbers.addEventListener('click', selectPage);
pagination();
