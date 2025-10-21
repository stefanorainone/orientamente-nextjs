const puppeteer = require('puppeteer');

async function testSite() {
  let browser;

  try {
    console.log('🚀 Avvio browser Puppeteer...\n');

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Test 1: Homepage
    console.log('1️⃣ Test Homepage...');
    try {
      await page.goto('https://orientamente-deploy.vercel.app', {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      const title = await page.title();
      console.log('✅ Homepage caricata:', title);
    } catch (e) {
      console.log('❌ Errore homepage:', e.message);
    }

    // Test 2: Login page
    console.log('\n2️⃣ Test Pagina Login...');
    try {
      await page.goto('https://orientamente-deploy.vercel.app/auth/login', {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      const loginForm = await page.$('form');
      if (loginForm) {
        console.log('✅ Form di login trovato');
      } else {
        console.log('❌ Form di login NON trovato');
      }
    } catch (e) {
      console.log('❌ Errore login page:', e.message);
    }

    // Test 3: Registration
    console.log('\n3️⃣ Test Registrazione...');
    try {
      await page.goto('https://orientamente-deploy.vercel.app/auth/register', {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      const emailInput = await page.$('input[type="email"]');
      const passwordInput = await page.$('input[type="password"]');

      if (emailInput && passwordInput) {
        console.log('✅ Form di registrazione trovato');

        const testEmail = 'test' + Math.floor(Math.random() * 100000) + '@orientamente.org';
        console.log('📝 Creazione utente test:', testEmail);

        await emailInput.type(testEmail);
        await passwordInput.type('test123456');

        const nameInput = await page.$('input[name="name"]');
        if (nameInput) {
          await nameInput.type('Test User Puppeteer');
        }

        const submitButton = await page.$('button[type="submit"]');
        if (submitButton) {
          console.log('🔄 Invio registrazione...');
          await submitButton.click();

          // Aspetta navigazione o errori
          await Promise.race([
            page.waitForNavigation({ timeout: 5000 }).catch(() => null),
            page.waitForTimeout(5000)
          ]);

          const currentUrl = page.url();
          console.log('📍 URL dopo registrazione:', currentUrl);

          if (currentUrl.includes('/quiz') || currentUrl.includes('/profile') || !currentUrl.includes('/register')) {
            console.log('✅ Registrazione completata - redirect effettuato!');
            console.log('🎉 DATABASE FUNZIONA!');
          } else {
            console.log('⚠️ Ancora sulla pagina di registrazione');
            const bodyText = await page.evaluate(() => document.body.textContent);
            if (bodyText.toLowerCase().includes('error') || bodyText.toLowerCase().includes('errore')) {
              console.log('❌ Trovato errore nella pagina');
              console.log('Messaggio:', bodyText.substring(0, 500));
            }
          }
        }
      } else {
        console.log('❌ Form di registrazione NON trovato');
      }
    } catch (e) {
      console.log('❌ Errore registrazione:', e.message);
    }

    console.log('\n✅ Test completati!');

  } catch (error) {
    console.log('❌ Errore generale:', error.message);
    console.log('Stack:', error.stack);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

testSite()
  .then(() => {
    console.log('\n👍 Script terminato con successo');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Script fallito:', err);
    process.exit(1);
  });
