const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log('🔍 Testing OrientaMENTE on Vercel...\n');

  try {
    // Test 1: Homepage
    console.log('1️⃣ Testing homepage...');
    await page.goto('https://orientamente-deploy.vercel.app', { waitUntil: 'networkidle2', timeout: 30000 });
    const title = await page.title();
    console.log('✅ Homepage loaded:', title);

    // Test 2: Login page
    console.log('\n2️⃣ Testing login page...');
    await page.goto('https://orientamente-deploy.vercel.app/auth/login', { waitUntil: 'networkidle2', timeout: 30000 });
    const loginForm = await page.$('form');
    if (loginForm) {
      console.log('✅ Login form found');
    } else {
      console.log('❌ Login form NOT found');
    }

    // Test 3: Try to register
    console.log('\n3️⃣ Testing registration...');
    await page.goto('https://orientamente-deploy.vercel.app/auth/register', { waitUntil: 'networkidle2', timeout: 30000 });

    const emailInput = await page.$('input[type="email"]');
    const passwordInput = await page.$('input[type="password"]');

    if (emailInput && passwordInput) {
      console.log('✅ Registration form found');

      const testEmail = 'test' + Math.floor(Math.random() * 100000) + '@orientamente.org';
      console.log('📝 Creating test user:', testEmail);

      await emailInput.type(testEmail);
      await passwordInput.type('test123');

      const nameInput = await page.$('input[name="name"]');
      if (nameInput) {
        await nameInput.type('Test User Puppeteer');
      }

      const submitButton = await page.$('button[type="submit"]');
      if (submitButton) {
        console.log('🔄 Submitting registration...');
        await submitButton.click();
        await page.waitForTimeout(4000);

        const currentUrl = page.url();
        console.log('📍 Current URL after registration:', currentUrl);

        if (currentUrl.includes('/quiz') || currentUrl.includes('/profile') || !currentUrl.includes('/register')) {
          console.log('✅ Registration successful!');
          console.log('🎉 DATABASE IS WORKING!');
        } else {
          console.log('⚠️ Still on register page');
          const bodyText = await page.evaluate(() => document.body.textContent);
          if (bodyText.includes('error') || bodyText.includes('Error')) {
            console.log('❌ Found error on page');
          }
        }
      }
    } else {
      console.log('❌ Registration form NOT found');
    }

  } catch (error) {
    console.log('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
