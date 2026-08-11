// Awaken 7–10s
// Future enhancements will go here.
function updateTimeBasedTheme() {
    const hour = new Date().getHours();
    const body = document.body;

    body.classList.remove('theme-morning', 'theme-sunset', 'theme-night');

    if (hour >= 6 && hour < 17) {
        // 6:00 AM - 4:59 PM
        body.classList.add('theme-morning');
    } else if (hour >= 17 && hour < 20) {
        // 5:00 PM - 7:59 PM
        body.classList.add('theme-sunset');
    } else {
        // 8:00 PM - 5:59 AM
        body.classList.add('theme-night');
    }
}

document.addEventListener('DOMContentLoaded', updateTimeBasedTheme);