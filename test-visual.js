const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  console.log('👁️  Visual test - Manually check the navigation\n');
  console.log('This will open a browser window. Please check:');
  console.log('  1. Desktop menu shows all links');
  console.log('  2. Click on each nav link to test');
  console.log('  3. Resize to mobile and test hamburger menu');
  console.log('  4. Close the browser when done\n');

  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    args: ['--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  console.log('✅ Browser opened at http://localhost:3000');
  console.log('📝 Test these manually:');
  console.log('   - Click "Scuole" in navbar');
  console.log('   - Click "Sportello Psicologico" in navbar');
  console.log('   - Click "Workshop" in navbar');
  console.log('   - Click "Summer Camp" in navbar');
  console.log('   - Click "Quiz" in navbar');
  console.log('   - Click "Contatti" in navbar');
  console.log('\n📱 For mobile test:');
  console.log('   - Open DevTools (F12)');
  console.log('   - Click device toolbar icon (or Ctrl+Shift+M)');
  console.log('   - Select a mobile device (e.g., iPhone 12)');
  console.log('   - Click hamburger menu icon');
  console.log('   - Test clicking links in mobile menu');
  console.log('\n⏱️  Browser will stay open for 5 minutes...\n');

  // Keep browser open for 5 minutes
  await sleep(300000);

  console.log('Closing browser...');
  await browser.close();
})();
