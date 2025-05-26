const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/ping', (_, res) => res.send('pong ✅'));

app.post('/generate-pdf', async (req, res) => {
  const html = req.body?.html || '<h1>Empty HTML</h1>';
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();
  res.setHeader('Content-Type', 'application/pdf');
  res.end(pdfBuffer);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ PDF service running on port ${PORT}`);
});
