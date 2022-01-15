import express, { NextFunction, Request, Response } from "express"
import { graphqlHTTP } from "express-graphql"
import resolvers from './resolvers'
import schema from './schema'

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log({
    req  
  });
  next();
} 


const app = express()
app.use(loggingMiddleware)
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
)

app.listen(4000)
console.log("running on http://localhost:4000/graphql")
