import React, { ButtonHTMLAttributes } from "react";
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children?: React.ReactNode;
  primary?: boolean;
  fullwidth?: boolean;
  size?: ButtonSize,
}

type ButtonSize = "small" | "normal" | "big";
const btnSizes: Record<ButtonSize, string> = { "small": "text-sm", "normal": "text-base", "big": "text-lg" }
export default function Button({
  children,
  primary,
  fullwidth = true,
  size = "normal",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`flex justify-center items-center gap-2 rounded-md font-semibold py-1 px-2 transition-colors duration-150 ease-in
      border border-transparent disabled:opacity-50
      ${btnSizes[size]}
      ${fullwidth ? "w-full" : "w-max"}
      ${primary ? "bg-green-700" : "bg-gray-700"}
      ${primary ? "hover:bg-green-600" : "hover:bg-gray-600"} 
      ${primary ? "hover:border-gray-50" : "hover:border-gray-50"}
      `}
      {...props}
    >
      {children}
    </button>
  );
}