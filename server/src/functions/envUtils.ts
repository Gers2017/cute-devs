import { Secret } from "../types/Secret";

export function getEnvValue<T>(key: string, defaultValue?: T) {
  let value = process.env[key];
  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Missing '${key}' key on .env file`);
}

export function tryToGetSecret(
  identifier: string,
  __is_dev__: boolean,
  __is_prod__: boolean,
): Secret {
  return {
    value: getEnvValue(identifier),
    __is_dev__,
    __is_prod__,
  };
}
