const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  console.log('🎨 Testing logo visibility...\n');

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
    args: ['--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    console.log('📄 Loading homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 15000 });
    await sleep(2000);

    // Test 1: Logo in navbar
    console.log('\n🔍 Test 1: Logo in navbar');
    const navbarLogo = await page.evaluate(() => {
      const img = document.querySelector('nav img[alt="OrientaMENTE"]');
      if (img) {
        return {
          found: true,
          src: img.src,
          width: img.width,
          height: img.height,
          visible: img.offsetWidth > 0 && img.offsetHeight > 0
        };
      }
      return { found: false };
    });

    if (navbarLogo.found && navbarLogo.visible) {
      console.log('   ✅ Logo navbar visible');
      console.log(`   📐 Size: ${navbarLogo.width}x${navbarLogo.height}px`);
    } else if (navbarLogo.found) {
      console.log('   ⚠️  Logo navbar found but not visible');
    } else {
      console.log('   ❌ Logo navbar not found');
    }

    // Test 2: Logo in hero section
    console.log('\n🔍 Test 2: Logo in hero section');
    const heroLogo = await page.evaluate(() => {
      const section = document.querySelector('section');
      if (section) {
        const img = section.querySelector('img[alt="OrientaMENTE Logo"]');
        if (img) {
          return {
            found: true,
            src: img.src,
            width: img.width,
            height: img.height,
            visible: img.offsetWidth > 0 && img.offsetHeight > 0
          };
        }
      }
      return { found: false };
    });

    if (heroLogo.found && heroLogo.visible) {
      console.log('   ✅ Logo hero visible and prominent');
      console.log(`   📐 Size: ${heroLogo.width}x${heroLogo.height}px`);
    } else if (heroLogo.found) {
      console.log('   ⚠️  Logo hero found but not visible');
    } else {
      console.log('   ❌ Logo hero not found');
    }

    // Test 3: Check logo file exists
    console.log('\n🔍 Test 3: Checking logo file');
    const logoResponse = await page.goto('http://localhost:3000/images/orientamente-logo.png');
    if (logoResponse && logoResponse.ok()) {
      console.log('   ✅ Logo file loads successfully');
      console.log(`   📦 Status: ${logoResponse.status()}`);
    } else {
      console.log('   ❌ Logo file not found or error loading');
    }

    // Test 4: Visual check
    console.log('\n👁️  Test 4: Taking screenshot for visual verification');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await page.screenshot({
      path: '/Users/stefanorainone/Downloads/orientamente-nextjs/logo-test-screenshot.png',
      fullPage: false
    });
    console.log('   ✅ Screenshot saved: logo-test-screenshot.png');

    // Test 5: Mobile view
    console.log('\n📱 Test 5: Checking logo on mobile');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await sleep(1000);

    const mobileLogo = await page.evaluate(() => {
      const img = document.querySelector('nav img[alt="OrientaMENTE"]');
      return img ? {
        visible: img.offsetWidth > 0 && img.offsetHeight > 0,
        width: img.width,
        height: img.height
      } : null;
    });

    if (mobileLogo && mobileLogo.visible) {
      console.log('   ✅ Logo visible on mobile');
      console.log(`   📐 Size: ${mobileLogo.width}x${mobileLogo.height}px`);
    } else {
      console.log('   ❌ Logo not visible on mobile');
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ Logo test completed!');
    console.log('Check logo-test-screenshot.png for visual confirmation');

    await sleep(2000);

  } catch (error) {
    console.error('\n❌ Test error:', error.message);
  } finally {
    await browser.close();
  }
})();
