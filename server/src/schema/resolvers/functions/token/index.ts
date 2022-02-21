import { sign } from "jsonwebtoken";
import { AccessTokenPayload, ACCESS_TOKEN_SECRET } from "../../auth";
import { CuteDev } from "../../../entities/CuteDev";
import { randomBytes } from "crypto";

export function generateAccessToken(
  payload: AccessTokenPayload,
  expiresIn: string = "1d",
) {
  return sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: expiresIn,
  });
}

export async function refreshSessionId(cutedev: CuteDev) {
  let sessionId = generateSessionId();
  cutedev.sessionId = sessionId;
  await cutedev.save();
  return sessionId;
}

export function generateSessionId(length: number = 60) {
  return randomBytes(length).toString("hex");
}
