import ErrorMessage from "../errorMessage"

interface FieldsetProps {
  name: string
  children: React.ReactNode
  errors?: string[]
}
export default function Fieldset({ name, children, errors }: FieldsetProps) {
  const hasErrors = errors && errors?.length > 0
  return (
    <fieldset className="w-full">
      {/* label and i9nput section */}
      <section className="flex justify-start items-center gap-4 p-2">
        <label htmlFor={name} className="tracking-wide font-semibold">
          {name && name[0].toUpperCase() + name.slice(1)}
        </label>
        {children}
      </section>
      <section className="flex flex-col gap-2 pl-6">
        {
          hasErrors && <ErrorMessage errors={errors} />
        }
      </section>
    </fieldset >
  )
}