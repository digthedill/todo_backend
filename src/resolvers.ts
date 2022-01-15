import { tasks, users } from "./data/seeds"


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
    task: (res: taskType) => {
      return tasks.find((task) => task.id === res.id)
    },
    tasks: () => {
      return tasks
    },
    user: (res: userType) => {
      return users.find((u) => u.id === res.id)
    },
    users: () => {
      return users
    },
  }

  export default resolvers