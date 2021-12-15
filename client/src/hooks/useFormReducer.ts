import React, { useReducer } from "react";

export type Fieldable = { [key: symbol | string]: string | number };

type FormFields<T extends object> = {
  [Key in keyof T]: Field<T[Key]>;
};

type Field<V> = {
  value: V;
  validator: (value: V) => string[];
  errors: string[];
};

export function useFormReducer<TF extends object>(
  initialFormFields: FormFields<TF>,
) {
  interface FormState {
    formFields: FormFields<TF>;
    isTouched: boolean;
    hasErrors: boolean;
  }
  type Keys = keyof TF;
  type Values = TF[keyof TF];
  type FormKeyValue = { key: Keys; value: Values };

  type Action =
    | { type: "update"; payload: FormKeyValue }
    | { type: "reset" }
    | { type: "blur"; payload: FormKeyValue };

  const initialFormState: FormState = {
    formFields: initialFormFields,
    hasErrors: false,
    isTouched: false,
  };

  const [formState, dispatch] = useReducer(FormReducer, initialFormState);
  function FormReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
      case "update":
        return onUpdate(state, action.payload);
      case "blur":
        return onBlur(state, action.payload);
      case "reset":
        return onReset();
      default:
        throw new Error(`Unknown action type`);
    }
  }

  function onUpdate(state: FormState, payload: FormKeyValue): FormState {
    const { key, value } = payload;
    const prevFieldState = state.formFields[key];
    return {
      ...state,
      isTouched: true,
      formFields: {
        ...state.formFields,
        [key]: { ...prevFieldState, value },
      },
    };
  }

  function onBlur(state: FormState, payload: FormKeyValue): FormState {
    const { key, value } = payload;
    const prevFieldState = state.formFields[key];
    const { validator } = state.formFields[key];

    const errors = validator(value);

    return {
      ...state,
      hasErrors: errors.length > 0,
      formFields: {
        ...state.formFields,
        [key]: { ...prevFieldState, errors },
      },
    };
  }

  function onReset(): FormState {
    return initialFormState;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    dispatch({
      type: "update",
      payload: { key: name as Keys, value: value as unknown as Values },
    });
  }

  function handleInputBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    dispatch({
      type: "blur",
      payload: { key: name as Keys, value: value as unknown as Values },
    });
  }

  function resetForm() {
    dispatch({ type: "reset" });
  }

  return {
    formState,
    formFields: formState.formFields,
    handleInputChange,
    handleInputBlur,
    resetForm,
  };
}

export function generateFormField<T>(
  value: T,
  validator: (value: T) => string[],
): Field<T> {
  return {
    value,
    errors: [],
    validator,
  };
}
