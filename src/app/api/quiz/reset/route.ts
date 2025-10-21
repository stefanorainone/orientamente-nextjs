import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
    }

    const userId = session.user.id

    // Elimina tutte le risposte dell'utente
    await prisma.quizResponse.deleteMany({
      where: { userId }
    })

    return NextResponse.json({
      success: true,
      message: 'Quiz resettato con successo'
    })
  } catch (error) {
    console.error('Errore reset quiz:', error)
    return NextResponse.json(
      { error: 'Errore durante il reset' },
      { status: 500 }
    )
  }
}