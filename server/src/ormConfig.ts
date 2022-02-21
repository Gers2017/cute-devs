import { ConnectionOptions } from "typeorm";
import { DB_NAME, DB_USERNAME, DB_PASSWORD } from "./constants";
const ormConfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  // "dropSchema": true,
  logging: false,
  entities: ["src/schema/entities/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
};

export default ormConfig;
