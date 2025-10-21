import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// PUT update question
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const { question, options, points, category, order } = await req.json()
    const { id } = params

    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: {
        question,
        options: JSON.stringify(options),
        points: JSON.stringify(points),
        category,
        order
      }
    })

    return NextResponse.json({
      ...updatedQuestion,
      options: JSON.parse(updatedQuestion.options),
      points: JSON.parse(updatedQuestion.points)
    })
  } catch (error) {
    console.error('Error updating question:', error)
    return NextResponse.json({ error: 'Errore durante l\'aggiornamento della domanda' }, { status: 500 })
  }
}

// DELETE question
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 })
    }

    const { id } = params

    await prisma.question.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting question:', error)
    return NextResponse.json({ error: 'Errore durante l\'eliminazione della domanda' }, { status: 500 })
  }
}
