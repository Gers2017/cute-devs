import React, { useState, ChangeEvent } from "react";

export default function useForm<T extends object>(initialState: T) {
  const [formState, setFormState] = useState(initialState);

  function setFormValue(key: keyof T, value: T[keyof T]) {
    setFormState((state) => ({ ...state, [key]: value }));
  }

  function onInputChange(
    e: ChangeEvent<HTMLInputElement>,
    shaper: (value: string) => T[keyof T],
  ) {
    const key = e.target.name as keyof T;
    const value = e.target.value;
    setFormValue(key, shaper(value));
  }

  function clearForm() {
    setFormState((state) => initialState);
  }

  return { formState, setFormState, setFormValue, onInputChange, clearForm };
}
