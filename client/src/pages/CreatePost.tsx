import React, { useState } from "react";
import Button from "@modules/button";
import { useCreatePostMutation } from "@generated";

export default function CreatePost() {
  const [postResult, createPost] = useCreatePostMutation();
  const [textAreaValue, setTextAreaValue] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data } = await createPost({
        input: {
          creatorId: "1",
          text: textAreaValue,
        },
      });
      setTextAreaValue("");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="py-4">
      <h2 className="font-bold text-3xl text-center my-2">Create a Post</h2>
      <form
        className="max-w-4xl mx-auto m-6 p-4 flex flex-col justify-center gap-6 border border-yellow-100"
        onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="text">What's on your mind?</label>
          <textarea
            name="text"
            id="text"
            cols={16}
            rows={5}
            maxLength={120}
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            placeholder="code, code and more code"></textarea>
        </fieldset>
        <Button primary>Create</Button>
      </form>
    </div>
  );
}
