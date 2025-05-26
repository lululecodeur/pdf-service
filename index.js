const express = require('express');
const cors = require('cors');
const { chromium } = require('playwright');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/generate-pdf', async (req, res) => {
  try {
    const html = req.body?.html;
    const filename = req.body.filename || 'devis.pdf';

    if (!html || typeof html !== 'string') {
      return res.status(400).send('❌ HTML manquant ou invalide');
    }

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });

    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.end(pdfBuffer);
  } catch (err) {
    console.error('❌ Erreur PDF Playwright :', err);
    res.status(500).send('Erreur serveur PDF');
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Service PDF Playwright en ligne sur le port ${PORT}`);
});
