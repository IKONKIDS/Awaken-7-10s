// Awaken 7–10s Theme Switcher

function updateTimeBasedTheme() {
    const hour = new Date().getHours();
    const body = document.body;

    // Remove any existing theme classes first to prevent conflicts
    body.classList.remove('theme-morning', 'theme-sunset', 'theme-night');

    if (hour >= 20 || hour < 6) {
        // 8:00 PM - 5:59 AM -> Night
        body.classList.add('theme-night');
    } else if (hour >= 16) {
        // 4:00 PM - 7:59 PM -> Sunset
        body.classList.add('theme-sunset');
    } else {
        // 6:00 AM - 3:59 PM -> Morning
        body.classList.add('theme-morning');
    }
}

// Run the function as soon as the DOM is ready
document.addEventListener('DOMContentLoaded', updateTimeBasedTheme);