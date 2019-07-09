import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import {
  APP_PORT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME
} from "./config";

(async () => {
  try {
    await mongoose.connect(
      `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      {
        useNewUrlParser: true
      }
    );
    const app = express();
    app.disable("x-powered-by");
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: NODE_ENV !== "production"
    });

    server.applyMiddleware({ app });

    app.listen({ port: APP_PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`
      )
    );
  } catch (e) {
    console.error(e);
  }
})();
