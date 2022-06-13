import { useEffect, useState, useCallback } from "react";
import { useFormik, FieldArray } from "formik";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import TextError from "../formik/TextError";

import * as yup from "yup";
// import DragDrop from "./DragDrop";
import "./conferDetails2.scss";
import api from "../../utility/api";
import RichTextEditor from "./RichTextEditor";

const initialValues = {
  bannerImage: [],
  description: [],
  speakers: [],
  courseOutline: [],
  schedule: []
  
  // venueImage: [],
  // venueName: "",
  // venueCity: "",
  // venueAmenities: [],
};

const validationSchema = yup.object({
  bannerImage: yup.array().min(1).required("Required"),
  description: yup.array().min(1).required("Required"),
  speakers: yup.array().min(1).required("Required"),
  courseOutline: yup.array().min(1).required("Required"),
  schedule: yup.array()
  
  // venueImage: yup.array().min(1).required("Required"),
  // venueName: yup.string().required("Required"),
  // venueCity: yup.string().required("Required"),
  // venueAmenities: yup.array().min(1).required("Required"),
});

export default function ConfDetails2() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    formik.setFieldValue("bannerImage", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  useEffect(() => {
    api.get("/speakers").then((r) => {
      setSpeakerData(r.data.data);
    });
  }, []);

  const days = [
    { date: "2 jan 22", title: "Day1" },
    { date: "3 jan 22", title: "Day2" },
    { date: "4 jan 22", title: "Day3" },
  ];
  const [clicked, setClicked] = useState(false);
  const [speakerData, setSpeakerData] = useState([]);
  const [scheduleInput, setScheduleInput] = useState({date:"" ,startTime: "", endTime:"", description:""})

  const toggle = (i) => {
    if (clicked === i) {
      return setClicked(null);
    }

    setClicked(i);
  };

  const onSubmit = (values, actions) => {
    console.log("form values form onSubmit", values);
  };

  const submitSch = ()=>{
    
    formik.setFieldValue("schedule", [...formik.values.schedule, scheduleInput])
  }

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

  console.log(values);

  return (
    <>
      <div className="conf-form-wrap">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <label>
              <h4>Banner Image</h4>{" "}
              <p>
                Put out a great first impression. Use a high quality image:
                660px x 380px.{" "}
              </p>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="drag-box">
                  {isDragActive ? (
                    <p className="dragbox-text">Drop the files here ...</p>
                  ) : (
                    <p className="dragbox-text">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  )}
                </div>
              </div>
              {touched.bannerImage && Boolean(errors.bannerImage) && (
            <TextError>{errors.bannerImage}</TextError>
          )}
            </label>
          </div>

          <div>
            <label>
              <h4>Description</h4>
            </label>
            <div>
              <div style={{ padding: "2px", minHeight: "400px" }}>
                <RichTextEditor
                  onChange={(e) => {
                    formik.setFieldValue("description", e.blocks);
                  }}
                />
                {touched.description && Boolean(errors.description) && (
            <TextError>{errors.description}</TextError>
          )}
              </div>
            </div>
          </div>
          <div>
            <label>
              <h4>Speakers</h4>
              <Select
                isMulti
                label="speakers"
                options={speakerData}
                onChange={(value) => {
                  console.log("value from onchange handler", value);
                  formik.setFieldValue("speakers", value);
                }}
              />
              {touched.speakers && Boolean(errors.speakers) && (
            <TextError>{errors.speakers}</TextError>
          )}
            </label>
          </div>

          <div>
            <label>
              <h4>Course Outline</h4>
            </label>
            <RichTextEditor
              onChange={(e) => {
                console.log(e);
                formik.setFieldValue("courseOutline", e.blocks);
              }}
            />
            {touched.courseOutline && Boolean(errors.courseOutline) && (
            <TextError>{errors.courseOutline}</TextError>
          )}
          </div>

          <div>
            <label>
              <h4>Conference Schedule</h4>
            </label>

            {days.map((item, index) => {
              return (
                
                  <div key={index}>

                   
                   <div
                      
                      className="wrap acc-container"
                      onClick={() => toggle(index)}
                    >
                      <h4>{item.date}</h4>
                      <span>
                        {clicked === index ? (
                          <h4 style={{ marginRight: "3rem" }}> - </h4>
                        ) : (
                          <h4 style={{ marginRight: "2rem" }}> + </h4>
                        )}
                      </span>
                    </div>
                    {clicked === index ? (
                      <div className="dropdown">
                        <h4>{item.title}</h4>
                        <h5>Timings</h5>

                        <label>
                          <h5>Start time</h5>
                        </label>
                        <input onChange={(e)=>{setScheduleInput({...scheduleInput, startTime:e.target.value, date: item.date})}} style={{ width: "15rem" }} type="time" />

                        <label>
                          <h5>End time</h5>
                        </label>
                        <input onChange={(e)=>{setScheduleInput({...scheduleInput, endTime:e.target.value, date: item.date})}} style={{ width: "15rem" }} type="time" />

                        <label>
                          <h5>Additional Details</h5>
                        </label>
                        <textarea
                        
                          style={{ padding: "15px", minHeight: "200px" }}
                          onChange={(e) => {setScheduleInput({...scheduleInput, description:e.target.value, date: item.date})}}
                        />
                        <button className="button button-primary" onClick={submitSch} >Add</button>
                      </div>
                    ) : null}

                   </div>
              
                    
                  
                
              );
            })}
          </div>

          <button className="button button-primary" type="submit">
            Next
          </button>
        </form>
      </div>
    </>
  );
}
