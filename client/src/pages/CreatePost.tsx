import React from "react";
import Button from "@modules/button";
import FormField from "@modules/form/FormField";
import Input from "@modules/form/Input";

export default function CreatePost() {
  return (
    <div className="py-4">
      <h2 className="font-bold text-3xl text-center my-2">Create a Post</h2>
      <form className="max-w-4xl my-4 mx-auto py-2 px-4 flex flex-col justify-center gap-4">
        <FormField>
          <label htmlFor="description">Description</label>
          <Input id="description" name="description" />
        </FormField>
        <Button primary>Create</Button>
      </form>
    </div>
  );
}
