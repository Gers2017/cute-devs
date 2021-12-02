import React from "react";
import LoginIcon from "@icons/login";
import Button from "@modules/button";
import Input from "@modules/form/Input";
import FormField from "@modules/form/FormField";
import { useRegisterCutedevMutation } from "@generated";
import useForm from "@hooks/useForm";

// TODO: Find a way to use one form instead of two to register and login

export default function Register() {
  const [updateRegisterResult, registerCutedev] = useRegisterCutedevMutation();

  const { formState, onInputChange, clearForm } = useForm({
    username: "",
    password: "",
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { username, password } = formState;
    registerCutedev({ username, password })
      .then(({ data }) => {
        if (data?.registerCuteDev) {
          const { cuteDev, errors } = data.registerCuteDev;
          if (cuteDev) {
            console.log(cuteDev);
          }
          if (errors) console.error(errors);
        }
      })
      .catch((e) => console.error(e));
    clearForm();
  }

  return (
    <div className="mx-auto my-8 w-max">
      <h2 className="text-2xl mb-4">Register</h2>
      <form
        className="flex flex-col items-start gap-4 shadow-2xl min-w-lg py-8 px-6 border 
      border-gray-600"
        onSubmit={onSubmit}
      >
        <FormField>
          <label className="mb-2" htmlFor="username">
            Username
          </label>
          <Input
            type="text"
            name="username"
            onChange={(e) => onInputChange(e, (value) => value)}
          />
        </FormField>
        <FormField>
          <label className="mb-2" htmlFor="password">
            Password
          </label>
          <Input
            type="password"
            name="password"
            onChange={(e) => onInputChange(e, (value) => value)}
          />
        </FormField>

        <Button primary full type="submit">
          <LoginIcon />
          <p>Login</p>
        </Button>
      </form>
    </div>
  );
}
