// Force l'installation de Chromium sur Render
const puppeteer = require('puppeteer');
puppeteer
  .createBrowserFetcher()
  .download('1108766')
  .then(() => console.log('✅ Chromium téléchargé manuellement'))
  .catch(err => console.error('❌ Échec téléchargement Chromium :', err));
