import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()



async function main() {

  const password = await bcrypt.hash("testing", 10)
  await prisma.user.createMany({
    data: [
      {
        name: "donald fagan",
        email: "theEmpire@example.com",
        username: "stealtheempire",
        password: password
      },
      {
        name: "blue crystal",
        email: "stripper@example.com",
        username: "health__",
        password: password
       
      },
      {
        name: "ronald reagan",
        email: "theactor@example.com",
        username: "tickledown",
        password: password
       
      }
    ],
    skipDuplicates: true
  })

  await prisma.task.createMany({
    data: [
      {
        task: "Do the laundry",
        userId: 1
      },
      {
        task: "Do the dishes",
        userId: 1
      },
      {
        task: "Wax the car",
        userId: 2
      },
    ],
    skipDuplicates: true
  })

}
main()
  .catch((e) => {
    console.log(e)
    process.exit(1)

  })
  .finally(async () => {
    await prisma.$disconnect
  })