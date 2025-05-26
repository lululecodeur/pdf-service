const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 🧪 Test rapide
app.get('/ping', (_, res) => res.send('pong ✅'));

// 📝 Placeholder temporaire
app.post('/sauvegarder-devis-final', (req, res) => {
  console.log('📩 Placeholder /sauvegarder-devis-final déclenché');
  res.status(200).json({ message: 'OK (placeholder)' });
});

// 🧾 Route principale : génération PDF
app.post('/generate-pdf', async (req, res) => {
  try {
    const html = req.body?.html;
    const filename = req.body.filename || 'devis.pdf';

    if (!html || typeof html !== 'string') {
      return res.status(400).send('❌ HTML manquant ou invalide');
    }

    // ✅ Logs utiles pour debug Render
    console.log('✅ Puppeteer version :', puppeteer.version);
    console.log('🧪 Executable path :', puppeteer.executablePath());

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.end(pdfBuffer);
  } catch (err) {
    console.error('❌ Erreur de génération :', err);
    res.status(500).send('Erreur serveur');
  }
});

// 🚀 Lancement serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Service PDF en ligne sur le port ${PORT}`);
});
