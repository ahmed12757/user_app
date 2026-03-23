const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, '../public/image/logo.png');
const outputDir = path.join(__dirname, '../public/image');
const publicDir = path.join(__dirname, '../public');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
    try {
        console.log('Generating icons...');
        
        // 192x192
        await sharp(input)
            .resize(192, 192)
            .toFile(path.join(outputDir, 'pwa-192x192.png'));
        
        // 512x512
        await sharp(input)
            .resize(512, 512)
            .toFile(path.join(outputDir, 'pwa-512x512.png'));
            
        // Apple Touch Icon
        await sharp(input)
            .resize(180, 180)
            .toFile(path.join(outputDir, 'apple-touch-icon.png'));

        // Favicon (ICO) - simplified as 32x32 PNG for web
        await sharp(input)
            .resize(32, 32)
            .toFile(path.join(publicDir, 'favicon.ico'));

        console.log('Icons generated successfully!');
    } catch (err) {
        console.error('Error generating icons:', err);
    }
}

generateIcons();
