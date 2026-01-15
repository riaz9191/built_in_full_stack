import { db } from './db'

async function main() {
  // Check if user exists
  const existingUser = await db.user.findFirst({
    where: {
      email: 'admin@blog.com',
    },
  })

  if (!existingUser) {
    const user = await db.user.create({
      data: {
        email: 'admin@blog.com',
        name: 'Blog Author',
      },
    })
    console.log('Created user:', user)
  } else {
    console.log('User already exists:', existingUser)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
