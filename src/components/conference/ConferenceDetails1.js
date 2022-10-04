import { useFormik } from "formik";

import * as yup from "yup";

import SelectFormType1 from "../reselect/SelectFormType1";
import TextError from "../formik/TextError";
import "./createConference.styles.scss";
import { professions, subspecialties } from "../../utility/commonUtil";
import CloseIcon from "../icons/CloseIcon";

const initialValues = {
  professions: "",
  subspecialties: "",
  tag: "",
  tags: [],
};

const validationSchema = {};

const tagsArray = [];

export default function ConferenceDetails1() {
  function onSubmit(values, actions) {
    console.log("detials1 values", values);
  }
  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <main className="conf-form-wrap">
      <form
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <section className="mb-72">
          <h2>Details 1</h2>
          <h4>Professions</h4>
          <SelectFormType1
            options={professions}
            label="professions"
            name="professions"
            placeholder="Choose Professions"
            handleChange={(option) => {
              formik.setFieldValue("professions", option?.value);
            }}
            isMulti={true}
          />
          <div className="mb-24">
            {formik.touched.professions &&
              Boolean(formik.errors.professions) && (
                <TextError>{formik.errors.professions}</TextError>
              )}
          </div>
          <h4>Subspecialties</h4>
          <SelectFormType1
            options={subspecialties}
            label="subspecialties"
            name="subspecialties"
            placeholder="Choose Subspecialties"
            handleChange={(option) => {
              formik.setFieldValue("subspecialties", option?.value);
            }}
            isMulti={true}
          />
          <div className="mb-24">
            {formik.touched.subspecialties &&
              Boolean(formik.errors.subspecialties) && (
                <TextError>{formik.errors.subspecialties}</TextError>
              )}
          </div>
          <h4>Improve Searchability with Tags</h4>

          <ul>
            {formik.values.tags.map((tag, i) => (
              <li key={i}>
                <i
                  onClick={() => {
                    formik.setFieldValue(
                      "tags",
                      formik.values.tags.filter((t) => t !== tag)
                    );
                  }}
                >
                  <CloseIcon />
                </i>
                {tag}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }} className="material-textfield">
              <input
                id="tag"
                type="text"
                name="tag"
                value={formik.values.tag}
                onChange={formik.handleChange}
                placeholder=" "
              />
              <label>Tags</label>
            </div>
            <button
              onClick={() => {
                formik.setFieldValue("tags", [
                  ...formik.values.tags,
                  formik.values.tag,
                ]);
              }}
              type="button"
              className="button button-primary ml-16"
            >
              Add Tags
            </button>
          </div>
          <div className="mb-24">
            {formik.touched.tag && Boolean(formik.errors.tag) && (
              <TextError>{formik.errors.tag}</TextError>
            )}
          </div>
        </section>
      </form>
    </main>
  );
}
