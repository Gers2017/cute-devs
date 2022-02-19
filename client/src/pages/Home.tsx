import { useGetPostsQuery } from "@generated";
import Post from "@modules/post";

export default function Home() {
  const [result, reexecuteQuery] = useGetPostsQuery({
    variables: { input: { take: 10, creatorId: null, reverse: true } },
  });

  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) {
    return (
      <div className="flex justify-center items-center flex-col min-h-screen">
        <h2 className="text-xl text-white">Error at fetching posts</h2>
      </div>
    );
  }

  return (
    <div className="py-4 flex flex-col justify-start items-center gap-2">
      <section className="flex flex-col gap-4">
        {data && data.posts.length > 0 ? (
          data.posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p>No data...</p>
        )}
      </section>
    </div>
  );
}
