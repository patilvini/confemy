import React, { useState, Fragment } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import EmailForm from "./EmailForm";
import NameForm from "./NameForm";
import RegistrationSuccess from "./RegistrationSuccess";
import RegisterWGoogle from "../register-w-google/RegisterWGoogle";

import { validationSchema } from "./validationSchema";
import "./register.styles.scss";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { alertAction } from "../../redux/alert/alertAction";
import { registerAction } from "../../redux/auth/authAction";
import BackIcon from "../icons/BackIcon";

const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  profession: "", // added for our select
};

const pages = ["Join Confemy", "Enter Details"];

function renderPageContent(page) {
  switch (page) {
    case 0:
      return <EmailForm />;
    case 1:
      return <NameForm />;
    default:
      return <div>Not Found</div>;
  }
}

const Register = ({ registerAction, isAuthenticated }) => {
  const [currentPage, setcurrentPage] = useState(0);
  const currentValidationSchema = validationSchema[currentPage];
  const isLastpage = currentPage === pages.length - 1;

  // this is to set email on component state to be shows on the 2nd page as inactive email
  const [email, setemail] = useState(" ");

  const navigate = useNavigate();
  function onFormSubmit(values, actions) {
    const formData = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      profession: values.profession,
      password: values.password,
    };
    registerAction(formData, navigate);
    actions.setSubmitting(false);
    setcurrentPage(currentPage + 1);
  }

  function onSubmit(values, actions) {
    if (isLastpage) {
      onFormSubmit(values, actions);
    } else {
      setemail(values.email);
      setcurrentPage(currentPage + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function backPage() {
    setcurrentPage(currentPage - 1);
  }

  if (isAuthenticated) return <Navigate to="/dashboard" replace={true} />;

  return (
    <div className="register-modal white-modal">
      <div className="modal-form-wrapper">
        {currentPage === pages.length ? (
          <RegistrationSuccess />
        ) : (
          <Fragment>
            {/* The heading on the apge comes from the pages array. Corresponds to each form step */}
            <h2>{pages[currentPage]}</h2>
            {/** following will conditionally render on second page ie NameForm */}
            {currentPage === 1 && <div className="inactive-email">{email}</div>}
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                const { isSubmitting } = formik;
                return (
                  <Form className="form-type-1">
                    {renderPageContent(currentPage)}
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="button button-primary"
                    >
                      {isLastpage ? "Join" : "Continue"}
                    </button>
                    {isSubmitting && <Fragment> Submitting...</Fragment>}
                  </Form>
                );
              }}
            </Formik>
          </Fragment>
        )}
        {/** following will conditionally render on first page ie EmailForm */}
        {currentPage === 1 && (
          <Fragment>
            <div className="text-align-center">
              <span className="caption-2-regular-gray3">
                By joining, you agree to Confemy’s{" "}
              </span>
              <Link to="#!" className="caption-2-bold-gray3">
                Terms of Service.
              </Link>
            </div>
            {currentPage !== 0 && (
              <div className="text-align-center">
                <div style={{ display: "inline-block" }}>
                  <div className="back-to-more-sign-up" onClick={backPage}>
                    <BackIcon className="large-icon" fill="#08415c" />
                    <span className="back-to-more-sign-up">
                      Back to more sign up options
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        )}
        {currentPage === 0 && <RegisterWGoogle label="Continue with Google" />}
        <div className="modal-footer">
          <span className="caption-1-medium-primary">
            Already have an Account?{" "}
          </span>
          <Link className="caption-1-heavy-primary" to="/signin">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Register.propTypes = {
  // alertAction: PropTypes.func.isRequired,
  registerAction: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { registerAction })(Register);
