import { getHeaderMovies } from './get_movie.js';
import { bookmarksPage } from './navigation_bar.js';

const API_URL_SEARCH =
    'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

const form = document.querySelector('.search-box');
const search = document.querySelector('.header__search');
const searchBtn = document.querySelector('.search-btn');

const searchObj = {
    searchMovie() {
        const apiSearchURL = `${API_URL_SEARCH}${search.value}`;
        if (search.value) {
            bookmarksPage = false;
            getHeaderMovies(apiSearchURL);
        }
    },
};

form.addEventListener('submit', e => {
    e.preventDefault();
    searchMovie();
});
search.addEventListener('keyup', e => {
    e.preventDefault();
    if (e.keyCode === 13) {
        searchMovie();
    }
});

searchBtn.addEventListener('click', e => {
    e.preventDefault();
    searchMovie();
});

export const searchMovie = searchObj.searchMovie;
