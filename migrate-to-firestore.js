const { PrismaClient } = require('@prisma/client')
const admin = require('firebase-admin')

const prisma = new PrismaClient()

// Initialize Firebase Admin
admin.initializeApp({
  projectId: 'orientamente-01'
})

const db = admin.firestore()

async function migrate() {
  console.log('🔄 Starting migration from SQLite to Firestore...\n')

  try {
    // Migrate Users
    console.log('📤 Migrating users...')
    const users = await prisma.user.findMany()
    for (const user of users) {
      await db.collection('users').doc(user.id).set({
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.role,
        createdAt: admin.firestore.Timestamp.fromDate(user.createdAt),
        updatedAt: admin.firestore.Timestamp.fromDate(user.updatedAt),
      })
      console.log(`   ✅ Migrated user: ${user.email}`)
    }
    console.log(`   Migrated ${users.length} users\n`)

    // Migrate Questions
    console.log('📤 Migrating questions...')
    const questions = await prisma.question.findMany()
    for (const question of questions) {
      await db.collection('questions').doc(question.id).set({
        question: question.question,
        options: question.options,
        points: question.points,
        category: question.category,
        order: question.order,
        createdAt: admin.firestore.Timestamp.fromDate(question.createdAt),
        updatedAt: admin.firestore.Timestamp.fromDate(question.updatedAt),
      })
      console.log(`   ✅ Migrated question: ${question.question.substring(0, 50)}...`)
    }
    console.log(`   Migrated ${questions.length} questions\n`)

    // Migrate Quiz Responses
    console.log('📤 Migrating quiz responses...')
    const responses = await prisma.quizResponse.findMany()
    for (const response of responses) {
      await db.collection('quizResponses').doc(response.id).set({
        userId: response.userId,
        questionId: response.questionId,
        answer: response.answer,
        createdAt: admin.firestore.Timestamp.fromDate(response.createdAt),
      })
    }
    console.log(`   Migrated ${responses.length} quiz responses\n`)

    console.log('✅ Migration completed successfully!')
  } catch (error) {
    console.error('❌ Migration error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrate()
