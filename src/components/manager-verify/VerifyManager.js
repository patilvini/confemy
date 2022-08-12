import { Fragment, useState, useEffect } from "react";
import { Form, Formik, useFormik } from "formik";
import api from "../../utility/api";

import NameForm from "../../components/register/NameForm";
import { useParams } from "react-router-dom";
import { registerValSchema } from "../register/registerValSchema";
import Dialogue from "../dialogue/Dialogue";

const initialValues = {
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  profession: "",
};

export default function VerifyManager() {
  const [msg, setMsg] = useState("");
  const [open, setopen] = useState(false);
  const openDialogue = () => {
    setopen(true);
  };
  const closeDialogue = () => {
    setopen(false);
  };
  const yesAction = () => {
    setopen(false);
  };

  const verifyToken = useParams().token;
  //   console.log(token);

  const [userId, setuserId] = useState("");

  async function onSubmit(values, actions) {
    console.log(values);
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
      const response = await api.post(
        "organizers/step2?verifyToken=" + verifyToken,
        formData
      );
      if (response) {
        console.log("Register response", response);
        actions.setSubmitting(false);
        setMsg(response.data.message);

        openDialogue();
      }
    } catch (err) {
      setMsg(err.response.data.message);
      console.log(msg);
      openDialogue();

      if (err) actions.setFieldError("email", err.response?.data.message);
    }
  }

  return (
    <div>
      <div className="modal-form-wrapper">
        <div className="form-type-1">
          <Formik
            initialValues={initialValues}
            validationSchema={registerValSchema[2]}
            onSubmit={onSubmit}
          >
            <Form>
              <NameForm />
              <button className="button button-green" type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </div>
      {open && (
        <Dialogue
          msg={msg}
          title="Message"
          closeDialogue={closeDialogue}
          yesAction={yesAction}
        />
      )}
    </div>
  );
}

