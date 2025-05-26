// install-chromium.js
const puppeteer = require('puppeteer');

(async () => {
  console.log('⬇️ Téléchargement de Chromium via Puppeteer...');
  const browserFetcher = puppeteer.createBrowserFetcher();
  const revisionInfo = await browserFetcher.download(puppeteer._preferredRevision);
  console.log('✅ Chromium installé à :', revisionInfo.executablePath);
})();
