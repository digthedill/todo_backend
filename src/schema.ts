import { buildSchema } from "graphql"

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

export default schema