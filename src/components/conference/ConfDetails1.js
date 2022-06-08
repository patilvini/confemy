import { useState, useRef} from "react";
import { useFormik } from "formik";
import { EditorState } from 'draft-js';

import * as yup from "yup";
import Select from "react-select";
import TextError from "../formik/TextError";
import Switch from "./Switch";

import "./createConference.styles.scss";
import './conferDetails1.scss'
import RichTextEditor from "./RichTextEditor";


const options = [
  { value: "Physician", label: "Physician" },
  { value: "Nurse", label: "Nurse" },
  { value: "Pharmacist", label: "Pharmacist" },
  { value: "Example 1", label: "Example 1" },
  { value: "Example 2", label: "Example 2" },
];
// please choose at least 1 profession

const validationSchema = yup.object({
  professions: yup.array().min(1).required("Required"),
  specialties: yup.array().min(1).required("Required"),
  tags: yup.array().min(1).required("Required"),
  credits: yup.array().min(1).required("Required"),
  amount: yup.string().required("Required"),
  refundPolicy: yup.array().min(1).required("Required"),
});

const initialValues = {
  professions: [],
  specialties: [],
  tags: [],
  credits: [],
  refundPolicy: [],
  
};

export default function ConfDetails1() {
  

  const [tag, setTag] = useState("");
  const [amount, setAmount] = useState("");
  const [cType, setCType] = useState("");
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
 

  const onSubmit = (values, actions) => {
    console.log("form values form onSubmit", values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    handleChange,
  } = formik;

  console.log(formik.values);

  return (
    <div className="conf-form-wrap">
      <h2>Details 1</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label>
            {" "}
            <h4>Professions</h4>{" "}
          </label>
          <Select
            isMulti
            label="professions"
            // name="professions"
            options={options}
            onChange={(value) => {
              console.log("value from onchange handler", value);
              formik.setFieldValue("professions", value);
            }}
            value={formik.values.professions}
          />
          {touched.professions && Boolean(errors.professions) && (
            <TextError>{errors.professions}</TextError>
          )}
        </div>

        <div>
          <label>
            {" "}
            <h4>Specialities</h4>{" "}
          </label>
          <Select
            isMulti
            label="specialties"
            options={options}
            onChange={(value) => {
              console.log("value from onchange handler", value);
              formik.setFieldValue("specialties", value);
            }}
            value={formik.values.specialties}
          />
          {touched.specialties && Boolean(errors.specialties) && (
            <TextError>{errors.specialties}</TextError>
          )}
        </div>
        <div>
          <label>
            <h4>Tags</h4>
            <ul>
              {formik.values.tags.map((i) => {
                return <li key={i}>{i}</li>;
              })}
            </ul>
          </label>
          <input
            type="text"
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
            }}
          />
          <button
            onClick={(e) => {

              e.preventDefault();
              if (e.target.value.length <= 1) return
              console.log(tag);
              formik.setFieldValue("tags", [...formik.values.tags, tag]);
              setTag("");
            }}
          >
            Add
          </button>
          {touched.tags && Boolean(errors.tags) && (
            <TextError>{errors.tags}</TextError>
          )}
        </div>

        <div>
          <label>
            {/* <Switch
              isOn={valueCred}
              handleToggle={() => setValueCred(!valueCred)}
            />{" "} */}
            <h4>Credits</h4>{" "}
            <ul>
              {formik.values.credits.map((i) => {
                return (
                  <li key={i.type.value}>
                    Type: {i.type.value}, Amount: {i.amount}
                  </li>
                );
              })}
            </ul>
          </label>
          <Select
            label="credits"
            options={options}
            onChange={(value) => {
              setCType(value);
              console.log("value from onchange handler", cType);
            }}
            value={formik.values.creditType}
          />

          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (cType === "" || amount === "") return;
              formik.setFieldValue("credits", [
                ...formik.values.credits,
                { type: cType, amount: amount },
              ]);
              console.log("value from onchange handler", amount);
            }}
          >
            Add
          </button>
          {touched.credits && Boolean(errors.credits) && (
            <TextError>{errors.credits}</TextError>
          )}
        </div>

        <div>
          {/* <Switch
            isOn={valueRefund}
            handleToggle={() => { setValueRefund(!valueRefund) }}
          /> */}
          <label>
            <h4>Refund Policy</h4>
          </label>
          <RichTextEditor editorState={editorState} onEditorStateChange={setEditorState} onChange={(e)=>{
            console.log(e)
            formik.setFieldValue('refundPolicy', e.blocks)
          }} />
          {touched.refundPolicy && Boolean(errors.refundPolicy) && (
            <TextError>{errors.refundPolicy}</TextError>
          )}

        </div>

        <button className="button button-primary" type="submit">
          Next
        </button>
      </form>
    </div>
  );
}
