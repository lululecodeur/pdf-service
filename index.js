const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();

app.use(cors({ origin: '*', methods: ['POST'], allowedHeaders: ['Content-Type'] }));
app.use(express.json({ limit: '10mb' }));

app.post('/generate-pdf', async (req, res) => {
  try {
    const html = req.body.html;
    const filename = req.body.filename || 'devis.pdf';

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: process.env.CHROME_BIN || undefined,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('❌ Erreur PDF Puppeteer :', error);
    res.status(500).send('Erreur interne lors de la génération PDF');
  }
});

app.listen(10000, () => {
  console.log('✅ Service PDF Puppeteer en ligne sur le port 10000');
});
