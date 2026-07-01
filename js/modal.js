import { getMovieInfo } from './api.js';

const modalElement = document.querySelector('.modal');

export function initModal () {
     setupCloseHandlers();
     setupOpenHandler();
}
function setupCloseHandlers() {
   modalElement.addEventListener('click', (event) => {
     if(event.target.closest('.modal__closeBtn') || event.target === modalElement){
        closeModal()
            }
        } 
    )
    document.addEventListener('keydown', (event) => { if(event.key === 'Escape') {
        closeModal()
    }} 
)    
}
function setupOpenHandler() {
    const movieList = document.querySelector('.movies__list');
    movieList.addEventListener('click', async (event) => {
    const movieElement = event.target.closest('.movie');
    if(!movieElement) return;
    const movieInfo = await getMovieInfo(movieElement.id);
    renderModal(movieInfo);
    openModal()
})
}

function closeModal(){
        modalElement.style.visibility = 'hidden';
        modalElement.classList.remove('active');
        document.body.style.overflow = 'auto'
}

function openModal(){
    modalElement.style.visibility = 'visible';
    modalElement.classList.add('active');
    document.body.style.overflow = 'hidden'
}


function renderModal (movieData) {
    const modalContainerElement = document.querySelector('.modal__container');
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal__content');
    modalElement.innerHTML = `<div class="modal__top-content">
                <img class="modal__poster" src="${movieData.moviePoster}" alt="movie poster"> 
                <div class="modal__movie-content">
                    <h2 class="modal__movie-title">${movieData.movieName}</h2>
                    <ul class="modal__movie-info">
                        <li class="modal__movie-rating" id="modal__movie-rating"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L14.9 8.26L22 9.27L17 14.14L18.18 21L12 17.56L5.82 21L7 14.14L2 9.27L9.1 8.26L12 2Z"
        fill="currentColor" class="movie__rating-icon"/>
</svg><span class="movie__rating-number">${movieData.movieRating}</span></li>
<li class="modal__movie-year">${movieData.movieYear}</li>
<li class="modal__movie-genres">${movieData.movieGenres}</li>
                    </ul>
                    <ul class="modal__movie-details">
                        <li class="modal__movie-row">
                            <span class="modal__movie-label">Режиссер:</span>
                            <span class="modal__movie-value">${movieData.movieDirector}</span>
                        </li>
                        <li class="modal__movie-row">
                            <span class="modal__movie-label">В ролях:</span>
                            <span class="modal__movie-value">${movieData.movieActors}</span>
                        </li>
                        <li class="modal__movie-row">
                            <span class="modal__movie-label">Продолжительность:</span>
                            <span class="modal__movie-value">${movieData.movieLength} мин.</span>
                        </li>
                        <li class="modal__movie-row">
                            <span class="modal__movie-label">Страна:</span>
                            <span class="modal__movie-value">${movieData.movieCountry || 'Неизвестно'}</span>
                        </li>
                        <li class="modal__movie-row">
                            <span class="modal__movie-label">Бюджет: </span>
                            <span class="modal__movie-value">${
                                movieData.movieBudget === 'Неизвестно'
                                ? movieData.movieBudget
                                : `${movieData.movieBudget} млн $`
                            }
                        </li>
                         <li class="modal__movie-row">
                            <span class="modal__movie-label">Сборы: </span>
                            <span class="modal__movie-value">${
                                movieData.movieFees === 'Неизвестно'
                                ? movieData.movieFees
                                : `${movieData.movieFees} млн $` 
                            }</span>
                        </li>
                    </ul>
                    </div>
                    </div>
                    <div class="modal__movie-description">
                        <h3 class="modal__description-title">Описание</h3>
                        <p class="modal__description-text">${movieData.movieDescription}</p>
                    </div>
                    <button type="button" class="modal__closeBtn">
                        <svg width="34" height="34" class="modal__closeBtn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M6 6L18 18M18 6L6 18"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
  />
</svg>
                    </button>
    `
    modalContainerElement.innerHTML = '';
    modalContainerElement.appendChild(modalElement);
}