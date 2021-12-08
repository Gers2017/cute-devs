import React from "react";
interface FormFieldProps {
  children?: React.ReactNode;
  fullwidth?: boolean;
}
export default function FormField({ children, fullwidth }: FormFieldProps) {
  return (
    <fieldset
      className={`flex flex-col gap-2 items-start justify-center ${
        fullwidth && "w-full"
      }`}
    >
      {children}
    </fieldset>
  );
}
