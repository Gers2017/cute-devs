import { CuteDev } from "../../entities/CuteDev";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../../entities/Post";
import { CreatePostInput, PostsInput } from "./PostInput";
import { DeleteResponse, StarPostResponse } from "../responses";
import { MyContext } from "src/types/MyContext";
import { getJidPayload } from "../../../functions/jidToken";

@Resolver(Post)
export class PostResolver {
  @Query((returns) => Post, {
    nullable: true,
  })
  async post(@Arg("id") id: string) {
    try {
      return await Post.findOne(id, {
        relations: ["creator"],
      });
    } catch (e) {
      return null;
    }
  }

  @Query((returns) => [Post])
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

  @Mutation((returns) => StarPostResponse)
  async starPost(
    @Arg("postId") postId: string,
    @Ctx() { req }: MyContext,
  ): Promise<StarPostResponse> {
    const { jid } = req.cookies;
    if (!jid) {
      return { error: { message: "No jid cookie" } };
    }

    const payload = getJidPayload(jid);

    if (!payload) return { error: { message: "Unauthorized" } };

    const currentPost = await Post.findOne(postId, {
      relations: ["creator"],
    });

    if (!currentPost) {
      return { error: { message: `No post with id ${postId}` } };
    }

    try {
      const newStars = currentPost.stars + 1;
      await Post.update(postId, {
        stars: newStars,
      });

      return {
        stars: newStars,
      };
    } catch (e) {
      console.error(e);
      return {
        error: {
          message: `Unexpected error at starring post with id ${postId}`,
        },
      };
    }
  }

  @Mutation((returns) => Post, {
    nullable: true,
  })
  async createPost(@Arg("input") { text, creatorId }: CreatePostInput) {
    const creator = await CuteDev.findOne(creatorId);
    if (!creator) return false;
    try {
      const newPost = Post.create({
        text,
        creator,
        stars: 0,
      });

      await Post.insert(newPost);
      return newPost;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  @Mutation((returns) => DeleteResponse)
  async deletePost(@Arg("id") id: string): Promise<DeleteResponse> {
    try {
      const postToDelete = await Post.findOne(id);
      if (!postToDelete) {
        return {
          deleted: false,
          errors: [{ field: "id", message: `No post with id ${id}` }],
        };
      }
      await Post.remove([postToDelete]);
      return {
        deleted: true,
      };
    } catch (e) {
      return {
        deleted: false,
        errors: [
          {
            field: "id",
            message: `Unexpected error at deleting post with id ${id}`,
          },
        ],
      };
    }
  }
}
