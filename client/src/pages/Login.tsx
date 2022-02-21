import React, { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "@generated";
import { useLogin } from "@context/authContext";
import { Redirect } from "react-router-dom";
import { useFormReducer } from "@hooks/useFormReducer";
import LoginIcon from "@icons/login";
import Button from "@modules/button";
import Input from "@modules/form/input";
import Form from "@modules/form";
import Fieldset from "@modules/form/fieldset";
import { setToken } from "../token";
import Action from "@modules/layout/Action";
import {
  usernameValidator,
  passwordValidator,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from "@utils/validators";

interface LoginFields {
  username: string;
  password: string;
}

export default function Login() {
  const [_updateLoginMutation, loginMutation] = useLoginMutation();
  const [_updatRegisterMutation, registerMutation] = useRegisterMutation();
  const { isLogged, setIsLogged } = useLogin();
  const [isRegisterForm, setIsRegisterForm] = useState(false);

  const { formState, handleInputChange, handleInputBlur, resetForm } =
    useFormReducer<LoginFields>({
      username: {
        value: "",
        errors: [],
        validator: isRegisterForm ? usernameValidator : (value) => [],
      },
      password: {
        value: "",
        errors: [],
        validator: isRegisterForm ? passwordValidator : (value) => [],
      },
    });

  const {
    formFields: { username, password },
    hasErrors,
  } = formState;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isRegisterForm) {
      const { data } = await registerMutation({
        username: username.value,
        password: password.value,
      });

      if (data?.registerCuteDev.accessToken) {
        setToken(data.registerCuteDev.accessToken);
        setIsLogged(true);
      }
      data?.registerCuteDev.error && console.error(data.registerCuteDev.error);
    } else {
      const { data } = await loginMutation({
        username: username.value,
        password: password.value,
      });

      if (data?.login.accessToken) {
        setToken(data.login.accessToken);
        setIsLogged(true);
      }
      data?.login.error && console.error(data.login.error);
    }

    resetForm();
  }

  if (isLogged) return <Redirect to="/" />;

  return (
    <div className="mt-28 flex flex-col gap-3 justify-start items-center">
      <Form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold self-center">
          {isRegisterForm ? "Register" : "Login"}
        </h2>

        <Fieldset name="username" errors={username.errors}>
          <Input
            type="text"
            name="username"
            value={username.value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            minLength={isRegisterForm ? MIN_USERNAME_LENGTH : undefined}
            maxLength={isRegisterForm ? MAX_USERNAME_LENGTH : undefined}
          />
        </Fieldset>

        <Fieldset name="password" errors={password.errors}>
          <Input
            type="password"
            name="password"
            value={password.value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            minLength={isRegisterForm ? MIN_PASSWORD_LENGTH : undefined}
            maxLength={isRegisterForm ? MAX_PASSWORD_LENGTH : undefined}
          />
        </Fieldset>

        {isRegisterForm ? (
          <Button type="submit" primary disabled={hasErrors}>
            <LoginIcon />
            Submit
          </Button>
        ) : (
          <Action>
            <Button type="submit" primary disabled={hasErrors}>
              <LoginIcon />
              Submit
            </Button>
            <Button type="reset" onClick={resetForm}>
              Reset
            </Button>
          </Action>
        )}
      </Form>

      <div className="flex justify-start items-center gap-2">
        <p>
          {isRegisterForm
            ? "New to Cutedevs?, register now"
            : "Already have an account?"}
        </p>
        <Button
          onClick={() => {
            setIsRegisterForm((prev) => !prev);
          }}>
          {isRegisterForm ? "Login" : "Register"}
        </Button>
      </div>
    </div>
  );
}
