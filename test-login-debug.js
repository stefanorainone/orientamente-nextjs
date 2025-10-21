const puppeteer = require('puppeteer');

(async () => {
  console.log('🔐 Testing admin login with debug output...\n');

  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();

  try {
    // Clear cookies
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');

    // Login
    console.log('Navigating to login page...');
    await page.goto('http://localhost:3000/auth/login', { waitUntil: 'networkidle0' });

    console.log('Entering credentials...');
    await page.type('input[name="email"]', 'admin@orientamente.org');
    await page.type('input[name="password"]', 'admin123');

    console.log('Submitting login form...');
    await page.click('button[type="submit"]');

    await new Promise(r => setTimeout(r, 5000));

    console.log('\n✅ Login submitted. Check server logs above for [JWT Callback] and [Session Callback] messages.\n');
    console.log('Final URL:', page.url());

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
