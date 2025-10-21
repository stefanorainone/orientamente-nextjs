export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    // Get all users with their quiz responses
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        quizResponses: {
          include: {
            question: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate results for each user
    const usersWithResults = users.map(user => {
      if (user.quizResponses.length === 0) {
        return {
          ...user,
          hasCompletedQuiz: false,
          results: null
        }
      }

      const categories: Record<string, number[]> = {}

      for (const response of user.quizResponses) {
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

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        hasCompletedQuiz: true,
        totalResponses: user.quizResponses.length,
        results
      }
    })

    return NextResponse.json(usersWithResults)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Errore durante il recupero degli utenti' },
      { status: 500 }
    )
  }
}
