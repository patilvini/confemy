import { useFormik } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";
import "./createConference.styles.scss";

const initialValues = {
  title: "",
  professions: [],
  specialties: [],
  tags: [],
};

const validationSchema = yup.object({
  title: yup.string().required("Required"),
});

export default function ConfDetails1() {
  function onSubmit(values, actions) {
    console.log(values);
  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <div className="conf-form-wrap">
      <h2>Basic Info</h2>
      <form
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div>
          <label htmlFor="title">Title</label>
          <div>
            <input
              id="title"
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Conference Title*"
            />
          </div>
          {formik.touched.title && Boolean(formik.errors.title) && (
            <TextError>{formik.errors.title}</TextError>
          )}
        </div>
        <div>
          <label htmlFor="professions">Professions</label>
          <div>
            <input
              id="professions"
              type="text"
              name="professions"
              value={formik.values.professions}
              onChange={formik.handleChange}
              placeholder="Professions*"
            />
          </div>
          {formik.touched.professions && Boolean(formik.errors.professions) && (
            <TextError>{formik.errors.professions}</TextError>
          )}
        </div>
        <button className="text-button text-button-primary">Cancel</button>
        <button className="button button-primary" type="submit">
          Next
        </button>
      </form>
    </div>
  );
}
