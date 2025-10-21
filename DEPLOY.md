# 🚀 Guida Deploy OrientaMENTE

## ✅ Progetto Pronto per il Deploy

Il progetto è completamente configurato e testato. Tutte le funzionalità funzionano:
- ✅ Autenticazione utenti (registrazione + login automatico)
- ✅ Quiz interattivo con 4 opzioni
- ✅ Grafico radar dei risultati
- ✅ Dashboard amministratore con ricerca e ordinamento
- ✅ Gestione domande (CRUD completo)
- ✅ Tutte le pagine informative (Scuole, Workshop, Summer Camp, ecc.)

---

## 🎯 Opzione 1: Deploy su Vercel (CONSIGLIATO - 2 minuti)

Vercel è ottimizzato per Next.js e supporta tutto nativamente.

### Passaggi:

1. **Login a Vercel**:
   ```bash
   vercel login
   ```
   Segui le istruzioni (clic sull'email di verifica)

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Conferma le opzioni** (premi INVIO per i default):
   - Set up and deploy? → Y
   - Which scope? → (scegli il tuo account)
   - Link to existing project? → N
   - What's your project's name? → orientamente
   - In which directory is your code located? → ./
   - Want to override the settings? → N

4. **Deploy completato!**
   - Ti darà un URL tipo: `https://orientamente-xxx.vercel.app`

### Configurazione Variabili d'Ambiente (dopo il primo deploy):

```bash
# Il database SQLite funziona già, ma per prod usa DATABASE_URL personalizzato se vuoi
vercel env add NEXTAUTH_SECRET
# Inserisci una stringa casuale lunga (es: generata con: openssl rand -base64 32)

vercel env add NEXTAUTH_URL
# Inserisci l'URL del tuo sito (es: https://orientamente-xxx.vercel.app)
```

Poi rideploya:
```bash
vercel --prod
```

---

## 🔥 Opzione 2: Deploy su Firebase (progetto orientamente-01)

### Prerequisiti:
- ✅ Progetto Firebase `orientamente-01` già creato
- ✅ Configurazione Firebase pronta (`.firebaserc` e `firebase.json`)

### Passaggi:

1. **Login a Firebase** (se non sei già loggato):
   ```bash
   firebase login
   ```

2. **Verifica progetto**:
   ```bash
   firebase projects:list | grep orientamente
   ```

3. **Deploy**:
   ```bash
   # Build del progetto
   npm run build

   # Deploy su Firebase Hosting
   firebase deploy --only hosting
   ```

⚠️ **NOTA**: Firebase Hosting supporta solo siti statici. Per le API routes di Next.js serve Firebase Functions o Cloud Run (configurazione più complessa).

**Alternativa con Cloud Run**:
```bash
# Deploy con Cloud Run (supporta API routes)
firebase deploy --only hosting,functions
```

---

## 📊 Credenziali Admin

Dopo il deploy, accedi alla dashboard admin:

**URL**: `https://il-tuo-sito.com/admin`

**Credenziali**:
- Email: `admin@orientamente.org`
- Password: `admin123`

⚠️ **IMPORTANTE**: Cambia la password admin dopo il primo accesso!

---

## 🔧 Troubleshooting

### Database non funziona su Vercel:
Il database SQLite è incluso nel deploy. Per persistenza usa:
- PostgreSQL (Vercel Postgres)
- PlanetScale (MySQL)
- Supabase (PostgreSQL)

### Immagini non caricano:
Verifica che le immagini siano in `/public/images/`

### Errori Build:
```bash
# Pulisci e ribuildi
rm -rf .next
npm run build
```

---

## 📝 URL Importanti

- **Homepage**: `https://il-tuo-sito.com`
- **Quiz**: `https://il-tuo-sito.com/quiz`
- **Admin**: `https://il-tuo-sito.com/admin`
- **Login**: `https://il-tuo-sito.com/auth/login`
- **Registrazione**: `https://il-tuo-sito.com/auth/register`

---

## 🎉 Deploy Completato!

Il sito è ora live e funzionante!

Per supporto: stefano@example.com
