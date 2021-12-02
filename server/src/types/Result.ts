export type Result<T> =
  | {
      result: T;
      error?: null | undefined;
    }
  | {
      result?: null | undefined;
      error: Error;
    };
