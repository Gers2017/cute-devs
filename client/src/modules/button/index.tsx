import React, { ButtonHTMLAttributes } from "react";
interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children?: React.ReactNode;
  primary?: boolean;
  fullwidth?: boolean;
  size?: ButtonSize;
}

type ButtonSize = "small" | "normal" | "big";
const btnSizes: Record<ButtonSize, string> = {
  small: "text-sm",
  normal: "text-base",
  big: "text-lg",
};
export default function Button({
  children,
  primary,
  fullwidth = false,
  size = "normal",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        ${btnSizes[size]}
        ${fullwidth ? "w-full" : "w-max"}
        ${primary ? "bg-green-700" : "bg-gray-700"}
        ${primary ? "hover:bg-green-600" : "hover:bg-gray-600"} 
        ${primary ? "hover:border-gray-50" : "hover:border-gray-50"}
      `}
      {...props}>
      {children}
    </button>
  );
}
