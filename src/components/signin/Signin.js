import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";
import ClosedEyeIcon from "../icons/ClosedEyeIcon";
import OpenEyeIcon from "../icons/OpenEyeIcon";
import RegisterWGoogle from "../register-w-google/RegisterWGoogle";

import { loginAction } from "../../redux/auth/authAction";
import api from "../../utility/api";

import "./signin.styles.scss";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Required"),
  password: yup.string().required("Required"),
});

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    const signinData = {
      email,
      password,
    };

    try {
      const response = await api.post("login", signinData);
      if (response) {
        console.log("login response:", response);
        dispatch(loginAction(response.data.data.user));
        navigate("/");
      }
    } catch (err) {
      actions.setFieldError("password", err.response?.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  // if (isAuthenticated) return <Navigate to='/dashboard' replace={true}  />;

  return (
    <div className="signin-modal white-modal">
      <div className="modal-form-wrapper">
        <h2>Sign in</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="form-type-1" autoComplete="off">
            <div className="input-container">
              <Field
                id="email"
                type="text"
                placeholder="Email"
                name="email"
                autoComplete="username"
              />
              <ErrorMessage name="email" component={TextError} />
            </div>
            <div className="input-container">
              <div className="position-relative">
                <Field
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  autoComplete="current-password"
                />
                <i
                  onClick={togglePassword}
                  className={
                    showPassword ? "display-none" : "input-icon-location"
                  }
                >
                  <ClosedEyeIcon className="large-icon" />
                </i>

                <i
                  onClick={togglePassword}
                  className={
                    showPassword ? "input-icon-location" : "display-none"
                  }
                >
                  <OpenEyeIcon className="large-icon" />
                </i>
              </div>
              <ErrorMessage name="password" component={TextError} />
            </div>
            <button className="button button-primary mb-34" type="submit">
              Sign in
            </button>
          </Form>
        </Formik>
        <p>
          <span className="caption-2-regular-gray3">Forgot password?</span>{" "}
          <Link className="caption-2-bold-gray3" to="#!">
            Reset Password
          </Link>
        </p>
        <RegisterWGoogle label="Sign in with Google" />
        <div className="modal-footer">
          <span className="caption-1-medium-primary">New User? </span>{" "}
          <Link className="caption-1-heavy-primary" to="/register">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
