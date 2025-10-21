export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
    }

    const userId = session.user.id

    // Controlla se l'utente ha risposte salvate
    const responses = await prisma.quizResponse.findMany({
      where: { userId },
      include: { question: true }
    })

    if (responses.length === 0) {
      return NextResponse.json({ completed: false })
    }

    // Calcola risultati
    const categories: Record<string, number[]> = {}

    for (const response of responses) {
      const points = JSON.parse(response.question.points)
      const pointValue = points[response.answer] || 0
      const category = response.question.category

      if (!categories[category]) {
        categories[category] = []
      }
      categories[category].push(pointValue)
    }

    const results: Record<string, number> = {}
    for (const [category, scores] of Object.entries(categories)) {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length
      results[category] = Math.round(avg * 10) / 10
    }

    return NextResponse.json({
      completed: true,
      results: { categories: results }
    })
  } catch (error) {
    console.error('Errore check completion:', error)
    return NextResponse.json(
      { error: 'Errore durante il controllo' },
      { status: 500 }
    )
  }
}