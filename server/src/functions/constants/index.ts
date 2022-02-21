export function getEnvValue<T>(
  key: string,
  fallbackValue?: T,
  isRequired?: boolean,
) {
  let value = process.env[key];
  if (value) return value;
  if (fallbackValue && !isRequired) return fallbackValue;

  throw new Error(`Missing '${key}' key on .env file`);
}
