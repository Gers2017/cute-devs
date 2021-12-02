import { useGetCuteDevProfileQuery } from "@generated";
import { Link, RouteComponentProps } from "react-router-dom";
import Button from "@modules/button";
import CuteDevPosts from "@modules/cutedevs/CuteDevPosts";
interface CuteDevPageProps extends RouteComponentProps<{ id: string }> {}

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
  let hasErrors = false;
  let isLoading = false;
  const { id } = match.params;
  const [profileResult, _] = useGetCuteDevProfileQuery({
    variables: { cuteDevId: id },
  });

  if (profileResult.fetching) isLoading = true;
  if (profileResult.error) hasErrors = true;

  if (isLoading) return <Loading />;
  if (hasErrors) return <Error />;

  if (!profileResult.data?.cuteDev) return <Error />;
  const { cuteDev } = profileResult.data;
  const { username, imageUrl, bio, languages, projects } = cuteDev;
  return (
    <div className="grid py-4 lg:grid-cols-4 grid-cols-1">
      <section className="col-span-1 flex flex-col items-center py-2 px-8 gap-4 border-r border-gray-700 font-normal">
        <img className="rounded-full" src={imageUrl} />
        <div className="w-full flex flex-col items-center gap-4">
          <h3 className="font-medium text-3xl">{username}</h3>
          <p className="text-lg md:text-base text-center">{bio}</p>

          {/* Languages */}
          <section className="inline-flex justify-center items-center flex-wrap gap-4 text-base list-none">
            {languages.length > 0 &&
              languages.map((language) => (
                <li
                  key={language}
                  className="flex justify-center items-center text-sm uppercase py-1 px-2 rounded-lg border border-gray-50"
                >
                  {language}
                </li>
              ))}
          </section>
          <details className="w-full">
            <summary className="p-2 shadow-sm cursor-pointer">Projects</summary>
            {/* Projects */}
            <section className="grid grid-cols-2 p-2 gap-2 text-base rounded-b list-none shadow-sm">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <li
                    key={project}
                    className="inline-flex justify-center items-center text-sm uppercase py-1 px-2 rounded-lg border border-gray-50"
                  >
                    {project}
                  </li>
                ))
              ) : (
                <p className="text-sm">No projects at the moment</p>
              )}
            </section>
          </details>
          <Button full>Edit profile</Button>
        </div>
      </section>
      <CuteDevPosts cuteDev={cuteDev} />
    </div>
  );
}
