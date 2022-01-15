import express from "express"
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql"
import { tasks, users } from "./data/seeds"
// import { users, tasks } from "../data/seeds"

const schema = buildSchema(`

type Query {
    task(id: Int!): Task,
    tasks: [Task],
    user(id: Int!): User,
    users: [User]
  }
type Task {
    id: Int,
    task: String
}
type User {
    id: Int,
    name: String,
    email: String,
    username: String
}
  
  `)

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

const handler = {
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

const app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: handler,
    graphiql: true,
  })
)

app.listen(4000)
console.log("running on http://localhost:4000/graphql")
