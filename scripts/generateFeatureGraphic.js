/**
 * Generates the Play Store feature graphic (1024x500 PNG) from an SVG.
 *
 * Run:  node scripts/generateFeatureGraphic.js
 *
 * Output: assets/play-store-feature.png
 */
const sharp = require('sharp');
const path = require('path');

const WIDTH = 1024;
const HEIGHT = 500;

// Brand palette (mirrors src/utils/theme.ts CANDY_BACKDROP + CANDY_GOLD)
const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4A2E8C"/>
      <stop offset="55%" stop-color="#382066"/>
      <stop offset="100%" stop-color="#1F1240"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stop-color="rgba(167,118,255,0.32)"/>
      <stop offset="100%" stop-color="rgba(31,18,64,0)"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFEDA6"/>
      <stop offset="100%" stop-color="#FFC93C"/>
    </linearGradient>
    <linearGradient id="blue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#A8E4FF"/>
      <stop offset="100%" stop-color="#7FD4FF"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

  <!-- Decorative paw prints -->
  <g fill="rgba(255,201,60,0.10)">
    <text x="70" y="120" font-size="60" font-family="Segoe UI Emoji, Arial">🐾</text>
    <text x="880" y="430" font-size="70" font-family="Segoe UI Emoji, Arial">🐾</text>
    <text x="930" y="90" font-size="44" font-family="Segoe UI Emoji, Arial">🐾</text>
    <text x="40" y="440" font-size="50" font-family="Segoe UI Emoji, Arial">🐾</text>
  </g>

  <!-- Big mascot paw centerpiece -->
  <text x="512" y="200" font-size="130" text-anchor="middle" font-family="Segoe UI Emoji, Arial">🐾</text>

  <!-- Title: Jenny (gold) + Doko (blue) -->
  <text x="512" y="310" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="92" font-weight="900" letter-spacing="2">
    <tspan fill="url(#gold)">Jenny</tspan><tspan fill="url(#blue)">Doko</tspan>
  </text>

  <!-- Tagline -->
  <text x="512" y="365" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#E4D6FF" letter-spacing="1.5">
    A Cozy Logic Adventure
  </text>

  <!-- Feature bullets -->
  <text x="512" y="430" text-anchor="middle" font-family="Segoe UI Emoji, Arial" font-size="26" fill="#C9B6FF">
    🧩 1000 Puzzles  ·  🐶 Daily Challenges  ·  💕 100% Offline
  </text>
</svg>
`;

const outPath = path.join(__dirname, '..', 'assets', 'play-store-feature.png');

sharp(Buffer.from(svg))
  .png()
  .toFile(outPath)
  .then(() => {
    console.log(`Feature graphic written: ${outPath} (${WIDTH}x${HEIGHT})`);
  })
  .catch(err => {
    console.error('Failed to generate feature graphic:', err);
    process.exit(1);
  });
