import { useState, Fragment } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import EmailForm from "./EmailForm";
import NameForm from "./NameForm";
import EmailOtp from "./EmailOtp";
import RegistrationSuccess from "./RegistrationSuccess";
import RegisterWGoogle from "../register-w-google/RegisterWGoogle";

import { registerValSchema } from "./registerValSchema";
import "./register.styles.scss";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { alertAction } from "../../redux/alert/alertAction";
import { registerAction } from "../../redux/auth/authAction";
import BackIcon from "../icons/BackIcon";
import Message from "../message/Message";
import api from "../../utility/api";

const initialValues = {
  email: "",
  emailOtp: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  profession: "", // added for our select
};

const pages = ["Join Confemy", "Enter OTP", "Enter Details"];

function renderPageContent(page) {
  switch (page) {
    case 0:
      return <EmailForm />;
    case 1:
      return <EmailOtp />;
    case 2:
      return <NameForm />;
    default:
      return <div>Not Found</div>;
  }
}

const Register = ({ registerAction, isAuthenticated }) => {
  const [currentPage, setcurrentPage] = useState(0);
  const validationSchema = registerValSchema[currentPage];
  const isLastpage = currentPage === pages.length - 1;

  // set email on component state to be shows on the 2nd page as inactive email
  const [email, setemail] = useState("");
  const [otpId, setotpId] = useState("");
  const [userId, setuserId] = useState("");

  const navigate = useNavigate();

  async function onFormSubmit(values, actions) {
    const { firstName, lastName, profession, password, confirmPassword } =
      values;
    const formData = {
      user: {
        firstName,
        lastName,
        profession,
        password,
        confirmPassword,
        _id: userId,
      },
    };

    try {
      const response = await api.post("register", formData);
      if (response) {
        console.log("Register response", response);
        actions.setSubmitting(false);
        setcurrentPage(currentPage + 1);
      }
    } catch (err) {
      if (err) actions.setFieldError("email", err.response?.data.message);
    }
  }

  async function onSubmit(values, actions) {
    if (isLastpage) {
      onFormSubmit(values, actions);
    }
    // for step 0
    if (currentPage === 0) {
      const { email } = values;
      setemail(email);
      const formData = {
        user: {
          email,
        },
      };
      try {
        const response = await api.post("email", formData);
        if (response) {
          console.log(response);
          setotpId(response?.data.data._id);
          setcurrentPage(currentPage + 1);
          actions.setTouched({});
          actions.setSubmitting(false);
        }
      } catch (err) {
        if (err) actions.setFieldError("email", err.response?.data.message);
      }
    }
    // for step 1
    if (currentPage === 1) {
      const { emailOtp } = values;
      const formData = {
        otpData: {
          _id: otpId,
          otp: emailOtp,
        },
      };

      try {
        const response = await api.post("verify", formData);
        if (response) {
          console.log(response);
          setuserId(response.data.data.user._id);
          setcurrentPage(currentPage + 1);
          actions.setTouched({});
          actions.setSubmitting(false);
        }
      } catch (err) {
        if (err) actions.setFieldError("emailOtp", err.response?.data.message);
      }
    }
  }

  function backPage() {
    setcurrentPage(currentPage - 1);
  }

  function resetForm() {
    setemail("");
    setotpId("");
    setcurrentPage(0);
  }

  if (isAuthenticated) return <Navigate to="/dashboard" replace={true} />;

  console.log("page", currentPage);

  return (
    <div className="register-modal white-modal">
      <div className="modal-form-wrapper">
        {currentPage === pages.length ? (
          <RegistrationSuccess msg="kk...Registration successful" />
        ) : (
          <Fragment>
            {/* The heading on the apge comes from the pages array. Corresponds to each form step */}
            <h2>{pages[currentPage]}</h2>
            {currentPage === 1 && <div className="inactive-email">{email}</div>}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                const { isSubmitting } = formik;
                return (
                  <Form className="form-type-1">
                    {renderPageContent(currentPage)}
                    <div>
                      <button
                        disable={isSubmitting}
                        type="submit"
                        className="button button-primary mb-34"
                      >
                        {isSubmitting
                          ? "Submitting..."
                          : isLastpage
                          ? "Join"
                          : "Continue"}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            {/** following will conditionally render on first page ie EmailForm */}
            {currentPage === 2 && (
              <Fragment>
                <div className="text-align-center">
                  <span className="caption-2-regular-gray3">
                    By joining, you agree to Confemy’s{" "}
                  </span>
                  <Link to="#!" className="caption-2-bold-gray3">
                    Terms of Service.
                  </Link>
                </div>
              </Fragment>
            )}
            {currentPage !== 0 && (
              <div className="text-align-center">
                <div style={{ display: "inline-block" }}>
                  <div className="back-to-more-sign-up" onClick={resetForm}>
                    <BackIcon className="large-icon" fill="#08415c" />
                    <span className="back-to-more-sign-up">
                      Back to more sign up options
                    </span>
                  </div>
                </div>
              </div>
            )}
            {currentPage === 0 && (
              <RegisterWGoogle label="Continue with Google" />
            )}
            <div className="modal-footer">
              <span className="caption-1-medium-primary">
                Already have an Account?{" "}
              </span>
              <Link className="caption-1-heavy-primary" to="/signin">
                Sign in
              </Link>
            </div>
          </Fragment>
        )}
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
