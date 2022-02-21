import { CuteDev } from "../../entities/CuteDev";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../../entities/Post";
import { CreatePostInput, PostsInput } from "./PostInput";
import {
  CreatePostdevResponse,
  DeleteResponse,
  OperationError,
  StarPostResponse,
} from "../responses";
import { MyContext } from "../../../types/context";
import { AuthUser } from "../auth";

async function getPostById(id: string, withCreator?: boolean) {
  let options = withCreator ? { relations: ["creator"] } : undefined;
  return await Post.findOne(id, options);
}

@Resolver(Post)
export class PostResolver {
  @Query(() => Post, {
    nullable: true,
  })
  async post(@Arg("id") id: string) {
    try {
      return await getPostById(id, true);
    } catch (e) {
      return null;
    }
  }

  @Query(() => [Post])
  async posts(@Arg("input") { skip, take, creatorId, reverse }: PostsInput) {
    try {
      return await Post.find({
        skip,
        take,
        relations: ["creator"],
        order: {
          id: reverse ? "DESC" : "ASC",
        },
        where: creatorId ? { creator: { id: creatorId } } : undefined,
      });
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  @Mutation(() => StarPostResponse)
  async starPost(
    @Arg("postId") postId: string,
    @Ctx() { req }: MyContext,
  ): Promise<StarPostResponse> {
    const { error, cutedev } = await AuthUser(req);
    if (!cutedev) return { error };

    const post = await getPostById(postId, true);

    if (!post) {
      return {
        error: new OperationError("star post", "No such a post"),
      };
    }

    try {
      post.stars += 1;
      await post.save();
      return {
        stars: post.stars,
      };
    } catch (e) {
      console.error(e);
      return {
        error: new OperationError("star post", "Error at starring post"),
      };
    }
  }

  @Mutation(() => CreatePostdevResponse)
  async createPost(
    @Ctx() { req }: MyContext,
    @Arg("text") text: string,
  ): Promise<CreatePostdevResponse> {
    const { error, cutedev: creator } = await AuthUser(req);
    if (!creator)
      return {
        error,
      };

    try {
      const newPost = Post.create({
        text,
        creator,
        stars: 0,
      });
      const { identifiers } = await Post.insert(newPost);

      const post = await getPostById(identifiers[0].id, true);

      if (!post) {
        return {
          error: new OperationError("create post", "Error creating post"),
        };
      }
      return {
        post,
      };
    } catch (e) {
      console.error(e);
      return {
        error: new OperationError("create post", "Error creating post"),
      };
    }
  }

  @Mutation(() => DeleteResponse)
  async deletePost(
    @Ctx() { req }: MyContext,
    @Arg("postId") postId: string,
  ): Promise<DeleteResponse> {
    const { error, cutedev } = await AuthUser(req);
    if (!cutedev)
      return {
        deleted: false,
        error,
      };

    try {
      const post = await getPostById(postId, true);

      if (!post) {
        return {
          deleted: false,
          error: new OperationError("delete post", "No such a post"),
        };
      }

      if (post.creator.id !== cutedev.id) {
        return {
          deleted: false,
          error: new OperationError(
            "delete post",
            "Cutedev can't delete this post",
          ),
        };
      }

      await Post.remove([post]);
      return {
        deleted: true,
      };
    } catch (e) {
      console.error(e);
      return {
        deleted: false,
        error: new OperationError("delete post", "Error at deleting post"),
      };
    }
  }
}
