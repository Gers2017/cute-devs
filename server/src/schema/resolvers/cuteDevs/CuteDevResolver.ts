import { CuteDev } from "../../entities/CuteDev";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../../../types/context";
import { AuthUser } from "../auth";
import {
  generateAccessToken,
  generateSessionId,
  refreshSessionId,
} from "../functions/token";

import {
  isValidPassword,
  setCutedevSessionId,
  createNewCutedev,
  isValidCutedevImageUrl,
} from "../functions/cutedev";

import { CuteDevsInput, EditCuteDevInput } from "./CuteDevInput";

import {
  TokenResponse,
  DeleteResponse,
  LogoutResponse,
  OperationError,
  AuthUserResponse,
  EditCutedevResponse,
} from "../responses";
@Resolver(CuteDev)
export class CuteDevResolver {
  @Query(() => AuthUserResponse)
  async me(@Ctx() { req }: MyContext): Promise<AuthUserResponse> {
    const { payload, error } = await AuthUser(req);
    if (payload) return { success: true };
    return { success: false, error };
  }

  @Mutation(() => TokenResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
  ): Promise<TokenResponse> {
    const cuteDev = await CuteDev.findOne({ where: { username } });
    if (!cuteDev) {
      return {
        error: new OperationError("username", "No such a user"),
      };
    }

    // compare password with hashed password
    if (!(await isValidPassword(password, cuteDev.password))) {
      return {
        error: new OperationError("password", "Incorrect password"),
      };
    }

    let sessionId = generateSessionId();
    const accessToken = generateAccessToken({ id: cuteDev.id, sessionId });

    setCutedevSessionId(cuteDev, sessionId);

    return {
      accessToken,
    };
  }

  @Mutation(() => TokenResponse)
  async registerCuteDev(
    @Arg("username") username: string,
    @Arg("password") password: string,
  ): Promise<TokenResponse> {
    try {
      const cutedev = await createNewCutedev(username, password);
      if (!cutedev) {
        return {
          error: new OperationError(
            "register cutedev",
            "Error at registering cutedev",
          ),
        };
      }
      const accessToken = generateAccessToken({
        id: cutedev.id,
        sessionId: generateSessionId(),
      });

      return {
        accessToken,
      };
    } catch (e) {
      console.error(e);
      return {
        error: new OperationError("username", "Username already taken"),
      };
    }
  }

  @Mutation(() => LogoutResponse)
  async logout(@Ctx() { req }: MyContext): Promise<LogoutResponse> {
    const { error, cutedev } = await AuthUser(req);
    if (!cutedev) return { error };

    try {
      await refreshSessionId(cutedev);
      return { success: true };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        error: new OperationError("payload", "Error at generating new session"),
      };
    }
  }

  @Mutation(() => AuthUserResponse)
  async refresh(@Ctx() { req }: MyContext): Promise<TokenResponse> {
    const { error, cutedev } = await AuthUser(req);
    if (!cutedev) return { error };

    try {
      let sessionId = await refreshSessionId(cutedev);
      const accessToken = generateAccessToken({ id: cutedev.id, sessionId });
      return { accessToken };
    } catch (e) {
      console.error(e);
      return {
        error: new OperationError("payload", "Error at generating new session"),
      };
    }
  }

  @Query(() => CuteDev, { nullable: true })
  async cuteDev(@Arg("id") id: string) {
    try {
      const cuteDev = await CuteDev.findOne(id, {
        relations: ["posts"],
      });
      return cuteDev || null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  @Query(() => [CuteDev])
  async cuteDevs(@Arg("input") { limit }: CuteDevsInput) {
    try {
      if (limit < 0) return [];
      return await CuteDev.find({
        take: limit,
        relations: ["posts"],
      });
    } catch (e) {
      return [];
    }
  }

  @Mutation(() => EditCutedevResponse)
  async editCutedevProfile(
    @Ctx() { req }: MyContext,
    @Arg("input") { username, bio, languages, imageUrl }: EditCuteDevInput,
  ): Promise<EditCutedevResponse> {
    const { cutedev, error } = await AuthUser(req);
    if (!cutedev) return { error };

    if (username && username.length > 0) cutedev.username = username;
    if (bio && bio.length > 0) cutedev.bio = bio;

    if (imageUrl && imageUrl.length > 0 && isValidCutedevImageUrl(imageUrl)) {
      cutedev.imageUrl = imageUrl;
    }

    if (languages && languages.length > 0) {
      cutedev.languages = languages.map((s) => s.toLowerCase());
    }

    try {
      await cutedev.save();
    } catch (e) {
      return {
        error: new OperationError("edit cutedev", "Unauthorized operation"),
      };
    }

    return {
      edited: cutedev,
    };
  }

  @Mutation(() => DeleteResponse)
  async deleteCuteDev(@Ctx() { req }: MyContext): Promise<DeleteResponse> {
    const { cutedev, error } = await AuthUser(req);
    if (error) return { deleted: false, error };

    try {
      if (cutedev) {
        await CuteDev.remove([cutedev]);
        return { deleted: true };
      }
      return { deleted: false };
    } catch (e) {
      console.error(e);
      return {
        deleted: false,
        error: new OperationError(
          "delete cutedev",
          "Error at deleting cutedev",
        ),
      };
    }
  }
}
