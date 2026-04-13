// Generate professional logo for Teton Group
const fs = require('fs');

const svg = `<svg width="800" height="200" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Mountain Icon - Three overlapping peaks -->
  <g transform="translate(40, 60)">
    <path d="M0 80L30 20L60 80H0Z" fill="#1e3a8a" opacity="0.9"/>
    <path d="M20 80L50 20L80 80H20Z" fill="#2563eb"/>
    <path d="M40 80L70 20L100 80H40Z" fill="#3b82f6" opacity="0.8"/>
  </g>
  
  <!-- Company Name -->
  <text x="170" y="115" 
        font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" 
        font-size="48" 
        font-weight="700" 
        fill="#1e3a8a" 
        letter-spacing="-0.5">TETON GROUP</text>
  
  <!-- Tagline -->
  <text x="170" y="145" 
        font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" 
        font-size="18" 
        font-weight="400" 
        fill="#6b7280" 
        letter-spacing="0.5">AI Solutions for Business</text>
</svg>`;

fs.writeFileSync('public/teton-logo-final.svg', svg);
console.log('✓ SVG logo created at public/teton-logo-final.svg');
