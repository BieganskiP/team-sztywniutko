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
        fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiInfo.apiKey}`
        )
          .then(response => {
            return response.json();
          })
          .then(data => {
            const genres = data.genres;
            let genre = genres.map(genre => {
              return genre['name'];
            });
            fillMain(data, genre);
          });
      });
    });
}

async function fillMain(movie, genres) {
  movieLibraryContainer.insertAdjacentHTML(
    'beforeend',
    `
    <li class="movie-card modal-open">
    <img class="movie-card__img" src="https://image.tmdb.org/t/p/w500${
      movie.poster_path
    }" />
    <div class="movie-card__description">
      <h2 class="movie-card__description--title">${movie.title}</h2>
      <p class="movie-card__description--category">${genres} | ${movie.release_date.substring(
      0,
      4
    )}</p>
    </div>
  </li>`
  );
}
