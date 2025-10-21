const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  console.log('🧪 Testing all pages and navigation...\n');

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
    args: ['--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const errors = [];
  const successes = [];

  try {
    // Test all pages via direct links in navbar
    const pages = [
      { url: 'http://localhost:3000', name: 'Homepage', selector: 'h1' },
      { url: 'http://localhost:3000/scuole', name: 'Scuole', selector: 'h1' },
      { url: 'http://localhost:3000/sportello-psicologico', name: 'Sportello Psicologico', selector: 'h1' },
      { url: 'http://localhost:3000/workshop', name: 'Workshop', selector: 'h1' },
      { url: 'http://localhost:3000/summer-camp', name: 'Summer Camp', selector: 'h1' },
      { url: 'http://localhost:3000/contatti', name: 'Contatti', selector: 'h1' },
      { url: 'http://localhost:3000/quiz', name: 'Quiz', selector: 'h1' },
      { url: 'http://localhost:3000/auth/login', name: 'Login', selector: 'h1' },
      { url: 'http://localhost:3000/auth/register', name: 'Register', selector: 'h1' }
    ];

    console.log('📄 Testing direct page access...\n');
    for (const pg of pages) {
      try {
        await page.goto(pg.url, { waitUntil: 'networkidle2', timeout: 15000 });
        const h1 = await page.$(pg.selector);
        if (h1) {
          const h1Text = await page.evaluate(el => el.textContent, h1);
          console.log(`✅ ${pg.name} loaded - H1: "${h1Text.trim()}"`);
          successes.push(pg.name);
        } else {
          console.log(`❌ ${pg.name} - no H1 found`);
          errors.push(`${pg.name} - no H1`);
        }
      } catch (error) {
        console.log(`❌ ${pg.name} - ${error.message}`);
        errors.push(pg.name);
      }
    }

    // Test navbar links
    console.log('\n🔗 Testing navbar links...\n');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

    const navLinks = [
      { href: '/scuole', name: 'Scuole' },
      { href: '/sportello-psicologico', name: 'Sportello Psicologico' },
      { href: '/workshop', name: 'Workshop' },
      { href: '/summer-camp', name: 'Summer Camp' },
      { href: '/quiz', name: 'Quiz' },
      { href: '/contatti', name: 'Contatti' }
    ];

    for (const link of navLinks) {
      try {
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
        await sleep(500);

        const linkElement = await page.$(`a[href="${link.href}"]`);
        if (linkElement) {
          await linkElement.click();
          await sleep(2000);
          const url = page.url();
          if (url.includes(link.href) || (link.href === '/quiz' && url.includes('/auth/login'))) {
            console.log(`✅ ${link.name} link works`);
          } else {
            console.log(`❌ ${link.name} link failed - URL: ${url}`);
            errors.push(`${link.name} navbar link`);
          }
        } else {
          console.log(`❌ ${link.name} link not found in navbar`);
          errors.push(`${link.name} link missing`);
        }
      } catch (error) {
        console.log(`❌ ${link.name} - ${error.message}`);
        errors.push(link.name);
      }
    }

    // Test mobile menu
    console.log('\n📱 Testing mobile menu...\n');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await sleep(500);

    try {
      // Click mobile menu button using evaluate to click it directly
      const clicked = await page.evaluate(() => {
        const button = document.querySelector('button.md\\:hidden');
        if (button) {
          button.click();
          return true;
        }
        return false;
      });

      if (clicked) {
        await sleep(800);

        // Try to click a link
        const mobileLink = await page.$('a[href="/scuole"]');
        if (mobileLink) {
          await mobileLink.click();
          await sleep(2000);
          const url = page.url();
          if (url.includes('/scuole')) {
            console.log('✅ Mobile menu works');
            successes.push('Mobile menu');
          } else {
            console.log(`❌ Mobile menu link failed - URL: ${url}`);
            errors.push('Mobile menu');
          }
        } else {
          console.log('❌ Mobile menu link not found after opening');
          errors.push('Mobile link missing');
        }
      } else {
        console.log('❌ Mobile menu button not found');
        errors.push('Mobile button missing');
      }
    } catch (error) {
      console.log(`❌ Mobile menu test failed - ${error.message}`);
      errors.push('Mobile menu');
    }

    // Test responsive design
    console.log('\n📐 Testing responsive design...\n');
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
      const h1 = await page.$('h1');
      if (h1) {
        console.log(`✅ ${vp.name} (${vp.width}x${vp.height}) renders correctly`);
      } else {
        console.log(`❌ ${vp.name} has issues`);
        errors.push(`${vp.name} responsive`);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Total successful checks: ${successes.length}`);
    console.log(`❌ Total failures: ${errors.length}`);

    if (errors.length > 0) {
      console.log('\n❌ Failed items:');
      errors.forEach(err => console.log(`   - ${err}`));
      console.log('\n⚠️  ISSUES DETECTED - Navigation needs fixes');
    } else {
      console.log('\n✅ ALL TESTS PASSED! Website navigation works perfectly.');
    }

  } catch (error) {
    console.error('\n❌ Critical error:', error.message);
    console.error(error.stack);
  } finally {
    await sleep(2000);
    await browser.close();
  }
})();
