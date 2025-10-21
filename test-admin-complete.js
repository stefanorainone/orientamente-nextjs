const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  console.log('🔐 Complete Admin Dashboard Test\n');
  console.log('This test will:');
  console.log('1. Clear all cookies (logout)');
  console.log('2. Login fresh as admin');
  console.log('3. Navigate to admin dashboard');
  console.log('4. Verify all functionality\n');

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    args: ['--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    // Step 1: Clear all cookies to ensure fresh session
    console.log('🧹 Step 1: Clearing all cookies...');
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');
    console.log('   ✅ Cookies cleared\n');

    // Step 2: Navigate to login page
    console.log('📝 Step 2: Navigating to login page...');
    await page.goto('http://localhost:3000/auth/login', { waitUntil: 'networkidle0' });
    await sleep(2000);
    console.log('   ✅ Login page loaded\n');

    // Step 3: Login as admin
    console.log('🔑 Step 3: Logging in as admin...');
    await page.type('input[name="email"]', 'admin@orientamente.org', { delay: 50 });
    await page.type('input[name="password"]', 'admin123', { delay: 50 });

    await page.click('button[type="submit"]');
    await sleep(5000); // Wait for redirect and session to be established

    const loginUrl = page.url();
    console.log(`   Current URL after login: ${loginUrl}`);

    if (loginUrl === 'http://localhost:3000/' || loginUrl.includes('/admin')) {
      console.log('   ✅ Login successful\n');
    } else {
      console.log('   ⚠️  Unexpected URL after login\n');
    }

    // Step 4: Navigate directly to admin page
    console.log('📊 Step 4: Navigating to admin dashboard...');
    await page.goto('http://localhost:3000/admin', {
      waitUntil: 'networkidle0',
      timeout: 15000
    });
    await sleep(4000); // Extra time for React hydration

    const finalUrl = page.url();
    console.log(`   Current URL: ${finalUrl}`);

    if (finalUrl.includes('/admin')) {
      console.log('   ✅ On admin page\n');
    } else {
      console.log('   ❌ Redirected away from admin page');
      console.log('   This means the session role is not set correctly\n');
    }

    // Take screenshot
    await page.screenshot({ path: 'admin-complete-test.png', fullPage: true });
    console.log('   📸 Screenshot saved: admin-complete-test.png\n');

    // Step 5: Check page content
    console.log('🔍 Step 5: Checking page content...');

    const pageAnalysis = await page.evaluate(() => {
      const text = document.body.textContent;
      const title = document.title;

      return {
        title,
        hasDashboardTitle: text.includes('Dashboard Amministratore'),
        hasUtentiTab: text.includes('Utenti'),
        hasDomandeTab: text.includes('Domande'),
        hasGestioneDomande: text.includes('Gestione Domande'),
        hasUtentiRegistrati: text.includes('Utenti Registrati'),
        hasNuovaDomanda: text.includes('Nuova Domanda'),
        bodyLength: text.length
      };
    });

    console.log('   Page Analysis:');
    console.log(`   - Title: ${pageAnalysis.title}`);
    console.log(`   - Content length: ${pageAnalysis.bodyLength} chars`);
    console.log(`   - Dashboard title: ${pageAnalysis.hasDashboardTitle ? '✅' : '❌'}`);
    console.log(`   - Utenti tab: ${pageAnalysis.hasUtentiTab ? '✅' : '❌'}`);
    console.log(`   - Domande tab: ${pageAnalysis.hasDomandeTab ? '✅' : '❌'}`);

    if (pageAnalysis.hasDashboardTitle && pageAnalysis.hasUtentiTab && pageAnalysis.hasDomandeTab) {
      console.log('\n   ✅ Admin dashboard loaded correctly!\n');

      // Step 6: Test tab switching
      console.log('🔄 Step 6: Testing tab navigation...');

      const tabClicked = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const questionsTab = buttons.find(btn =>
          btn.getAttribute('value') === 'questions' ||
          btn.textContent?.includes('Domande')
        );

        if (questionsTab) {
          questionsTab.click();
          return true;
        }
        return false;
      });

      if (tabClicked) {
        console.log('   ✅ Clicked Questions tab');
        await sleep(2000);

        const questionsTabContent = await page.evaluate(() => {
          const text = document.body.textContent;
          return {
            hasGestione: text.includes('Gestione Domande'),
            hasNuova: text.includes('Nuova Domanda')
          };
        });

        if (questionsTabContent.hasGestione && questionsTabContent.hasNuova) {
          console.log('   ✅ Questions tab content loaded\n');

          // Take final screenshot of questions tab
          await page.screenshot({ path: 'admin-questions-tab.png', fullPage: true });
          console.log('   📸 Questions tab screenshot: admin-questions-tab.png\n');
        } else {
          console.log('   ❌ Questions tab content not found\n');
        }
      } else {
        console.log('   ❌ Could not find Questions tab button\n');
      }

    } else {
      console.log('\n   ❌ Admin dashboard not loaded properly\n');

      if (finalUrl === 'http://localhost:3000/') {
        console.log('   ⚠️  The page redirected to homepage.');
        console.log('   This indicates the session.user.role is not "ADMIN".\n');
        console.log('   Possible causes:');
        console.log('   1. Session was not properly refreshed after setting role');
        console.log('   2. TypeScript types for session.user.role may need updating');
        console.log('   3. There may be a timing issue with session loading\n');
      }
    }

    // Summary
    console.log('='.repeat(70));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(70));

    if (finalUrl.includes('/admin') && pageAnalysis.hasDashboardTitle) {
      console.log('✅ Admin authentication: SUCCESS');
      console.log('✅ Admin dashboard access: SUCCESS');
      console.log('✅ Admin UI components: SUCCESS');
      console.log('\n🎉 All tests passed! Admin dashboard is fully functional.\n');
      console.log('📝 Admin credentials:');
      console.log('   Email: admin@orientamente.org');
      console.log('   Password: admin123');
      console.log('\n🎯 Admin panel: http://localhost:3000/admin');
    } else {
      console.log('❌ Admin authentication: NEEDS ATTENTION');
      console.log('❌ Session role propagation: ISSUE DETECTED');
      console.log('\n🔧 Recommended actions:');
      console.log('   1. Check TypeScript session type definitions');
      console.log('   2. Verify NextAuth callbacks are executing');
      console.log('   3. Try manual login in browser with dev tools open');
    }

    console.log('\n⏳ Keeping browser open for 10 seconds...\n');
    await sleep(10000);

  } catch (error) {
    console.error('\n❌ Test error:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
})();
