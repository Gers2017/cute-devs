import { CuteDev } from "../../entities/CuteDev";
import { CuteDevResponse, DeleteResponse } from "../responses";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types/MyContext";
import { hash, compare } from "bcrypt";
import { setJidCookie, getJidPayload } from "../../../functions/jidToken";
import { EditCuteDevInput } from "./CuteDevInput";

@Resolver(CuteDev)
export class CuteDevResolver {
  @Query(() => Boolean)
  async me(@Ctx() { req }: MyContext) {
    let payload = getJidPayload(req.cookies.jid);
    return payload ? true : false;
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
  async cuteDevs(
    @Arg("limit", { defaultValue: 5 })
    limit: number,
  ) {
    if (limit < 0) return [];
    return await CuteDev.find({
      take: limit,
      relations: ["posts"],
    });
  }

  @Mutation((returns) => CuteDevResponse)
  async registerCuteDev(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext,
  ): Promise<CuteDevResponse> {
    // validate password
    // TODO: add validation after the frontend is complete

    // const regex = new RegExp(
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
    // );

    // const validPassword = regex.test(password);
    // if (!validPassword) {
    //   return {
    //     errors: [{ field: "password", message: "Invalid password" }],
    //   };
    // }

    try {
      const usernameKey = username.toLocaleLowerCase().replace(/[\W]/gm, "_");
      const hashedPassword = await hash(password, 5);

      const newCuteDev = CuteDev.create({
        username,
        password: hashedPassword,
        imageUrl: `https://avatars.dicebear.com/api/micah/${usernameKey}.svg`,
        languages: [],
        projects: [],
        posts: [],
      });

      const { identifiers } = await CuteDev.insert(newCuteDev);
      const userId = identifiers[0].id;

      setJidCookie(res, { userId });

      return {
        cuteDev: newCuteDev,
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
      const isValid = await compare(password, cuteDev.password);

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
    return {
      cuteDev,
    };
  }
  // TODO: add authentication
  @Mutation(() => CuteDev, { nullable: true })
  async editCuteDev(@Arg("input") { id, editInput }: EditCuteDevInput) {
    const cutedev = await CuteDev.findOne(id);
    if (!cutedev) {
      return null;
    }
    const result = await CuteDev.createQueryBuilder()
      .update()
      .set({ ...editInput })
      .where("id = :id", { id })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  // TODO: add authentication
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
