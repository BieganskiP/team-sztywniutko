let apiKey = 'bfe21f4061b2869ccff2b4c323a3a257';

const movieLibraryContainer = document.querySelector('.movie-set');
const pageNumbers = document.querySelector('.page-numbers');

let currentPageNumber = 1;

import { attachModal } from './modal.js';

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
  const [moviesResponse, confResponse, genresResponse] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
    ),
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`),
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`),
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

function displayPagination(currentPageNumber) {
  pageNumbers.innerHTML = '';
  let pageID = currentPageNumber;
  let total = 20;

  if (currentPageNumber == 1) {
    pageNumbers.insertAdjacentHTML(
      'beforeend',
      `<p id=${pageID} class="page-number active">${currentPageNumber}</p>
      <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
      <p id=${pageID + 2} class="page-number">${currentPageNumber + 2}</p>
      <p id=${pageID + 3} class="page-number">${currentPageNumber + 3}</p>
      <p id=${pageID + 4} class="page-number">${currentPageNumber + 4}</p>
      <span>...</span>
      <p id=${total} class="page-number">${total}</p>
    `
    );
  } else if (currentPageNumber == 2) {
    pageNumbers.insertAdjacentHTML(
      'beforeend',
      `<p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
      <p id=${pageID} class="page-number active">${currentPageNumber}</p>
      <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
      <p id=${pageID + 2} class="page-number">${currentPageNumber + 2}</p>
      <p id=${pageID + 3} class="page-number">${currentPageNumber + 3}</p>
      <span>...</span>
      <p id=${total} class="page-number">${total}</p>
      `
    );
  } else if (currentPageNumber == 3) {
    pageNumbers.insertAdjacentHTML(
      'beforeend',
      `<p id=${pageID - 2} class="page-number">${currentPageNumber - 2}</p>
      <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
      <p id=${pageID} class="page-number active">${currentPageNumber}</p>
      <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
      <p id=${pageID + 2} class="page-number">${currentPageNumber + 2}</p>
      <span>...</span>
      <p id=${total} class="page-number">${total}</p>
      `
    );
  } else if (currentPageNumber == 4) {
    pageNumbers.insertAdjacentHTML(
      'beforeend',
      `<p id=${pageID - 3} class="page-number">${currentPageNumber - 3}</p>
      <p id=${pageID - 2} class="page-number">${currentPageNumber - 2}</p>
      <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
      <p id=${pageID} class="page-number active">${currentPageNumber}</p>
      <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
      <span>...</span>
      <p id=${total} class="page-number">${total}</p>
      `
    );
  } else if (currentPageNumber == 5) {
    pageNumbers.insertAdjacentHTML(
      'beforeend',
      `<p id=${pageID - 3} class="page-number">${currentPageNumber - 3}</p>
      <p id=${pageID - 2} class="page-number">${currentPageNumber - 2}</p>
      <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
      <p id=${pageID} class="page-number active">${currentPageNumber}</p>
      <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
      <span>...</span>
      <p id=${total} class="page-number">${total}</p>
      `
    );
  } else if (currentPageNumber == total - 3) {
    pageNumbers.insertAdjacentHTML(
      'beforeend',
      `<p id=${1} class="page-number">${1}</p>
      <span>...</span>
      <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
      <p id=${pageID} class="page-number active">${currentPageNumber}</p>
      <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
      <p id=${pageID + 2} class="page-number">${currentPageNumber + 2}</p>
      <p id=${total} class="page-number">${total}</p>
      `
    );
  } else if (currentPageNumber == total - 2) {
    pageNumbers.insertAdjacentHTML(
      'beforeend',
      `<p id=${1} class="page-number">${1}</p>
      <span>...</span>
      <p id=${pageID - 2} class="page-number">${currentPageNumber - 2}</p>
      <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
      <p id=${pageID} class="page-number active">${currentPageNumber}</p>
      <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
      <p id=${total} class="page-number">${total}</p>
      `
    );
  } else if (currentPageNumber == total - 1) {
    pageNumbers.insertAdjacentHTML(
      'beforeend',
      `<p id=${1} class="page-number">${1}</p>
      <span>...</span>
      <p id=${pageID - 3} class="page-number">${currentPageNumber - 3}</p>
      <p id=${pageID - 2} class="page-number">${currentPageNumber - 2}</p>
      <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
      <p id=${pageID} class="page-number active">${currentPageNumber}</p>
      <p id=${total} class="page-number">${total}</p>
      `
    );
  } else if (currentPageNumber == total) {
    pageNumbers.insertAdjacentHTML(
      'beforeend',
      `<p id=${1} class="page-number">${1}</p>
      <span>...</span>
      <p id=${pageID - 4} class="page-number">${currentPageNumber - 4}</p>
      <p id=${pageID - 3} class="page-number">${currentPageNumber - 3}</p>
      <p id=${pageID - 2} class="page-number">${currentPageNumber - 2}</p>
      <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
      <p id=${total} class="page-number active">${total}</p>
      `
    );
  } else {
    pageNumbers.insertAdjacentHTML(
      'beforeend',
      `<p id=${1} class="page-number">${1}</p>
      <span>...</span>
      <p id=${pageID - 1} class="page-number">${currentPageNumber - 1}</p>
      <p id=${pageID} class="page-number active">${currentPageNumber}</p>
      <p id=${pageID + 1} class="page-number">${currentPageNumber + 1}</p>
      <span>...</span>
      <p id=${total} class="page-number">${total}</p>
      `
    );
  }
}
export function selectPage(e) {
  if (e.target.nodeName !== 'P') {
    return;
  }
  movieLibraryContainer.innerHTML = '';
  currentPageNumber = parseInt(e.target.id);
  console.log(currentPageNumber);
  pagination(currentPageNumber);
}
export function nextPageDisplay(e) {
  e.preventDefault();
  movieLibraryContainer.innerHTML = '';
  currentPageNumber++;
  console.log(currentPageNumber);
  pagination(currentPageNumber);
}
export function prevPageDisplay(e) {
  e.preventDefault();
  if (currentPageNumber > 1) {
    movieLibraryContainer.innerHTML = '';
    currentPageNumber--;
    console.log(currentPageNumber);
    pagination(currentPageNumber);
  }
}