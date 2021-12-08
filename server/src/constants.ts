import { getEnvValue, tryToGetSecret } from "./functions/envUtils";

export const __is_prod__ = getEnvValue("NODE_ENV") === "production";
export const __is_dev__ = getEnvValue("NODE_ENV") === "development";

export const PORT = getEnvValue("PORT", 4000);

export const JWT_SECRET = tryToGetSecret("JWT_SECRET", __is_dev__, __is_prod__);
export const REFRESH_SECRET = tryToGetSecret(
  "REFRESH_SECRET",
  __is_dev__,
  __is_prod__,
);

// github oauth
// export const CLIENT_ID = process.env.CLIENT_ID || "";
// export const CLIENT_URL = process.env.CLIENT_URL || "";
// export const CLIENT_SECRET = process.env.CLIENT_SECRET || "";
