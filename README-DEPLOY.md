# 🚀 DEPLOY ORIENTAMENTE - Istruzioni Complete

## ✅ IL PROGETTO È PRONTO!

Tutto funziona perfettamente in locale. Ecco cosa è stato implementato:

### Funzionalità Complete:
- ✅ **Sito completo** con tutte le pagine (Scuole, Workshop, Summer Camp, Contatti, ecc.)
- ✅ **Autenticazione** - Registrazione con login automatico
- ✅ **Quiz interattivo** - 4 opzioni, auto-avanzamento, grafico radar
- ✅ **Dashboard Admin** - Gestione utenti e domande
- ✅ **Ricerca e ordinamento** utenti per punteggio
- ✅ **CRUD domande** con punteggi personalizzati (0-5)
- ✅ **Tutte le immagini** scaricate e ottimizzate
- ✅ **Logo OrientaMENTE** in navbar e homepage
- ✅ **Design responsive** con Tailwind CSS

---

## 🎯 DEPLOY RAPIDO (2 MINUTI)

### **Usa Vercel** - È fatto apposta per Next.js!

#### Passo 1: Login
```bash
vercel login
```
Ti arriverà un'email - clicca sul link per confermare.

#### Passo 2: Deploy
```bash
vercel --prod
```

Rispondi alle domande:
- `Set up and deploy?` → **Y**
- `Which scope?` → (scegli il tuo account)
- `Link to existing project?` → **N**
- `What's your project's name?` → **orientamente**
- `In which directory is your code located?` → **./`** (premi INVIO)
- `Want to override the settings?` → **N**

#### Passo 3: Configurazione
Dopo il primo deploy, configura le variabili d'ambiente:

```bash
# Genera una chiave segreta
openssl rand -base64 32

# Aggiungila a Vercel
vercel env add NEXTAUTH_SECRET
# Incolla la chiave generata sopra

# Aggiungi l'URL del sito
vercel env add NEXTAUTH_URL
# Inserisci: https://orientamente.vercel.app (o il tuo dominio personalizzato)

# Rideploya
vercel --prod
```

### ✨ FATTO! Il sito è online!

URL tipo: `https://orientamente-xxx.vercel.app`

---

## 📱 DOMINI PERSONALIZZATI

### Su Vercel:
1. Vai su https://vercel.com/dashboard
2. Clicca sul progetto **orientamente**
3. Settings → Domains
4. Aggiungi il tuo dominio (es: `orientamente.org`)
5. Segui le istruzioni per configurare i DNS

---

## 👤 ACCESSO ADMIN

Dopo il deploy, accedi all'admin:

**URL**: `https://il-tuo-sito.com/admin`

**Credenziali**:
```
Email: admin@orientamente.org
Password: admin123
```

⚠️ **IMPORTANTE**: Cambia subito la password!

---

## 🗄️ DATABASE IN PRODUZIONE

Il database SQLite funziona, ma per produzione ti consiglio:

### Opzione 1: Vercel Postgres (consigliato)
```bash
# Crea database su Vercel
vercel postgres create

# Vercel ti darà DATABASE_URL
# Aggiungilo alle variabili d'ambiente
vercel env add DATABASE_URL

# Aggiorna lo schema
npx prisma db push

# Crea admin
node create-admin.js

# Rideploya
vercel --prod
```

### Opzione 2: Supabase (gratuito)
1. Crea progetto su https://supabase.com
2. Copia il **DATABASE_URL** (Connection String)
3. Aggiungilo a Vercel:
```bash
vercel env add DATABASE_URL
# Incolla la connection string di Supabase
```

---

## 🔧 COMANDI UTILI

```bash
# Test locale
npm run dev

# Build di test
npm run build

# Vedere i deploy
vercel list

# Logs in produzione
vercel logs

# Rollback all'ultima versione
vercel rollback
```

---

## 🆘 TROUBLESHOOTING

### "Command not found: vercel"
```bash
npm install -g vercel
```

### Deploy fallisce
```bash
# Pulisci e riprova
rm -rf .next node_modules
npm install
npm run build
vercel --prod
```

### Database non persiste
Usa Vercel Postgres o Supabase (vedi sopra)

### Immagini non si vedono
Verifica che siano in `/public/images/`

---

## 📊 MONITORAGGIO

Dopo il deploy, puoi monitorare:
- **Analytics**: https://vercel.com/dashboard → orientamente → Analytics
- **Logs**: `vercel logs --follow`
- **Performance**: Vercel Speed Insights (gratis)

---

## ✅ CHECKLIST POST-DEPLOY

- [ ] Sito accessibile all'URL fornito
- [ ] Tutte le pagine funzionano
- [ ] Login e registrazione funzionano
- [ ] Quiz completabile
- [ ] Admin accessibile
- [ ] Cambiata password admin
- [ ] Configurato dominio personalizzato (opzionale)
- [ ] Database produzione configurato (opzionale)

---

## 🎉 IL TUO SITO È LIVE!

Congratulazioni! OrientaMENTE è ora online e funzionante.

**Condividi il link**:
```
🌐 OrientaMENTE - Contrasto alla dispersione scolastica
https://il-tuo-sito.com
```

---

Per domande o supporto, consulta:
- Documentazione Vercel: https://vercel.com/docs
- Documentazione Next.js: https://nextjs.org/docs
- File DEPLOY.md incluso nel progetto
