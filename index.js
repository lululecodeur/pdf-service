const express = require('express');
const cors = require('cors');
const playwright = require('playwright');

const app = express();

app.use(cors({ origin: '*', methods: ['POST'], allowedHeaders: ['Content-Type'] }));
app.use(express.json({ limit: '10mb' }));

app.post('/generate-pdf', async (req, res) => {
  try {
    const html = req.body.html;
    const filename = req.body.filename || 'devis.pdf';

    const browser = await playwright.chromium.launch({
      headless: true,
      executablePath: './playwright-browsers/chromium-1169/chrome-linux/chrome',
      args: ['--no-sandbox'],
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.setContent(html, { waitUntil: 'networkidle' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('❌ Erreur PDF Playwright :', error);
    res.status(500).send('Erreur interne lors de la génération PDF');
  }
});

app.listen(10000, () => {
  console.log('✅ Service PDF Playwright en ligne sur le port 10000');
});
