import React from "react";
import Button from "@modules/button";
import Fieldset from "@modules/form/fieldset";
import Input from "@modules/form/input";
import TextArea from "@modules/form/textarea";
import Action from "@modules/layout/Action";
import {
  usernameValidator,
  bioValidator,
  languagesValidator,
  MAX_BIO_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_BIO_LENGTH,
  MIN_USERNAME_LENGTH,
} from "@utils/validators";
import { useFormReducer, generateFormField } from "@hooks/useFormReducer";
import CutedevProfileProps from "@customTypes/CutedevProfile";
import { useEditCutedevMutation } from "@generated";

interface EditForm {
  username: string;
  bio: string;
  languages: string;
}

interface EditCutedevProps extends CutedevProfileProps {
  onUpdate: () => void;
}
export default function EditCutedev({
  cuteDev,
  setIsEditing,
  onUpdate,
}: EditCutedevProps) {
  const { formState, handleInputChange, handleInputBlur } =
    useFormReducer<EditForm>({
      username: generateFormField(cuteDev.username, usernameValidator),
      bio: generateFormField(cuteDev.bio, bioValidator),
      languages: generateFormField(
        cuteDev.languages.join(", "),
        languagesValidator,
      ),
    });

  const { formFields, hasErrors } = formState;
  const { username, bio, languages } = formFields;

  const [_editMutationState, editMutation] = useEditCutedevMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const { data } = await editMutation({
        input: {
          id: cuteDev.id,
          username: username.value,
          bio: bio.value,
          languages: languages.value.split(", ").map((lang) => lang.trim()),
        },
      });

      if (data && data.editCutedevProfile) {
        onUpdate();
        setIsEditing(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="w-full">
      <form className="flex flex-col gap-2 py-4 px-1" onSubmit={handleSubmit}>
        <Fieldset
          column
          gap="gap-2"
          padding="p-1"
          name="username"
          errors={username.errors}>
          <Input
            type="text"
            name="username"
            fontWeight="font-thin"
            value={username.value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            minLength={MIN_USERNAME_LENGTH}
            maxLength={MAX_USERNAME_LENGTH}
          />
        </Fieldset>
        <Fieldset
          column
          gap="gap-2"
          padding="p-1"
          name="bio"
          errors={bio.errors}>
          <TextArea
            name="bio"
            fontWeight="font-thin"
            value={bio.value}
            rows={2}
            cols={36}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            minLength={MIN_BIO_LENGTH}
            maxLength={MAX_BIO_LENGTH}
          />
          {/* <Input
            type="text"
            name="bio"
            fontWeight="font-thin"
            value={bio.value}
          /> */}
        </Fieldset>
        <Fieldset
          name="languages (separated by coma)"
          column
          gap="gap-2"
          padding="p-1"
          errors={languages.errors}>
          <Input
            type="text"
            name="languages"
            fontWeight="font-normal"
            value={languages.value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </Fieldset>
        <Action>
          <Button primary disabled={hasErrors} type="submit">
            Save
          </Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </Action>
      </form>
    </div>
  );
}
