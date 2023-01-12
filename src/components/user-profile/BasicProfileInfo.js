import SelectFormType1 from "../reselect/SelectFormType1";
import api from "../../utility/api";
import { useFormik } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";

import { alertAction } from "../../redux/alert/alertAction";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadUserProfileAction } from "../../redux/user-profile/userProfileAction";
import { professions, subspecialties } from "../../utility/commonUtil";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  profession: yup.string().required("Required"),
  specialty: yup.string().required("Required"),
  countryCode: yup.string().required("Required"),
  mobile: yup.string().required("Required"),
});

export default function BasicProfileInfo() {
  const [displayButton, setDisplayButton] = useState(false);

  const userProfile = useSelector((state) => state.userProfile.userProfile);

  const onSubmit = (values, action) => {
    console.log(values);
    setDisplayButton(false);
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

  const onInputChange = (e) => {
    setDisplayButton(true);
    formik.handleChange(e);
  };

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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
            options={professions}
            label="profession"
            value={formik.values.profession}
            onChange={(value) => {
              return formik.setFieldValue("profession", value);
              setDisplayButton(true);
            }}
            placeholder="Choose Profession"
            isMulti={false}
          />
          <div className="mb-24">
            {formik.touched.profession && Boolean(formik.errors.profession) && (
              <TextError>{formik.errors.profession}</TextError>
            )}
          </div>
        </div>
        <div className="grid-2nd-col">
          <SelectFormType1
            options={subspecialties}
            label="specialty"
            name="specialty"
            placeholder="Choose specialty"
            value={formik.values.specialty}
            onChange={(value) => {
              formik.setFieldValue("specialty", value);
              setDisplayButton(true);
            }}
            isMulti={false}
          />
          <div className="mb-24">
            {formik.touched.specialty && Boolean(formik.errors.specialty) && (
              <TextError>{formik.errors.specialty}</TextError>
            )}
          </div>
        </div>
      </div>
      <div className="grid-col-2 mb-24">
        <div className="grid-1st-col">
          <SelectFormType1
            label="countryCode"
            // options={userProfile.countryCode}
            name="countryCode"
            onChange={(value) => {
              formik.setFieldValue("countryCode", value?.value);
              setDisplayButton(true);
            }}
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
              onChange={onInputChange}
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
      <button
        className={displayButton ? "button button-primary" : "display-none"}
        type="submit"
      >
        Save
      </button>
    </form>
  );
}
