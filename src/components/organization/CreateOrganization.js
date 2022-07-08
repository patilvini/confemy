import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import TextError from "../formik/TextError";
import * as yup from "yup";
import api from "../../utility/api";
import Address from "../address/Address";
import Submit from "../submit/Submit";

import "./createOrganization.styles.scss";

const initialValues = {
  name: "",
  user: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  country: "",
  website: "",
  description: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  // state: yup.string().required("Required"),
  // country: yup.string().required("Required"),
});

export default function CreateOrganization() {
  const onSubmit = (values, actions) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="create-org-wrap">
      <form
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <h2 className="mb-16">Logo</h2>
        <h2 className="mb-16">Basic Information</h2>
        <div className="input-container">
          <input
            id="name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Organization name*"
          />
          {formik.touched.name && Boolean(formik.errors.name) && (
            <TextError>{formik.errors.name}</TextError>
          )}
        </div>
        <Address />
        <div className="input-container">
          <input
            id="website"
            type="text"
            name="website"
            value={formik.values.website}
            onChange={formik.handleChange}
            placeholder="Website"
          />
          {formik.touched.website && Boolean(formik.errors.website) && (
            <TextError>{formik.errors.website}</TextError>
          )}
        </div>
        <div className="input-container">
          <textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Describe your organization"
          />
          {formik.touched.description && Boolean(formik.errors.description) && (
            <TextError>{formik.errors.description}</TextError>
          )}
        </div>
        <Submit />
      </form>
    </div>
  );
}
