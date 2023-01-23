import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";
import SubmitButtonWithLoader from "../button/SubmitButtonWithLoader";

import api from "../../utility/api";
import "./forgotpassword.styles.scss";

const initialValues = {
  email: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Required"),
});

export default function ForgotPassword() {
  const [apiResponce, setApiResponce] = useState();
  const [showResponce, setShowResponce] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values, action) => {
    const { email } = values;
    const resetEmail = {
      user: {
        email: email,
      },
    };

    try {
      const response = await api.post(`/users/email`, resetEmail);
      if (response) {
        setApiResponce(response.data);
        setShowResponce(true);
      }
    } catch (err) {
      action.setFieldError("email", err.response.data.message);
    }
  };

  return (
    <div className="fp-wrap">
      {!showResponce ? (
        <>
          <div className="text-align-center">
            <h2 className="color-primary mb-13">Forgot Password?</h2>
            <p className="body-regular-gray3 mb-31">
              Don't worry! Happens to the best of us.
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => {
              console.log("formik props", props);
              return (
                <Form className="form-type-1" autoComplete="off">
                  <div className="material-textfield">
                    <Field
                      id="email"
                      type="text"
                      placeholder=" "
                      name="email"
                      autoComplete="username"
                    />
                    <label>Email</label>
                  </div>
                  <div className="mb-24">
                    <ErrorMessage name="email" component={TextError} />
                  </div>
                  <SubmitButtonWithLoader
                    isSubmitting={props.isSubmitting}
                    text="Reset"
                    className="button button-primary"
                    fullWidth={true}
                  />
                </Form>
              );
            }}
          </Formik>
        </>
      ) : (
        <div className="text-align-center">
          <h2 className="color-primary mb-21">It'll be alright</h2>
          <p className="body-regular-gray3 mb-44">{apiResponce.message}</p>
          <button
            type="sumbit"
            onClick={() => navigate("/")}
            className="button button-primary "
          >
            Okay
          </button>
        </div>
      )}
    </div>
  );
}
