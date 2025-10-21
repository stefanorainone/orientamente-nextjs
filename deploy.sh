#!/bin/bash

echo "🚀 DEPLOY ORIENTAMENTE SU VERCEL"
echo "================================"
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI ready"
echo ""

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

echo ""
echo "🏗️  Building and deploying..."
echo ""

# Deploy to production
vercel --prod

echo ""
echo "=========================================="
echo "✅ DEPLOY COMPLETATO!"
echo "=========================================="
echo ""
echo "📝 PROSSIMI PASSI:"
echo ""
echo "1. Configura le variabili d'ambiente:"
echo "   vercel env add NEXTAUTH_SECRET"
echo "   vercel env add NEXTAUTH_URL"
echo ""
echo "2. Rideploya:"
echo "   vercel --prod"
echo ""
echo "3. Accedi all'admin:"
echo "   URL: https://il-tuo-sito.com/admin"
echo "   Email: admin@orientamente.org"
echo "   Password: admin123"
echo ""
echo "⚠️  Ricorda di cambiare la password admin!"
echo ""
