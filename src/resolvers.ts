import { tasks, users } from "./data/seed"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// seed data through prisma client



interface taskType {
    id: number
    task: string
  }
  interface userType {
    id: number
    name: string
    email: string
    username: string
  }

const resolvers = {
    task: (req: taskType) => {
      return prisma.task.findUnique({
        where: {
          id: req.id
        }
      })
    },
    tasks: () => {
      return prisma.task.findMany()
    },
    user: (req: userType) => {
        return prisma.user.findUnique({
          where: {
            id: req.id
          }
        })
    },
    users: async() => {
      return prisma.user.findMany()
    },
  }

  export default resolvers