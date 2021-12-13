interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  fullwidth?: boolean
}
export default function Input({ fullwidth = true, ...rest }: InputProps) {
  return (
    <input className={`flex items-center font-semibold py-1 px-2 rounded-md bg-gray-700 text-gray-5 ${fullwidth ? "w-full" : "w-52"}`} {...rest} />)
}