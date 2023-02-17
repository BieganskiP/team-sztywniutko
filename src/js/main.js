let apiKey = 'bfe21f4061b2869ccff2b4c323a3a257';
let base_url = 'https://api.themoviedb.org/3';
let _ = require('lodash');

const DEBOUNCE_DELAY = 300;
const movieLibraryContainer = document.querySelector('.movie-set');
const pageNumbers = document.querySelector('.page-numbers');
const loader = document.querySelector('.loader');
const searchInput = document.querySelector('.search-form__input');
let currentPageNumber = 1;
import { attachModal } from './modal.js';

async function fetchMoviesByKeyword(keyword) {
  const [moviesResponse, confResponse, genresResponse] = await Promise.all([
    fetch(`${base_url}/search/movie?api_key=${apiKey}&query=${keyword}`),
    fetch(`${base_url}/configuration?api_key=${apiKey}`),
    fetch(`${base_url}/genre/movie/list?api_key=${apiKey}`),
  ]);

  if (!moviesResponse.ok) {
    const message = `An error has occured: ${moviesResponse.status}`;
    throw new Error(message);
  }
  if (!confResponse.ok) {
    const message = `An error has occured: ${confResponse.status}`;
    throw new Error(message);
  }
  if (!genresResponse.ok) {
    const message = `An error has occured: ${genresResponse.status}`;
    throw new Error(message);
  }
  loader.style.display = 'none';
  const movies = await moviesResponse.json();

  const configuration = await confResponse.json();
  const genres = await genresResponse.json();
  return [movies, configuration.images, genres.genres];
}
searchInput.addEventListener(
  'input',
  _.debounce(e => {
    e.preventDefault;
    if (searchInput.value == '') {
      pagination(currentPageNumber);
      return;
    } else {
      fetchMoviesByKeyword(searchInput.value)
        .then(([movies, configuration, genres]) => {
          showMovieList(movies, configuration, genres);
          pageNumbers.innerHTML = '';
        })
        .catch(error => {
          console.error(
            'movies or categories request failed. Error: ' + error.message
          );
        });
    }
  }, DEBOUNCE_DELAY)
);
function mapGenreIdsToName(ids, map) {
  let result = [];
  ids.forEach(id => {
    let genre = map.find(x => x.id === id).name;
    if (genre !== undefined) {
      result.push(genre);
    }
  });
  return result.join(', ');
}
async function fetchMoviesAndCategories(page) {
  loader.style.display = 'flex';
  const [moviesResponse, confResponse, genresResponse] = await Promise.all([
    fetch(
      `${base_url}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
    ),
    fetch(`${base_url}/configuration?api_key=${apiKey}`),
    fetch(`${base_url}/genre/movie/list?api_key=${apiKey}`),
  ]);

  if (!moviesResponse.ok) {
    const message = `An error has occured: ${moviesResponse.status}`;
    throw new Error(message);
  }
  if (!confResponse.ok) {
    const message = `An error has occured: ${confResponse.status}`;
    throw new Error(message);
  }
  if (!genresResponse.ok) {
    const message = `An error has occured: ${genresResponse.status}`;
    throw new Error(message);
  }
  loader.style.display = 'none';
  const movies = await moviesResponse.json();

  const configuration = await confResponse.json();
  const genres = await genresResponse.json();
  return [movies, configuration.images, genres.genres];
}

export function pagination(page) {
  fetchMoviesAndCategories(page)
    .then(([movies, configuration, genres]) => {
      showMovieList(movies, configuration, genres);
      displayPagination(currentPageNumber);
    })
    .catch(error => {
      console.error(
        'movies or categories request failed. Error: ' + error.message
      );
    });
}
function showMovieList(movies, configuration, genres) {
  movieLibraryContainer.innerHTML = '';
  movies.results.forEach(movie => {
    let title = movie.title;
    let category = mapGenreIdsToName(movie.genre_ids, genres);
    let year = movie.release_date.slice(0, 4);
    let poster = configuration.base_url + 'w500' + movie.poster_path;
    movieLibraryContainer.insertAdjacentHTML(
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
    attachModal();
  });
}

// function displayPagination(currentPageNumber) {
//   pageNumbers.innerHTML = '';
//   let pageID = currentPageNumber;
//   let total = 20;

//   if (currentPageNumber == 1) {
//     pageNumbers.insertAdjacentHTML(
//       'beforeend',
//       `<p id=${pageID} class="page-number active">${currentPageNumber}</p>
//       <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
//       <p id=${pageID + 2} class="page-number">${currentPageNumber + 2}</p>
//       <p id=${pageID + 3} class="page-number">${currentPageNumber + 3}</p>
//       <p id=${pageID + 4} class="page-number">${currentPageNumber + 4}</p>
//       <span>...</span>
//       <p id=${total} class="page-number">${total}</p>
//     `
//     );
//   } else if (currentPageNumber == 2) {
//     pageNumbers.insertAdjacentHTML(
//       'beforeend',
//       `<p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
//       <p id=${pageID} class="page-number active">${currentPageNumber}</p>
//       <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
//       <p id=${pageID + 2} class="page-number">${currentPageNumber + 2}</p>
//       <p id=${pageID + 3} class="page-number">${currentPageNumber + 3}</p>
//       <span>...</span>
//       <p id=${total} class="page-number">${total}</p>
//       `
//     );
//   } else if (currentPageNumber == 3) {
//     pageNumbers.insertAdjacentHTML(
//       'beforeend',
//       `<p id=${pageID - 2} class="page-number">${currentPageNumber - 2}</p>
//       <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
//       <p id=${pageID} class="page-number active">${currentPageNumber}</p>
//       <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
//       <p id=${pageID + 2} class="page-number">${currentPageNumber + 2}</p>
//       <span>...</span>
//       <p id=${total} class="page-number">${total}</p>
//       `
//     );
//   } else if (currentPageNumber == 4) {
//     pageNumbers.insertAdjacentHTML(
//       'beforeend',
//       `<p id=${pageID - 3} class="page-number">${currentPageNumber - 3}</p>
//       <p id=${pageID - 2} class="page-number">${currentPageNumber - 2}</p>
//       <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
//       <p id=${pageID} class="page-number active">${currentPageNumber}</p>
//       <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
//       <span>...</span>
//       <p id=${total} class="page-number">${total}</p>
//       `
//     );
//   } else if (currentPageNumber == 5) {
//     pageNumbers.insertAdjacentHTML(
//       'beforeend',
//       `<p id=${pageID - 3} class="page-number">${currentPageNumber - 3}</p>
//       <p id=${pageID - 2} class="page-number">${currentPageNumber - 2}</p>
//       <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
//       <p id=${pageID} class="page-number active">${currentPageNumber}</p>
//       <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
//       <span>...</span>
//       <p id=${total} class="page-number">${total}</p>
//       `
//     );
//   } else if (currentPageNumber == total - 3 && currentPageNumber > 7) {
//     pageNumbers.insertAdjacentHTML(
//       'beforeend',
//       `<p id=${1} class="page-number">${1}</p>
//       <span>...</span>
//       <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
//       <p id=${pageID} class="page-number active">${currentPageNumber}</p>
//       <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
//       <p id=${pageID + 2} class="page-number">${currentPageNumber + 2}</p>
//       <p id=${total} class="page-number">${total}</p>
//       `
//     );
//   } else if (currentPageNumber == total - 2 && currentPageNumber > 8) {
//     pageNumbers.insertAdjacentHTML(
//       'beforeend',
//       `<p id=${1} class="page-number">${1}</p>
//       <span>...</span>
//       <p id=${pageID - 2} class="page-number">${currentPageNumber - 2}</p>
//       <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
//       <p id=${pageID} class="page-number active">${currentPageNumber}</p>
//       <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
//       <p id=${total} class="page-number">${total}</p>
//       `
//     );
//   } else if (currentPageNumber == total - 1 && currentPageNumber > 9) {
//     pageNumbers.insertAdjacentHTML(
//       'beforeend',
//       `<p id=${1} class="page-number">${1}</p>
//       <span>...</span>
//       <p id=${pageID - 3} class="page-number">${currentPageNumber - 3}</p>
//       <p id=${pageID - 2} class="page-number">${currentPageNumber - 2}</p>
//       <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
//       <p id=${pageID} class="page-number active">${currentPageNumber}</p>
//       <p id=${total} class="page-number">${total}</p>
//       `
//     );
//   } else if (currentPageNumber == total && currentPageNumber > 10) {
//     pageNumbers.insertAdjacentHTML(
//       'beforeend',
//       `<p id=${1} class="page-number">${1}</p>
//       <span>...</span>
//       <p id=${pageID - 4} class="page-number">${currentPageNumber - 4}</p>
//       <p id=${pageID - 3} class="page-number">${currentPageNumber - 3}</p>
//       <p id=${pageID - 2} class="page-number">${currentPageNumber - 2}</p>
//       <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
//       <p id=${total} class="page-number active">${total}</p>
//       `
//     );
//   } else {
//     pageNumbers.insertAdjacentHTML(
//       'beforeend',
//       `<p id=${1} class="page-number">${1}</p>
//       <span>...</span>
//       <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
//       <p id=${pageID} class="page-number active">${currentPageNumber}</p>
//       <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
//       <span>...</span>
//       <p id=${total} class="page-number">${total}</p>
//       `
//     );
//   }
// }
function displayPagination(currentPageNumber) {
  const total = 20;
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

  pageNumbers.innerHTML = pageNumbersArr.join('');
}
export function selectPage(e) {
  if (e.target.nodeName !== 'P') {
    return;
  }
  movieLibraryContainer.innerHTML = '';
  currentPageNumber = parseInt(e.target.id);
  pagination(currentPageNumber);
}
export function nextPageDisplay(e) {
  e.preventDefault();
  movieLibraryContainer.innerHTML = '';
  currentPageNumber++;
  pagination(currentPageNumber);
}
export function prevPageDisplay(e) {
  e.preventDefault();
  if (currentPageNumber > 1) {
    movieLibraryContainer.innerHTML = '';
    currentPageNumber--;
    pagination(currentPageNumber);
  }
}
