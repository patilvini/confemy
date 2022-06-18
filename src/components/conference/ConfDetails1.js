import { useState } from "react";
import { useFormik } from "formik";

import * as yup from "yup";
import Select from "react-select";
import TextError from "../formik/TextError";

import "./createConference.styles.scss";

const options = [
  { value: "Physician", label: "Physician" },
  { value: "Nurse", label: "Nurse" },
  { value: "Pharmacist", label: "Pharmacist" },
  { value: "Example 1", label: "Example 1" },
  { value: "Example 2", label: "Example 2" },
];

const validationSchema = yup.object({
  professions: yup.array().required("Required"),
});

const initialValues = {
  professions: [],
  specialties: [],
  tags: [],
  credits: [],
  refundPolicy: "",
};

export default function ConfDetails1() {
  const onSubmit = (values, actions) => {
    console.log("form values form onSubmit", values);
  };

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit,
  });

  return (
    <div className="conf-form-wrap">
      <h2>Details 1</h2>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div>
          <label>
            <h4>Professions</h4>
          </label>
          <Select
            isMulti
            label="professions"
            options={options}
            onChange={(value) => {
              formik.setFieldValue("professions", value);
            }}
            value={formik.values.professions}
          />
        </div>
        <button className="button button-primary" type="submit">
          Next
        </button>
      </form>
    </div>
  );
}
