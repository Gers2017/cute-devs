import { ApolloServer } from "apollo-server-express";
import express from "express";
import { MyContext } from "../../types/context";
import cookieParser from "cookie-parser";

// typeorm and typegraphql config
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { CuteDevResolver, PostResolver } from "../../schema/resolvers/";
import { ServerOptions } from "../../types/api";

export async function startApolloServer({
  port,
  credentials,
  ormConfig,
}: ServerOptions) {
  const connection = await createConnection(ormConfig);
  console.log(
    `Connection to ${connection.options.database} typeorm connected: ${connection.isConnected}`,
  );

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
      origin: ["https://studio.apollographql.com", `http://localhost:${port}`],
      credentials: credentials,
    },
  });

  app.listen(port, () => {
    console.log(`Express server ready at http://localhost:${port}`);

    console.log(
      `🚀 GraphQL server ready at http://localhost:${port}${server.graphqlPath}`,
    );
  });
}
