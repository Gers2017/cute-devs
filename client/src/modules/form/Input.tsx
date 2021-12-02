import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ ...props }: InputProps) {
  return (
    <input
      className="w-full bg-gray-800 p-2 text-gray-50 text-sm font-semibold"
      {...props}
    />
  );
}
