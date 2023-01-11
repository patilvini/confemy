import SelectFormType1 from "../reselect/SelectFormType1";
import api from "../../utility/api";
import { useFormik } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";

import { alertAction } from "../../redux/alert/alertAction";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadUserProfileAction } from "../../redux/user-profile/userProfileAction";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  profession: yup.string().required("Required"),
  specialty: yup.string().required("Required"),
  countryCode: yup.string().required("Required"),
  mobile: yup.string().required("Required"),
});

export default function BasicProfileInfo() {
  const userProfile = useSelector((state) => state.userProfile.userProfile);

  const onSubmit = (values, action) => {
    console.log("onsubmit clicked");
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      firstName: userProfile?.firstName || "",
      lastName: userProfile?.lastName || "",
      profession: userProfile?.profession || "",
      specialty: "",
      countryCode: userProfile?.countryCode || "",
      mobile: userProfile?.mobile || "",
    },
    onSubmit: onSubmit,
    // validationSchema: validationSchema,
    enableReinitialize: true,
  });

  return (
    <form
      className="form-type-1"
      onSubmit={formik.handleSubmit}
      autoComplete="off"
    >
      <h1 className="mb-24">Basic information</h1>
      <div className="grid-col-2">
        <div className="grid-1st-col">
          <div className="material-textfield">
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>First Name</label>
          </div>
          <div className="mb-24">
            {formik.touched.firstName && Boolean(formik.errors.firstName) && (
              <TextError>{formik.errors.firstName}</TextError>
            )}
          </div>
        </div>
        <div className="grid-2nd-col">
          <div className="material-textfield">
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Last Name</label>
          </div>
          <div className="mb-24">
            {formik.touched.lastName && Boolean(formik.errors.lastName) && (
              <TextError>{formik.errors.lastName}</TextError>
            )}
          </div>
        </div>
      </div>
      <div className="grid-col-2 mb-24">
        <div className="grid-1st-col">
          <SelectFormType1
            label="profession"
            // options={userProfile.profession}
            name="profession"
            onChange={(value) =>
              formik.setFieldValue("profession", value?.value)
            }
            placeholder="profession"
            value={formik.values.profession}
          />
        </div>
        <div className="grid-2nd-col">
          <SelectFormType1
            label="specialty"
            // options={userProfile?.specialities}
            name="specialty"
            onChange={(value) =>
              formik.setFieldValue("specialty", value?.value)
            }
            placeholder="Specialty"
            value={formik.values.specialty}
          />
        </div>
      </div>
      <div className="grid-col-2 mb-24">
        <div className="grid-1st-col">
          <SelectFormType1
            label="countryCode"
            // options={userProfile.countryCode}
            name="countryCode"
            onChange={(value) =>
              formik.setFieldValue("countryCode", value?.value)
            }
            placeholder="countryCode"
            value={formik.values.countryCode}
          />
        </div>
        <div className="grid-2nd-col">
          <div className="material-textfield">
            <input
              id="mobile"
              type="text"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Mobile</label>
          </div>
          <div className="mb-24">
            {formik.touched.mobile && Boolean(formik.errors.mobile) && (
              <TextError>{formik.errors.mobile}</TextError>
            )}
          </div>
        </div>
      </div>
      <button className="button button-primary" type="submit">
        Save
      </button>
    </form>
  );
}
