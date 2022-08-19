import { getStartMovies, getHeaderMovies } from './get_movie.js';
import { fetchBookmarks } from './bookmarks.js';
import { searchMovie } from './search_movie.js';

const API_URL_MOVIE = `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=FILM&ratingFrom=7&ratingTo=10&yearFrom=1000&yearTo=3000&page=1`;
const API_URL_SERIES = `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=TV_SERIES&ratingFrom=7&ratingTo=10&yearFrom=1000&yearTo=3000&page=1`;
const API_URL_POPULAR =
    'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS';

const API_URL_SEARCH_BY_ID =
    'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

const navBar = document.querySelector('.navbar');
let mobileMenuActive = false;
let mobileSearchActive = false;
export let bookmarksPage = false;

const search = document.querySelector('.header__search');
const mainContainer = document.querySelector('.container');
const menuListItem = document.querySelectorAll('.menu-list-item');
const contMenu = document.querySelector('.menu-container');
const searchBox = document.querySelector('.search-container');


export function navigate() {
navBar.addEventListener('click', e => {
    const bookmarksActive =
        document.querySelector('.profile-bookmarks');

    const searchEl = e.target.closest('.search');
    if (searchEl) {
        search.value = '';

        addAndDeleteClassHidden(searchBox, contMenu);
        document
            .querySelectorAll('.menu-list-item')
            .forEach(item => item.classList.remove('active'));
        document
            .querySelector('.profile-bookmarks')
            .classList.remove('active');
    }

    const mobileSearchBtn = e.target.closest('.search-btn-profile');
    if (mobileSearchBtn) {
        search.value = '';

        // addAndDeleteClassHidden(searchBox, mobileSearchBtn);

        searchBox.classList.remove('hidden');
        document.querySelector('.search-btn-profile').style.display =
            'none';

        document.querySelector('.logo').classList.add('hidden-mobile');
        document
            .querySelector('.profile-bookmarks')
            .classList.add('hidden');
        document.querySelector('.toggle').classList.add('hidden');
        document.querySelector('.mobile-menu').style.display = 'none';
        mobileSearchActive = true;
    }
    const closeSearch = e.target.closest('.close-btn');
    if (closeSearch) {
        if (mobileSearchActive) {
            // addAndDeleteClassHidden(mobileSearchBtn, searchBox);
            searchBox.classList.add('hidden');
            document.querySelector(
                '.search-btn-profile'
            ).style.display = 'flex';

            document
                .querySelector('.logo')
                .classList.remove('hidden-mobile');
            document
                .querySelector('.profile-bookmarks')
                .classList.remove('hidden');
            document
                .querySelector('.toggle')
                .classList.remove('hidden');
            document.querySelector('.mobile-menu').style.display =
                'flex';
            mobileSearchActive = false;
        } else {
            addAndDeleteClassHidden(contMenu, searchBox);
        }
    }

    const mobileMenu = e.target.closest('.fa-bars');
    if (mobileMenu) {
        document
            .querySelector('.menu-down')
            .classList.toggle('hidden-mobile');
    }

    const mobileHomeBtn = e.target.closest('.mobile-home-btn');
    if (mobileHomeBtn) {
        bookmarksPage = false;
        bookmarksActive.classList.remove('active');

        mainContainer.innerHTML = '';
        getStartMovies(API_URL_POPULAR, API_URL_SEARCH_BY_ID);
        document
            .querySelector('.menu-down')
            .classList.toggle('hidden-mobile');
        mobileMenuActive = false;
    }
    const mobileMovieBtn = e.target.closest('.mobile-movie-btn');
    if (mobileMovieBtn) {
        bookmarksPage = false;
        bookmarksActive.classList.remove('active');

        mainContainer.innerHTML = '';
        getHeaderMovies(API_URL_MOVIE);
        document
            .querySelector('.menu-down')
            .classList.toggle('hidden-mobile');
        mobileMenuActive = false;
    }
    const mobileSeriesBtn = e.target.closest('.mobile-series-btn');
    if (mobileSeriesBtn) {
        bookmarksPage = false;
        bookmarksActive.classList.remove('active');

        mainContainer.innerHTML = '';
        getHeaderMovies(API_URL_SERIES);
        document
            .querySelector('.menu-down')
            .classList.toggle('hidden-mobile');
        mobileMenuActive = false;
    }
    const mobilePopularBtn = e.target.closest('.mobile-popular-btn');
    if (mobilePopularBtn) {
        bookmarksPage = false;
        bookmarksActive.classList.remove('active');

        mainContainer.innerHTML = '';
        getHeaderMovies(API_URL_POPULAR);
        document
            .querySelector('.menu-down')
            .classList.toggle('hidden-mobile');
        mobileMenuActive = false;
    }

    const clickedButton = e.target.closest('.menu-list-item');

    const bookmarks = e.target.closest('.profile-bookmarks');

    if (bookmarks) {
        menuListItem.forEach(item => {
            item.classList.remove('active');
            bookmarks.classList.add('active');
        });
        mainContainer.innerHTML = '';
        bookmarksPage = true;
        fetchBookmarks();
    }

    if (!clickedButton) return;

    menuListItem.forEach(item => {
        bookmarksActive.classList.remove('active');
        item.classList.remove('active');
        clickedButton.classList.add('active');
    });

    const homeMenu = e.target.closest('.home-btn');
    if (homeMenu) {
        bookmarksPage = false;
        mainContainer.innerHTML = '';
        getStartMovies(API_URL_POPULAR, API_URL_SEARCH_BY_ID);
    }

    const movieMenu = e.target.closest('.movie-btn');
    if (movieMenu) {
        bookmarksPage = false;
        mainContainer.innerHTML = '';
        getHeaderMovies(API_URL_MOVIE);
    }

    const seriesMenu = e.target.closest('.series-btn');
    if (seriesMenu) {
        bookmarksPage = false;
        mainContainer.innerHTML = '';
        getHeaderMovies(API_URL_SERIES);
    }

    const popularMenu = e.target.closest('.popular-btn');
    if (popularMenu) {
        bookmarksPage = false;
        mainContainer.innerHTML = '';
        getHeaderMovies(API_URL_POPULAR);
    }
});
};


const addAndDeleteClassHidden = function (toClose, toOpen) {
    toClose.classList.remove('hidden');
    toOpen.classList.add('hidden');
};
