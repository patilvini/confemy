import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import TextError from "../formik/TextError";
import ClosedEyeIcon from "../icons/ClosedEyeIcon";
import OpenEyeIcon from "../icons/OpenEyeIcon";

import "./register.styles.scss";
import "../signin/signin.styles.scss";
import "../formik/textError.styles.scss";

const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  profession: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object({
  firstName: yup.string().required("Required"),
});

const validateEmail = (value) => {
  let error;
  if (!value) error = "required";
  return error;
};

const onSubmit = (values) => {};

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <div className="signin-modal white-modal">
      <div className="modal-form-wrapper">
        <h2>Join Confemy</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => {
            console.log(props);
            return (
              <Form className="form-type-1">
                <div className="input-container">
                  <Field
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    validate={validateEmail}
                  >
                    {/*{(props) => {
                      const { field, meta, form } = props;
                      console.log('field props: ', props);
                      return (
                        <Fragment>
                          <Field
                            type='email'
                            id='email'
                            placeholder='Email'
                            name='email'
                            validate={validateEmail}
                            {...field}
                          />
                          {meta.touched && meta.error ? (
                            <div className='error caption-3'>{meta.error}</div>
                          ) : null}
                        </Fragment>
                      );
                    }} */}
                  </Field>
                  <ErrorMessage name="email" component={TextError} />
                </div>
                <button
                  onClick={() => validateEmail()}
                  className="button button-primary"
                  type="button"
                >
                  Continue
                </button>
                <div>
                  <div className="input-container">
                    <Field
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                    />
                    <ErrorMessage name="firstName" component={TextError} />
                  </div>
                  <div className="input-container">
                    <Field
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                    />
                    <ErrorMessage name="lastName" component={TextError} />
                  </div>
                </div>
                <div className="input-container">
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
                  <div className="position-relative input-container">
                    <Field
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      autoComplete="new-password"
                    />
                    <i
                      onClick={togglePassword}
                      className={
                        showPassword ? "display-none" : "right-input-icon"
                      }
                    >
                      <ClosedEyeIcon className="icon-lg" />
                    </i>

                    <i
                      onClick={togglePassword}
                      className={
                        showPassword ? "right-input-icon" : "display-none"
                      }
                    >
                      <OpenEyeIcon className="icon-lg" />
                    </i>
                  </div>
                  <ErrorMessage name="password" component={TextError} />
                </div>
                <div>
                  <div className="position-relative input-container">
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
                        showConfirmPassword
                          ? "display-none"
                          : "right-input-icon"
                      }
                    >
                      <ClosedEyeIcon className="icon-lg" />
                    </i>

                    <i
                      onClick={toggleConfirmPassword}
                      className={
                        showConfirmPassword
                          ? "right-input-icon"
                          : "display-none"
                      }
                    >
                      <OpenEyeIcon className="icon-lg" />
                    </i>
                  </div>
                  <ErrorMessage name="confirmPassword" component={TextError} />
                </div>

                <p>Back to more register options</p>
                <div>
                  <span>Already have an account? </span>{" "}
                  <Link to="/signin">Sign in</Link>
                </div>
                <button className="button button-primary" type="submit">
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
