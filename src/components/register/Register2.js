import React, { useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";
import GoogleIcon from "../icons/GoogleIcon";
import ClosedEyeIcon from "../icons/ClosedEyeIcon";
import OpenEyeIcon from "../icons/OpenEyeIcon";

import { registerAction } from "../../redux/auth/authAction";
import "./register.styles.scss";
import "../signin/signin.styles.scss";
import { Fragment } from "react";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <Fragment>
      <div>
        <div>
          <Field
            id="firstName"
            type="text"
            placeholder="First Name"
            name="firstName"
          />
          <ErrorMessage name="firstName" component={TextError} />
        </div>
        <div>
          <Field
            id="lastName"
            type="text"
            placeholder="Last Name"
            name="lastName"
          />
          <ErrorMessage name="lastName" component={TextError} />
        </div>
      </div>
      <div>
        <Field
          id="profession"
          type="text"
          placeholder="Profession"
          name="profession"
          autoComplete="username"
        />
        <ErrorMessage name="profession" component={TextError} />
      </div>
      <div>
        <div className="position-relative">
          <Field
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            autoComplete="new-password"
          />
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
        <ErrorMessage name="password" component={TextError} />
      </div>
      <div>
        <div className="position-relative">
          <Field
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            autoComplete="new-password"
          />
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
        <ErrorMessage name="confirmPassword" component={TextError} />
      </div>

      <p>Back to more register options</p>
      <div>
        <span>Already have an account? </span> <Link to="/signin">Sign in</Link>
      </div>
    </Fragment>
  );
}

export default Register;
