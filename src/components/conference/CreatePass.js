import { Form, Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";

import TextInput from "../formik/TextInput";

const validationSchema = yup.object({
  passName: yup.string().required("Required"),
  price: yup.string().required("Required"),
});

const initialValues = {
  passName: "",
  passInfo: "",

};

export default function CreatePass() {
  const [visibility, setVisibitly] = useState(false);

  async function onSubmit(values, actions) {
    console.log(values);
    // const { firstName } =
    //   values;
    // const formData = {
    //   user: {
    //     firstName,

    //   },
  }

  


  return (
    <div className="conf-form-wrap">
      <button className="" onClick={() => setVisibitly(true)}>
        Add Pass
      </button>

      <div style={{ display: visibility ? "initial" : "none" }}>
        <h1>hello</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="input-container">
              <TextInput name="passName" type="text" placeholder="Pass Name" />
            </div>
            <div className="input-container">
              <TextInput name="passInfo" type="text" placeholder="Pass info" />
            </div>
            <div className="input-container">
              <TextInput name="quantity" type="text" placeholder="Available quality" />
            </div>
            <div className="input-container">
              <TextInput name="price" type="text" placeholder="Price" />
            </div>
            

            <button type="submit">
                submit

            </button>
            <button onClick={()=> setVisibitly(false)}>
                cancel
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
