import Button from "@modules/button";
import Fieldset from "@modules/form/fieldset";
import Input from "@modules/form/input";
import { usernameValidator, bioValidator, MAX_BIO_LENGTH, MAX_USERNAME_LENGTH, MIN_BIO_LENGTH, MIN_USERNAME_LENGTH } from "@utils/validators";
import { useFormReducer, generateFormField } from "@hooks/useFormReducer";
import Action from "@modules/layout/Action";
import CutedevProfileProps from "@customTypes/CutedevProfile"
import { useEditCuteDevMutation } from "@generated";
import React from "react";

interface EditForm {
  username: string;
  bio: string;
}

/*
  TODO: edit form
      - use a regex expression to validate the image url, accept github and twitter avatars
      - use a textarea for the bio input
      - create an array input component, select multiple values and join them in an array
*/
export default function EditCutedev({ cuteDev, setIsEditing }: CutedevProfileProps) {
  const { formState, handleInputChange, handleInputBlur } = useFormReducer<EditForm>({
    username: generateFormField(cuteDev.username, usernameValidator),
    bio: generateFormField(cuteDev.bio, bioValidator)
  })

  const { formFields, hasErrors } = formState;
  const { username, bio } = formFields;

  const [_editMutationState, editMutation] = useEditCuteDevMutation()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {

      const { data } = await editMutation({
        input: {
          id: cuteDev.id,
          editInput: {
            username: username.value,
            bio: bio.value,
          }
        }
      })

      data && data.editCuteDev && console.log("data updated!");

    } catch (e) {
      console.error(e);
    }
  }

  function cancelEditing() {
    setIsEditing(false)
  }


  return (
    <div className="w-full">
      <form className="flex flex-col gap-2 py-4 px-1" onSubmit={handleSubmit}>
        <Fieldset column gap="gap-2" padding="p-1" name="username" errors={username.errors}>
          <Input type="text" name="username" fontWeight="font-thin" value={username.value} onChange={handleInputChange} onBlur={handleInputBlur}
            minLength={MIN_USERNAME_LENGTH} maxLength={MAX_USERNAME_LENGTH} />
        </Fieldset>
        <Fieldset column gap="gap-2" padding="p-1" name="bio" errors={bio.errors}>
          <Input type="text" name="bio" fontWeight="font-thin" value={bio.value} onChange={handleInputChange} onBlur={handleInputBlur}
            minLength={MIN_BIO_LENGTH} maxLength={MAX_BIO_LENGTH} />
        </Fieldset>
        <Action>
          <Button primary disabled={hasErrors}>Save</Button>
          <Button onClick={cancelEditing}>Cancel</Button>
        </Action>
      </form>
    </div>
  );
}