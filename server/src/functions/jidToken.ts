import { Response } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { JWT_SECRET, __is_prod__ } from "../constants";

export function generateJwtToken(payload: object) {
  return sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });
}

export function getJidPayload(jid: string) {
  let payload;
  try {
    payload = verify(jid, JWT_SECRET) as JwtPayload & { userId: string };
  } catch (e) {
    console.error(e);
    payload = null;
  }
  return payload;
}

export function setJidCookie(res: Response, payload: object) {
  const jwtToken = generateJwtToken(payload);
  res.cookie("jid", jwtToken, {
    maxAge: 10000 * 60 * 60, // 1h
    httpOnly: true,
    secure: __is_prod__,
  });
}
