#!/bin/bash
echo "📦 Installation des dépendances..."
npm install

echo "🌐 Téléchargement explicite Chromium Puppeteer..."
PUPPETEER_CACHE_DIR=./.puppeteer-cache npx puppeteer browsers install chrome

echo "✅ Build terminé avec succès"
