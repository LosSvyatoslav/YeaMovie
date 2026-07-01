export function renderMovies (data) {
    const movieListElement = document.querySelector('.movies__list');
    const propertyName = data.items ? 'items' : 'films';
    movieListElement.innerHTML = '';
    data[propertyName].forEach((movie) => {
    const movieElement = document.createElement('li');
    movieElement.classList.add('movie');
    movieElement.setAttribute('id', movie.kinopoiskId)
    movieElement.innerHTML = `<img src="${movie.posterUrl || movie.posterUrlPreview}" alt="movie poster" class="movie__poster">
                    <ul class="movie__info">
                        <li class="movie__title">${movie.nameRu}</li>
                        <li class="movie__year">${movie.year}</li>
                        <li class="movie__genre">${movie.genres.map(genre => genre.genre).join(', ')}</li>
                        <li class="movie__rating"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L14.9 8.26L22 9.27L17 14.14L18.18 21L12 17.56L5.82 21L7 14.14L2 9.27L9.1 8.26L12 2Z"
        fill="currentColor" class="movie__rating-icon"/>
</svg><span class="movie__rating-number">${movie.ratingKinopoisk || movie.rating}</span></li>
                    </ul>`
    movieListElement.appendChild(movieElement);

    })

}
export function backToMainPage(data){
    const logo = document.querySelector('.header__title');
    logo.addEventListener('click', () => renderMovies(data))
}