# OrientaMENTE - Next.js Application

Un'applicazione web moderna per il progetto OrientaMENTE, costruita con Next.js 14, TypeScript, Prisma e Tailwind CSS.

## 🚀 Caratteristiche

- ✅ **Quiz Interattivo Funzionante** - Sistema di quiz completamente funzionale con navigazione avanti/indietro
- ✅ **Sistema di Autenticazione** - Login/registrazione con NextAuth.js
- ✅ **Dashboard Admin** - Gestione domande e visualizzazione risposte utenti
- ✅ **Database con Prisma** - SQLite per sviluppo (facilmente migrabile a PostgreSQL/MySQL)
- ✅ **Design Responsive** - Ottimizzato per mobile, tablet e desktop
- ✅ **Grafici Interattivi** - Visualizzazione risultati con Chart.js
- ✅ **TypeScript** - Type safety completo
- ✅ **Tailwind CSS** - Styling moderno e componenti UI con shadcn/ui

## 📋 Prerequisiti

- Node.js 18+ installato
- npm o yarn

## 🛠️ Installazione

1. **Entra nella cartella del progetto:**
```bash
cd /Users/stefanorainone/Downloads/orientamente-nextjs
```

2. **Installa le dipendenze:**
```bash
npm install
```

3. **Configura il database:**
```bash
npx prisma db push
```

4. **Popola il database con dati di esempio:**
```bash
npm run db:seed
```

5. **Avvia l'applicazione:**
```bash
npm run dev
```

6. **Apri nel browser:**
```
http://localhost:3000
```

## 👤 Credenziali di Accesso

### Admin
- Email: `admin@orientamente.org`
- Password: `admin123`

### Utente Demo
- Email: `user@orientamente.org`
- Password: `user123`

## 📱 Funzionalità Principali

### Per gli Utenti:
- Registrazione e login
- Quiz orientativo interattivo
- Visualizzazione risultati con grafico radar
- Profilo personale
- Storico risposte

### Per gli Admin:
- Dashboard amministrativa (`/admin`)
- Gestione domande del quiz (CRUD completo)
- Visualizzazione risposte di tutti gli utenti
- Grafici e statistiche
- Export dati

## 🗂️ Struttura del Progetto

```
orientamente-nextjs/
├── src/
│   ├── app/                # Pagine Next.js (App Router)
│   │   ├── admin/          # Dashboard admin
│   │   ├── auth/           # Autenticazione
│   │   ├── quiz/           # Sistema quiz
│   │   └── api/            # API routes
│   ├── components/         # Componenti React
│   │   ├── ui/            # Componenti UI (shadcn)
│   │   └── ...            # Altri componenti
│   └── lib/               # Utility e configurazioni
├── prisma/
│   ├── schema.prisma      # Schema database
│   └── seed.ts            # Script popolamento DB
└── public/                # Asset statici
```

## 🔧 Comandi Utili

```bash
# Sviluppo
npm run dev              # Avvia in modalità sviluppo

# Database
npm run db:push          # Sincronizza schema con DB
npm run db:studio        # Apri Prisma Studio (GUI database)
npm run db:seed          # Popola database

# Build
npm run build            # Build per produzione
npm run start            # Avvia build di produzione

# Lint
npm run lint             # Controlla il codice
```

## 📊 Gestione Database

Per visualizzare e modificare i dati del database:
```bash
npm run db:studio
```
Si aprirà Prisma Studio su `http://localhost:5555`

## 🎨 Personalizzazione

### Colori del Tema
Modifica i colori in `src/app/globals.css` nella sezione `:root`

### Domande Quiz
1. Accedi come admin
2. Vai su `/admin/questions`
3. Aggiungi/modifica/elimina domande

## 🚢 Deploy in Produzione

### Vercel (Consigliato)
1. Push su GitHub
2. Importa su Vercel
3. Configura variabili ambiente
4. Deploy automatico

### Docker
```bash
docker build -t orientamente .
docker run -p 3000:3000 orientamente
```

## 🔐 Variabili Ambiente

Per la produzione, configura queste variabili in `.env`:

```env
DATABASE_URL="postgresql://..."  # O MySQL
NEXTAUTH_URL="https://tuodominio.com"
NEXTAUTH_SECRET="genera-con-openssl-rand-base64-32"
```

## 📝 Note Tecniche

- **Quiz Navigation**: Implementato con state management lato server usando query params
- **Authentication**: NextAuth con Prisma adapter
- **Database**: SQLite per sviluppo, facilmente migrabile a PostgreSQL/MySQL
- **Styling**: Tailwind CSS con componenti shadcn/ui
- **Charts**: Chart.js con wrapper React

## 🐛 Troubleshooting

### Il quiz non avanza
- Verifica che JavaScript sia abilitato
- Controlla la console per errori
- Assicurati di essere loggato

### Errore database
```bash
npx prisma db push --force-reset
npm run db:seed
```

### Port già in uso
```bash
# Cambia porta
PORT=3001 npm run dev
```

## 📧 Supporto

Per problemi o domande, contatta: stefano@orientamente.org

## 🎉 Features Complete

✅ Homepage responsive con tutte le sezioni
✅ Sistema di autenticazione completo
✅ Quiz funzionante con navigazione
✅ Dashboard admin per gestione domande
✅ Visualizzazione risposte utenti con grafici
✅ Design moderno e responsive
✅ Database con Prisma
✅ TypeScript per type safety

---

**Versione**: 1.0.0
**Autore**: Stefano Rainone
**Licenza**: MIT