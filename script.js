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
    let themeColorHex = '#99e3fc'; // Morning sky blue

    if (hour >= 20 || hour < 6) {
        currentTheme = 'theme-night';
        themeColorHex = '#0c1427'; // Matches CSS solid night blue
    } else if (hour >= 16) {
        currentTheme = 'theme-sunset';
        themeColorHex = '#bfa1ca'; // Matches CSS sunset top/bottom lavender
    }

    body.classList.add(currentTheme);
    html.classList.add(currentTheme);

    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', themeColorHex);
    }
}

// Run immediately when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    updateTimeBasedTheme();
    
    // Check every 5 minutes so theme automatically switches without manual refresh
    setInterval(updateTimeBasedTheme, 5 * 60 * 1000);
});