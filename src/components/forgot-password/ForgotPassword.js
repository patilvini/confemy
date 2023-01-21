import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";

import api from "../../utility/api";
import { alertAction } from "../../redux/alert/alertAction";
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

  const onSubmit = async (values) => {
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
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  return (
    <div className="fp-wrap">
      {!showResponce ? (
        <>
          <div className="text-align-center">
            <h2>Forgot Password?</h2>
            <p className="body-regular-gray3 text-align-center mt-13 mb-31">
              Don't worry! Happens with the best of us
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
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

              <button className="button button-primary mb-48" type="submit">
                Reset
              </button>
            </Form>
          </Formik>
        </>
      ) : (
        <>
          <h2 className="text-align-center">It'll be alright</h2>
          <p className="body-regular-gray3 text-align-center mt-21 mb-44">
            {apiResponce.message}
          </p>
          <p className="msg-btn text-align-center mb-40">
            <span className="button button-primary ">Thanks</span>
          </p>
        </>
      )}
    </div>
  );
}
