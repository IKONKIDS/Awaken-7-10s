// Awaken Time-Based Theme Switcher (4 Time Blocks)

function updateTimeBasedTheme() {
    const hour = new Date().getHours();
    const body = document.body;
    const html = document.documentElement;
    const metaThemeColor = document.getElementById('theme-color-meta');

    // Remove old classes from both html and body
    const themeClasses = ['theme-morning', 'theme-afternoon', 'theme-sunset', 'theme-night'];
    body.classList.remove(...themeClasses);
    html.classList.remove(...themeClasses);

    let currentTheme = 'theme-morning';
    let themeColorHex = '#99e3fc'; // Morning sky blue (06:00 - 11:59)

    if (hour >= 20 || hour < 6) {
        currentTheme = 'theme-night';
        themeColorHex = '#0c1427'; // Dark night blue (20:00 - 05:59)
    } else if (hour >= 17) {
        currentTheme = 'theme-sunset';
        themeColorHex = '#bfa1ca'; // Sunset lavender/orange (17:00 - 19:59)
    } else if (hour >= 12) {
        currentTheme = 'theme-afternoon';
        themeColorHex = '#70c5ff'; // Vibrant afternoon blue (12:00 - 16:59)
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

// Canvas Rain Animation

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
const dropCount = 120;
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

  const body = document.body;
  let strokeColor = 'rgba(55, 125, 210, '; // Default Morning rain color

  // Dynamic rain color based on active theme
  if (body.classList.contains('theme-night')) {
    strokeColor = 'rgba(180, 225, 255, '; // Bright blue-white for contrast on dark
  } else if (body.classList.contains('theme-sunset')) {
    strokeColor = 'rgba(235, 210, 240, '; // Subtle golden-lavender tint
  } else if (body.classList.contains('theme-afternoon')) {
    strokeColor = 'rgba(35, 95, 175, '; // Slightly deeper blue for bright skies
  }

  for (let i = 0; i < drops.length; i++) {
    const d = drops[i];

    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x - 2, d.y + d.length);
    ctx.strokeStyle = strokeColor + d.opacity + ')';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Move drop down
    d.y += d.speed;
    d.x -= 0.5;

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