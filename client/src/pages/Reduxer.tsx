import React from 'react'
import { useFormReducer } from "@hooks/useFormReducer"
import Button from "@modules/button";
import Fieldset from "@modules/form/fieldset";
import Input from "@modules/form/input";
import Form from "@modules/form";
import Action from "@modules/layout/Action";

interface RegisterFields {
  username: string
  password: string
  email: string
}

function usernameValidator(username: string): string[] {
  let errors = [];
  if (username.length < 3) errors.push("Username has to be at least 3 characters long");
  if (username === "svelte") errors.push("Username cannot be svelte");
  return errors;
}

export default function Reduxer() {
  const { formState, handleInputBlur, handleInputChange, resetForm } = useFormReducer<RegisterFields>({
    username: {
      value: "",
      errors: [],
      validator: usernameValidator
    },
    password: {
      value: "",
      errors: [],
      validator: (value) => {
        let errors = []
        if (value.length < 8)
          errors.push("Password has to be at least 8 characters long");
        if (!/[A-Z]+/.test(value))
          errors.push("Password needs to have at least one uppercase character")
        return errors;
      }
    },
    email: {
      value: "",
      errors: [],
      validator: (value) => {
        if (value.length < 3) return ["Email has to be at least 3 characters long"]
        return []
      }
    }
  });


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(formState)
  }

  const { formFields: { username, email, password }, hasErrors } = formState;

  return (
    <div className="mt-12">
      <Form onSubmit={handleSubmit}>

        <h2 className="text-3xl font-bold self-center">My Form</h2>

        <Fieldset name="username" errors={username.errors}>
          <Input type="text" name="username" value={username.value} onChange={handleInputChange} onBlur={handleInputBlur} />
        </Fieldset>

        <Fieldset name="password" errors={password.errors}>
          <Input type="password" name="password" value={password.value} onChange={handleInputChange} onBlur={handleInputBlur} />
        </Fieldset>

        <Fieldset name="email" errors={email.errors}>
          <Input type="email" name="email" value={email.value} onChange={handleInputChange} onBlur={handleInputBlur} />
        </Fieldset>

        <Action>
          <Button type="submit" primary disabled={hasErrors}>Submit</Button>
          <Button type="reset" onClick={resetForm}>Reset</Button>
        </Action>
      </Form>
    </div>
  )
}