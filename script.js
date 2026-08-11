// Awaken 7–10s Theme Switcher

function updateTimeBasedTheme() {
    const hour = new Date().getHours();
    const body = document.body;
    const metaThemeColor = document.getElementById('theme-color-meta');

    // Remove any existing theme classes first
    body.classList.remove('theme-morning', 'theme-sunset', 'theme-night');

    if (hour >= 20 || hour < 6) {
        // Night
        body.classList.add('theme-night');
        if (metaThemeColor) metaThemeColor.setAttribute('content', '#0d1b2a');
    } else if (hour >= 16) {
        // Sunset
        body.classList.add('theme-sunset');
        if (metaThemeColor) metaThemeColor.setAttribute('content', '#cbb4d4');
    } else {
        // Morning
        body.classList.add('theme-morning');
        if (metaThemeColor) metaThemeColor.setAttribute('content', '#99e3fc');
    }
}

document.addEventListener('DOMContentLoaded', updateTimeBasedTheme);