import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { order: 'asc' }
    })

    // Parse JSON strings per SQLite
    const parsedQuestions = questions.map(q => ({
      id: q.id,
      question: q.question,
      options: JSON.parse(q.options),
      category: q.category
    }))

    return NextResponse.json(parsedQuestions)
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
}