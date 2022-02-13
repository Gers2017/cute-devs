interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullwidth?: boolean;
  fontWeight?: "font-thin" | "font-normal" | "font-semibold";
}
export default function TextArea({
  fullwidth = true,
  fontWeight = "font-semibold",
  ...rest
}: TextAreaProps) {
  return (
    <textarea
      className={`${fontWeight} py-1 px-2 rounded-md bg-gray-700 text-gray-50`}
      {...rest}
    />
  );
}
