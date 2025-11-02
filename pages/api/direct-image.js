import sharp from 'sharp';
import { fetchImageWithBuiltins } from '../../lib/fetchUtils.js';

// Function to generate different design variants
function generateDesignVariant(design, params) {
  const { width, height, gradientHeight, titleLines, decodedWebsite, startY, lineHeight, fontSize, totalTextHeight, titleWebsiteGap } = params;
  
  switch (design) {
    case 'design1': // 🚨 Classic Red Alert
      return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#FF0000;stop-opacity:0"/>
              <stop offset="30%" style="stop-color:#FF0000;stop-opacity:0.2"/>
              <stop offset="70%" style="stop-color:#FF0000;stop-opacity:0.7"/>
              <stop offset="100%" style="stop-color:#B00000;stop-opacity:0.95"/>
            </linearGradient>
          </defs>
          <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#redGradient)"/>
          <!-- White motion stripe -->
          <rect x="0" y="${startY - 20}" width="${width}" height="4" fill="white" opacity="0.9"/>
          ${titleLines.map((line, index) => `
            <text x="${width/2}" y="${startY + (index * lineHeight) + fontSize}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial Black, Arial, sans-serif" 
                  font-weight="900" 
                  font-size="${fontSize}" 
                  fill="white" 
                  stroke="rgba(0,0,0,0.8)" 
                  stroke-width="2"
                  paint-order="stroke fill"
                  style="letter-spacing: -1px; text-transform: uppercase;">
              ${line}
            </text>
          `).join('')}
          ${decodedWebsite ? `
            <rect x="0" y="${startY + totalTextHeight + titleWebsiteGap}" width="${width}" height="30" fill="#FFD700" opacity="0.9"/>
            <text x="${width/2}" y="${startY + totalTextHeight + titleWebsiteGap + 20}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="700" 
                  font-size="${Math.min(width * 0.018, 20)}" 
                  fill="#B00000" 
                  style="letter-spacing: 2px;">
              ${decodedWebsite.toUpperCase()}
            </text>
          ` : ''}
        </svg>
      `;

    case 'design2': // ⚡ Blue Pulse
      return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#007BFF;stop-opacity:0"/>
              <stop offset="25%" style="stop-color:#007BFF;stop-opacity:0.1"/>
              <stop offset="60%" style="stop-color:#0056B3;stop-opacity:0.6"/>
              <stop offset="100%" style="stop-color:#001F3F;stop-opacity:0.9"/>
            </linearGradient>
          </defs>
          <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#blueGradient)"/>
          ${titleLines.map((line, index) => `
            <text x="${width/2}" y="${startY + (index * lineHeight) + fontSize}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="800" 
                  font-size="${fontSize}" 
                  fill="white" 
                  stroke="rgba(0,123,255,0.7)" 
                  stroke-width="1.5"
                  paint-order="stroke fill"
                  style="letter-spacing: 3px; text-transform: uppercase;">
              ${line}
            </text>
          `).join('')}
          ${decodedWebsite ? `
            <text x="${width/2}" y="${startY + totalTextHeight + titleWebsiteGap + 20}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="500" 
                  font-size="${Math.min(width * 0.02, 22)}" 
                  fill="#FFE347" 
                  stroke="rgba(0,0,0,0.8)" 
                  stroke-width="1"
                  paint-order="stroke fill"
                  style="letter-spacing: 1px; font-style: italic;">
              ${decodedWebsite.toUpperCase()}
            </text>
          ` : ''}
        </svg>
      `;

    case 'design3': // 🟡 Yellow Flash
      return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#000000;stop-opacity:0"/>
              <stop offset="20%" style="stop-color:#000000;stop-opacity:0.3"/>
              <stop offset="70%" style="stop-color:#000000;stop-opacity:0.8"/>
              <stop offset="100%" style="stop-color:#000000;stop-opacity:0.95"/>
            </linearGradient>
          </defs>
          <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#yellowGradient)"/>
          <rect x="0" y="${startY - 30}" width="${width}" height="${totalTextHeight + 60}" fill="#FFD500" opacity="0.9"/>
          ${titleLines.map((line, index) => `
            <text x="${width/2}" y="${startY + (index * lineHeight) + fontSize}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial Black, Arial, sans-serif" 
                  font-weight="900" 
                  font-size="${fontSize}" 
                  fill="#000000" 
                  stroke="rgba(255,255,255,0.8)" 
                  stroke-width="1"
                  paint-order="stroke fill"
                  style="text-transform: uppercase;">
              ${line}
            </text>
          `).join('')}
          ${decodedWebsite ? `
            <text x="${width/2}" y="${startY + totalTextHeight + titleWebsiteGap + 20}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="700" 
                  font-size="${Math.min(width * 0.02, 22)}" 
                  fill="#EAEAEA" 
                  stroke="rgba(0,0,0,0.9)" 
                  stroke-width="1.5"
                  paint-order="stroke fill"
                  style="letter-spacing: 1px;">
              ⚠️ ${decodedWebsite.toUpperCase()}
            </text>
          ` : ''}
        </svg>
      `;

    case 'design4': // 🟥 Gradient Burst Red-Orange
      return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="burstGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#FF4500;stop-opacity:0"/>
              <stop offset="20%" style="stop-color:#FF4500;stop-opacity:0.2"/>
              <stop offset="60%" style="stop-color:#FF2E2E;stop-opacity:0.7"/>
              <stop offset="100%" style="stop-color:#8B0000;stop-opacity:0.95"/>
            </linearGradient>
          </defs>
          <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#burstGradient)"/>
          <!-- BREAKING tag -->
          <rect x="${width * 0.1}" y="${startY - 50}" width="180" height="30" fill="#FFD54F" rx="4"/>
          <text x="${width * 0.1 + 90}" y="${startY - 35}" 
                text-anchor="middle" 
                dominant-baseline="middle"
                font-family="Arial Black, Arial, sans-serif" 
                font-weight="900" 
                font-size="16" 
                fill="#8B0000">
            BREAKING 🔥
          </text>
          ${titleLines.map((line, index) => `
            <text x="${width/2}" y="${startY + (index * lineHeight) + fontSize}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial Black, Arial, sans-serif" 
                  font-weight="900" 
                  font-size="${fontSize}" 
                  fill="white" 
                  stroke="rgba(0,0,0,1)" 
                  stroke-width="3"
                  paint-order="stroke fill"
                  style="text-transform: uppercase;">
              ${line}
            </text>
          `).join('')}
          ${decodedWebsite ? `
            <text x="${width/2}" y="${startY + totalTextHeight + titleWebsiteGap + 20}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="600" 
                  font-size="${Math.min(width * 0.02, 22)}" 
                  fill="#FFD54F" 
                  stroke="rgba(139,0,0,0.8)" 
                  stroke-width="1"
                  paint-order="stroke fill"
                  style="letter-spacing: 2px;">
              ${decodedWebsite.toUpperCase()}
            </text>
          ` : ''}
        </svg>
      `;

    case 'design5': // 📰 White Noise Professional
      return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#202020;stop-opacity:0"/>
              <stop offset="30%" style="stop-color:#303030;stop-opacity:0.3"/>
              <stop offset="70%" style="stop-color:#404040;stop-opacity:0.7"/>
              <stop offset="100%" style="stop-color:#484848;stop-opacity:0.9"/>
            </linearGradient>
            <pattern id="noise" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="4" height="4" fill="#404040"/>
              <circle cx="2" cy="2" r="0.3" fill="#505050"/>
            </pattern>
          </defs>
          <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#grayGradient)"/>
          <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#noise)" opacity="0.05"/>
          ${titleLines.map((line, index) => `
            <text x="${width/2}" y="${startY + (index * lineHeight) + fontSize}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, Helvetica, sans-serif" 
                  font-weight="900" 
                  font-size="${fontSize}" 
                  fill="white" 
                  style="font-stretch: condensed; text-transform: uppercase;">
              ${line}
            </text>
          `).join('')}
          <!-- Red underline bar -->
          <rect x="${width * 0.15}" y="${startY + totalTextHeight + 10}" width="${width * 0.7}" height="4" fill="#FF0000"/>
          ${decodedWebsite ? `
            <!-- Red ticker bar -->
            <rect x="0" y="${startY + totalTextHeight + titleWebsiteGap}" width="${width}" height="28" fill="#FF0000"/>
            <text x="${width/2}" y="${startY + totalTextHeight + titleWebsiteGap + 18}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="600" 
                  font-size="${Math.min(width * 0.018, 20)}" 
                  fill="white" 
                  style="letter-spacing: 2px;">
              ${decodedWebsite.toUpperCase()}
            </text>
          ` : ''}
        </svg>
      `;

    case 'design6': // 🧨 Cyber Alert
      return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#FF004D;stop-opacity:0"/>
              <stop offset="25%" style="stop-color:#FF004D;stop-opacity:0.2"/>
              <stop offset="65%" style="stop-color:#CC0039;stop-opacity:0.6"/>
              <stop offset="100%" style="stop-color:#1A0033;stop-opacity:0.9"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#cyberGradient)"/>
          <!-- Glitch scanlines -->
          <rect x="0" y="${startY - 10}" width="${width}" height="2" fill="#00FFFF" opacity="0.6"/>
          <rect x="0" y="${startY + 20}" width="${width}" height="1" fill="#FF004D" opacity="0.4"/>
          ${titleLines.map((line, index) => `
            <text x="${width/2}" y="${startY + (index * lineHeight) + fontSize}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="monospace" 
                  font-weight="700" 
                  font-size="${fontSize}" 
                  fill="white" 
                  stroke="#FF004D" 
                  stroke-width="1"
                  paint-order="stroke fill"
                  filter="url(#glow)"
                  style="text-transform: uppercase; letter-spacing: 2px;">
              ${line}
            </text>
          `).join('')}
          ${decodedWebsite ? `
            <text x="${width/2}" y="${startY + totalTextHeight + titleWebsiteGap + 20}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="monospace" 
                  font-weight="400" 
                  font-size="${Math.min(width * 0.02, 22)}" 
                  fill="#00FFFF" 
                  stroke="rgba(0,255,255,0.3)" 
                  stroke-width="0.5"
                  paint-order="stroke fill"
                  style="letter-spacing: 1px; font-style: italic;">
              ${decodedWebsite.toUpperCase()}
            </text>
          ` : ''}
        </svg>
      `;

    case 'design7': // Red Flash Impact
      return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="redFlashGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#FF1E00;stop-opacity:0"/>
              <stop offset="20%" style="stop-color:#FF1E00;stop-opacity:0.3"/>
              <stop offset="60%" style="stop-color:#CC1500;stop-opacity:0.7"/>
              <stop offset="100%" style="stop-color:#7A0000;stop-opacity:0.95"/>
            </linearGradient>
          </defs>
          <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#redFlashGradient)"/>
          ${titleLines.map((line, index) => `
            <text x="${width/2}" y="${startY + (index * lineHeight) + fontSize}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Impact, Arial Black, sans-serif" 
                  font-weight="900" 
                  font-size="${fontSize}" 
                  fill="white" 
                  stroke="rgba(0,0,0,1)" 
                  stroke-width="2.5"
                  paint-order="stroke fill"
                  style="text-transform: uppercase; font-stretch: condensed;">
              ${line}
            </text>
          `).join('')}
          ${decodedWebsite ? `
            <text x="${width/2}" y="${startY + totalTextHeight + titleWebsiteGap + 20}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="700" 
                  font-size="${Math.min(width * 0.02, 22)}" 
                  fill="#FFD700" 
                  stroke="rgba(122,0,0,0.8)" 
                  stroke-width="1"
                  paint-order="stroke fill"
                  style="letter-spacing: 1px; font-stretch: condensed;">
              ${decodedWebsite.toUpperCase()}
            </text>
          ` : ''}
        </svg>
      `;

    case 'design8': // Electric Cyan Pop
      return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#00E5FF;stop-opacity:0"/>
              <stop offset="25%" style="stop-color:#00E5FF;stop-opacity:0.2"/>
              <stop offset="60%" style="stop-color:#0099CC;stop-opacity:0.6"/>
              <stop offset="100%" style="stop-color:#001F3F;stop-opacity:0.9"/>
            </linearGradient>
          </defs>
          <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#cyanGradient)"/>
          ${titleLines.map((line, index) => `
            <text x="${width/2}" y="${startY + (index * lineHeight) + fontSize}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial Black, sans-serif" 
                  font-weight="900" 
                  font-size="${fontSize}" 
                  fill="white" 
                  stroke="rgba(0,31,63,0.8)" 
                  stroke-width="2"
                  paint-order="stroke fill"
                  style="text-transform: uppercase; letter-spacing: 2px;">
              ${line}
            </text>
          `).join('')}
          ${decodedWebsite ? `
            <text x="${width/2}" y="${startY + totalTextHeight + titleWebsiteGap + 20}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="600" 
                  font-size="${Math.min(width * 0.02, 22)}" 
                  fill="#0FFFC6" 
                  stroke="rgba(0,31,63,0.7)" 
                  stroke-width="1"
                  paint-order="stroke fill"
                  style="letter-spacing: 1.5px;">
              ${decodedWebsite.toUpperCase()}
            </text>
          ` : ''}
        </svg>
      `;

    case 'design9': // Black + Red Pulse
      return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blackRedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#000000;stop-opacity:0"/>
              <stop offset="30%" style="stop-color:#000000;stop-opacity:0.4"/>
              <stop offset="70%" style="stop-color:#8B0000;stop-opacity:0.7"/>
              <stop offset="100%" style="stop-color:#D60000;stop-opacity:0.95"/>
            </linearGradient>
          </defs>
          <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#blackRedGradient)"/>
          ${titleLines.map((line, index) => `
            <text x="${width/2}" y="${startY + (index * lineHeight) + fontSize}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="700" 
                  font-size="${fontSize}" 
                  fill="white" 
                  stroke="rgba(0,0,0,0.9)" 
                  stroke-width="2"
                  paint-order="stroke fill"
                  style="text-transform: uppercase; letter-spacing: 1px;">
              ${line}
            </text>
          `).join('')}
          ${decodedWebsite ? `
            <text x="${width/2}" y="${startY + totalTextHeight + titleWebsiteGap + 20}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="400" 
                  font-size="${Math.min(width * 0.02, 22)}" 
                  fill="#FFB703" 
                  stroke="rgba(0,0,0,0.8)" 
                  stroke-width="1"
                  paint-order="stroke fill"
                  style="letter-spacing: 1px; font-style: italic;">
              ${decodedWebsite.toUpperCase()}
            </text>
          ` : ''}
        </svg>
      `;

    case 'design10': // Amber Alert
      return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="amberGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#FF8C00;stop-opacity:0"/>
              <stop offset="25%" style="stop-color:#FF8C00;stop-opacity:0.2"/>
              <stop offset="65%" style="stop-color:#CC6600;stop-opacity:0.6"/>
              <stop offset="100%" style="stop-color:#800000;stop-opacity:0.9"/>
            </linearGradient>
          </defs>
          <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#amberGradient)"/>
          ${titleLines.map((line, index) => `
            <text x="${width/2}" y="${startY + (index * lineHeight) + fontSize}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial Black, sans-serif" 
                  font-weight="900" 
                  font-size="${fontSize}" 
                  fill="white" 
                  stroke="rgba(128,0,0,0.9)" 
                  stroke-width="2"
                  paint-order="stroke fill"
                  style="text-transform: uppercase; font-stretch: condensed;">
              ${line}
            </text>
          `).join('')}
          ${decodedWebsite ? `
            <text x="${width/2}" y="${startY + totalTextHeight + titleWebsiteGap + 20}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="700" 
                  font-size="${Math.min(width * 0.02, 22)}" 
                  fill="#FFD54F" 
                  stroke="rgba(128,0,0,0.7)" 
                  stroke-width="1"
                  paint-order="stroke fill"
                  style="letter-spacing: 1px; font-style: italic;">
              ${decodedWebsite.toUpperCase()}
            </text>
          ` : ''}
        </svg>
      `;

    case 'design11': // Blue Ribbon News
      return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blueRibbonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#0055FF;stop-opacity:0"/>
              <stop offset="20%" style="stop-color:#0055FF;stop-opacity:0.2"/>
              <stop offset="60%" style="stop-color:#003399;stop-opacity:0.6"/>
              <stop offset="100%" style="stop-color:#000C66;stop-opacity:0.9"/>
            </linearGradient>
          </defs>
          <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#blueRibbonGradient)"/>
          ${titleLines.map((line, index) => `
            <text x="${width/2}" y="${startY + (index * lineHeight) + fontSize}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="900" 
                  font-size="${fontSize}" 
                  fill="white" 
                  stroke="rgba(0,12,102,0.8)" 
                  stroke-width="1.5"
                  paint-order="stroke fill"
                  style="text-transform: uppercase; letter-spacing: 2px;">
              ${line}
            </text>
          `).join('')}
          ${decodedWebsite ? `
            <text x="${width/2}" y="${startY + totalTextHeight + titleWebsiteGap + 20}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="700" 
                  font-size="${Math.min(width * 0.02, 22)}" 
                  fill="#9DC9FF" 
                  stroke="rgba(0,12,102,0.7)" 
                  stroke-width="1"
                  paint-order="stroke fill"
                  style="letter-spacing: 1px; font-style: italic;">
              ${decodedWebsite.toUpperCase()}
            </text>
          ` : ''}
        </svg>
      `;

    case 'design12': // Metallic Red Signal
      return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="metallicGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#C70039;stop-opacity:0"/>
              <stop offset="25%" style="stop-color:#C70039;stop-opacity:0.3"/>
              <stop offset="70%" style="stop-color:#8B0029;stop-opacity:0.7"/>
              <stop offset="100%" style="stop-color:#2C2C2C;stop-opacity:0.9"/>
            </linearGradient>
            <filter id="softShadow">
              <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
            </filter>
          </defs>
          <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#metallicGradient)"/>
          ${titleLines.map((line, index) => `
            <text x="${width/2}" y="${startY + (index * lineHeight) + fontSize}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial Black, sans-serif" 
                  font-weight="900" 
                  font-size="${fontSize}" 
                  fill="white" 
                  filter="url(#softShadow)"
                  style="text-transform: uppercase; letter-spacing: 1px;">
              ${line}
            </text>
          `).join('')}
          ${decodedWebsite ? `
            <text x="${width/2}" y="${startY + totalTextHeight + titleWebsiteGap + 20}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="500" 
                  font-size="${Math.min(width * 0.02, 22)}" 
                  fill="#CCCCCC" 
                  stroke="rgba(44,44,44,0.6)" 
                  stroke-width="0.5"
                  paint-order="stroke fill"
                  style="letter-spacing: 1px;">
              ${decodedWebsite.toUpperCase()}
            </text>
          ` : ''}
        </svg>
      `;

    default: // Default design (original)
      return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:0"/>
              <stop offset="15%" style="stop-color:rgb(0,0,0);stop-opacity:0.1"/>
              <stop offset="40%" style="stop-color:rgb(0,0,0);stop-opacity:0.4"/>
              <stop offset="70%" style="stop-color:rgb(0,0,0);stop-opacity:0.7"/>
              <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0.95"/>
            </linearGradient>
          </defs>
          <rect x="0" y="${height - gradientHeight}" width="${width}" height="${gradientHeight}" fill="url(#gradient)"/>
          ${titleLines.map((line, index) => `
            <text x="${width/2}" y="${startY + (index * lineHeight) + fontSize}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="900" 
                  font-size="${fontSize}" 
                  fill="white" 
                  stroke="rgba(0,0,0,0.9)" 
                  stroke-width="1.5"
                  paint-order="stroke fill">
              ${line}
            </text>
          `).join('')}
          ${decodedWebsite ? `
            <text x="${width/2}" y="${startY + totalTextHeight + titleWebsiteGap + 20}" 
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  font-family="Arial, sans-serif" 
                  font-weight="700" 
                  font-size="${Math.min(width * 0.02, 22)}" 
                  fill="#FFD700" 
                  stroke="rgba(0,0,0,0.7)" 
                  stroke-width="0.8"
                  paint-order="stroke fill"
                  style="letter-spacing: 1.5px;">
              ${decodedWebsite.toUpperCase()}
            </text>
          ` : ''}
        </svg>
      `;
  }
}

export default async function handler(req, res) {
  const { image, title = "", website = "", format = "jpeg", w = "1080", h = "1350", design = "default" } = req.query;

  // Validate required parameters
  if (!image) {
    res.status(400).json({ 
      error: "Missing required parameter 'image'",
      usage: "?image=IMAGE_URL&title=TITLE&website=WEBSITE&format=jpeg|png&w=WIDTH&h=HEIGHT&design=default|design1|design2|design3|design4|design5|design6|design7|design8|design9|design10|design11|design12",
      example: "/api/direct-image?image=https://picsum.photos/800/600&title=Your%20Title&website=YourSite.com&design=design7",
      designs: {
        "default": "Modern gradient with clean typography",
        "design1": "🚨 Classic Red Alert - Breaking news style",
        "design2": "⚡ Blue Pulse - Modern tech-news feel", 
        "design3": "🟡 Yellow Flash - Social-media viral style",
        "design4": "🟥 Gradient Burst - Red-orange YouTube style",
        "design5": "📰 White Noise - Professional newsroom look",
        "design6": "🧨 Cyber Alert - Futuristic breaking trend",
        "design7": "🔥 Red Flash Impact - Urgent viral alert style",
        "design8": "⚡ Electric Cyan Pop - Fresh futuristic tech vibe",
        "design9": "🖤 Black + Red Pulse - Energetic attention-grabber",
        "design10": "🟠 Amber Alert - Authoritative newsroom alert",
        "design11": "🔵 Blue Ribbon News - Reliable corporate news",
        "design12": "🔴 Metallic Red Signal - Modern polished breaking update"
      }
    });
    return;
  }

  try {
    console.log('Direct image request for:', image);
    
    // Fetch the base image
    const imageResponse = await fetchImageWithBuiltins(image);
    
    if (!imageResponse || !imageResponse.ok) {
      console.error('Failed to fetch image response for:', image);
      res.status(404).json({ error: "Failed to fetch image from URL" });
      return;
    }

    // Extract buffer from response
    const arrayBuffer = await imageResponse.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    if (!imageBuffer || imageBuffer.length === 0) {
      console.error('Empty image buffer for:', image);
      res.status(404).json({ error: "Received empty image data" });
      return;
    }

    console.log('Image buffer size:', imageBuffer.length, 'bytes');

    // Parse dimensions
    const width = parseInt(w) || 1080;
    const height = parseInt(h) || 1350;
    
    console.log('Target dimensions:', width, 'x', height);
    
    // Process image with sharp - resize and crop to fit aspect ratio
    let processedImage = sharp(imageBuffer)
      .resize(width, height, { 
        fit: 'cover',
        position: 'center' 
      });

    // Add text overlay if title is provided
    if (title && title.trim()) {
      try {
        const decodedTitle = decodeURIComponent(title);
        const decodedWebsite = website ? decodeURIComponent(website) : '';
        
        // Create a gradient overlay using Sharp - make it higher for default design
        const gradientHeight = Math.floor(height * (design === 'default' ? 0.55 : 0.35)); // Higher coverage for default design
        
        // Function to wrap text into multiple lines with better width calculation
        const wrapText = (text, maxWidth, fontSize) => {
          const words = text.split(' ');
          const lines = [];
          let currentLine = '';
          
          // Approximate character width (more accurate)
          const charWidth = fontSize * 0.6;
          const maxChars = Math.floor(maxWidth / charWidth);
          
          for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            if (testLine.length <= maxChars) {
              currentLine = testLine;
            } else {
              if (currentLine) {
                lines.push(currentLine);
                currentLine = word;
              } else {
                // Word is too long, break it
                lines.push(word.substring(0, maxChars - 3) + '...');
                currentLine = '';
              }
            }
          }
          if (currentLine) {
            lines.push(currentLine);
          }
          return lines.slice(0, 2); // Max 2 lines for better readability
        };
        
        // Calculate font size and text area with more padding
        const fontSize = Math.min(width * 0.045, 44); // Slightly smaller
        const textPadding = width * 0.15; // Increased from 8% to 15% padding on each side
        const maxTextWidth = width - (textPadding * 2);
        const titleLines = wrapText(decodedTitle.toUpperCase(), maxTextWidth, fontSize);
        const lineHeight = fontSize * 1.15;
        const totalTextHeight = titleLines.length * lineHeight;
        
        // Add spacing between title and website (increase from 100 to 140)
        const titleWebsiteGap = decodedWebsite ? 60 : 20; // Extra gap if website exists
        const startY = height - 140 - (totalTextHeight / 2) - titleWebsiteGap;
        
        // Create SVG with design-specific styling
        const svgOverlay = generateDesignVariant(design, {
          width,
          height,
          gradientHeight,
          titleLines,
          decodedWebsite,
          startY,
          lineHeight,
          fontSize,
          totalTextHeight,
          titleWebsiteGap
        });

        console.log('Adding text overlay with title:', decodedTitle.substring(0, 20) + '...');
        console.log('Text wrapped into', titleLines.length, 'lines:', titleLines);
        
        // Composite the SVG overlay
        processedImage = processedImage.composite([{
          input: Buffer.from(svgOverlay),
          blend: 'over'
        }]);
        
      } catch (overlayError) {
        console.error('Error creating text overlay:', overlayError.message);
        // Continue without overlay if there's an error
      }
    } else {
      console.log('Processing image without overlay - no title provided');
    }

    // Convert to final format
    let outputBuffer;
    const outputFormat = format.toLowerCase() === 'png' ? 'png' : 'jpeg';
    
    console.log('Converting to format:', outputFormat);
    
    if (outputFormat === 'png') {
      outputBuffer = await processedImage.png({ 
        compressionLevel: 6,
        quality: 90 
      }).toBuffer();
    } else {
      outputBuffer = await processedImage.jpeg({ 
        quality: 90,
        progressive: true
      }).toBuffer();
    }

    console.log('Output buffer size:', outputBuffer.length, 'bytes');

    // Set appropriate headers
    res.setHeader('Content-Type', `image/${outputFormat}`);
    res.setHeader('Content-Length', outputBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow cross-origin requests
    
    // Send the image directly
    res.send(outputBuffer);

  } catch (error) {
    console.error('Error generating direct image:', error);
    res.status(500).json({ 
      error: "Failed to generate image",
      details: error.message 
    });
  }
}