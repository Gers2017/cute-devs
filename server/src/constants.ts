export const __is_prod__ = process.env.NODE_ENV === "production";
export const __is_dev__ = process.env.NODE_ENV === "development";
export const PORT = process.env.PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET || "";

// github oauth
export const CLIENT_ID = process.env.CLIENT_ID || "";
export const CLIENT_URL = process.env.CLIENT_URL || "";
export const CLIENT_SECRET = process.env.CLIENT_SECRET || "";
