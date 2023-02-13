let apiInfo = {
  apiKey: 'bfe21f4061b2869ccff2b4c323a3a257',
};

const movieLibraryContainer = document.querySelector('.movie-set');

export async function getMovie(movie) {
  return await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiInfo.apiKey}&query=${movie}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
}

export async function getPopular(page) {
  return await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiInfo.apiKey}&language=en-US&page=${page}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      data.results.forEach(movie => {
        const genres = getMoreDetails(movie.id);
        console.log(genres);
        fillMain(movie, genres);
      });
    });
}

async function getMoreDetails(id) {
  return await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiInfo.apiKey}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      const info = data.genres;

      return info;
    });
}

async function fillMain(movie, genres) {
  movieLibraryContainer.insertAdjacentHTML(
    'beforeend',
    `
    <li class="movie-card modal-open">
    <img class="movie-card__img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
    <div class="movie-card__description">
      <h2 class="movie-card__description--title">${movie.original_title}</h2>
      <p class="movie-card__description--category">${genres}</p>
    </div>
  </li>`
  );
}
