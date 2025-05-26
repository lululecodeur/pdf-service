#!/bin/bash
echo "📦 Installation des dépendances..."
npm install

echo "🌐 Téléchargement Chromium via script Node.js..."
node install-chromium.js

echo "✅ Build terminé avec succès"
