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
      return prisma.task.findMany({
        orderBy: [
          {
            completed: 'asc'
          }
        ]
      })
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
    createTask: async (args) => {
      try {
        const task = await prisma.task.create({
          data: {
            task: args.task
          }
        })
        return task
      } catch (err) {
        throw new Error('Unable to create task')
      }
    },
    editTask:async (args) => {
      try {
        const task = await prisma.task.update({
          where: {
            id: args.id
          },
          data: {
            task: args.task,
            completed: args.completed
          }
        })
        return task
      } catch (err){
        throw new Error("Couldn't update task")
      }
    },
    deleteTask: async (args) => {
      try {
        const task = await prisma.task.delete({
          where: {
            id: args.id
          }
        })
        return task.id
      } catch (err) {
        throw new Error("Cannot Delete Task!")
      }
    },
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