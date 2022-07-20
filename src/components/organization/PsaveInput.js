import { useRef } from "react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as yup from "yup";

import TextError from "../formik/TextError";
import "./saveInput.styles.scss";
import api from "../../utility/api";


// declare in parent component
// const validationSchema = yup.object({
//   name: yup.string().required("Required"),
// });

// declare in parent component
// const initialValues = {
//   name: "",
// };

export default function PsaveInput({ name, id, label, validationSchema, url, apiData}) {
  const [show, setShow] = useState(false);
  const ref = useRef();


  let initialValues = {name: apiData.name}




//   declare in paren

// if(apiData){
//     initialValues.name = apiData.name
// }

  const onSubmit = async (values, actions) => {
    console.log("SaveInput", values);
    ref.current.style.paddingBottom = "1.6rem";
    setShow(false);

//    const organization = initialValues





   
    // try {
    //   const res = await api.patch(url, {organization});
    //   console.log(res);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  // import this as props
  const formik = useFormik({ initialValues, validationSchema, onSubmit });


  function onInputFocus(e) {
    e.target.style.paddingBottom = "40px";
    e.target.style.border = "solid 2px #ced9de";
    setShow(true);
  }

  const handleCancel = () => {
    setShow(false);
    ref.current.style.paddingBottom = "1.6rem";
  };


  console.log(initialValues)
  return (
    <>
      <form
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div className="material-textfield">
          <input
            ref={ref}
            id={id}
            type="text"
            name={name}
            // value={formik.values.name}
            onChange={formik.handleChange}
            placeholder=" "
            onFocus={(e) => onInputFocus(e)}
          />
          <label>{label}</label>
        </div>
        <div className="saveinput-error">
          {formik.touched.name && Boolean(formik.errors.name) && (
            <TextError>{formik.errors.name}</TextError>
          )}
        </div>
        <div
          style={{ visibility: show ? "visible" : "hidden" }}
          className="saveinput-buttons-wrap"
        >
          <button type="submit" className="button button-primary">
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="button-text button-text-primary"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
