import { useFormik } from "formik";
import Button from "@modules/button";
import FormField from "@modules/form/FormField";
import Input from "@modules/form/Input";
import { FormValues } from "./CuteDevProfile";
import { useWindowsSize } from "@hooks/useWindowsSize";

interface CuteDevFormProps {
  initialValues: FormValues;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  updateProfile: (values: FormValues) => Promise<void>;
}

export default function CuteDevForm({
  initialValues,
  setIsEditing,
  updateProfile,
}: CuteDevFormProps) {
  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: async (values, helpers) => {
      console.log(values);
      await updateProfile(values);
    },
    validate: validate,
  });

  const { width } = useWindowsSize();
  const isMobileSize = width && width <= 768;

  return (
    <form
      className="w-full flex flex-col items-start justify-center gap-4"
      onSubmit={formik.handleSubmit}
    >
      <FormField fullwidth>
        <label htmlFor="name">Name</label>
        <Input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          maxLength={24}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </FormField>

      <FormField fullwidth>
        <label htmlFor="description">Description</label>
        <textarea
          className="bg-gray-800 p-2 w-full"
          name="description"
          id="description"
          cols={isMobileSize ? 120 : 30}
          rows={2}
          maxLength={120}
          onChange={formik.handleChange}
          value={formik.values.description}
        ></textarea>
      </FormField>

      <FormField fullwidth>
        <label htmlFor="name">Image Url</label>
        <Input
          type="text"
          name="imageUrl"
          id="imageUrl"
          autoComplete="off"
          maxLength={160}
          onChange={formik.handleChange}
          value={formik.values.imageUrl}
        />
      </FormField>
      <section className="flex justify-start items-center gap-2 mt-2">
        <Button type="submit" primary>
          Save
        </Button>
        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
      </section>
    </form>
  );
}

function validate(values: FormValues) {
  const errors = {} as any;
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 24) {
    errors.name = "Must be 24 characters or less";
  }
  if (!values.description) {
    errors.description = "Required";
  } else if (values.description.length > 120) {
    errors.description = "Must be 120 characters or less";
  }
  return errors;
}
