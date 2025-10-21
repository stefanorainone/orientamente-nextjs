import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET all questions (for admin)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const questions = await prisma.question.findMany({
      orderBy: { order: 'asc' }
    })

    // Parse JSON strings for admin view
    const parsedQuestions = questions.map(q => ({
      id: q.id,
      question: q.question,
      options: JSON.parse(q.options),
      points: JSON.parse(q.points),
      category: q.category,
      order: q.order,
      createdAt: q.createdAt,
      updatedAt: q.updatedAt
    }))

    return NextResponse.json(parsedQuestions)
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json({ error: 'Errore durante il recupero delle domande' }, { status: 500 })
  }
}

// POST create new question
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const { question, options, points, category, order } = await req.json()

    // Validate input
    if (!question || !options || !points || !category) {
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
    }

    const newQuestion = await prisma.question.create({
      data: {
        question,
        options: JSON.stringify(options),
        points: JSON.stringify(points),
        category,
        order: order || 0
      }
    })

    return NextResponse.json({
      ...newQuestion,
      options: JSON.parse(newQuestion.options),
      points: JSON.parse(newQuestion.points)
    })
  } catch (error) {
    console.error('Error creating question:', error)
    return NextResponse.json({ error: 'Errore durante la creazione della domanda' }, { status: 500 })
  }
}
