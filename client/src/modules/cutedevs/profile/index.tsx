import React from "react";
import { useLogin } from "@context/authContext";
import Button from "@modules/button";
import CutedevProfileProps from "@customTypes/CutedevProfile";
import { getTokenPayload } from "../../../token";

export default function CutedevProfile({
  cuteDev,
  setIsEditing,
}: CutedevProfileProps) {
  const { isLogged } = useLogin();
  const { id, username, bio, languages, projects } = cuteDev;
  const payload = getTokenPayload();

  const allowEditing = payload && payload.id == id && isLogged;

  function enableEditing() {
    setIsEditing(true);
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h3 className="font-medium text-3xl">{username}</h3>
      <p className="text-lg md:text-base text-center">{bio}</p>

      {/* Languages */}
      <section className="inline-flex justify-center items-center flex-wrap gap-4 text-base list-none">
        {languages.length > 0 &&
          languages.map((language) => (
            <li
              key={language}
              className="flex justify-center items-center text-sm uppercase py-1 px-2 rounded-lg border border-gray-50">
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
                className="inline-flex justify-center items-center text-sm uppercase py-1 px-2 rounded-lg border border-gray-50">
                {project}
              </li>
            ))
          ) : (
            <p className="text-sm">No projects at the moment</p>
          )}
        </section>
      </details>
      {allowEditing && (
        <Button fullwidth onClick={enableEditing}>
          Edit profile
        </Button>
      )}
    </div>
  );
}
