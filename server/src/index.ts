import "reflect-metadata";
import { config } from "dotenv";
config();
import { PORT } from "./constants";
import { startApolloServer } from "./functions/server";
import ormConfig from "./ormConfig";

startApolloServer({
  port: PORT,
  credentials: true,
  ormConfig,
}).catch((e) => console.error(e));
