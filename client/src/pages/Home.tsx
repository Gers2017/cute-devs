import { useGetPostsQuery } from "@generated";
import Posts from "@modules/post/Posts";

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
    <div className="py-4 grid grid-cols-3	justify-items-stretch items-start gap-6">
      <section>todo</section>
      <Posts data={data} />
    </div>
  );
}
