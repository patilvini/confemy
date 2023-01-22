import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";

import * as yup from "yup";
import TextError from "../formik/TextError";

import api from "../../utility/api";

import ClosedEyeIcon from "../icons/ClosedEyeIcon";
import OpenEyeIcon from "../icons/OpenEyeIcon";
import SubmitButtonWithLoader from "../button/SubmitButtonWithLoader";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const validationSchema = yup.object().shape({
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

export default function UpdatePassword() {
  const [status, setStatus] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { secret } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const onSubmit = async (values, action) => {
    const formData = {
      user: {
        password: values.password,
        confirmPassword: values.confirmPassword,
      },
    };
    try {
      const response = await api.post(
        `/users/reset?verifyToken=${secret}`,
        formData
      );
      setStatus(response.data.statusCode);
    } catch (err) {
      action.setFieldError("confirmPassword", err.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  return (
    <div className="fp-wrap">
      {!status ? (
        <>
          <h2 className="text-align-center mb-60">Reset Password</h2>
          <form
            className="form-type-1"
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
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
              <label> Enter new Password*</label>
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
              <label>Re-enter Password*</label>
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
            <SubmitButtonWithLoader
              isSubmitting={formik.isSubmitting}
              text="Reset"
              className="button button-primary"
              fullWidth={true}
            />
          </form>
        </>
      ) : (
        <div>
          <h2 className="text-align-center">Hurrah!</h2>
          <p className="body-regular-gray3 text-align-center my-24">
            Your password has been updated successfully!
          </p>
          <p className="msg-btn text-align-center">
            <span
              className="button button-primary mb-40"
              onClick={() => navigate("/signin")}
            >
              Login
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
