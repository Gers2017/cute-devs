interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  fullwidth?: boolean
  fontWeight?: "font-thin" | "font-normal" | "font-semibold"
}
export default function Input({ fullwidth = true, fontWeight = "font-semibold", ...rest }: InputProps) {
  return (
    <input className={`flex items-center ${fontWeight} py-1 px-2 rounded-md bg-gray-700 text-gray-5 ${fullwidth ? "w-full" : "w-52"}`} {...rest} />)
}