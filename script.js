// Awaken 7–10s Theme Switcher

function updateTimeBasedTheme() {
    const hour = new Date().getHours();
    const body = document.body;
    const html = document.documentElement;
    const metaThemeColor = document.getElementById('theme-color-meta');

    // Remove old classes from both html and body
    body.classList.remove('theme-morning', 'theme-sunset', 'theme-night');
    html.classList.remove('theme-morning', 'theme-sunset', 'theme-night');

    let currentTheme = 'theme-morning';
    let themeColorHex = '#99e3fc';

    if (hour >= 20 || hour < 6) {
        currentTheme = 'theme-night';
        themeColorHex = '#0d1b2a';
    } else if (hour >= 16) {
        currentTheme = 'theme-sunset';
        themeColorHex = '#f7a072';
    }

    body.classList.add(currentTheme);
    html.classList.add(currentTheme);

    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', themeColorHex);
    }
}

document.addEventListener('DOMContentLoaded', updateTimeBasedTheme);