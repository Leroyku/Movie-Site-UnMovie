import { getStartMovies } from './modules/get_movie.js';
import { navigate } from './modules/navigation_bar.js';
import { toggleThemeFunc, checkTheme } from './modules/theme.js';

const API_URL_POPULAR =
    'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS';

const API_URL_SEARCH_BY_ID =
    'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

getStartMovies(API_URL_POPULAR, API_URL_SEARCH_BY_ID);

navigate();
toggleThemeFunc();
checkTheme();
