import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, useFormik } from "formik";
import PropTypes from "prop-types";

import * as yup from "yup";
import TextError from "../formik/TextError";

import api from "../../utility/api";
import { alertAction } from "../../redux/alert/alertAction";
import { loadUserProfileAction } from "../../redux/user-profile/userProfileAction";
import ClosedEyeIcon from "../icons/ClosedEyeIcon";
import OpenEyeIcon from "../icons/OpenEyeIcon";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const validationSchema = yup.object().shape({
  oldPassword: yup.string().required("Required"),
  password: yup
    .string()
    .matches(
      passwordRegex,
      "Minimum 6 characters, at least 1 uppercase letter, at least 1 lowercase letter & at least 1 number required"
    )
    .required("Required"),

  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function UpdatePassword({ setShowPasswordForm }) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleOldPassword = () => setShowOldPassword((prev) => !prev);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const userProfile = useSelector((state) => state.userProfile.userProfile);

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const formData = {
      user: {
        changePassword: true,
        oldPassword: values.oldPassword,
        password: values.password,
        confirmPassword: values.confirmPassword,
      },
    };
    try {
      const response = await api.patch(`/users/${userProfile?._id}`, formData);
      if (response) {
        console.log("gggggggg", response);
        // dispatch(loadUserProfileAction(response.data.data.user));
        setShowPasswordForm(false);
        dispatch(alertAction(response.message, "danger"));
      }
    } catch (err) {
      console.log("error", err);
      // dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  return (
    <>
      <form
        className="form-type-1 mb-20"
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div className="form-type-1 as-basicinfo-wrap">
          <div className="material-textfield">
            <input
              id="oldPassword"
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              placeholder=" "
              disabled={false}
            />
            <label>Old Password*</label>
            <i
              onClick={toggleOldPassword}
              className={showOldPassword ? "display-none" : "right-input-icon"}
            >
              <ClosedEyeIcon className="icon-lg" />
            </i>
            <i
              onClick={toggleOldPassword}
              className={showOldPassword ? "right-input-icon" : "display-none"}
            >
              <OpenEyeIcon className="icon-lg" />
            </i>
          </div>
          {/* <div className="mb-24">
            <ErrorMessage name="password" component={TextError} />
          </div> */}
        </div>
        <div className="mb-24">
          {formik.touched.oldPassword && Boolean(formik.errors.oldPassword) && (
            <TextError>{formik.errors.oldPassword}</TextError>
          )}
        </div>

        <div className="material-textfield">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder=" "
            disabled={false}
          />
          <label>New Password*</label>
          <i
            onClick={togglePassword}
            className={showPassword ? "display-none" : "right-input-icon"}
          >
            <ClosedEyeIcon className="icon-lg" />
          </i>
          <i
            onClick={togglePassword}
            className={showPassword ? "right-input-icon" : "display-none"}
          >
            <OpenEyeIcon className="icon-lg" />
          </i>
        </div>
        <div className="mb-24">
          {formik.touched.password && Boolean(formik.errors.password) && (
            <TextError>{formik.errors.password}</TextError>
          )}
        </div>

        <div className="material-textfield">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder=" "
            disabled={false}
          />
          <label>Confirm Password*</label>
          <i
            onClick={toggleConfirmPassword}
            className={
              showConfirmPassword ? "display-none" : "right-input-icon"
            }
          >
            <ClosedEyeIcon className="icon-lg" />
          </i>
          <i
            onClick={toggleConfirmPassword}
            className={
              showConfirmPassword ? "right-input-icon" : "display-none"
            }
          >
            <OpenEyeIcon className="icon-lg" />
          </i>
        </div>
        <div className="mb-24">
          {formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword) && (
              <TextError>{formik.errors.confirmPassword}</TextError>
            )}
        </div>

        <div>
          <button className="button button-primary mr-24" type="submit">
            Save
          </button>
          <button
            onClick={() => {
              setShowPasswordForm(false);
            }}
            className="button-text button-text-red"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
