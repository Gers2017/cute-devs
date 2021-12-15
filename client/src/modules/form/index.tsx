import React from 'react'
interface FormProps extends Omit<React.InputHTMLAttributes<HTMLFormElement>, "className"> {
}
export default function Form({ children, ...rest }: FormProps) {
  return (
    <form
      className="bg-gray-900 w-full max-w-lg mx-auto flex flex-col gap-4 justify-center px-6 py-8 shadow-xl border border-blue-100 rounded-md"
      {...rest}
    >
      {children}
    </form>
  )
}
