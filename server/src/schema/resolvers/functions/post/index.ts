import { CuteDev, Post } from "../../../entities";

export async function getPostById(id: string, withCreator?: boolean) {
  let options = withCreator ? { relations: ["creator"] } : undefined;
  return await Post.findOne(id, options);
}

export async function createPost(text: string, creator: CuteDev) {
  const newPost = Post.create({
    text,
    creator,
    stars: 0,
  });
  const { identifiers } = await Post.insert(newPost);

  return await getPostById(identifiers[0].id, true);
}
