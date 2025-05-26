#!/bin/bash

echo "📦 Installation des dépendances..."
npm install

echo "🌐 Installation des navigateurs Playwright en mode personnalisé..."
PLAYWRIGHT_BROWSERS_PATH=./playwright-browsers npx playwright install chromium

echo "✅ Build terminé avec succès"
