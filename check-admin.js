const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkAdmin() {
  try {
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@orientamente.org' }
    })

    if (admin) {
      console.log('👤 Admin user found:')
      console.log('   Email:', admin.email)
      console.log('   Name:', admin.name)
      console.log('   Role:', admin.role)
      console.log('   ID:', admin.id)

      if (admin.role !== 'ADMIN') {
        console.log('\n⚠️  Role is not ADMIN! Updating...')
        await prisma.user.update({
          where: { email: 'admin@orientamente.org' },
          data: { role: 'ADMIN' }
        })
        console.log('✅ Role updated to ADMIN')
      } else {
        console.log('\n✅ Role is correctly set to ADMIN')
      }
    } else {
      console.log('❌ Admin user not found')
    }
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAdmin()
