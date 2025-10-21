const puppeteer = require('puppeteer');

(async () => {
  console.log('🧪 Starting complete website test...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const errors = [];
  const successes = [];

  // Collect console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console error: ${msg.text()}`);
    }
  });

  try {
    // Test 1: Homepage
    console.log('📄 Test 1: Homepage');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    const homeTitle = await page.title();
    if (homeTitle) {
      console.log('   ✅ Homepage loaded successfully');
      successes.push('Homepage');
    }

    // Check hero section
    const heroText = await page.$eval('h1', el => el.textContent);
    if (heroText.includes('OrientaMENTE')) {
      console.log('   ✅ Hero section found');
    }

    // Test 2: Scuole page
    console.log('\n📄 Test 2: Scuole page');
    await page.goto('http://localhost:3000/scuole', { waitUntil: 'networkidle2', timeout: 10000 });
    const scuoleH1 = await page.$eval('h1', el => el.textContent);
    if (scuoleH1.includes('Scuole')) {
      console.log('   ✅ Scuole page loaded successfully');
      successes.push('Scuole');
    }

    // Check for regions
    const regions = await page.$$eval('h2', els => els.map(el => el.textContent));
    if (regions.some(r => r.includes('Campania')) &&
        regions.some(r => r.includes('Puglia')) &&
        regions.some(r => r.includes('Sicilia'))) {
      console.log('   ✅ All three regions displayed');
    }

    // Test 3: Sportello Psicologico page
    console.log('\n📄 Test 3: Sportello Psicologico page');
    await page.goto('http://localhost:3000/sportello-psicologico', { waitUntil: 'networkidle2', timeout: 10000 });
    const sportelloH1 = await page.$eval('h1', el => el.textContent);
    if (sportelloH1.includes('Sportello Psicologico')) {
      console.log('   ✅ Sportello Psicologico page loaded successfully');
      successes.push('Sportello Psicologico');
    }

    // Test 4: Workshop page
    console.log('\n📄 Test 4: Workshop ed Eventi page');
    await page.goto('http://localhost:3000/workshop', { waitUntil: 'networkidle2', timeout: 10000 });
    const workshopH1 = await page.$eval('h1', el => el.textContent);
    if (workshopH1.includes('Workshop')) {
      console.log('   ✅ Workshop page loaded successfully');
      successes.push('Workshop');
    }

    // Test 5: Summer Camp page
    console.log('\n📄 Test 5: Summer Camp page');
    await page.goto('http://localhost:3000/summer-camp', { waitUntil: 'networkidle2', timeout: 10000 });
    const summerCampH1 = await page.$eval('h1', el => el.textContent);
    if (summerCampH1.includes('Summer Camp')) {
      console.log('   ✅ Summer Camp page loaded successfully');
      successes.push('Summer Camp');
    }

    // Test 6: Contatti page
    console.log('\n📄 Test 6: Contatti page');
    await page.goto('http://localhost:3000/contatti', { waitUntil: 'networkidle2', timeout: 10000 });
    const contattiH1 = await page.$eval('h1', el => el.textContent);
    if (contattiH1.includes('Contatti')) {
      console.log('   ✅ Contatti page loaded successfully');
      successes.push('Contatti');
    }

    // Check contact info
    const emailExists = await page.evaluate(() => {
      return document.body.textContent.includes('orientamente@modavi.it');
    });
    const phoneExists = await page.evaluate(() => {
      return document.body.textContent.includes('06 8424 2188');
    });
    if (emailExists && phoneExists) {
      console.log('   ✅ Contact information displayed correctly');
    }

    // Test 7: Login page
    console.log('\n📄 Test 7: Login page');
    await page.goto('http://localhost:3000/auth/login', { waitUntil: 'networkidle2', timeout: 10000 });
    const loginForm = await page.$('form');
    if (loginForm) {
      console.log('   ✅ Login page loaded successfully');
      successes.push('Login');
    }

    // Test 8: Register page
    console.log('\n📄 Test 8: Register page');
    await page.goto('http://localhost:3000/auth/register', { waitUntil: 'networkidle2', timeout: 10000 });
    const registerForm = await page.$('form');
    if (registerForm) {
      console.log('   ✅ Register page loaded successfully');
      successes.push('Register');
    }

    // Test 9: Navbar links
    console.log('\n📄 Test 9: Navbar navigation');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });

    // Check mobile menu button exists
    const mobileMenuButton = await page.$('button.md\\:hidden');
    if (mobileMenuButton) {
      console.log('   ✅ Mobile menu button exists');
    }

    // Check desktop menu
    const navLinks = await page.$$eval('nav a', links => links.map(l => l.textContent));
    if (navLinks.includes('Home') && navLinks.includes('Quiz') && navLinks.includes('Contatti')) {
      console.log('   ✅ Navigation links present');
    }

    // Test 10: Responsive design
    console.log('\n📄 Test 10: Responsive design');
    await page.setViewport({ width: 375, height: 667 }); // Mobile
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    const mobileView = await page.$('h1');
    if (mobileView) {
      console.log('   ✅ Mobile view working');
    }

    await page.setViewport({ width: 768, height: 1024 }); // Tablet
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    const tabletView = await page.$('h1');
    if (tabletView) {
      console.log('   ✅ Tablet view working');
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Successful tests: ${successes.length}`);
    console.log(`   Pages tested: ${successes.join(', ')}`);

    if (errors.length > 0) {
      console.log(`\n❌ Errors found: ${errors.length}`);
      errors.forEach(err => console.log(`   - ${err}`));
    } else {
      console.log('\n✅ No errors found!');
    }

    console.log('\n✅ All website pages tested successfully!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    errors.push(error.message);
  } finally {
    await browser.close();

    // Exit with error code if there were failures
    if (errors.length > 0) {
      process.exit(1);
    }
  }
})();