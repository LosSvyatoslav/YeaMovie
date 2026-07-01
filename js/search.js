import {getMoviesByName} from './api.js'
import { renderMovies } from './ui.js';
import { getMovies } from './api.js';
const movies = await getMovies();

export function searchMovies () {
    const searchElement = document.querySelector('.header__search-input');
    const formElement = document.querySelector('.header__search-menu');
    formElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    if(validation(searchElement)){
    const foundMovies = await getMoviesByName(searchElement.value);
    renderMovies(foundMovies)
    }
    })
}

function validation(searchElement) {
    if(searchElement.value.trim() === '') {
       renderMovies(movies)
    }
    else {return true;}
}