import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Test database connection and schema
    await prisma.$connect()

    // Try to count users to check if tables exist
    const userCount = await prisma.user.count()

    return NextResponse.json({
      success: true,
      message: 'Database is initialized',
      userCount
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      details: 'Database tables may not exist yet. Please run: npx prisma db push'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
