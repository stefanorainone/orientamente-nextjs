const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  const email = 'admin@orientamente.org'
  const password = 'admin123'
  const name = 'Amministratore'

  try {
    // Check if admin already exists
    const existing = await prisma.user.findUnique({
      where: { email }
    })

    if (existing) {
      console.log('❌ Utente admin già esistente con email:', email)

      // Update to admin if not already
      if (existing.role !== 'ADMIN') {
        await prisma.user.update({
          where: { email },
          data: { role: 'ADMIN' }
        })
        console.log('✅ Utente aggiornato a ADMIN')
      }

      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN'
      }
    })

    console.log('✅ Utente admin creato con successo!')
    console.log('📧 Email:', email)
    console.log('🔑 Password:', password)
    console.log('👤 Nome:', name)
    console.log('\n⚠️  IMPORTANTE: Cambia la password dopo il primo accesso!')
  } catch (error) {
    console.error('❌ Errore durante la creazione dell\'admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
