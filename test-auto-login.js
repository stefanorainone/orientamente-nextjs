const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  console.log('🔐 Testing Auto Login After Registration\n');

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    args: ['--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    // Generate unique email to avoid conflicts
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;
    const testName = `Test User ${timestamp}`;
    const testPassword = 'password123';

    console.log('📝 Step 1: Navigate to registration page...');
    await page.goto('http://localhost:3000/auth/register', { waitUntil: 'networkidle0' });
    await sleep(1000);
    console.log('   ✅ Registration page loaded\n');

    console.log('✍️  Step 2: Fill registration form...');
    console.log(`   Name: ${testName}`);
    console.log(`   Email: ${testEmail}`);
    console.log(`   Password: ${testPassword}\n`);

    await page.type('input[name="name"]', testName);
    await page.type('input[name="email"]', testEmail);
    await page.type('input[name="password"]', testPassword);
    console.log('   ✅ Form filled\n');

    console.log('📤 Step 3: Submit registration...');
    await page.click('button[type="submit"]');

    // Wait for registration and auto-login to complete
    await sleep(5000);

    const currentUrl = page.url();
    console.log(`   Current URL: ${currentUrl}\n`);

    // Check if redirected to homepage
    if (currentUrl === 'http://localhost:3000/') {
      console.log('✅ Step 4: Redirected to homepage after registration\n');
    } else {
      console.log('⚠️  Step 4: Not on homepage. URL:', currentUrl, '\n');
    }

    // Check if user is logged in by looking for user menu
    console.log('🔍 Step 5: Verify user is logged in...');
    await sleep(2000);

    const isLoggedIn = await page.evaluate(() => {
      const text = document.body.textContent;
      // Check for logout button or user name in navbar
      return text.includes('Esci') || text.includes('Test User');
    });

    if (isLoggedIn) {
      console.log('   ✅ User is logged in (found logout/user info in navbar)\n');
    } else {
      console.log('   ❌ User does not appear to be logged in\n');
    }

    // Check navbar for user info
    console.log('👤 Step 6: Check navbar for user information...');
    const navbarContent = await page.evaluate(() => {
      const nav = document.querySelector('nav');
      return nav ? nav.textContent : '';
    });

    if (navbarContent.includes(testName) || navbarContent.includes('Esci')) {
      console.log('   ✅ User name or logout button found in navbar\n');
    } else {
      console.log('   ℹ️  Navbar content:', navbarContent.substring(0, 200), '\n');
    }

    // Try to access quiz (only available when logged in)
    console.log('🧪 Step 7: Test access to quiz...');
    await page.goto('http://localhost:3000/quiz', { waitUntil: 'networkidle0' });
    await sleep(2000);

    const quizUrl = page.url();
    if (quizUrl.includes('/quiz')) {
      console.log('   ✅ Can access quiz (user is authenticated)\n');
    } else if (quizUrl.includes('/login')) {
      console.log('   ❌ Redirected to login (user is NOT authenticated)\n');
    } else {
      console.log(`   ⚠️  Unexpected URL: ${quizUrl}\n`);
    }

    // Take screenshot
    await page.screenshot({ path: 'auto-login-test.png', fullPage: true });
    console.log('📸 Screenshot saved: auto-login-test.png\n');

    // Summary
    console.log('='.repeat(70));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(70));

    if (currentUrl === 'http://localhost:3000/' && isLoggedIn && quizUrl.includes('/quiz')) {
      console.log('✅ Registration: SUCCESS');
      console.log('✅ Auto-login: SUCCESS');
      console.log('✅ Redirect to homepage: SUCCESS');
      console.log('✅ User authenticated: SUCCESS');
      console.log('\n🎉 Auto-login after registration is working perfectly!\n');
      console.log('📝 Test user created:');
      console.log(`   Name: ${testName}`);
      console.log(`   Email: ${testEmail}`);
    } else {
      console.log('❌ Some tests failed');
      console.log(`   Registration redirect: ${currentUrl === 'http://localhost:3000/' ? '✅' : '❌'}`);
      console.log(`   User logged in: ${isLoggedIn ? '✅' : '❌'}`);
      console.log(`   Can access quiz: ${quizUrl.includes('/quiz') ? '✅' : '❌'}`);
    }

    console.log('\n⏳ Keeping browser open for 5 seconds...\n');
    await sleep(5000);

  } catch (error) {
    console.error('\n❌ Test error:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
})();
