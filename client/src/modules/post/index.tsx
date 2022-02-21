import Post from "@customTypes/Post";
import { Link } from "react-router-dom";
import StarButtton from "@modules/starbutton";
interface PostProps {
  post: Post;
}
export default function index({ post }: PostProps) {
  const { creator } = post;
  return (
    <div className="flex gap-4 flex-col p-4 border border-gray-700 bg-transparent rounded-lg">
      <header className="flex justify-between items-center">
        <Link className="inline-flex" to={`/devs/${creator.id}`}>
          <div className="flex gap-2 justify-start items-center">
            <img
              className="rounded-full w-12 h-auto"
              src={creator.imageUrl}
              alt={`avatar of ${creator.username}`}
            />
            <h2>{creator.username}</h2>
          </div>
        </Link>
        <p className="text-base text-gray-500">{post.date}</p>
      </header>
      <section className="px-2">
        <p>{post.text}</p>
      </section>
      <footer className="flex justify-start">
        <StarButtton postId={post.id} stars={post.stars} />
      </footer>
    </div>
  );
}
