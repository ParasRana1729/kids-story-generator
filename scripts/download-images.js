const https = require('https');
const fs = require('fs');
const path = require('path');

// Free-to-use placeholder images from picsum.photos
const images = {
  'princess': 'https://picsum.photos/400/400?random=1',
  'knight': 'https://picsum.photos/400/400?random=2',
  'dragon': 'https://picsum.photos/400/400?random=3',
  'wizard': 'https://picsum.photos/400/400?random=4',
  'fairy': 'https://picsum.photos/400/400?random=5',
  'pirate': 'https://picsum.photos/400/400?random=6',
  'default': 'https://picsum.photos/400/400?random=7'
};

const downloadImage = (url, filename) => {
  const filepath = path.join(__dirname, '..', 'public', 'images', 'characters', filename);
  
  https.get(url, (response) => {
    // Handle redirects
    if (response.statusCode === 302 || response.statusCode === 301) {
      https.get(response.headers.location, (finalResponse) => {
        if (finalResponse.statusCode === 200) {
          const fileStream = fs.createWriteStream(filepath);
          finalResponse.pipe(fileStream);
          
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded: ${filename}`);
          });
        } else {
          console.error(`Failed to download ${filename}: ${finalResponse.statusCode}`);
        }
      });
    } else if (response.statusCode === 200) {
      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filename}`);
      });
    } else {
      console.error(`Failed to download ${filename}: ${response.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
};

// Create the characters directory if it doesn't exist
const charactersDir = path.join(__dirname, '..', 'public', 'images', 'characters');
if (!fs.existsSync(charactersDir)) {
  fs.mkdirSync(charactersDir, { recursive: true });
}

// Download all images
Object.entries(images).forEach(([character, url]) => {
  downloadImage(url, `${character}.png`);
}); 