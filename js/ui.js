export function renderMovies (data) {
    const movieListElement = document.querySelector('.movies__list');
    const propertyName = data.items ? 'items' : 'films';
    movieListElement.innerHTML = '';
    data[propertyName].forEach(({kinopoiskId,filmId, posterUrl, posterUrlPreview, nameRu, year, genres, ratingKinopoisk, rating}) => {
    const movieElement = document.createElement('li');
    movieElement.classList.add('movie');
    movieElement.setAttribute('id', kinopoiskId || filmId)
    movieElement.innerHTML = `<img src="${posterUrl || posterUrlPreview}" alt="movie poster" class="movie__poster">
                    <ul class="movie__info">
                        <li class="movie__title">${nameRu}</li>
                        <li class="movie__year">${year}</li>
                        <li class="movie__genre">${genres.map(({genre}) => genre).join(', ')}</li>
                        <li class="movie__rating"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L14.9 8.26L22 9.27L17 14.14L18.18 21L12 17.56L5.82 21L7 14.14L2 9.27L9.1 8.26L12 2Z"
        fill="currentColor" class="movie__rating-icon"/>
</svg><span class="movie__rating-number">${ratingKinopoisk || rating}</span></li>
                    </ul>`
    movieListElement.appendChild(movieElement);

    })

}
export function backToMainPage(data){
    const logo = document.querySelector('.header__title');
    logo.addEventListener('click', () => renderMovies(data))
}