#!/bin/bash

echo "🚀 Avvio applicazione OrientaMENTE..."
echo ""

# Controlla se node è installato
if ! command -v node &> /dev/null
then
    echo "❌ Node.js non è installato. Installalo prima da https://nodejs.org"
    exit 1
fi

echo "✅ Node.js trovato: $(node --version)"
echo ""

# Installa dipendenze
echo "📦 Installazione dipendenze..."
npm install

echo ""
echo "🗄️ Configurazione database..."
npx prisma db push

echo ""
echo "🌱 Popolamento database con dati di esempio..."
npx tsx prisma/seed.ts

echo ""
echo "✨ Tutto pronto! Avvio server di sviluppo..."
echo ""
echo "======================================"
echo "📱 L'app sarà disponibile su:"
echo "👉 http://localhost:3000"
echo ""
echo "🔐 CREDENZIALI:"
echo "Admin: admin@orientamente.org / admin123"
echo "User: user@orientamente.org / user123"
echo "======================================"
echo ""
echo "Premi Ctrl+C per fermare il server"
echo ""

npm run dev