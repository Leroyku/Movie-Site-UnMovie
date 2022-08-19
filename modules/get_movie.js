import {
    showRandomMovie,
    showMovieInformation,
    showTopMovies,
    showMovieFromHeader,
} from './show_html.js';

// const API_KEY = 'e1594228-332b-4db0-8554-7e2c42c4b530';
// const API_KEY = 'af0465c7-161f-4632-99ea-b93e362970d4';
const API_KEY = '7bb180fa-4392-4a8c-88b9-49745d02704f';
// const API_KEY = '231dba0f-0813-49da-bf2a-d97a82adab9e';

const API_URL_MOVIE = `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=FILM&ratingFrom=7&ratingTo=10&yearFrom=1000&yearTo=3000&page=1`;
const API_URL_SERIES = `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=TV_SERIES&ratingFrom=7&ratingTo=10&yearFrom=1000&yearTo=3000&page=1`;

const API_URL_MINI_SERIES = `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=MINI_SERIES&ratingFrom=7&ratingTo=10&yearFrom=1000&yearTo=3000&page=1`;

const mainContainer = document.querySelector('.container');

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getMovie = {
    getStartMovies: async function (urlForAwaitMovie, urlForRandomMovie) {
        const randomId = randomIntFromInterval(300, 1000);
        // const randomId = 301;
        const searchURL = urlForRandomMovie + `${randomId}`;
        const API_URL_COVER = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${randomId}/images?type=SCREENSHOT&page=1`;
        const API_URL_STAFF = `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${randomId}`;
        // console.log(API_URL_COVER);
        // console.log(API_URL_STAFF);
        // console.log(searchURL);
        const respAwaitMovie = await fetch(searchURL, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
        });
        const respAwaitMovieData = await respAwaitMovie.json();

        const respCoverMovie = await fetch(API_URL_COVER, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
        });
        const respCoverMovieData = await respCoverMovie.json();

        const respStaffMovie = await fetch(API_URL_STAFF, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
        });
        const respStaffMovieData = await respStaffMovie.json();

        showRandomMovie(
            respAwaitMovieData,
            respCoverMovieData,
            respStaffMovieData
        );

        /*


        */

        const response = await fetch(urlForAwaitMovie, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
        });
        const responseData = await response.json();

        const responseSeries = await fetch(API_URL_SERIES, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
        });
        const responseDataSeries = await responseSeries.json();

        const responseMiniSeries = await fetch(API_URL_MINI_SERIES, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
        });
        const responseDataMiniSeries = await responseMiniSeries.json();

        const responseMovie = await fetch(API_URL_MOVIE, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
        });
        const responseDataMovie = await responseMovie.json();

        // console.log(responseData);
        showTopMovies(responseData, 'Топ популярных фильмов');
        showTopMovies(responseDataMovie, 'Топ фильмов с хорошей оценкой');
        showTopMovies(responseDataSeries, 'Топ популярных сериалов');
        showTopMovies(responseDataMiniSeries, 'Топ популярных мини - сериалов');
    },

    getMovieInformation: async function (urlId, id) {
        const searchURL = urlId + `${id}`;
        const API_URL_COVER = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images?type=STILL&page=1`;
        const API_URL_STAFF = `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`;
        const API_URL_VIDEO = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`;
        // console.log(API_URL_COVER);
        // console.log(API_URL_STAFF);
        // console.log(searchURL);
        const respAwaitMovie = await fetch(searchURL, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
        });
        const respAwaitMovieData = await respAwaitMovie.json();

        const respCoverMovie = await fetch(API_URL_COVER, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
        });
        const respCoverMovieData = await respCoverMovie.json();

        // console.log(respCoverMovieData);

        const respStaffMovie = await fetch(API_URL_STAFF, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
        });
        const respStaffMovieData = await respStaffMovie.json();

        // const respTrailerMovie = await fetch(API_URL_VIDEO, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-API-KEY': API_KEY,
        //     },
        // });
        // const respTrailerMovieData = await respTrailerMovie.json();

        showMovieInformation(
            respAwaitMovieData,
            respCoverMovieData,
            respStaffMovieData
        );
    },

    getHeaderMovies: async function (url) {
        mainContainer.innerHTML = '';
        const respMovie = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
        });
        const respMovieData = await respMovie.json();

        if (respMovieData.films && respMovieData.films.length === 0) {
            // console.log('re');
            const moviesElement = document.createElement('div');

            moviesElement.innerHTML = '';
            const emptySearch = document.createElement('div');
            emptySearch.classList.add('container__cancel-search');
            emptySearch.innerHTML = `
                    <h2 class="cancel-search__text">
                        По запросу "${respMovieData.keyword}" ничего не найдено!
                    </h2>
            `;
            mainContainer.appendChild(emptySearch);
        }

        showMovieFromHeader(respMovieData);
    },
};

export const getStartMovies = getMovie.getStartMovies;
export const getMovieInformation = getMovie.getMovieInformation;
export const getHeaderMovies = getMovie.getHeaderMovies;
