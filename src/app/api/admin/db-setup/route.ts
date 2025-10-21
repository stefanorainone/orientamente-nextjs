import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { secret } = await req.json()

    if (secret !== 'setup-db-2025') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('Starting database setup...')

    // Create tables using raw SQL
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "name" TEXT,
        "role" TEXT NOT NULL DEFAULT 'USER',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Question" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "question" TEXT NOT NULL,
        "options" TEXT NOT NULL,
        "points" TEXT NOT NULL,
        "category" TEXT NOT NULL DEFAULT 'Generale',
        "order" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "QuizResponse" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "questionId" TEXT NOT NULL,
        "answer" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
        FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE,
        UNIQUE ("userId", "questionId")
      )
    `)

    console.log('Database tables created successfully')

    // Verify tables exist
    const userCount = await prisma.user.count()
    const questionCount = await prisma.question.count()
    const responseCount = await prisma.quizResponse.count()

    return NextResponse.json({
      success: true,
      message: 'Database setup completed',
      tables: {
        User: userCount,
        Question: questionCount,
        QuizResponse: responseCount
      }
    })
  } catch (error: any) {
    console.error('Database setup error:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code || 'UNKNOWN'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET() {
  try {
    // Check if tables exist
    const userCount = await prisma.user.count()
    const questionCount = await prisma.question.count()
    const responseCount = await prisma.quizResponse.count()

    return NextResponse.json({
      success: true,
      message: 'Database is initialized',
      tables: {
        User: userCount,
        Question: questionCount,
        QuizResponse: responseCount
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Database not initialized. Call POST with secret to initialize.'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const dynamic = 'force-dynamic'
