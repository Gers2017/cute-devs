import React, { useState } from "react";
import { useGetCuteDevProfileQuery } from "@generated";
import { RouteComponentProps } from "react-router-dom";
import EditCutedev from "@modules/cutedevs/edit"
import CutedevProfile from "@modules/cutedevs/profile"
import CuteDevPosts from "@modules/cutedevs/posts";

interface CuteDevPageProps extends RouteComponentProps<{ id: string }> { }

/*
  TODO: Make error and loading components
*/

const Loading = () => (
  <p>
    Loading...<span className="font-bold text-blue-500">/*[]*/</span>
  </p>
);
const Error = () => (
  <p>
    Loading...<span className="font-bold text-red-600 text-2xl">X/</span>
  </p>
);

export default function CuteDevPage({ match }: CuteDevPageProps) {
  const [isEditing, setIsEditing] = useState(false)

  const { id } = match.params;
  const [profileResult, _] = useGetCuteDevProfileQuery({
    variables: { cuteDevId: id },
  });

  if (profileResult.fetching) return <Loading />;
  if (profileResult.error) return <Error />;

  if (!profileResult.data?.cuteDev) return <Error />;
  const { cuteDev } = profileResult.data;
  const { imageUrl } = cuteDev;


  return (
    <div className="grid py-4 lg:grid-cols-4 grid-cols-1">
      <section className="col-span-1 flex flex-col items-center py-2 md:px-4 lg:px-6 gap-4 border-r border-gray-700 font-normal">
        <img className="rounded-full w-2/5 md:w-1/2 lg:w-full" src={imageUrl} />
        {isEditing ? <EditCutedev cuteDev={cuteDev} setIsEditing={setIsEditing} /> : <CutedevProfile cuteDev={cuteDev} setIsEditing={setIsEditing} />}
      </section>
      <CuteDevPosts cuteDev={cuteDev} />
    </div>
  );
}
