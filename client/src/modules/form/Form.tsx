import React, { FormHTMLAttributes } from "react";
interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

// TODO: make this useful, to sync Register and Login forms
export default function Form({ children, ...rest }: FormProps) {
  return (
    <form
      className="flex flex-col items-start gap-4 shadow-2xl min-w-lg py-8 px-6 border 
      border-gray-600"
      {...rest}
    >
      {children}
    </form>
  );
}
