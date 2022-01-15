import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {

  await prisma.user.createMany({
    data: [
      {
        name: "donald fagan",
        email: "theEmpire@example.com",
        username: "stealtheempire",
        password: 'testing'
      },
      {
        name: "blue crystal",
        email: "stripper@example.com",
        username: "health__",
        password: 'testing'
       
      },
      {
        name: "ronald reagan",
        email: "theactor@example.com",
        username: "tickledown",
        password: 'testing'
       
      }
    ],
    skipDuplicates: true
  })

  // await prisma.task.createMany({
  //   data: [
  //     {
  //       task: "Do the laundry",
  //       userId: 1
  //     },
  //     {
  //       task: "Do the dishes",
  //       userId: 1
  //     },
  //     {
  //       task: "Wax chest",
  //       userId: 2
  //     },
  //   ],
  //   skipDuplicates: true
  // })

}
main()
  .catch((e) => {
    console.log(e)
    process.exit(1)

  })
  .finally(async () => {
    await prisma.$disconnect
  })

const users = [
  {
    name: "donald fagan",
    email: "theEmpire@example.com",
    username: "stealtheempire",
  },
  {
    name: "blue crystal",
    email: "stripper@example.com",
    username: "health__",
   
  },
  {
    name: "ronald reagan",
    email: "theactor@example.com",
    username: "tickledown",
   
  },
]

const tasks = [
  {
    id: 1,
    task: "Do the laundry",
  },
  {
    id: 2,
    task: "Do the dishes",
  },
  {
    id: 3,
    task: "Wax chest",
  },
]
export { users, tasks }
