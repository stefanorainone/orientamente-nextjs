import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e password sono richiesti' },
        { status: 400 }
      )
    }

    // Verifica se l'utente esiste già
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email già registrata' },
        { status: 400 }
      )
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crea l'utente
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'USER'
      }
    })

    return NextResponse.json({
      message: 'Utente registrato con successo',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error) {
    console.error('Errore registrazione:', error)
    return NextResponse.json(
      { error: 'Errore durante la registrazione' },
      { status: 500 }
    )
  }
}