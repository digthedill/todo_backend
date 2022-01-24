import express from "express"
import { graphqlHTTP } from "express-graphql"
import cors from 'cors'
import expressJwt from "express-jwt"
import resolvers from './resolvers'
import schema from './schema'
import { env } from "./utils/env"

const expressPlayground = require('graphql-playground-middleware-express')
  .default

const app = express()

app.use(cors())

app.use(
  expressJwt({
  secret: env('JWT_SECRET'),
  algorithms: ["HS256"],
  credentialsRequired: false
  })
)

const context = async (req) => {
  const { authorization: token } = req.headers;
  const { user } = req;
  return { token, user };
};  


app.use(
  "/graphql",
  graphqlHTTP( async (req, res, params) => {
    return{
      schema,
      rootValue: resolvers,
      graphiql: true,
      context: () => context(req)
  }})
)

app.get('/playground', expressPlayground({endpoint: '/graphql'}))

app.listen(4000)
console.log("running on http://localhost:4000/playground")
