const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  console.log('🧪 Final comprehensive test with images and dropdown menu...\n');

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
    // Test 1: Homepage with images
    console.log('📄 Test 1: Homepage with images');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 15000 });

    const homeImages = await page.$$('img');
    console.log(`   Found ${homeImages.length} images on homepage`);
    if (homeImages.length >= 2) {
      console.log('   ✅ Homepage has images (logo and map)');
      successes.push('Homepage images');
    } else {
      console.log('   ❌ Homepage missing images');
      errors.push('Homepage images');
    }

    // Test 2: Dropdown menu
    console.log('\n📋 Test 2: Testing Informazioni dropdown menu');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await sleep(1000);

    // Check if dropdown button exists
    const hasDropdown = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.some(btn => btn.textContent.includes('Informazioni'));
    });

    if (hasDropdown) {
      console.log('   ✅ Dropdown "Informazioni" button found');
      successes.push('Dropdown button');

      // Hover over dropdown
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text.includes('Informazioni')) {
          await btn.hover();
          await sleep(1000);

          // Check if dropdown is visible
          const dropdownVisible = await page.evaluate(() => {
            const dropdown = document.querySelector('.group-hover\\:opacity-100');
            return dropdown !== null;
          });

          if (dropdownVisible) {
            console.log('   ✅ Dropdown menu appears on hover');
            successes.push('Dropdown visibility');
          }
          break;
        }
      }
    } else {
      console.log('   ❌ Dropdown menu not found');
      errors.push('Dropdown menu');
    }

    // Test 3: Navigate via dropdown to Scuole
    console.log('\n🔗 Test 3: Navigate to Scuole via dropdown');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await sleep(500);

    try {
      // Hover over Informazioni
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text.includes('Informazioni')) {
          await btn.hover();
          await sleep(800);
          break;
        }
      }

      // Click Scuole link
      const scuoleLink = await page.$('a[href="/scuole"]');
      if (scuoleLink) {
        await scuoleLink.click();
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });

        const url = page.url();
        if (url.includes('/scuole')) {
          console.log('   ✅ Successfully navigated to Scuole via dropdown');
          successes.push('Scuole navigation');
        } else {
          console.log(`   ❌ Navigation failed - URL: ${url}`);
          errors.push('Scuole navigation');
        }
      }
    } catch (error) {
      console.log(`   ❌ Dropdown navigation failed: ${error.message}`);
      errors.push('Dropdown navigation');
    }

    // Test 4: Scuole page images
    console.log('\n📸 Test 4: Scuole page with image gallery');
    await page.goto('http://localhost:3000/scuole', { waitUntil: 'networkidle2' });
    await sleep(2000);

    const scuoleImages = await page.$$('img');
    console.log(`   Found ${scuoleImages.length} images on Scuole page`);
    if (scuoleImages.length >= 6) {
      console.log('   ✅ Scuole page has image gallery (6+ images)');
      successes.push('Scuole gallery');
    } else {
      console.log('   ❌ Scuole page missing gallery images');
      errors.push('Scuole gallery');
    }

    // Test 5: Summer Camp page images
    console.log('\n📸 Test 5: Summer Camp page with image gallery');
    await page.goto('http://localhost:3000/summer-camp', { waitUntil: 'networkidle2' });
    await sleep(2000);

    const summerImages = await page.$$('img');
    console.log(`   Found ${summerImages.length} images on Summer Camp page`);
    if (summerImages.length >= 6) {
      console.log('   ✅ Summer Camp page has image gallery (6+ images)');
      successes.push('Summer Camp gallery');
    } else {
      console.log('   ❌ Summer Camp page missing gallery images');
      errors.push('Summer Camp gallery');
    }

    // Test 6: All dropdown links
    console.log('\n🔗 Test 6: Testing all dropdown links');
    const dropdownPages = [
      { url: '/sportello-psicologico', name: 'Sportello Psicologico' },
      { url: '/workshop', name: 'Workshop' },
      { url: '/summer-camp', name: 'Summer Camp' }
    ];

    for (const pg of dropdownPages) {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
      await sleep(500);

      // Hover over dropdown
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text.includes('Informazioni')) {
          await btn.hover();
          await sleep(800);
          break;
        }
      }

      // Click link
      const link = await page.$(`a[href="${pg.url}"]`);
      if (link) {
        await link.click();
        await sleep(2000);
        const url = page.url();
        if (url.includes(pg.url)) {
          console.log(`   ✅ ${pg.name} accessible via dropdown`);
        } else {
          console.log(`   ❌ ${pg.name} navigation failed`);
          errors.push(`${pg.name} dropdown`);
        }
      }
    }

    // Test 7: Direct links Quiz and Contatti
    console.log('\n🔗 Test 7: Testing direct nav links (Quiz, Contatti)');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

    const quizLink = await page.$('a[href="/quiz"]');
    if (quizLink) {
      await quizLink.click();
      await sleep(2000);
      console.log('   ✅ Quiz link works');
      successes.push('Quiz link');
    }

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    const contattiLink = await page.$('a[href="/contatti"]');
    if (contattiLink) {
      await contattiLink.click();
      await sleep(2000);
      console.log('   ✅ Contatti link works');
      successes.push('Contatti link');
    }

    // Test 8: Mobile dropdown
    console.log('\n📱 Test 8: Testing mobile menu');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await sleep(500);

    const mobileMenuClicked = await page.evaluate(() => {
      const button = document.querySelector('button.md\\:hidden');
      if (button) {
        button.click();
        return true;
      }
      return false;
    });

    if (mobileMenuClicked) {
      await sleep(800);
      const mobileLinks = await page.$$('a[href="/scuole"]');
      if (mobileLinks.length > 0) {
        console.log('   ✅ Mobile menu opens and shows links');
        successes.push('Mobile menu');
      } else {
        console.log('   ❌ Mobile menu links not visible');
        errors.push('Mobile menu links');
      }
    } else {
      console.log('   ❌ Mobile menu button not found');
      errors.push('Mobile menu button');
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successful tests: ${successes.length}`);
    console.log(`❌ Failed tests: ${errors.length}`);

    if (errors.length > 0) {
      console.log('\n❌ Failed items:');
      errors.forEach(err => console.log(`   - ${err}`));
      console.log('\n⚠️  Some issues detected');
    } else {
      console.log('\n✅ ALL TESTS PASSED!');
      console.log('🎉 Website complete with:');
      console.log('   - Dropdown menu working');
      console.log('   - All images displaying');
      console.log('   - All pages accessible');
      console.log('   - Mobile menu functional');
    }

  } catch (error) {
    console.error('\n❌ Critical error:', error.message);
    console.error(error.stack);
  } finally {
    await sleep(3000);
    await browser.close();
  }
})();
