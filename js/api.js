import { formatMoney } from './helpers.js'

const API_KEY = '3780a008-759b-48ad-bcf7-e21827e9fdd1';
const headersObj = {
    'Content-Type': 'application/json',
    'X-API-KEY': API_KEY
};

async function apiRequest (url) {
    try{
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/${url}`, 
        { headers: headersObj });

        if(!response.ok){
            throw new Error(`Ошибка запроса: ${response.status}`)
        }
        const responseJson = await response.json();
        return responseJson;
    }
    catch (error) {
        console.log(`Ошибка: ${error.message}`)
    }
    

}
export async function getMovies() {
  const moviesData = await apiRequest('v2.2/films/collections?type=TOP_250_MOVIES&page=1');
  return moviesData;
}

 export async function getMoviesByName(movieName) {
    const moviesByName = await apiRequest(`v2.1/films/search-by-keyword?keyword=${movieName}`);
    return moviesByName;
}

export async function getMovieInfo(movieId) {

    try {
        const [staff, filmInfo, boxOffice] = await Promise.all([
            apiRequest(`v1/staff?filmId=${movieId}`),
            apiRequest(`v2.2/films/${movieId}`),
            apiRequest(`v2.2/films/${movieId}/box_office`)
        ])
        const director = staff.find(
            person => person.professionKey === 'DIRECTOR'
        );

        const movieActors = staff
            .filter(({professionKey}) => professionKey === 'ACTOR')
            .slice(0, 3)
            .map(({nameRu}) => nameRu)
            .join(', ');
        
        const movieGenres = filmInfo.genres.map(({genre}) => genre).join(', ');
        const budget = boxOffice.items.find(({type}) => type === 'BUDGET');

        const movieBudget = formatMoney(budget?.amount)

        const fees = boxOffice.items.find(({type}) => type === 'WORLD');
        const movieFees =  formatMoney(fees?.amount)

        return {
            movieDirector: director?.nameRu || 'Неизвестно',
            movieActors,
            movieCountry: filmInfo.countries[0]?.country,
            movieLength: filmInfo.filmLength,
            movieName: filmInfo.nameRu,
            movieRating: filmInfo.ratingKinopoisk,
            movieYear: filmInfo.year,
            movieGenres,
            movieDescription: filmInfo.description,
            moviePoster: filmInfo.posterUrl,
            movieBudget,
            movieFees
        };
    } catch (error) {
        console.log(error);
    }
}