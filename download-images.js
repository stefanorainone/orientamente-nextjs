const puppeteer = require('puppeteer');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

(async () => {
  console.log('📸 Downloading images from orientamente.org...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  const imagesDir = '/Users/stefanorainone/Downloads/orientamente-nextjs/public/images';

  // Ensure directory exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const pages = [
    'https://www.orientamente.org',
    'https://www.orientamente.org/scuole',
    'https://www.orientamente.org/sportello-psicologico',
    'https://www.orientamente.org/workshop',
    'https://www.orientamente.org/summer-camp'
  ];

  const allImages = new Set();

  for (const url of pages) {
    console.log(`\n📄 Scanning ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);

    const images = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src,
        alt: img.alt || '',
        width: img.width,
        height: img.height
      })).filter(img =>
        img.src &&
        !img.src.includes('data:image') &&
        !img.src.includes('svg') &&
        img.width > 50 && // Skip very small images
        img.height > 50
      );
    });

    console.log(`   Found ${images.length} images`);
    images.forEach(img => allImages.add(JSON.stringify(img)));
  }

  console.log(`\n📥 Total unique images to download: ${allImages.size}\n`);

  let downloaded = 0;
  const imageMap = {};

  for (const imgJson of allImages) {
    const img = JSON.parse(imgJson);
    try {
      const urlObj = new URL(img.src);
      const filename = path.basename(urlObj.pathname) || `image-${downloaded}.jpg`;
      const filepath = path.join(imagesDir, filename);

      // Skip if already downloaded
      if (fs.existsSync(filepath)) {
        console.log(`⏭️  Skipped (exists): ${filename}`);
        imageMap[img.src] = `/images/${filename}`;
        continue;
      }

      await downloadImage(img.src, filepath);
      imageMap[img.src] = `/images/${filename}`;
      downloaded++;
      console.log(`✅ Downloaded: ${filename}`);
      await sleep(500); // Be nice to the server
    } catch (error) {
      console.log(`❌ Failed: ${img.src} - ${error.message}`);
    }
  }

  // Save image map for reference
  fs.writeFileSync(
    path.join(imagesDir, 'image-map.json'),
    JSON.stringify(imageMap, null, 2)
  );

  console.log(`\n✅ Downloaded ${downloaded} new images`);
  console.log(`📁 Images saved to: ${imagesDir}`);

  await browser.close();
})();
