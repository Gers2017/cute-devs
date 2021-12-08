import { useState } from "react";

export default function useForm<T extends object>(initialState: T) {
  const [formState, _setFormState] = useState(initialState);

  type K = keyof T;
  type V = T[keyof T];

  function formSetter(key: K, value: V) {
    _setFormState((state) => ({ ...state, [key]: value }));
  }

  function setFormValue(key: K, value: V) {
    formSetter(key, value);
  }

  function clearForm() {
    _setFormState((state) => initialState);
  }

  return { formState, _setFormState, setFormValue, clearForm };
}
