import "reflect-metadata";
import { config } from "dotenv";

config();
import { PORT } from "./constants";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { MyContext } from "./types/context";
import cookieParser from "cookie-parser";

// typeorm and typegraphql config
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { CuteDevResolver, PostResolver } from "./schema/resolvers/";

async function startApolloServer() {
  const connection = await createConnection();
  console.log(`typeorm connected: ${connection.isConnected}`);

  const app = express();
  app.use(cookieParser());

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CuteDevResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
  });

  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      origin: ["https://studio.apollographql.com", `http://localhost:${PORT}`],
      credentials: true,
    },
  });

  app.listen(PORT, () => {
    console.log(`Express server ready at http://localhost:${PORT}`);

    console.log(
      `🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`,
    );
  });
}

startApolloServer().catch((e) => console.error(e));
