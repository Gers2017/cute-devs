import React from "react";
import Button from "@modules/button";

export default function CreatePost() {
  return (
    <div className="py-4">
      <h2 className="font-bold text-3xl text-center my-2">Create a Post</h2>
      <form className="max-w-4xl my-4 mx-auto py-2 px-4 flex flex-col justify-center gap-4">

        <Button primary>Create</Button>
      </form>
    </div>
  );
}
