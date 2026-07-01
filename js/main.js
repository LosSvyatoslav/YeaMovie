import { getMovies } from './api.js';
import { searchMovies } from './search.js';
import { renderMovies, backToMainPage } from './ui.js';
import { initModal } from './modal.js'


const movies = await getMovies();

searchMovies();
renderMovies(movies);
initModal()
backToMainPage(movies)



