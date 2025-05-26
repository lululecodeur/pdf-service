#!/bin/bash
# 🛠 Build script pour forcer l'installation propre de Chromium

echo "🧹 Cleaning Puppeteer cache..."
rm -rf /opt/render/.cache/puppeteer

echo "⬇️ Forcing Puppeteer install with Chromium"
npm install puppeteer@21.3.8 --legacy-peer-deps

echo "📦 Build terminé."
