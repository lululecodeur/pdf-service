// install-chromium.js
const puppeteer = require('puppeteer');

(async () => {
  console.log('⬇️ Téléchargement de Chromium via Puppeteer...');
  const browserFetcher = puppeteer.createBrowserFetcher();
  const revision = puppeteer._preferredRevision;
  const revisionInfo = await browserFetcher.download(revision);
  console.log('✅ Chromium installé à :', revisionInfo.executablePath);
})();
