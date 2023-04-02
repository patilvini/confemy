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
import CelebrationIcon from "../icons/CelebrationIcon";

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
  const [displayMsg, setDisplayMsg] = useState(false);
  const [msg, setMsg] = useState("");
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
      console.log("response from pass submit", response);
      if (response) {
        setMsg(response.data.message);
        setDisplayMsg(true);
      }
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
    // validationSchema: validationSchema,
    enableReinitialize: true,
  });

  return (
    <div className="fp-wrap">
      {!displayMsg ? (
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
        <div className="text-align-center">
          <i>
            <CelebrationIcon />
          </i>
          <h2 className="my-24">Hurrah!</h2>
          <p className="body-regular-gray3 mb-40">{msg}</p>
          <button
            onClick={() => navigate("/signin")}
            className="button button-primary"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
