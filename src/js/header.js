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
const nothingWatched = document.querySelector('.library__starter');

export const displayHomePage = e => {
  e.currentTarget.removeEventListener('click', displayHomePage);
  //header-style chcange: homepage version
  libraryDiv.style.display = 'none';
  headerSearchDiv.style.display = 'block';
  header.classList.remove('library');
  e.currentTarget.classList.add('nav__btn--active');
  libraryBtn.classList.remove('nav__btn--active');
  libraryBtn.addEventListener('click', displayLibrary);
  //home page display
  homepageMoviesContainer.style.display = 'flex';
  libraryContainer.style.display = 'none';
};

export const displayLibrary = e => {
  e.currentTarget.removeEventListener('click', displayHomePage);
  //header style change: my library version
  header.classList.add('library');
  headerSearchDiv.style.display = 'none';
  libraryDiv.style.display = 'flex';
  e.currentTarget.classList.add('nav__btn--active');
  homeBtn.classList.remove('nav__btn--active');
  homeBtn.addEventListener('click', displayHomePage);
  if (queueBtn.classList.contains('library-container__btn--active')) {
    queueBtn.classList.remove('library-container__btn--active');
    libraryBtns[1].addEventListener('click', swtichLibrary);
    watchedBtn.classList.add('library-container__btn--active');
  }
  //display library watched section
  homepageMoviesContainer.style.display = 'none';
  libraryContainer.style.display = 'block';
  watchedMoviesContainer.style.display = 'flex';
  queuedMoviesContainer.style.display = 'none';
};

export const swtichLibrary = e => {
  e.currentTarget.removeEventListener('click', swtichLibrary);
  if (e.currentTarget.classList.contains('library-container__btn--active')) {
    return;
  }
  //display watched movies
  if (e.currentTarget === libraryBtns[0]) {
    libraryBtns[0].classList.add('library-container__btn--active');
    libraryBtns[1].classList.remove('library-container__btn--active');
    libraryBtns[1].addEventListener('click', swtichLibrary);
    watchedMoviesContainer.style.display = 'flex';
    queuedMoviesContainer.style.display = 'none';
    //display queued movies
  } else {
    libraryBtns[1].classList.add('library-container__btn--active');
    libraryBtns[0].classList.remove('library-container__btn--active');
    libraryBtns[0].addEventListener('click', swtichLibrary);
    watchedMoviesContainer.style.display = 'none';
    queuedMoviesContainer.style.display = 'flex';
  }
};

import { fetchMovieById } from './modal.js';
import { mapGenreIdsToName } from './modal.js';

const localStorageWatched = localStorage.getItem('watchedList');

const localStorageWatchedParsed = JSON.parse(localStorageWatched);

localStorageWatchedParsed.forEach(id => {
  console.log(id);
  fetchMovieById(id).then(([movie, configuration]) => {
    console.log(movie);
    showWatchedList(movie, configuration);
  });
});

function showWatchedList(movie, configuration) {
  nothingWatched.style.display = 'none';
  let title = movie.title;
  let category = [];
  movie.genres.forEach(genre => category.push(genre.name));
  console.log(category);
  let year = movie.release_date.slice(0, 4);
  let poster = configuration.images.base_url + 'w500' + movie.poster_path;
  watchedMoviesContainer.insertAdjacentHTML(
    'beforeend',
    `
  <li class="movie-card" data-movie-id="${movie.id}" modal-open>
    <img class="movie-card__img" src="${poster}" alt"${title}"/>
    <div class="movie-card__description">
      <h2 class="movie-card__description--title">${title}</h2>
      <p class="movie-card__description--category">${category} | ${year}</p>
    </div>
  </li>`
  );
}
