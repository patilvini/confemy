import { useFormik } from "formik";
import * as yup from "yup";

const initialValues = {

  documents: [],
};

const validationSchema = yup.object({

  document: yup.array(),
});

export default function AddDocument({ source, active }) {
  const onSubmit = (values, actions) => {
    console.log("form on submit", formik.values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    handleChange,
  } = formik;

  return (
    <div>
      {active === source && (
        <form
          className="form-type-1"
          autoComplete="off"
          onSubmit={handleSubmit}
        >

            

        <button type="submit" className="button button-primary">Submit</button>
        </form>
      )}
    </div>
  );
}
