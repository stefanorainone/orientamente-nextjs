const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

// Read production DATABASE_URL
const envContent = fs.readFileSync('.env.production', 'utf8');
const match = envContent.match(/DATABASE_URL="([^"]+)"/);

if (!match) {
  console.error('❌ DATABASE_URL not found in .env.production');
  process.exit(1);
}

const DATABASE_URL = match[1];
console.log('📍 Using DATABASE_URL from .env.production');

// Set environment variable
process.env.DATABASE_URL = DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL
    }
  }
});

async function initDatabase() {
  try {
    console.log('\n🔍 Testing database connection...');
    await prisma.$connect();
    console.log('✅ Connected to database successfully');

    console.log('\n🔍 Checking if User table exists...');
    try {
      const userCount = await prisma.user.count();
      console.log(`✅ User table exists with ${userCount} users`);

      const questionCount = await prisma.question.count();
      console.log(`✅ Question table exists with ${questionCount} questions`);

      const responseCount = await prisma.quizResponse.count();
      console.log(`✅ QuizResponse table exists with ${responseCount} responses`);

      console.log('\n✅ Database is fully initialized!');
    } catch (error) {
      if (error.code === 'P2021' || error.message.includes('does not exist')) {
        console.log('❌ Tables do not exist yet');
        console.log('\n⚠️  You need to run: npx prisma db push');
        console.log('   But this must be done from Vercel\'s environment');
        console.log('   since the database is only accessible from there.\n');
        process.exit(1);
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.code) {
      console.error('   Error code:', error.code);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

initDatabase();
