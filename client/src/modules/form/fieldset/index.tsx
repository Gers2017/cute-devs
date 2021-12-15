import ErrorMessage from "../errorMessage"

interface FieldsetProps {
  name: string
  children: React.ReactNode
  column?: boolean
  gap?: "gap-1" | "gap-2" | "gap-3" | "gap-4"
  padding?: "p-2" | "py-1 px-2" | "py-2 px-1" | "p-1"
  errors?: string[]
}
export default function Fieldset({ name, children, column = false, gap = "gap-4", padding = "p-2", errors = [] }: FieldsetProps) {
  return (
    <fieldset className="w-full">
      {/* label and i9nput section */}
      <section className={`flex ${column ? "flex-col items-start justify-center" : "flex-row justify-start items-center"} ${gap} ${padding}`}>
        <label htmlFor={name} className="tracking-wide font-semibold">
          {name && name[0].toUpperCase() + name.slice(1)}
        </label>
        {children}
      </section>
      <section className="flex flex-col gap-2 pl-6">
        {
          errors.length > 0 && <ErrorMessage errors={errors} />
        }
      </section>
    </fieldset >
  )
}