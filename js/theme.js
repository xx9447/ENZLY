const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function updateThemeBtn(theme) {
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark-theme' ? '☀️' : '🌙';
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    body.className = savedTheme;
    updateThemeBtn(savedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.className = 'light-theme';
            localStorage.setItem('theme', 'light-theme');
            updateThemeBtn('light-theme');
        } else {
            body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
            updateThemeBtn('dark-theme');
        }
    });
}

initTheme();
