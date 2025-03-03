#!/usr/bin/env node

/**
 * This script will help you generate the necessary image assets
 * for the multiplication game.
 * 
 * To use:
 * 1. Install the required dependencies:
 *    npm install jimp
 * 
 * 2. Run this script:
 *    node generate-images.js
 */

const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

// Ensure the public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create a simple multiplication symbol logo
async function generateImages() {
  try {
    // Create images with different sizes
    const sizes = [16, 32, 64, 192, 512];
    
    for (const size of sizes) {
      const image = new Jimp(size, size, '#3B82F6'); // Blue background
      
      // Add text (× symbol) if the image is large enough
      if (size >= 64) {
        const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
        image.print(
          font,
          size / 2 - 24,
          size / 2 - 40,
          '×',
          60,
          60
        );
      } else if (size >= 32) {
        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
        image.print(
          font,
          size / 2 - 12,
          size / 2 - 20,
          '×',
          30,
          30
        );
      }
      
      // Save the image
      if (size === 16 || size === 32 || size === 64) {
        // These sizes will be part of the favicon
        await image.writeAsync(path.join(publicDir, `logo${size}.png`));
      } else {
        // Larger sizes for PWA icons
        await image.writeAsync(path.join(publicDir, `logo${size}.png`));
      }
    }
    
    console.log('Images generated successfully!');
    console.log('Note: To create the favicon.ico file, you\'ll need to combine logo16.png, logo32.png, and logo64.png');
    console.log('You can use an online tool like https://favicon.io/favicon-converter/');
    
  } catch (error) {
    console.error('Error generating images:', error);
  }
}

generateImages();
