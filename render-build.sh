#!/bin/bash

echo "📦 Installation des dépendances..."
npm install

echo "🌐 Installation des navigateurs Playwright..."
./node_modules/.bin/playwright install --with-deps

echo "✅ Build terminé avec Playwright"
