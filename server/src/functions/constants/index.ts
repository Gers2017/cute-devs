export function getEnvValue<T>(key: string, defaultValue?: T) {
  let value = process.env[key];
  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing '${key}' key on .env file`);
}
