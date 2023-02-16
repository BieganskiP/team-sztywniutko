let apiKey = 'bfe21f4061b2869ccff2b4c323a3a257';
let base_url = 'https://api.themoviedb.org/3';

export function attachModal() {
  document.querySelector('.movie-set').addEventListener('click', openModal);
}

const modal = document.querySelector('.backdrop');

async function openModal(event) {
  let movie = event.target.parentNode;
  if (movie.nodeName == 'DIV') {
    movie = movie.parentNode;
  }

  const movieId = movie.dataset.movieId;
  console.log(movieId);

  const [fetchedMovie, configuration] = await fetchMovieById(movieId);
  modalMovieInfo(fetchedMovie, configuration);
  //
  modal.classList.remove('is-hidden');
  document
    .querySelector('.movie-modal__button--close')
    .addEventListener('click', closeModal);
}

function closeModal() {
  modal.classList.add('is-hidden');
  const modalListMovie = document.querySelector(`.movie-modal__container`);
  modalListMovie.innerHTML = '';
  document
    .querySelector('.movie-modal__button--close')
    .removeEventListener('click', closeModal);
}

export function closeModalWithEscapeKey(event) {
  if (event.key === 'Escape') {
    closeModal();
    document.removeEventListener('keydown', event);
  }
}

function modalMovieInfo(movie, configuration) {
  let id = movie.id;
  let overview = movie.overview;
  let vote = movie.vote_average;
  let fullVote = movie.vote_count;
  let popularity = movie.popularity;
  let title = movie.title;
  let poster = configuration.images.base_url + 'w500' + movie.poster_path;

  const genres = movie.genres
    .map(genre => {
      return genre.name;
    })
    .join(', ');

  const modalListMovie = document.querySelector(`.movie-modal__container`);
  modalListMovie.insertAdjacentHTML(
    `beforeend`,
    `
        <img class="movie-modal__image" src="${poster}" />
        <div class="movie-modal__container--text" >
        <h3 class="movie-modal__header">${title}</h3>
        <div class="movie-modal__container--rating">
          <ul class="movie-modal__categories">
                <li>Vote / Votes</li>
                <li>Popularity</li>
                <li>Original Title</li>
                <li>Genre</li>
              </ul>
              <ul class="movie-modal__values">
                <li>
                  <span class="movie-modal__values--orange">${vote}</span>  / ${fullVote}
                </li>
                <li>${popularity}</li>
                <li>${title}</li>
                <li>${genres}</li>
          </ul>
        </div>
        <h4 class="movie-modal__header--about">ABOUT</h4>
        <div class="movie-modal__text">${overview}</div>
        <div class="movie-modal__container--buttons">
          <button class="movie-modal__button movie-modal__button--watched">
            ADD TO WATCHED
          </button>
          <button class="movie-modal__button">ADD TO QUEUE</button>
        </div>
      </div>
        `
  );

  let addWatchedButton = document.querySelector(
    '.movie-modal__button--watched'
  );

  addWatchedButton.addEventListener('click', () => {
    handleAddToFavorites(id);
  });
}

async function fetchMovieById(movieId) {
  const [singleMovieResponse, confResponse] = await Promise.all([
    fetch(`${base_url}/movie/${movieId}?api_key=${apiKey}&language=en-US`),
    fetch(`${base_url}/configuration?api_key=${apiKey}`),
  ]);

  if (!singleMovieResponse.ok) {
    const message = `An error has occured: ${singleMovieResponse.status}`;
    throw new Error(message);
  }
  if (!confResponse.ok) {
    const message = `An error has occured: ${confResponse.status}`;
    throw new Error(message);
  }

  const movie = await singleMovieResponse.json();
  const configuration = await confResponse.json();

  return [movie, configuration];
}

function handleAddToFavorites(id) {
  const localStorageWatched = localStorage.getItem('watchedList');
  let localStorageWatchedParsed = [];
  if (localStorageWatched) {
    localStorageWatchedParsed = JSON.parse(localStorageWatched);
  }

  if (localStorageWatchedParsed.includes(id)) {
    return;
  }

  localStorageWatchedParsed.push(id);
  const currentArrayStringified = JSON.stringify(localStorageWatchedParsed);
  localStorage.setItem('watchedList', currentArrayStringified);
}
