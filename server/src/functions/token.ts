import { Response, Request } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "src/types/TokenPayload";
import { Secret } from "src/types/Secret";
import { TokenTime } from "src/types/TokenTime";
import { JWT_SECRET, REFRESH_SECRET, __is_prod__ } from "../constants";

export function tryToGetTokens(req: Request, res: Response) {
  let jidPayload = getJidPayload(req.cookies.jid);
  let refreshPayload = getRefreshPayload(req.cookies.refresh);
  let wasJidCookieSet = false;

  // set a new jid cookie
  if (!jidPayload && refreshPayload) {
    wasJidCookieSet = setJidCookie(res, { userId: refreshPayload.userId });
  }

  return { jidPayload, refreshPayload, wasJidCookieSet };
}

export function clearTokens(res: Response) {
  res.clearCookie("jid");
  res.clearCookie("refresh");
}

function generateJwtToken(payload: object, secret: Secret, time: TokenTime) {
  return sign(payload, secret.value, {
    expiresIn: time,
  });
}

export function getJidPayload(token: string) {
  return getTokenPayload<AccessTokenPayload>(token, JWT_SECRET);
}
export function getRefreshPayload(token: string) {
  return getTokenPayload<RefreshTokenPayload>(token, REFRESH_SECRET);
}

export function setJidCookie(res: Response, payload: AccessTokenPayload) {
  return setCookie(
    res,
    "jid",
    { payload, secret: JWT_SECRET, time: "1h" },
    10000 * 60 * 60,
  ); // 1h
}

export function setRefreshToken(res: Response, payload: RefreshTokenPayload) {
  const time = 10000 * 60 * 60 * 24 * 7; //7 days
  return setCookie(
    res,
    "refresh",
    { payload, secret: REFRESH_SECRET, time: "7d" }, // 7 yeas
    time,
  );
}

function getTokenPayload<Payload>(token: string, secret: Secret) {
  try {
    return verify(token, secret.value) as JwtPayload & Payload;
  } catch (e) {
    return null;
  }
}

function setCookie(
  res: Response,
  identifier: string,
  jwtConfig: {
    secret: Secret;
    payload: object;
    time: TokenTime;
  },
  maxAge: number,
): boolean {
  try {
    const { payload, secret, time } = jwtConfig;
    const jwt = generateJwtToken(payload, secret, time);
    res.cookie(identifier, jwt, {
      maxAge,
      httpOnly: true,
      secure: __is_prod__,
      sameSite: "lax",
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
