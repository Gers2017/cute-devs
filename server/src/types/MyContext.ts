import { Request, Response } from "express";

export type MyContext = {
  req: Request & { cookies: { jid: string | undefined } };
  res: Response;
};
