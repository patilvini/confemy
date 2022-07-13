import { useState, useRef } from "react";
import { useFormik } from "formik";
import { EditorState } from "draft-js";

import * as yup from "yup";
import Select from "react-select";
import TextError from "../formik/TextError";
import Switch from "./Switch";

import "./createConference.styles.scss";
import "./conferDetails1.scss";
import RichTextEditor from "./RichTextEditor";
import api from "../../utility/api";

const options = [
  { value: "Physician", label: "Physician" },
  { value: "Nurse", label: "Nurse" },
  { value: "Pharmacist", label: "Pharmacist" },
  { value: "Example 1", label: "Example 1" },
  { value: "Example 2", label: "Example 2" },
];
// please choose at least 1 profession

const validationSchema = yup.object({
  profession: yup.array().min(1).required("Please choose at least one profession"),
  specialities: yup.array().min(1).required("Please choose at least one specialities"),
  tags: yup.array().min(1).required("Please add at least 1 tag"),
  // isCreditBased : yup.boolean(),

  // credits: yup.array().min(1).required("Required"),
  // refundPolicy: yup.boolean(),
  refundDescription: yup.object(),
  // conferenceId: yup.string()
});

const initialValues = {
  profession: [],
  specialities: [],
  tags: [],
  isCreditBased: false,
  credits: [],
  refundPolicy: false,
  refundDescription: {},
  conferenceId: "62a0be470ba7277038691ed2"
};

export default function ConfDetails1() {
  const [tag, setTag] = useState("");
  const [amount, setAmount] = useState("");
  const [cType, setCType] = useState("");
  const [valueCred, setValueCred]= useState(true);
  const [valueRefund, setValueRefund] = useState(true);

  const onSubmit = async (values, actions) => {

    let professionV = []
    let specialtiesV = []

    values.profession.forEach( i => {
      professionV.push(i.value)
      
    });

    values.specialities.forEach( i => {
      specialtiesV.push(i.value)
      
    });
    

    console.log(values)
    
   const conferenceDetails = {


      "profession": professionV, 
      "tags":values.tags,
      "conferenceId":"62a0be470ba7277038691ed2",
      "specialities": specialtiesV, 
      "isCreditBased":values.isCreditBased,
       "credits": values.credits,
       "refundPolicy":values.refundPolicy,
      // "refundDescription":values.refundDescription
      
      }
    


    console.log("form values form onSubmit", conferenceDetails);

    
    try{
      const res = await api.post("/conferences/step2", {conferenceDetails})
        
        
        console.log(res)

    } catch (err){
      console.log(err)
    }
    
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

  // console.log(formik.values);

  

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
            label="profession"
            // name="profession"
            options={options}
            onChange={(value) => {
              console.log("value from onchange handler", value);
              formik.setFieldValue("profession", value);
            }}
            value={formik.values.profession}
          />
          {touched.profession && Boolean(errors.profession) && (
            <TextError>{errors.profession}</TextError>
          )}
        </div>

        <div>
          <label>
            {" "}
            <h4>Specialities</h4>{" "}
          </label>
          <Select
            isMulti
            label="specialities"
            options={options}
            onChange={(value) => {
              console.log("value from onchange handler", value);
              formik.setFieldValue("specialities", value);
            }}
            value={formik.values.specialities}
          />
          {touched.specialities && Boolean(errors.specialities) && (
            <TextError>{errors.specialities}</TextError>
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
              if (e.target.value.length <= 1) console.log(tag);
              formik.setFieldValue("tags", [...formik.values.tags, tag]);
              setTag("");
            }}
          >
            Add
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              formik.values.tags.pop()
              formik.setFieldValue("tags", [
                ...formik.values.tags,
              ]);
            }}
          >
            Remove
          </button>
          {touched.tags && Boolean(errors.tags) && (
            <TextError>{errors.tags}</TextError>
          )}
        </div>

        <div>
          <label>
            <Switch
              // onChange={console.log(valueCred)}
              isOn={valueCred}
              handleToggle={() => {
                
                setValueCred(!valueCred)
                formik.setFieldValue('isCreditBased', valueCred)
              }}
            />
            <h4>Credits</h4>{" "}
            <ul>
              {formik.values.credits.map((i) => {
                return (
                  <li key={i.creditType}>
                    Type: {i.creditType}, Quantity: {i.amount}
                  </li>
                );
              })}
            </ul>
          </label>
          <Select
            isDisabled={valueCred}
            label="credits"
            options={options}
            onChange={(value) => {
              setCType(value.value);
              console.log("value from onchange handler", cType);
            }}
            
          />

          <input
            disabled={valueCred}
            type="number"
            placeholder="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (cType === "" || amount === "") return;

     
              formik.setFieldValue("credits", [
                ...formik.values.credits,
                { creditType: cType, quantity: amount },
              ]);
              console.log("value from onchange handler", amount);
            }}
          >
            Add
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              formik.values.credits.pop()
              formik.setFieldValue("credits", [
                ...formik.values.credits,
              ]);
            }}
          >
            Remove
          </button>
          {touched.credits && Boolean(errors.credits) && (
            <TextError>{errors.credits}</TextError>
          )}
        </div>

        <div>
          <Switch
            isOn={valueRefund}
            handleToggle={() => { 
              
              setValueRefund(!valueRefund) 
              formik.setFieldValue("refundPolicy", !formik.values.refundPolicy)
            
            }}
          />
          <label>
            <h4>Refund Policy</h4>
          </label>
          <RichTextEditor
            readOnly={valueRefund}
            onChange={(e) => {
              console.log(e);
              formik.setFieldValue("refundDescription", e);
            }}
          />
          {touched.refundDescription && Boolean(errors.refundDescription) && (
            <TextError>{errors.refundDescription}</TextError>
          )}
        </div>

        <button className="button button-primary" type="submit">
          Next
        </button>
      </form>
    </div>
  );
}
