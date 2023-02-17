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
  paginationLibrary();
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

const localStorageWatched = localStorage.getItem('watchedList');

const localStorageWatchedParsed = JSON.parse(localStorageWatched);

export function paginationLibrary() {
  if (localStorageWatchedParsed != null) {
    localStorageWatchedParsed.forEach(id => {
      fetchMovieById(id)
        .then(([movie, configuration]) => {
          showWatchedList(movie, configuration);
          displayPaginationLibrary(currentPageNumber);
        })
        .catch(error => {
          console.error(
            'movies or categories request failed. Error: ' + error.message
          );
        });
    });
  } else return;
}
function showWatchedList(movie, configuration) {
  nothingWatched.style.display = 'none';
  let title = movie.title;
  let category = [];
  movie.genres.forEach(genre => category.push(genre.name));

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

const currentPageNumber = 1;
const pageNumberLibrary = document.querySelector('.page-numbers-library');
function displayPaginationLibrary(currentPageNumber) {
  const totalCalc = watchedMoviesContainer.childElementCount - 1;
  let total = Math.round(totalCalc / 20);
  if (total < 1) {
    total = 1;
  }
  const pageNumbersArr = [];

  for (let i = 1; i <= total; i++) {
    const pageNumber = `<p id="${i}" class="page-number ${
      i === currentPageNumber ? 'active' : ''
    }">${i}</p>`;
    if (
      i === 1 ||
      i === total ||
      (i >= currentPageNumber - 2 && i <= currentPageNumber + 2)
    ) {
      pageNumbersArr.push(pageNumber);
    } else if (i === currentPageNumber - 3 || i === currentPageNumber + 3) {
      pageNumbersArr.push('<span>...</span>');
    }
  }

  pageNumberLibrary.innerHTML = pageNumbersArr.join('');
}

export function selectPageLibrary(e) {
  if (e.target.nodeName !== 'P') {
    return;
  }
  watchedMoviesContainer.innerHTML = '';
  currentPageNumber = parseInt(e.target.id);
  paginationLibrary(currentPageNumber);
}
export function nextPageDisplayLibrary(e) {
  e.preventDefault();
  watchedMoviesContainer.innerHTML = '';
  currentPageNumber++;
  paginationLibrary(currentPageNumber);
}
export function prevPageDisplayLibrary(e) {
  e.preventDefault();
  if (currentPageNumber > 1) {
    watchedMoviesContainer.innerHTML = '';
    currentPageNumber--;
    paginationLibrary(currentPageNumber);
  }
}
