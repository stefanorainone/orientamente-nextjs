import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
    }

    const { answers } = await req.json()
    const userId = session.user.id

    // Elimina risposte precedenti
    await prisma.quizResponse.deleteMany({
      where: { userId }
    })

    // Salva nuove risposte
    const responseData = Object.entries(answers).map(([questionId, answer]) => ({
      userId,
      questionId,
      answer: answer as string
    }))

    await prisma.quizResponse.createMany({
      data: responseData
    })

    // Calcola risultati per categoria
    const questions = await prisma.question.findMany()
    const categories: Record<string, number[]> = {}

    for (const [questionId, answer] of Object.entries(answers)) {
      const question = questions.find(q => q.id === questionId)
      if (question) {
        const points = JSON.parse(question.points)
        const pointValue = points[answer as string] || 0
        const category = question.category

        if (!categories[category]) {
          categories[category] = []
        }
        categories[category].push(pointValue)
      }
    }

    // Calcola media per categoria
    const results: Record<string, number> = {}
    for (const [category, scores] of Object.entries(categories)) {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length
      results[category] = Math.round(avg * 10) / 10
    }

    return NextResponse.json({
      success: true,
      results: { categories: results }
    })
  } catch (error) {
    console.error('Errore submit quiz:', error)
    return NextResponse.json(
      { error: 'Errore durante il salvataggio' },
      { status: 500 }
    )
  }
}