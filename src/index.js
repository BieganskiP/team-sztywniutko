console.log('test');

// https://api.themoviedb.org/3/movie/550?api_key=bfe21f4061b2869ccff2b4c323a3a257

// bfe21f4061b2869ccff2b4c323a3a257
import { displayHomePage } from './js/header';
import { displayLibrary } from './js/header';
import { swtichLibrary } from './js/header';

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
