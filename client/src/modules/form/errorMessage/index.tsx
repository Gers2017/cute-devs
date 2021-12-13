interface ErrorMessageProps {
  errors: string[]
}
export default function ErrorMessage({ errors }: ErrorMessageProps) {
  return (
    <ul className="list-disc text-red-500 text-sm">
      {errors.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  )
}
