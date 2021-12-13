import React from "react";
import { useFormReducer } from "@hooks/useFormReducer"
import { useLogin } from "@context/loginContext";
import { Redirect } from "react-router-dom";
import { useRegisterCutedevMutation } from "@generated";
import LoginIcon from "@icons/login";
import Button from "@modules/button";
import Input from "@modules/form/input";
import Form from "@modules/form";
import Fieldset from "@modules/form/fieldset";
import Action from "@modules/layout/Action";
import { usernameValidator, passwordValidator, bioValidator, MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, MIN_BIO_LENGTH, MAX_BIO_LENGTH } from "@utils/validators"
import Switch from "@modules/form/switch";
interface RegisterFields {
  username: string;
  password: string;
  bio: string;
}

export default function Register() {
  const { isLogin, login } = useLogin()
  const [_registerState, registerMutation] = useRegisterCutedevMutation();

  const { formState, handleInputChange, handleInputBlur, resetForm } = useFormReducer<RegisterFields>({
    username: {
      value: "",
      errors: [],
      validator: usernameValidator
    },
    password: {
      value: "",
      errors: [],
      validator: passwordValidator
    },
    bio: {
      value: "",
      errors: [],
      validator: bioValidator
    }
  })

  const { formFields: { username, bio, password }, hasErrors } = formState;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data } = await registerMutation({ username: username.value, password: password.value });
      data && data.registerCuteDev && login();
    } catch (e) {
      console.error(e);
    }

    resetForm();
  }

  if (isLogin) return <Redirect to="/" />

  return (
    <div className="mt-28 flex justify-center">
      <Form onSubmit={handleSubmit}>

        <h2 className="text-3xl font-bold self-center">Register</h2>

        <Fieldset name="username" errors={username.errors}>
          <Input type="text" name="username" value={username.value} onChange={handleInputChange} onBlur={handleInputBlur}
            minLength={MIN_USERNAME_LENGTH} maxLength={MAX_USERNAME_LENGTH} />
        </Fieldset>

        <Fieldset name="password" errors={password.errors}>
          <Input type="password" name="password" value={password.value} onChange={handleInputChange} onBlur={handleInputBlur}
            minLength={MIN_PASSWORD_LENGTH} maxLength={MAX_PASSWORD_LENGTH} />
        </Fieldset>

        <Fieldset name="bio" errors={bio.errors}>
          <Input type="text" name="bio" value={bio.value} onChange={handleInputChange} onBlur={handleInputBlur}
            minLength={MIN_BIO_LENGTH} maxLength={MAX_BIO_LENGTH} />
        </Fieldset>

        <Switch label="Already have an account?" linkMessage="Log in" to="/user/login" />

        <Action>
          <Button type="submit" primary disabled={hasErrors}><LoginIcon />Submit</Button>
          <Button type="reset" onClick={resetForm} >Reset</Button>
        </Action>

      </Form>
    </div>
  );
}