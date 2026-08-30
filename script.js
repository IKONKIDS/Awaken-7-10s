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
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// Handle screen resizing
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Drop Configuration
const dropCount = 120; // Adjust for more or fewer rain drops
const drops = [];

for (let i = 0; i < dropCount; i++) {
  drops.push({
    x: Math.random() * width,
    y: Math.random() * height,
    length: Math.random() * 20 + 10,
    speed: Math.random() * 10 + 15,
    opacity: Math.random() * 0.4 + 0.2
  });
}

function renderRain() {
  ctx.clearRect(0, 0, width, height);

  // Check if your body is in dark mode (adjust class check as needed)
  const isNightTheme = document.body.classList.contains('theme-night');
  
  // Dynamic rain color based on theme
  const strokeColor = isNightTheme 
    ? 'rgba(180, 225, 255, '  // Bright blue-white for dark themes
    : 'rgba(55, 125, 210, ';  // Deep blue for light sky themes

  for (let i = 0; i < drops.length; i++) {
    const d = drops[i];

    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x - 2, d.y + d.length); // Slight angle to rain
    ctx.strokeStyle = strokeColor + d.opacity + ')';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Move drop down
    d.y += d.speed;
    d.x -= 0.5; // Matches slight angle tilt

    // Reset drop when off screen
    if (d.y > height) {
      d.y = -d.length;
      d.x = Math.random() * width;
    }
  }

  requestAnimationFrame(renderRain);
}

// Start animation
renderRain();