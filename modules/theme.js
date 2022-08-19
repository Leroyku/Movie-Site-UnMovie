const ball = document.querySelector('.toggle-ball');
const toggleTheme = document.querySelector('.toggle');

const themeMover = {
    toggleThemeFunc() {
        toggleTheme.addEventListener('click', e => {
            e.preventDefault();
            document.documentElement.classList.remove('light', 'dark');

            if (toggleTheme.id === 'light') {
                document.documentElement.classList.add('dark');
                toggleTheme.id = 'dark';
                localStorage.removeItem('theme');
                localStorage.setItem(
                    'theme',
                    JSON.stringify(document.documentElement.classList[0])
                );
            } else if (toggleTheme.id === 'dark') {
                document.documentElement.classList.add('light');
                toggleTheme.id = 'light';
                localStorage.removeItem('theme');
                localStorage.setItem(
                    'theme',
                    JSON.stringify(document.documentElement.classList[0])
                );
            }

            if (document.querySelector('.gradient-featured')) {
                document
                    .querySelector('.gradient-featured')
                    .classList.toggle('active');
            }
            ball.classList.toggle('active');
        });
    },

    checkTheme() {
        const theme = localStorage.getItem('theme');

        if (theme) {
            if (theme === '"light"') {
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add('light');
                toggleTheme.id = 'light';
                localStorage.removeItem('theme');
                localStorage.setItem(
                    'theme',
                    JSON.stringify(document.documentElement.classList[0])
                );
            }

            if (theme === '"dark"') {
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add('dark');
                toggleTheme.id = 'dark';
                localStorage.removeItem('theme');
                localStorage.setItem(
                    'theme',
                    JSON.stringify(document.documentElement.classList[0])
                );
                ball.classList.toggle('active');
            }
        }

        if (theme === null || typeof theme === 'undefined') {
            localStorage.setItem(
                'theme',
                JSON.stringify(document.documentElement.classList[0])
            );
        }
    },
};

export const toggleThemeFunc = themeMover.toggleThemeFunc;
export const checkTheme = themeMover.checkTheme;
