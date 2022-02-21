import { ConnectionOptions } from "typeorm";
import { DB_USERNAME, DB_PASSWORD, TEST_DB_NAME } from "../constants";
const testOrmConfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: TEST_DB_NAME,
  synchronize: true,
  dropSchema: true,
  logging: false,
  entities: ["src/schema/entities/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
};

export default testOrmConfig;
