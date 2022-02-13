import { CuteDev } from "../../entities/CuteDev";
import { AuthReponse, CuteDevResponse, DeleteResponse } from "../responses";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types/MyContext";
import {
  findCutedevById,
  comparePasswords,
  generateNewCutedev,
} from "../../utils/resolverUtils";
import {
  setJidCookie,
  setRefreshToken,
  tryToGetTokens,
  clearTokens,
} from "../../../functions/token";
import { CuteDevsInput, EditCuteDevInput } from "./CuteDevInput";

@Resolver(CuteDev)
export class CuteDevResolver {
  @Query(() => AuthReponse)
  async me(@Ctx() { req, res }: MyContext): Promise<AuthReponse> {
    try {
      const { jidPayload, refreshPayload } = tryToGetTokens(req, res);

      let userId = "";

      if (jidPayload) userId = jidPayload.userId;
      else if (refreshPayload) userId = refreshPayload.userId;

      return {
        isAuth: !!jidPayload || !!refreshPayload,
        userId: userId,
      };
    } catch (e) {
      return {
        isAuth: false,
        userId: "",
      };
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    try {
      const { jidPayload, refreshPayload } = tryToGetTokens(req, res);
      if (jidPayload || refreshPayload) {
        clearTokens(res);
        return true;
      }
      return false;
    } catch (e) {
      return false;
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

  @Query((returns) => [CuteDev])
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

  // TODO: add register validation
  @Mutation((returns) => CuteDevResponse)
  async registerCuteDev(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext,
  ): Promise<CuteDevResponse> {
    try {
      const newCuteDev = await generateNewCutedev(username, password);

      const { identifiers } = await CuteDev.insert(newCuteDev);
      const userId = identifiers[0].id;

      setJidCookie(res, { userId });
      setRefreshToken(res, { userId, sessionId: 1 });

      return {
        cutedev: newCuteDev,
      };
    } catch (e) {
      console.error(e);
      return {
        errors: [{ field: "username", message: "Username already taken" }],
      };
    }
  }

  // ==> Login resolver
  @Mutation(() => CuteDevResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext,
  ): Promise<CuteDevResponse> {
    const cuteDev = await CuteDev.findOne({ where: { username } });
    if (!cuteDev) {
      return {
        errors: [{ field: "username", message: "Username doesn't exists" }],
      };
    }
    try {
      const isValid = await comparePasswords(password, cuteDev.password);

      if (!isValid) {
        return {
          errors: [{ field: "password", message: "Incorrect password" }],
        };
      }
    } catch (e) {
      return {
        errors: [
          { field: "password", message: "Error at validating the password" },
        ],
      };
    }
    setJidCookie(res, { userId: cuteDev.id });
    setRefreshToken(res, {
      userId: cuteDev.id,
      sessionId: 1,
    });

    return {
      cutedev: cuteDev,
    };
  }

  @Mutation(() => Boolean)
  async editCutedevProfile(
    @Arg("input") { id, username, bio, languages, imageUrl }: EditCuteDevInput,
  ) {
    const cutedev = await findCutedevById(id);
    if (!cutedev) return false;

    if (username && username.length > 0) cutedev.username = username;
    if (bio && bio.length > 0) cutedev.bio = bio;
    if (imageUrl && imageUrl.length > 0) cutedev.imageUrl = imageUrl; // TODO validate url
    if (languages) cutedev.languages = languages.map((s) => s.toLowerCase());

    try {
      await cutedev.save();
    } catch (e) {
      return false;
    }
    return true;
  }

  // TODO: add authentication for delete cutedev
  @Mutation(() => DeleteResponse)
  async deleteCuteDev(@Arg("id") id: string): Promise<DeleteResponse> {
    const cuteDevToDelete = await CuteDev.findOne(id);
    if (!cuteDevToDelete) {
      return {
        deleted: false,
        errors: [{ field: "id", message: `No cuteDev with id ${id}` }],
      };
    }
    try {
      await CuteDev.remove([cuteDevToDelete]);
      return { deleted: true };
    } catch (e) {
      console.error(e);
      return {
        deleted: false,
        errors: [
          {
            field: "id",
            message: `Unexpected error at deleting cuteDev with id ${id}`,
          },
        ],
      };
    }
  }
}
