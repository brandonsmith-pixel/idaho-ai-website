const fs = require('fs');

// Variation 1: Light background with tagline
const logo1 = `<svg width="1600" height="400" viewBox="0 0 1600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="400" fill="white"/>
  
  <!-- Mountain Icon -->
  <g transform="translate(80, 120)">
    <path d="M0 160L60 40L120 160H0Z" fill="#1e3a8a" opacity="0.9"/>
    <path d="M40 160L100 40L160 160H40Z" fill="#2563eb"/>
    <path d="M80 160L140 40L200 160H80Z" fill="#3b82f6" opacity="0.8"/>
  </g>
  
  <!-- Company Name -->
  <text x="340" y="215" 
        font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" 
        font-size="72" 
        font-weight="700" 
        fill="#1e3a8a" 
        letter-spacing="-1">TETON GROUP</text>
  
  <!-- Tagline -->
  <text x="340" y="265" 
        font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" 
        font-size="28" 
        font-weight="400" 
        fill="#6b7280" 
        letter-spacing="1">AI Solutions for Business</text>
</svg>`;

// Variation 2: Dark background
const logo2 = `<svg width="1600" height="400" viewBox="0 0 1600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="400" fill="#111827"/>
  
  <!-- Mountain Icon -->
  <g transform="translate(80, 120)">
    <path d="M0 160L60 40L120 160H0Z" fill="#60a5fa" opacity="0.9"/>
    <path d="M40 160L100 40L160 160H40Z" fill="#93c5fd"/>
    <path d="M80 160L140 40L200 160H80Z" fill="#dbeafe" opacity="0.8"/>
  </g>
  
  <!-- Company Name -->
  <text x="340" y="215" 
        font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" 
        font-size="72" 
        font-weight="700" 
        fill="white" 
        letter-spacing="-1">TETON GROUP</text>
  
  <!-- Tagline -->
  <text x="340" y="265" 
        font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" 
        font-size="28" 
        font-weight="400" 
        fill="#9ca3af" 
        letter-spacing="1">AI Solutions for Business</text>
</svg>`;

// Variation 3: Blue gradient background
const logo3 = `<svg width="1600" height="400" viewBox="0 0 1600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1600" height="400" fill="url(#bgGrad)"/>
  
  <!-- Mountain Icon -->
  <g transform="translate(80, 120)">
    <path d="M0 160L60 40L120 160H0Z" fill="white" opacity="0.3"/>
    <path d="M40 160L100 40L160 160H40Z" fill="white" opacity="0.5"/>
    <path d="M80 160L140 40L200 160H80Z" fill="white" opacity="0.7"/>
  </g>
  
  <!-- Company Name -->
  <text x="340" y="215" 
        font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" 
        font-size="72" 
        font-weight="700" 
        fill="white" 
        letter-spacing="-1">TETON GROUP</text>
  
  <!-- Tagline -->
  <text x="340" y="265" 
        font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" 
        font-size="28" 
        font-weight="400" 
        fill="#dbeafe" 
        letter-spacing="1">AI Solutions for Business</text>
</svg>`;

// Variation 4: Compact horizontal
const logo4 = `<svg width="1200" height="300" viewBox="0 0 1200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="300" fill="white"/>
  
  <!-- Mountain Icon -->
  <g transform="translate(60, 90)">
    <path d="M0 120L45 30L90 120H0Z" fill="#1e3a8a" opacity="0.9"/>
    <path d="M30 120L75 30L120 120H30Z" fill="#2563eb"/>
    <path d="M60 120L105 30L150 120H60Z" fill="#3b82f6" opacity="0.8"/>
  </g>
  
  <!-- Company Name -->
  <text x="260" y="170" 
        font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" 
        font-size="56" 
        font-weight="700" 
        fill="#1e3a8a" 
        letter-spacing="-0.5">TETON GROUP</text>
</svg>`;

// Variation 5: Stacked vertical
const logo5 = `<svg width="600" height="800" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="800" fill="white"/>
  
  <!-- Mountain Icon - Centered -->
  <g transform="translate(200, 100)">
    <path d="M0 180L50 20L100 180H0Z" fill="#1e3a8a" opacity="0.9"/>
    <path d="M35 180L85 20L135 180H35Z" fill="#2563eb"/>
    <path d="M70 180L120 20L170 180H70Z" fill="#3b82f6" opacity="0.8"/>
  </g>
  
  <!-- Company Name - Centered -->
  <text x="300" y="480" 
        text-anchor="middle"
        font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" 
        font-size="64" 
        font-weight="700" 
        fill="#1e3a8a" 
        letter-spacing="-0.5">TETON</text>
  
  <text x="300" y="560" 
        text-anchor="middle"
        font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" 
        font-size="64" 
        font-weight="700" 
        fill="#1e3a8a" 
        letter-spacing="-0.5">GROUP</text>
  
  <!-- Tagline -->
  <text x="300" y="620" 
        text-anchor="middle"
        font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" 
        font-size="24" 
        font-weight="400" 
        fill="#6b7280" 
        letter-spacing="1">AI SOLUTIONS</text>
</svg>`;

// Variation 6: Minimal modern
const logo6 = `<svg width="1600" height="400" viewBox="0 0 1600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="400" fill="#f9fafb"/>
  
  <!-- Mountain Icon - Single color -->
  <g transform="translate(80, 120)">
    <path d="M40 160L100 40L160 160H40Z" fill="#1e3a8a"/>
  </g>
  
  <!-- Company Name -->
  <text x="280" y="230" 
        font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" 
        font-size="68" 
        font-weight="600" 
        fill="#1e3a8a" 
        letter-spacing="2">TETON GROUP</text>
</svg>`;

fs.writeFileSync('public/teton-logo-v1-light-tagline.svg', logo1);
fs.writeFileSync('public/teton-logo-v2-dark.svg', logo2);
fs.writeFileSync('public/teton-logo-v3-blue-gradient.svg', logo3);
fs.writeFileSync('public/teton-logo-v4-compact.svg', logo4);
fs.writeFileSync('public/teton-logo-v5-vertical.svg', logo5);
fs.writeFileSync('public/teton-logo-v6-minimal.svg', logo6);

console.log('✓ Created 6 logo variations');
