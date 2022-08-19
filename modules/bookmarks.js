import { showMovieFromHeader } from './show_html.js';

const mainContainer = document.querySelector('.container');

let bookmarksPage = false;

const bookmark = {
    saveBookmark(data) {
        // console.log(data);
        const bookmark = {
            kinopoiskId: data.kinopoiskId,
            nameRu: data.nameRu,
            nameEn: data.nameEn,
            nameOriginal: data.nameOriginal,
            genres: data.genres,
            posterUrlPreview: data.posterUrlPreview,
            ratingKinopoisk: data.ratingKinopoisk,
        };
        // console.log(bookmark);
        // console.log(localStorage.getItem('bookmarks').length);

        if (
            !localStorage.getItem('bookmarks') ||
            localStorage.getItem('bookmarks') === null ||
            localStorage.getItem('bookmarks').length <= 2
        ) {
            let bookmarks = [];
            bookmarks.push(bookmark);
            // console.log(bookmarks);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            addOrDeleteBookmarksPush('add');
        } else {
            let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

            let hasSameMovie = bookmarks.find(
                movie => movie.kinopoiskId === bookmark.kinopoiskId
            );
            let indexSameMovie = bookmarks.findIndex(
                movie => movie.kinopoiskId === bookmark.kinopoiskId
            );

            if (hasSameMovie) {
                bookmarks.splice(indexSameMovie, 1);
                // console.log();
                // console.log(bookmarks);
                addOrDeleteBookmarksPush('delete');
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                if (bookmarksPage === true) {
                    // console.log(yes);
                    mainContainer.innerHTML = '';
                    fetchBookmarks();
                }
            } else {
                bookmarks.push(bookmark);
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                addOrDeleteBookmarksPush('add');
            }
        }
    },

    fetchBookmarks() {
        const bookmarks = {
            items: '',
        };
        bookmarks.items = JSON.parse(localStorage.getItem('bookmarks'));
        showMovieFromHeader(bookmarks);
    },

    addOrDeleteBookmarksPush(data) {
        const pushBookmark = document.createElement('div');
        pushBookmark.classList.add('bookmarks-push');
        pushBookmark.innerHTML = `<p class="push-text">Закладка ${
            data === 'add' ? 'добавлена' : 'удалена'
        }!</p>`;

        document.querySelector('body').append(pushBookmark);

        setTimeout(() => {
            document.querySelector('.bookmarks-push ').style.opacity = '1';
            document.querySelector('.bookmarks-push ').style.transform =
                'translateY(0)';
        }, 500);
        setTimeout(() => {
            document.querySelector('.bookmarks-push ').style.opacity = '0';
            document.querySelector('.bookmarks-push ').style.transform =
                'translateY(-100%)';
        }, 2000);
        setTimeout(() => {
            document.querySelector('.bookmarks-push ').remove();
        }, 2500);
    },
};

export const saveBookmark = bookmark.saveBookmark;
export const fetchBookmarks = bookmark.fetchBookmarks;
export const addOrDeleteBookmarksPush = bookmark.addOrDeleteBookmarksPush;
