// https://api.themoviedb.org/3/movie/550?api_key=bfe21f4061b2869ccff2b4c323a3a257

// bfe21f4061b2869ccff2b4c323a3a257

let apiKey = 'bfe21f4061b2869ccff2b4c323a3a257';

const movieLibraryContainer = document.querySelector('.movie-set');

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

async function fetchMoviesAndCategories() {
  const [moviesResponse, confResponse, genresResponse] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`),
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

fetchMoviesAndCategories()
  .then(([movies, configuration, genres]) => {
    movies.results.forEach(movie => {
      let title = movie.title;
      let category = mapGenreIdsToName(movie.genre_ids, genres);
      let year = movie.release_date.slice(0, 4);
      let poster = configuration.base_url + 'w500' + movie.poster_path;
      movieLibraryContainer.insertAdjacentHTML(
        'beforeend',
        `
  <li class="movie-card modal-open">
    <img class="movie-card__img" src="${poster}" />
    <div class="movie-card__description">
      <h2 class="movie-card__description--title">${title}</h2>
      <p class="movie-card__description--category">${category} | ${year}</p>
    </div>
  </li>`
      );
    });
  })
  .catch(error => {
    console.error(
      'movies or categories request failed. Error: ' + error.message
    );
  });
