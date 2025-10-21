import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@orientamente.org' },
    update: {},
    create: {
      email: 'admin@orientamente.org',
      name: 'Amministratore',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create sample user
  const userPassword = await bcrypt.hash('user123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'user@orientamente.org' },
    update: {},
    create: {
      email: 'user@orientamente.org',
      name: 'Utente Demo',
      password: userPassword,
      role: 'USER',
    },
  })

  // Create questions
  const questions = [
    {
      question: "Quale attività ti attrae di più?",
      options: JSON.stringify({
        a: "Risolvere problemi complessi",
        b: "Creare qualcosa di nuovo",
        c: "Aiutare gli altri",
        d: "Organizzare e gestire progetti"
      }),
      points: JSON.stringify({ a: 4, b: 3, c: 2, d: 1 }),
      category: "Interessi",
      order: 1
    },
    {
      question: "In quale ambiente preferisci lavorare?",
      options: JSON.stringify({
        a: "Ufficio strutturato",
        b: "Spazio creativo e flessibile",
        c: "All'aperto o in movimento",
        d: "Da casa o in remoto"
      }),
      points: JSON.stringify({ a: 1, b: 3, c: 2, d: 4 }),
      category: "Ambiente",
      order: 2
    },
    {
      question: "Quale materia scolastica ti piace di più?",
      options: JSON.stringify({
        a: "Matematica e Scienze",
        b: "Arte e Letteratura",
        c: "Storia e Geografia",
        d: "Educazione Fisica"
      }),
      points: JSON.stringify({ a: 4, b: 3, c: 2, d: 1 }),
      category: "Studio",
      order: 3
    },
    {
      question: "Come preferisci imparare?",
      options: JSON.stringify({
        a: "Leggendo e studiando",
        b: "Facendo pratica",
        c: "Guardando video e tutorial",
        d: "Collaborando con altri"
      }),
      points: JSON.stringify({ a: 1, b: 4, c: 2, d: 3 }),
      category: "Apprendimento",
      order: 4
    },
    {
      question: "Qual è il tuo obiettivo principale?",
      options: JSON.stringify({
        a: "Successo economico",
        b: "Realizzazione personale",
        c: "Aiutare la comunità",
        d: "Equilibrio vita-lavoro"
      }),
      points: JSON.stringify({ a: 1, b: 4, c: 3, d: 2 }),
      category: "Obiettivi",
      order: 5
    }
  ]

  for (const q of questions) {
    await prisma.question.create({
      data: q
    })
  }

  console.log('Database seeded successfully!')
  console.log('Admin login: admin@orientamente.org / admin123')
  console.log('User login: user@orientamente.org / user123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })