import { Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { useParams } from "react-router-dom";
import * as yup from "yup";

import api from "../../utility/api";
import TextInput from "../formik/TextInput";

const validationSchema = yup.object({
  link: yup.string().required("Required"),
});

const initialValues = {
  link: "",
};

export default function AddSocials(props) {
  const [organization, setOrganization] = useState([]);
  const organizationID = useParams().organizationId;
  const userID = useSelector((state) => state.auth.user._id);
  const [organizers, setOrganizers] = useState("");
  const [show, setShow] = useState(false);

  



  const onSubmit = async (values, actions) => {
    // const organizerDetails = {
    //   email: values.email,
    //   organizationId: organizationID,
    // };

    // try {
    //   const res = await api.post("/organizations/organizers", {
    //     organizerDetails,
    //   });
    //   console.log(res);
    // } catch (err) {
    //   console.log(err);
    // }

    console.log("form values form onSubmit", values);
  };


  return (
    <>
    <h3>{props.social}</h3>
    <button type="button" onClick={()=>setShow(!show)}>Link</button>
    
      <div style={{ visibility: show ? "visible" : "hidden" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <TextInput name="link" type="text" placeholder="Enter url" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}