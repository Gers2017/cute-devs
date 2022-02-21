import { verify } from "jsonwebtoken";
import { CuteDev } from "../../entities/CuteDev";
import { ACCESS_TOKEN_SECRET } from "../../../constants";
import { OperationError } from "../responses";
import { Request } from "express";
import { AccessTokenPayload } from "../../../types/token";

export * from "../../../types/token";
export * from "../../../constants";

export async function AuthUser(req: Request) {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.replace(/^Bearer\s+/, "");

  if (!accessToken) {
    return {
      error: new OperationError(
        "Access token",
        "Missing Bearer token from authorization header",
      ),
    };
  }

  try {
    const payload = verify(
      accessToken,
      ACCESS_TOKEN_SECRET,
    ) as AccessTokenPayload;
    const cutedev = await CuteDev.findOne(payload.id);
    const currentSessionId = cutedev?.sessionId;

    if (currentSessionId !== payload.sessionId) {
      return {
        error: new OperationError("Access Token", "Invalid sessionId"),
      };
    }

    if (!cutedev)
      return {
        error: new OperationError("Access Token", "Invalid user"),
      };

    return { payload, cutedev };
  } catch (e) {
    return {
      error: new OperationError("Access Token", "Invalid Access Token"),
    };
  }
}
