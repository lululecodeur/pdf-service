#!/bin/bash

echo "📦 Installation des dépendances..."
npm install

echo "🌐 Installation des navigateurs Playwright..."
echo "⏭️ Skip Playwright install on Render grâce à PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD"

echo "✅ Build terminé avec succès"
