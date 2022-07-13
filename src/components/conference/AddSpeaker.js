import { Form, Formik } from "formik";
import * as yup from "yup";
import TextInput from "../formik/TextInput";

import api from "../../utility/api";

const validationSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  degree: yup.string().required("Required"),
  designation: yup.string().required("Required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  degree: "",
  designation: "",
  createdBy: "",
  _id: "",
};

export default function AddSpeaker(props) {

    

  async function onSubmit(values, actions) {
    console.log(values);

    const speakerDetails ={
        firstName: values.firstName,
        lastName: values.lastName,
        degree: values.degree,
        designation: values.designation,
        createdBy: props.createdBy,
        _id: props.id
    }

    

    try {
     const r = await api.post("/speakers", {speakerDetails})
     console.log(r)
     props.close()
    } catch (err){
      console.log(err)
    }
  }

  return (
    <div className="register-modal white-modal">
      <div className="modal-form-wrapper">
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        >
          <Form className="form-type-1">
            <TextInput name="firstName" type="text" placeholder="First Name" />
            <TextInput name="lastName" type="text" placeholder="Last Name"/>
            <TextInput name="degree" type="text" placeholder="Degree"/>
            <TextInput name="designation" type="text" placeholder="Designation"/>

            <button type="submit">submit</button>
            <button type="button" onClick={props.close}>cancel</button>
          </Form>
          
        </Formik>
        
      </div>
    </div>
  );
}
