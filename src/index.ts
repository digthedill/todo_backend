import express from "express"
import { graphqlHTTP } from "express-graphql"
import expressJwt from "express-jwt"
import resolvers from './resolvers'
import schema from './schema'
import { env } from "./utils/env"

const app = express()


app.use(
  expressJwt({
  secret: env('JWT_SECRET'),
  algorithms: ["HS256"],
  credentialsRequired: false
  })
)

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
  })
)

app.listen(4000)
console.log("running on http://localhost:4000/graphql")
