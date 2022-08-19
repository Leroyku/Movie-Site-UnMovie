import { getMovieInformation } from './get_movie.js';
import { saveBookmark } from './bookmarks.js';

const API_URL_SEARCH_BY_ID =
    'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

const mainContainer = document.querySelector('.container');

let movieListContainer;
// let sliders;
let movieLists;
let arrowsRight;
let movieListItem;
let selectRandomMovie;

let closeContainerBtn;
let infContId;
// let slideBtn;
let parentCheck = true;

let parentMovieWrapper;
let newParent;

function getClassByRating(rate) {
    if (rate >= 7) return 'green';
    if (rate > 5) return 'orange';
    if (rate <= 5) return 'red';
}

function wrapMovie(movie, check) {
    if (check === 'newParent') {
        newParent.childNodes.forEach(movie => {
            const inner = movie.querySelector('.movie__cover-inner');
            // const cover = movie.querySelector('.movie__cover');
            const info = movie.querySelector('.movie__info');

            // console.log(cover.style);
            inner.style.borderRadius = '20px';
            inner.style.height = '200px';
            // cover.style.height = null;
            info.classList.add('hidden');
        });
    }

    if (check === 'oldParent') {
        const inner = movie.querySelector('.movie__cover-inner');
        // const cover = movie.querySelector('.movie__cover');
        const info = movie.querySelector('.movie__info');

        inner.style.borderRadius = '10px';
        inner.style.height = '360px';
        // cover.style.height = '100%';
        info.classList.remove('hidden');
        parentMovieWrapper = newParent;
    }

    if (check === 'closeButton') {
        parentMovieWrapper.childNodes.forEach(movie => {
            wrapMovie(movie, 'oldParent');
        });
    }
}

const showMovie = {
    showRandomMovie(data, img, staff) {
        const randomMovie = document.createElement('div');
        randomMovie.classList.add('container__random__movie');

        randomMovie.innerHTML = `
        <div class="gradient-featured"></div>
        <img
        id = "${data.kinopoiskId}"
        src="${
            data.coverUrl
                ? data.coverUrl
                : `${img.items.length === 0 ? '' : img.items[0].imageUrl}`
        }" class="featured-img"></img>

        <div class="featured-text">
            ${
                data.logoUrl
                    ? `
                    <div class="featured-logo">
                        <img src="${data.logoUrl}" class="featured-logo-img"></img>
                    </div>
                    `
                    : `<p class="featured-title">${
                          data.nameRu
                              ? data.nameRu
                              : `${
                                    data.nameEn
                                        ? data.nameEn
                                        : `${
                                              data.nameOriginal
                                                  ? data.nameOriginal
                                                  : ''
                                          }`
                                }`
                      }</p>`
            }

            <p class="featured-desc">
            ${
                data.shortDescription
                    ? `${data.shortDescription}`
                    : `${
                          data.description
                              ? `${data.description
                                    .split(' ')
                                    .slice(0, 13)
                                    .join(' ')}...`
                              : ''
                      }`
            }
            </p>
            <h4 class="featured-actors">В главных ролях:</h4>
            <p class="featured-actors-text">
            ${
                staff[1].professionKey === 'ACTOR' ? `${staff[1].nameRu}, ` : ``
            }${staff[2].nameRu}, ${staff[3].nameRu}...
            </p>
            <h4 class="featured-actors">Режиссер:</h4>
            <p class="featured-actors-text">
            ${staff[0].nameRu}${
            staff[1].professionKey === 'DIRECTOR' ? `, ${staff[1].nameRu}` : ``
        }
            </p>
            <button class="featured-button">Смотреть</button>
            <button class="featured-button-bookmark">
            <i class="fas fa-bookmark add-bookmark"></i>
            </button>
        </div>
        `;
        mainContainer.prepend(randomMovie);

        const watchMovieBtn = document.querySelector('.featured-button');
        watchMovieBtn.addEventListener('click', () =>
            window.open(`https://www.ggkinopoisk.ru/film/${data.kinopoiskId}/`)
        );

        document
            .querySelector('.featured-button-bookmark')
            .addEventListener('click', () => {
                // console.log(data);
                saveBookmark(data);
            });

        const gradientTheme = document.querySelector('.gradient-featured');
        console.log();
        if (localStorage.getItem('theme') === '"dark"') {
            // console.log('123');
            gradientTheme.classList.toggle('active');
        }
    },

    showMovieInformation(data, img, staff) {
        const informationMovieContainer = document.createElement('div');
        informationMovieContainer.classList.add(
            'add-movie-information-container'
        );
        informationMovieContainer.id = 'infCont';

        const randomMovie = document.createElement('div');
        randomMovie.classList.add('information-content');

        randomMovie.innerHTML = `
                <div class="gradient-information"></div>
                <img src="${
                    data.coverUrl
                        ? data.coverUrl
                        : `${
                              img.items.length === 0
                                  ? ''
                                  : img.items[0].imageUrl
                          }`
                }" class="information-img"></img>

                <div class="close-information-btn">
                    <svg class="btn__icon-close-information">
                        <use xlink:href="#closeId"></use>
                    </svg>
                </div>
                <div class="slide-information">
                <i
                class="fas fa-chevron-right information-arrow-right"
                ></i>
                </div>
                <div class="information-text">
                ${
                    data.logoUrl
                        ? `
                        <div class="information-logo">
                            <img src="${data.logoUrl}" class="information-logo-img"></img>
                        </div>
                            `
                        : `<p class="information-title">${
                              data.nameRu
                                  ? data.nameRu
                                  : `${
                                        data.nameEn
                                            ? data.nameEn
                                            : `${
                                                  data.nameOriginal
                                                      ? data.nameOriginal
                                                      : ''
                                              }`
                                    }`
                          }</p>`
                }


                <p class="information-desc">
                ${
                    data.shortDescription
                        ? `${data.shortDescription}`
                        : `${
                              data.description
                                  ? `${data.description
                                        .split(' ')
                                        .slice(0, 13)
                                        .join(' ')}...`
                                  : ''
                          }`
                }
                </p>
                ${
                    staff.length != 0
                        ? `<h4 class="information-actors">В главных ролях:</h4>
                <p class="information-actors-text">
                ${
                    staff[1].professionKey === 'ACTOR'
                        ? `${
                              staff[1].nameRu
                                  ? staff[1].nameRu
                                  : staff[1].nameEn
                          }, `
                        : ``
                }${staff[2].nameRu ? staff[2].nameRu : staff[2].nameEn}, ${
                              staff[3].nameRu
                                  ? staff[3].nameRu
                                  : staff[3].nameEn
                          }...
                </p>
                <h4 class="information-actors">Режиссер:</h4>
                <p class="information-actors-text">
                ${staff[0].nameRu ? staff[0].nameRu : staff[0].nameEn}${
                              staff[1].professionKey === 'DIRECTOR'
                                  ? `, ${
                                        staff[1].nameRu
                                            ? staff[1].nameRu
                                            : staff[1].nameEn
                                    }`
                                  : ``
                          }
                </p>
                `
                        : ''
                }

                <button class="information-button">Смотреть</button>
                <button class="information-button-bookmark">
                <i class="fas fa-bookmark add-bookmark"></i>
                </button>
                </div>
        `;

        if (!parentCheck) {
            newParent.after(infContId);

            if (newParent.classList[0] != 'movie-list-wrapper') {
                parentMovieWrapper = newParent;
            }
        }

        if (typeof selectRandomMovie === 'undefined') {
            // console.log(newParent);
            newParent.after(informationMovieContainer);
            informationMovieContainer.append(randomMovie);

            selectRandomMovie = document.querySelector('.information-content');
            closeContainerBtn = document.querySelector(
                '.close-information-btn'
            );
            infContId = document.getElementById('infCont');
            infContId.scrollIntoView({
                block: 'end',
                behavior: 'smooth',
            });

            parentCheck = false;

            if (newParent.classList[0] != 'movie-list-wrapper') {
                parentMovieWrapper = newParent;
            }
        }

        if (selectRandomMovie) {
            document.querySelector('.information-content').remove();

            infContId.append(randomMovie);
            infContId.scrollIntoView({
                block: 'end',
                behavior: 'smooth',
            });

            closeContainerBtn = document.querySelector(
                '.close-information-btn'
            );
            // slideBtn = document.querySelector('.information-arrow-right');
        }

        const selectInformationMovieContainers = document.querySelector(
            '.add-movie-information-container'
        );

        closeContainerBtn.addEventListener('click', e => {
            // console.log('re');
            e.preventDefault();
            // selectInformationMovieContainer.style.transform = 'translateY(-50%)';
            selectRandomMovie = undefined;
            parentCheck = true;
            if (!e.target.closest('.movie-list-container')) {
                wrapMovie(parentMovieWrapper, 'closeButton');
            }
            selectInformationMovieContainers.remove();
        });

        // slideBtn.addEventListener('click', () => {
        //     document.body.classList.add('stop-scroll');
        //     const videoDiv = document.createElement('div');
        //     videoDiv.classList.add('video-container');

        //     videoDiv.innerHTML = `
        // <div class="video-box">
        //     <p id="myvideo">Здесь могла быть ваша реклама!</p>
        //     <svg class="btn__icon-close-video">
        //         <use xlink:href="#closeId"></use>
        //     </svg>
        // </div>

        // `;
        //     document.querySelector('.slide-information').after(videoDiv);

        //     const closeVideo = document.querySelector('.btn__icon-close-video');
        //     closeVideo.addEventListener('click', () => {
        //         document.querySelector('.video-container').remove();
        //         document.body.classList.remove('stop-scroll');
        //     });
        // });

        const watchMovieBtn = document.querySelector('.information-button');
        watchMovieBtn.addEventListener('click', () =>
            window.open(`https://www.ggkinopoisk.ru/film/${data.kinopoiskId}/`)
        );

        document
            .querySelector('.information-button-bookmark')
            .addEventListener('click', () => {
                // console.log(data);
                saveBookmark(data);
            });
    },

    showTopMovies(data, titleName) {
        // moviesElement.innerHTML = '';
        const wrapperEl = document.createElement('div');
        wrapperEl.classList.add('movie-list-wrapper');
        wrapperEl.innerHTML = `
        <h1 class="movie-list-title">${titleName}</h1>
        <i class="fas fa-chevron-right arrow-right"></i>
    `;
        movieListContainer = document.createElement('div');
        movieListContainer.classList.add('movie-list-container');
        mainContainer.append(movieListContainer);
        movieListContainer.appendChild(wrapperEl);

        const movieList = document.createElement('div');
        movieList.classList.add('movie-list');
        wrapperEl.appendChild(movieList);

        const dataShow = data.films ? data.films : data.items;
        // console.log(dataShow);

        dataShow.forEach(movie => {
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie-list-item');

            const rating = movie.rating ? movie.rating : movie.ratingKinopoisk;

            movieEl.innerHTML = `
            <img
                class="movie-list-item-img"
                id="${movie.filmId ? movie.filmId : movie.kinopoiskId}"
                src="${movie.posterUrlPreview}"
                alt=""
            />
            ${
                rating === 'null'
                    ? ''
                    : `
                    <div class="movie-average movie-average--${getClassByRating(
                        rating
                    )}">
                        ${rating}
                    </div>
                `
            }
             `;

            movieList.appendChild(movieEl);
        });
        // sliders = document.querySelectorAll('.movie-list-wrapper');
        movieLists = document.querySelectorAll('.movie-list');
        arrowsRight = document.querySelectorAll('.arrow-right');
        movieListItem = document.querySelectorAll('.movie-list-item');
        // console.log(movieListItem);
        // console.log(arrowsRight);

        movieListItem.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();

                let elementId = e.target.id;
                if (elementId !== '') {
                    // console.log(elementId);
                    // getMovieInformation(API_URL_SEARCH_BY_ID, elementId);
                    newParent = e.target.closest('.movie-list-wrapper');
                    getMovieInformation(API_URL_SEARCH_BY_ID, elementId);
                }
            });
        });

        arrowsRight.forEach((arrow, i) => {
            const itemNumber = movieLists[i].querySelectorAll('img').length;
            let clickCounter = 0;
            arrow.addEventListener('click', () => {
                const ratio = Math.floor(
                    document.querySelector('.container').getBoundingClientRect()
                        .width / 270
                );

                clickCounter++;
                if (itemNumber - (4 + clickCounter) + (5 - ratio) >= 0) {
                    // console.log(`${itemNumber - (4 + clickCounter) + (4 - ratio)}`);
                    movieLists[i].style.transform = `translateX(${
                        -300 * clickCounter
                    }px)`;
                } else {
                    movieLists[i].style.transform = 'translateX(0)';
                    clickCounter = 0;
                    // clickCounter = itemNumber - 4;
                }
                // console.log(Math.floor(window.innerWidth / 270));
                // console.log(clickCounter);
            });
        });
        // console.log('s');
    },

    showMovieFromHeader(data) {
        const moviesEl = document.createElement('div');
        moviesEl.classList.add('movies');
        mainContainer.append(moviesEl);
        // const moviesContainer = document.querySelector('.movies');
        const dataShow = data.films ? data.films : data.items;

        if (dataShow != null) {
            for (; dataShow.length > 0; ) {
                const lineMovieContainer = document.createElement('div');
                lineMovieContainer.classList.add('movie-line-container');
                moviesEl.append(lineMovieContainer);
                // const element = array[index];
                let dataSplice;

                const ratio = document
                    .querySelector('.movies')
                    .getBoundingClientRect().width;

                if (ratio > 1255) {
                    dataSplice = dataShow.splice(0, 4);
                }
                if (ratio < 1255 && ratio > 950) {
                    dataSplice = dataShow.splice(0, 3);
                }
                if (ratio < 950 && ratio > 640) {
                    dataSplice = dataShow.splice(0, 2);
                }
                if (ratio < 640) {
                    dataSplice = dataShow.splice(0, 1);
                }
                // null
                // console.log(data);
                // const dataSplice = dataShow.splice(0, 4);
                // console.log(dataSplice);

                dataSplice.forEach(movie => {
                    const movieEl = document.createElement('div');
                    movieEl.classList.add('movie-item');
                    const rating = movie.rating
                        ? movie.rating
                        : movie.ratingKinopoisk;
                    movieEl.innerHTML = `

            ${
                rating === 'null'
                    ? ''
                    : `
                    <div class="movie-average movie-average--${getClassByRating(
                        rating
                    )}">
                        ${rating}
                    </div>
                `
            }
            <div class="movie">
                <div class="movie__cover-inner">
                    <img
                    src="${movie.posterUrlPreview}"
                    class="movie__cover"
                    id = "${movie.filmId ? movie.filmId : movie.kinopoiskId}"
                    alt=""
                    />
                </div>
                <div class="movie__info">
                    <div class="movie__title">${
                        movie.nameRu
                            ? movie.nameRu
                            : `${
                                  movie.nameEn
                                      ? movie.nameEn
                                      : `${
                                            movie.nameOriginal
                                                ? movie.nameOriginal
                                                : ''
                                        }`
                              }`
                    }</div>
                    <div class="movie__category">${movie.genres.map(
                        genre => ` ${genre.genre}`
                    )}</div>

                </div>
                </div>
            `;
                    lineMovieContainer.appendChild(movieEl);
                });
                // console.log(data);
            }

            movieListItem = document.querySelectorAll('.movie');
            // console.log(movieListItem);
            // console.log(arrowsRight);

            movieListItem.forEach(item => {
                item.addEventListener('click', e => {
                    // console.log(e.target);
                    e.preventDefault();

                    let elementId = e.target.id;
                    if (elementId !== '') {
                        // console.log(elementId);
                        // console.log(elementId);
                        // getMovieInformation(API_URL_SEARCH_BY_ID, elementId);
                        newParent = e.target.closest('.movie-line-container');

                        setTimeout(() => {
                            newParent.childNodes.forEach(movie => {
                                wrapMovie(movie, 'newParent');
                            });

                            if (
                                parentMovieWrapper &&
                                parentMovieWrapper != newParent
                            ) {
                                // console.log(parentMovieWrapper);
                                parentMovieWrapper.childNodes.forEach(movie => {
                                    wrapMovie(movie, 'oldParent');
                                });
                            }
                        }, 500);

                        setTimeout(() => {
                            getMovieInformation(
                                API_URL_SEARCH_BY_ID,
                                elementId
                            );
                        }, 1000);

                        // setTimeout(() => {}, 1500);
                    }
                });
            });
        } else {
            const moviesElement = document.createElement('div');

            moviesElement.innerHTML = '';
            const emptySearch = document.createElement('div');
            emptySearch.classList.add('container__cancel-search');
            emptySearch.innerHTML = `
                <h2 class="cancel-search__text">
                    У вас пока нет закладок!
                </h2>
        `;
            mainContainer.appendChild(emptySearch);
        }
    },
};

export const showRandomMovie = showMovie.showRandomMovie;
export const showMovieInformation = showMovie.showMovieInformation;
export const showTopMovies = showMovie.showTopMovies;
export const showMovieFromHeader = showMovie.showMovieFromHeader;
