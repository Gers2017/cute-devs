interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  fullwidth?: boolean;
  fontWeight?: "font-thin" | "font-normal" | "font-semibold";
}
export default function Input({
  fullwidth = true,
  fontWeight = "font-semibold",
  ...rest
}: InputProps) {
  return (
    <input
      className={`${fontWeight} ${fullwidth ? "w-full" : "w-52"}`}
      {...rest}
    />
  );
}
