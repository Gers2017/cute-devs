import { ConnectionOptions } from "typeorm";

export type Result<T> =
  | {
      result: T;
      error?: null | undefined;
    }
  | {
      result?: null | undefined;
      error: Error;
    };

export type ServerOptions = {
  port: number | string;
  credentials: boolean;
  ormConfig: ConnectionOptions;
};
