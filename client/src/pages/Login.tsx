import React from "react";
import { useLoginCutedevMutation } from "@generated";
import { Redirect } from "react-router-dom";
import useForm from "@hooks/useForm";
import LoginIcon from "@icons/login";
import Button from "@modules/button";
import Form from "@modules/form/Form";
import Input from "@modules/form/Input";
import FormField from "@modules/form/FormField";
import { useLogin } from "@context/loginContext";

export default function Login() {
  const [_, loginCutedev] = useLoginCutedevMutation();
  const { isLogged, setIsLogged } = useLogin();

  const { formState, onInputChange, clearForm } = useForm({
    username: "",
    password: "",
  });

  if (isLogged) return <Redirect to="/" />;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { username, password } = formState;
    try {
      const { data, error } = await loginCutedev({ username, password });
      if (error) throw error;

      if (data && data.login) {
        const { errors, cuteDev } = data.login;
        errors && console.table(errors);
        if (cuteDev) {
          setIsLogged(true);
          console.dir({
            id: cuteDev.id,
            username: cuteDev.username,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
    clearForm();
  }

  return (
    <div className="mx-auto my-8 w-max">
      <h2 className="text-2xl mb-4">Login</h2>
      <Form onSubmit={onSubmit}>
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
      </Form>
    </div>
  );
}
