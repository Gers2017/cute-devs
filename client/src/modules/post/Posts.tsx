import Post from "@modules/post";
import { GetPostsQuery } from "@generated";
interface PostsProps {
  data: GetPostsQuery | undefined;
}
export default function Posts({ data }: PostsProps) {
  return (
    <section className="flex flex-col gap-4">
      {data && data.posts.length > 0 ? (
        data.posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No data...</p>
      )}
    </section>
  );
}
