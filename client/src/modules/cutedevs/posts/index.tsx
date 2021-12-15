import React, { useMemo, useState } from "react";
import { useGetCuteDevPostsQuery } from "@generated";
import FlexColumn from "@modules/layout/FlexColumn";
import Post from "@modules/post";
import { ArrowRight, ArrowLeft } from "@modules/icons/arrows";

interface CuteDevPostsProps {
  cuteDev: {
    id: string;
    username: string;
    imageUrl: string;
  };
}

/*
  Clamp the pagination for posts
  if the skip state is equal to zero it means we're at the begging, no previous posts
  if posts.length isn't equal to the TAKE (4) it means there are no more posts left
*/

export default function CuteDevPosts({ cuteDev }: CuteDevPostsProps) {
  const STEP = useMemo(() => 3, []);
  const TAKE = useMemo(() => 4, []);

  const [skip, setSkip] = useState(0);

  const [result, _] = useGetCuteDevPostsQuery({
    variables: {
      input: {
        creatorId: cuteDev.id,
        take: TAKE,
        skip,
        reverse: true,
      },
    },
  });

  function previous() {
    setSkip((skip) => Math.max(0, skip - STEP));
  }

  function next() {
    setSkip((skip) => skip + STEP);
  }

  if (!result.data?.posts) return <p>Wrong :/</p>;
  const { posts: originalPosts } = result.data;
  let posts = originalPosts.slice(0, STEP);

  return (
    <section className="col-span-2 py-2 px-8 flex flex-col justify-start gap-4">
      <FlexColumn>
        {
          posts.length > 0 &&
          posts.map((post) => (
            <Post key={post.id} post={{ ...post, creator: cuteDev }} />
          ))
        }
      </FlexColumn>
      <div className="flex justify-center items-center gap-2">
        <button
          className="flex justify-start items-center gap-2 border border-gray-700 py-1 px-2 rounded-l bg-gray-800 disabled:opacity-50 disabled:cursor-default"
          disabled={!(skip > 0)}
          onClick={previous}
        >
          <ArrowLeft /> Previous
        </button>
        <button
          className="flex justify-start items-center gap-2 border border-gray-700 py-1 px-2 rounded-r bg-gray-800 disabled:opacity-50 disabled:cursor-default"
          disabled={!(originalPosts.length === TAKE)}
          onClick={next}
        >
          <ArrowRight /> Next
        </button>
      </div>
    </section>
  );
}
