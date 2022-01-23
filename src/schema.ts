import { buildSchema } from "graphql"

const schema = buildSchema(`
type Mutation {
  login(username: String!, password: String!): AuthPayload,
  signup( name: String!,
          email: String!,
          username: String!,
          password: String!): AuthPayload,
  createTask(task: String!): Task
  editTask(id: Int!, task: String, completed: Boolean): Task
  deleteTask(id: Int!): Task
}

type Query {
    task(id: Int!): Task,
    tasks: [Task],
    user(id: Int!): User,
    users: [User]
  }
type Task {
    id: Int,
    task: String,
    completed: Boolean
}
type User {
    id: Int,
    name: String,
    email: String,
    username: String
}

type AuthPayload {
  token: String
  user: User
}

`)

export default schema