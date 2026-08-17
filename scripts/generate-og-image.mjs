// Generates public/og-image.png — the 1200x630 social preview for the site.
// Run: npm run generate:og
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0A0A0A"/>
  <rect x="0" y="0" width="1200" height="8" fill="#EF4444"/>
  <text x="80" y="248" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="800" fill="#FFFFFF" letter-spacing="-2">Dhairya Shah</text>
  <text x="80" y="330" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="700" fill="#EF4444">Full-Stack Developer &amp; DevOps Engineer</text>
  <text x="80" y="392" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#9A9A9A">Six live products shipped end-to-end — Ahmedabad, Gujarat</text>
  <text x="80" y="560" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="22" fill="#6B6B6B">aboutdhairya.me</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile('public/og-image.png');

console.log('Generated public/og-image.png (1200x630)');
