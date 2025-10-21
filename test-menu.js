const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  console.log('🧪 Testing navigation menu...\n');

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    args: ['--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const errors = [];
  const successes = [];

  try {
    // Go to homepage
    console.log('📄 Loading homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    console.log('   ✅ Homepage loaded\n');

    // Test 1: Click Home link
    console.log('🔗 Test 1: Clicking Home link');
    await page.click('a[href="/"]');
    await sleep(1000);
    let url = page.url();
    if (url === 'http://localhost:3000/' || url === 'http://localhost:3000') {
      console.log('   ✅ Home link works');
      successes.push('Home link');
    } else {
      console.log(`   ❌ Home link failed - URL: ${url}`);
      errors.push('Home link');
    }

    // Test 2: Hover over Informazioni and click Scuole
    console.log('\n🔗 Test 2: Testing Informazioni dropdown -> Scuole');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await sleep(500);

    // Find Informazioni button
    const buttons = await page.$$('button');
    let foundInfo = false;
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Informazioni')) {
        console.log('   ✅ Found Informazioni button');
        await btn.hover();
        await sleep(800);
        foundInfo = true;
        break;
      }
    }

    if (!foundInfo) {
      console.log('   ❌ Informazioni button not found');
      errors.push('Informazioni button');
    } else {
      // Click on Scuole link
      const scuoleLink = await page.$('a[href="/scuole"]');
      if (scuoleLink) {
        await scuoleLink.click();
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        url = page.url();
        if (url.includes('/scuole')) {
          console.log('   ✅ Scuole page loaded via dropdown');
          successes.push('Scuole via dropdown');
        } else {
          console.log(`   ❌ Failed to load Scuole - URL: ${url}`);
          errors.push('Scuole dropdown');
        }
      } else {
        console.log('   ❌ Scuole link not found in dropdown');
        errors.push('Scuole link missing');
      }
    }

    // Test 3: Direct navigation to all pages
    console.log('\n🔗 Test 3: Direct navigation to all pages');

    const pages = [
      { url: '/sportello-psicologico', name: 'Sportello Psicologico' },
      { url: '/workshop', name: 'Workshop' },
      { url: '/summer-camp', name: 'Summer Camp' },
      { url: '/contatti', name: 'Contatti' }
    ];

    for (const pg of pages) {
      await page.goto(`http://localhost:3000${pg.url}`, { waitUntil: 'networkidle2' });
      url = page.url();
      if (url.includes(pg.url)) {
        console.log(`   ✅ ${pg.name} accessible`);
        successes.push(pg.name);
      } else {
        console.log(`   ❌ ${pg.name} failed - URL: ${url}`);
        errors.push(pg.name);
      }
    }

    // Test 4: Click Quiz from navbar
    console.log('\n🔗 Test 4: Clicking Quiz from navbar');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    const quizLinks = await page.$$('a[href="/quiz"]');
    if (quizLinks.length > 0) {
      await quizLinks[0].click();
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
      url = page.url();
      if (url.includes('/quiz') || url.includes('/auth/login')) {
        console.log('   ✅ Quiz link works (redirected to login is OK)');
        successes.push('Quiz link');
      } else {
        console.log(`   ❌ Quiz link failed - URL: ${url}`);
        errors.push('Quiz link');
      }
    }

    // Test 5: Test all dropdown links via hover
    console.log('\n🔗 Test 5: Testing all Informazioni dropdown links via hover');

    const dropdownLinks = [
      { href: '/scuole', name: 'Scuole' },
      { href: '/sportello-psicologico', name: 'Sportello Psicologico' },
      { href: '/workshop', name: 'Workshop' },
      { href: '/summer-camp', name: 'Summer Camp' }
    ];

    for (const link of dropdownLinks) {
      console.log(`\n   Testing ${link.name} via dropdown...`);
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
      await sleep(500);

      // Hover over Informazioni
      const btns = await page.$$('button');
      for (const btn of btns) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text.includes('Informazioni')) {
          await btn.hover();
          await sleep(800);
          break;
        }
      }

      // Click the link
      const linkElement = await page.$(`a[href="${link.href}"]`);
      if (linkElement) {
        await linkElement.click();
        await sleep(2000);
        url = page.url();
        if (url.includes(link.href)) {
          console.log(`   ✅ ${link.name} works via dropdown`);
        } else {
          console.log(`   ❌ ${link.name} failed - URL: ${url}`);
          errors.push(`${link.name} dropdown`);
        }
      } else {
        console.log(`   ❌ ${link.name} link not found`);
        errors.push(`${link.name} not found`);
      }
    }

    // Test 6: Mobile menu
    console.log('\n🔗 Test 6: Testing mobile menu');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await sleep(500);

    // Find and click mobile menu button
    const mobileMenuBtn = await page.$('button.md\\:hidden');
    if (mobileMenuBtn) {
      await mobileMenuBtn.click();
      await sleep(500);

      // Check if menu is visible
      const menuVisible = await page.evaluate(() => {
        const menu = document.querySelector('.md\\:hidden.py-4');
        return menu !== null;
      });

      if (menuVisible) {
        console.log('   ✅ Mobile menu opens');

        // Try clicking a link in mobile menu
        const mobileLinkScuole = await page.$('a[href="/scuole"]');
        if (mobileLinkScuole) {
          await mobileLinkScuole.click();
          await sleep(2000);
          url = page.url();
          if (url.includes('/scuole')) {
            console.log('   ✅ Mobile menu links work');
            successes.push('Mobile menu');
          } else {
            console.log(`   ❌ Mobile link failed - URL: ${url}`);
            errors.push('Mobile menu link');
          }
        }
      } else {
        console.log('   ❌ Mobile menu did not open');
        errors.push('Mobile menu open');
      }
    } else {
      console.log('   ❌ Mobile menu button not found');
      errors.push('Mobile menu button');
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 MENU TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Successful: ${successes.length}`);
    console.log(`❌ Failed: ${errors.length}`);

    if (errors.length > 0) {
      console.log('\n❌ Failed items:');
      errors.forEach(err => console.log(`   - ${err}`));
    }

    if (errors.length === 0) {
      console.log('\n✅ All navigation tests passed!');
    } else {
      console.log('\n⚠️  Some navigation tests failed. Issues need to be fixed.');
    }

  } catch (error) {
    console.error('\n❌ Test error:', error.message);
    console.error(error.stack);
    errors.push(error.message);
  } finally {
    await sleep(2000);
    await browser.close();
  }
})();
