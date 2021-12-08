import React from "react";
import useForm from "@hooks/useForm";
import { useLogin } from "@context/loginContext";
import { Redirect } from "react-router-dom";
import { useRegisterCutedevMutation } from "@generated";
import LoginIcon from "@icons/login";
import Button from "@modules/button";
import Input from "@modules/form/Input";
import FormField from "@modules/form/FormField";

export default function Register() {
  const [_registerState, registerMutation] = useRegisterCutedevMutation();
  const { isLogin, login } = useLogin()
  const { formState, setFormValue, clearForm } = useForm({
    username: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await registerMutation({ ...formState })
      .then(({ data, error }) => {
        if (error) console.error(error);
        if (data && data.registerCuteDev.cuteDev) {
          console.log(data.registerCuteDev.cuteDev, "log from register result");
          login();
        }
      }).catch(e => console.error(e))
    clearForm();
  }


  if (isLogin) return <Redirect to="/" />

  return (
    <div className="my-4 flex justify-center">
      <section className={"max-w-lg w-full"}>
        <h2 className="text-4xl my-4 text-center">Register</h2>
        <form
          className="flex flex-col items-start gap-4 shadow-2xl min-w-lg py-8 px-6 border 
      border-gray-600"
          onSubmit={handleSubmit}
        >
          <FormField fullwidth>
            <label className="mb-2" htmlFor="username">
              Username
            </label>
            <Input
              type="text"
              name="username"
              onChange={(e) => setFormValue("username", e.target.value)}
            />
          </FormField>
          <FormField fullwidth>
            <label className="mb-2" htmlFor="password">
              Password
            </label>
            <Input
              type="password"
              name="password"
              onChange={(e) => setFormValue("password", e.target.value)}
            />
          </FormField>

          <Button primary full type="submit">
            <LoginIcon />
            <p>Register</p>
          </Button>
        </form>
      </section>
    </div>
  );
}
