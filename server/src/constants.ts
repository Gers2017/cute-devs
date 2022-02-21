import { getEnvValue } from "./functions/constants";

export const __is_prod__ = getEnvValue("NODE_ENV") === "production";
export const __is_dev__ = getEnvValue("NODE_ENV") === "development";

export const PORT = getEnvValue("PORT", 4000);

export const ACCESS_TOKEN_SECRET = getEnvValue("ACCESS_TOKEN_SECRET", "");
export const REFRESH_TOKEN_SECRET = getEnvValue("REFRESH_TOKEN_SECRET", "");

export const DB_USERNAME = getEnvValue("DB_USERNAME", "", true);
export const DB_PASSWORD = getEnvValue("DB_PASSWORD", "", true);
export const DB_NAME = getEnvValue("DB_NAME", "", true);
export const TEST_DB_NAME = getEnvValue("TEST_DB_NAME", "", true);

// github oauth
// export const CLIENT_ID = process.env.CLIENT_ID || "";
// export const CLIENT_URL = process.env.CLIENT_URL || "";
// export const CLIENT_SECRET = process.env.CLIENT_SECRET || "";
