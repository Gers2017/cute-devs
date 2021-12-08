import React, { ButtonHTMLAttributes } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  primary?: boolean;
  full?: boolean;
  size?: ButtonSize
}

type ButtonSize = "small" | "normal" | "big";
const btnSizes: Record<ButtonSize, string> = { "small": "text-sm", "normal": "text-base", "big": "text-lg" }
export default function Button({
  children,
  primary,
  full,
  size = "normal",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex justify-center items-center gap-2 font-medium py-1 px-2 rounded-2xl transition-colors duration-150 ease-in
      border border-transparent
      ${btnSizes[size]}
      ${full ? "w-full" : "w-max"}
      ${primary ? "bg-green-600" : "bg-gray-700"}
      ${primary ? "hover:bg-green-700" : "hover:bg-gray-600"} 
      ${!primary && "hover:border-gray-500"}`}
      {...props}
    >
      {children}
    </button>
  );
}
