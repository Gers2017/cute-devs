import React from "react";
import { useLoginCutedevMutation } from "@generated";
import { useLogin } from "@context/loginContext";
import { Redirect } from "react-router-dom";
import { useFormReducer } from "@hooks/useFormReducer";
import LoginIcon from "@icons/login";
import Button from "@modules/button";
import Input from "@modules/form/input";
import Form from "@modules/form";
import Fieldset from "@modules/form/fieldset";
import Switch from "@modules/form/switch";

interface LoginFields {
  username: string;
  password: string;
}

export default function Login() {
  const [_updateLoginMutation, loginMutation] = useLoginCutedevMutation();
  const { isLogin, login } = useLogin();

  const { formState, handleInputChange, handleInputBlur, resetForm } =
    useFormReducer<LoginFields>({
      username: {
        value: "",
        errors: [],
        validator: (value) => [],
      },
      password: {
        value: "",
        errors: [],
        validator: (value) => [],
      },
    });

  const {
    formFields: { username, password },
    hasErrors,
  } = formState;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const { data } = await loginMutation({
        username: username.value,
        password: password.value,
      });

      if (data?.login.cutedev) {
        login();
      }
    } catch (e) {
      console.error(e);
    }

    resetForm();
  }

  if (isLogin) return <Redirect to="/" />;

  return (
    <div className="mt-28 flex justify-center">
      <Form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold self-center">Login</h2>

        <Fieldset name="username" errors={username.errors}>
          <Input
            type="text"
            name="username"
            value={username.value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </Fieldset>

        <Fieldset name="password" errors={password.errors}>
          <Input
            type="password"
            name="password"
            value={password.value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </Fieldset>

        <Switch
          label="New to Cutedevs?"
          linkMessage="Create an account"
          to="/user/create"
        />

        <Button type="submit" primary disabled={hasErrors}>
          <LoginIcon />
          Submit
        </Button>
      </Form>
    </div>
  );
}
