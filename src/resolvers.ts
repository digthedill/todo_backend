import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from './utils/env'


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

  const authErr = "404! Invalid Username or Password"

const resolvers = {

  // QUERY
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


    //MUTATIONS
    signup: async (args) => {
      try {
        const password: string = await bcrypt.hash(args.password, 10)
        const user = await prisma.user.create({
          data: {
            ...args, 
            password
          }
        })
        const token = jwt.sign({userId: user.id}, env('JWT_SECRET'))
  
        return {
          token,
          user
        }
      } catch (err) {
        console.log(err)
      }
      
    },
    login: async (args) => {
      const user = await prisma.user.findUnique({
        where: {
          username: args.username
        }
      })
      if(!user) {
        throw new Error(authErr)
      }

      const valid = await bcrypt.compare(args.password, user.password)
      if(!valid){
        throw new Error(authErr)
      }

      const token = jwt.sign({userId: user.id}, env('JWT_SECRET'))

      return {token, user}
      
    }

  }

  export default resolvers