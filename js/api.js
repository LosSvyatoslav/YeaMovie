const API_KEY = '3780a008-759b-48ad-bcf7-e21827e9fdd1';
const headersObj = {
    'Content-Type': 'application/json',
    'X-API-KEY': API_KEY
};
export async function getMovies() {
    try{
        const response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1', 
        { headers: headersObj }
    );
        const respData = await response.json();
        return respData;
    }
    catch (error){
        console.log(`Ошибка: ${error.message}`)
    }
}

 export async function getMoviesByName(movieName) {
    try {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${movieName}`, 
        { headers: headersObj}
    )
        const respData = await response.json();
        return respData;
    }
    catch(error){
        console.log(`Ошибка: ${error.message}`)
    }
}

export async function getMovieInfo(movieId) {

    try {
        const [responseStaff, responseFilmInfo, responseBoxOffice] = await Promise.all([
            fetch(
            `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${movieId}`,
            { headers: headersObj }
        ),
           fetch(
            `https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}`,
            { headers: headersObj }
        ),
           fetch(
            `https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}/box_office`,
            { headers: headersObj }
        )  
        ])

        if(!responseStaff.ok) {
            throw new Error(`Ошибка запроса: ${responseStaff.status}`)
        }

        if(!responseFilmInfo.ok) {
            throw new Error(`Ошибка запроса: ${responseFilmInfo.status}`)
        }

         if(!responseBoxOffice.ok) {
            throw new Error(`Ошибка запроса: ${responseBoxOffice.status}`)
        }
        const [staff, filmInfo, boxOffice] = await Promise.all([
            responseStaff.json(),
            responseFilmInfo.json(),
            responseBoxOffice.json()
        ])
        const director = staff.find(
            person => person.professionKey === 'DIRECTOR'
        );

        const movieActors = staff
            .filter(person => person.professionKey === 'ACTOR')
            .slice(0, 3)
            .map(actor => actor.nameRu)
            .join(', ');
        
        const movieGenres = filmInfo.genres.map(movieGenre => movieGenre.genre).join(', ');
        const budget = boxOffice.items.find(item => item.type === 'BUDGET');
        function formatMoney(amount) {
            if (amount == null) return 'Неизвестно';
            const millions = amount / 1_000_000;
            return Number.isInteger(millions)
            ? millions
            : millions.toFixed(1)
        }
        const movieBudget = formatMoney(budget?.amount)

        const fees = boxOffice.items.find(item => item.type === 'WORLD');
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