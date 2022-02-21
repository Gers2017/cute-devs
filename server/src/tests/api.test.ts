import "reflect-metadata";
import { config } from "dotenv";
config();
import { PORT } from "../constants";
import { startApolloServer } from "../functions/server";
import { getConnection } from "typeorm";
import testOrmConfig from "./testOrmConfig";
import { createPost, editCutedev, login, registerCutedev, posts } from "./api";
import { logger } from "../functions/logger";
import { createNewCutedev } from "../schema/resolvers/functions/cutedev";
import { createPost as createPostDb } from "../schema/resolvers/functions/post";

beforeAll(async () => {
  await startApolloServer({
    ormConfig: testOrmConfig,
    port: PORT,
    credentials: true,
  });

  const cutedev = await createNewCutedev("JimmyBotFather", "secure");
  if (cutedev) {
    for (let j = 0; j < 10; j++) {
      await createPostDb(`This is my post ${j}`, cutedev);
    }
  }
});

afterAll(async () => {
  const connection = getConnection();
  await connection.close();
});

describe("Test graphql api for users", () => {
  test("should test a user", async () => {
    const regRes = await registerCutedev();
    expect(regRes.data.registerCuteDev).toBeTruthy();
    expect(regRes.data.registerCuteDev.error).toBeFalsy();

    const loginRes = await login();
    const accessToken = loginRes.data.login.accessToken;
    loginRes.data && logger(loginRes);

    expect(accessToken).toBeTruthy();
    const editRes = await editCutedev(accessToken);
    expect(editRes.data.editCutedevProfile.edited).toBeTruthy();

    const postRes = await createPost(accessToken);
    expect(postRes.data.createPost.post).toBeTruthy();
    expect(postRes.data.createPost.post.creator).toBeTruthy();
    postRes.data && logger(postRes);
  });

  test("should get posts", async () => {
    const getPostsRes = await posts();
    expect(getPostsRes.data.posts).toBeTruthy();
    getPostsRes && logger(getPostsRes);
  });
});
