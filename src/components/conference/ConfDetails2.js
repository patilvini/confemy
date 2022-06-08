import { useEffect, useState } from "react";
import { useFormik, TextError } from "formik";
import {Editor} from "react-draft-wysiwyg"
import { EditorState } from "draft-js";
import * as yup from "yup";

import "./conferDetails2.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const fileTypes = ["JPG", "PNG"];

const initialValues = {
  bannerImage: [],
  description: "",
  speakers: [],
  courseOutline: "",
  conferenceSchedule: [],
  venueImage: "",
  venueName: "",
  venueCity: "",
  venueAmenities: [],
};

const validationSchema = yup.object({
  // bannerImage: yup.array().min(1).required("Required"),
  description: yup.string().required("Required"),
  speakers: yup.array().min(1).required("Required"),
  courseOutline: yup.array().min(1).required("Required"),
  conferenceSchedule: yup.array().min(1).required("Required"),
  // venueImage: yup.string().required("Required"),
  venueName: yup.string().required("Required"),
  venueCity: yup.string().required("Required"),
  venueAmenities: yup.array().min(1).required("Required"),
});

export default function ConfDetails2() {

  const days = [{date:"2 jan 22", title: "Day1"}, {date:"3 jan 22", title: "Day2"}, {date:"4 jan 22", title: "Day3"}]

  const [isActive, setIsActive] = useState(false);
  const [description, setDescription] = useState(() =>
    EditorState.createEmpty()
  );

  const [outline, setOutline] = useState(() => EditorState.createEmpty());

  const [schedule, setSchedule] = useState(() => EditorState.createEmpty());


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
            </label>

          </div>

          <div>
            <label>
              <h4>Description</h4>
            </label>
            <div className="editor">
            <div style={{ padding: '2px', minHeight: '400px' }}>
              <Editor
                placeholder="Descriptions"
                editorState={description}
                onEditorStateChange={setDescription}
              />
            </div>

            </div>
            
          </div>
          <div>
            <label>
              <h4>Speakers</h4>
            </label>
          </div>

          <div>
            <label>
              <h4>Course Outline</h4>
            </label>
            <div className="editor">
            <div style={{ padding: '2px', minHeight: '400px' }}>
              <Editor
                placeholder="Course Outline"
                editorState={outline}
                onEditorStateChange={setOutline}
              />
            </div>

            </div>
            
          </div>

          <div>
            <label>
              <h4>Conference Schedule</h4>
            </label>

            {days.map((i)=>{
              return(
                <div key={i.date}> 
                <button onClick={e=>{
                  e.preventDefault()
                  setIsActive(!isActive)
                
                }}class="accordion">{i.title}</button>
            <div class="panel">
            {isActive && <div>{i.date}</div>}
            </div>
                
                </div>
              )
            })}

            

            

            <input type="date" />
            <input type="date" />
            <div className="editor">
            <div style={{ padding: '2px', minHeight: '400px' }}>
              <Editor
                placeholder="Add Schedule (Be more specific about time interval, topics, speakers and all the fun activities in between)"
                editorState={schedule}
                onEditorStateChange={setSchedule}
               
              />
            </div>

            </div>
           
          </div>

          <button className="button button-primary" type="submit">
            Next
          </button>
        </form>
      </div>
    </>
  );
}
