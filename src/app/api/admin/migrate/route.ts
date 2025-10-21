import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)

export async function POST(req: Request) {
  try {
    // Security: In production, add authentication here
    const { secret } = await req.json()

    if (secret !== 'migrate-secret-2025') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('Starting database migration...')

    // Execute prisma db push
    const { stdout, stderr } = await execPromise('npx prisma db push --skip-generate --accept-data-loss')

    console.log('Migration output:', stdout)
    if (stderr) {
      console.error('Migration stderr:', stderr)
    }

    return NextResponse.json({
      success: true,
      message: 'Database migration completed',
      output: stdout,
      errors: stderr || null
    })
  } catch (error: any) {
    console.error('Migration error:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      output: error.stdout || null,
      stderr: error.stderr || null
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Database migration endpoint. Use POST with secret to migrate.'
  })
}

export const dynamic = 'force-dynamic'
