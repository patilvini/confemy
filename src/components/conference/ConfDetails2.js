import { useEffect, useState, useCallback } from "react";
import { useFormik, TextError } from "formik";
import { EditorState } from 'draft-js';
import Select from "react-select";

import * as yup from "yup";
import DragDrop from "./DragDrop";
import "./conferDetails2.scss";
import api from "../../utility/api";
import RichTextEditor from "./RichTextEditor";





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

  // const onDrop = useCallback((acceptedFiles) => {
   
  //   console.log(acceptedFiles)
  // }, []);

  const [description, setDescription] = useState(
    () => EditorState.createEmpty(),
  );

  const [outline, setOutline] = useState(
    () => EditorState.createEmpty(),
  );

  useEffect(() => {
    api.get('/speakers')
      .then((r) => {
        setSpeakerData(r.data.data)

      })

  }, [])

  const days = [{ date: "2 jan 22", title: "Day1" }, { date: "3 jan 22", title: "Day2" }, { date: "4 jan 22", title: "Day3" }]
  const [isActive, setIsActive] = useState(false);
  const [speakerData, setSpeakerData] = useState([])



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
              <DragDrop/>
            </label>

          </div>

          <div>
            <label>
              <h4>Description</h4>
            </label>
            <div>
              <div style={{ padding: '2px', minHeight: '400px' }}>
                <RichTextEditor editorState={description} onEditorStateChange={setDescription} onChange={(e) => {
                  console.log(e)
                  // formik.setFieldValue('refundPolicy', e.blocks)
                }} />
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
                  // formik.setFieldValue("professions", value);
                }}
              // value={formik.values.professions}
              />

              {/* {speakerData.map((i)=>{
               return(
                 <div key={i._id} className="speaker-box">
                 <div>
                   <img className="speaker-image" src='https://www.reliableroofingphilly.com/wp-content/uploads/2015/04/male-placeholder-image.png' alt="Profile"/>
                 </div>
                 <div className="speaker-name">
                   <p>{i.firstName} {i.lastName}</p>
                 </div>
                 <div className="">
                   <p>{i.designation}</p>
                 </div>


                 </div>
               )
             })} */}





            </label>
          </div>

          <div>
            <label>
              <h4>Course Outline</h4>
            </label>
            <RichTextEditor editorState={outline} onEditorStateChange={setOutline} onChange={(e) => {
                console.log(e)
                // formik.setFieldValue('refundPolicy', e.blocks)
              }} />


          </div>

          <div>
            <label>
              <h4>Conference Schedule</h4>
              
            </label>

            {/* {days.map((i)=>{
              return(
                <div key={i.date}> 
                <button onClick={e=>{
                  e.preventDefault()
                  setIsActive(!isActive)
                
                }} className="accordion">{i.title}</button>
            <div className="panel">
            {isActive && <div>{i.date}</div>}
            </div>
                
                </div>
              )
            })} */}





            <input type="date" />
            <input type="date" />
            
            


          </div>

          <button className="button button-primary" type="submit">
            Next
          </button>
        </form>
      </div>
    </>
  );
}
