import { useEffect, useState, useCallback } from "react";
import { useFormik, TextError } from "formik";
import Select from "react-select";

import * as yup from "yup";
import DragDrop from "./DragDrop";
import "./conferDetails2.scss";
import api from "../../utility/api";
import RichTextEditor from "./RichTextEditor";





const initialValues = {
  bannerImage: [],
  description: [],
  speakers: [],
  courseOutline: [],
  date: "",
  startDate: "",
  endDate:"",
  details: [],
  venueImage: [],
  venueName: "",
  venueCity: "",
  venueAmenities: [],
};

const validationSchema = yup.object({
  bannerImage: yup.array().min(1).required("Required"),
  description: yup.array().min(1).required("Required"),
  speakers: yup.array().min(1).required("Required"),
  courseOutline: yup.array().min(1).required("Required"),
  date: yup.string().required("Required"),
  startDate: yup.string().required("Required"),
  endDate: yup.string().required("Required"),
  venueImage: yup.array().min(1).required("Required"),
  venueName: yup.string().required("Required"),
  venueCity: yup.string().required("Required"),
  venueAmenities: yup.array().min(1).required("Required"),
});

export default function ConfDetails2() {

  // const onDrop = useCallback((acceptedFiles) => {
   
  //   console.log(acceptedFiles)
  // }, []);


  useEffect(() => {
    api.get('/speakers')
      .then((r) => {
        setSpeakerData(r.data.data)

      })

  }, [])

  const days = [{ date: "2 jan 22", title: "Day1" }, { date: "3 jan 22", title: "Day2" }, { date: "4 jan 22", title: "Day3" }]
  const [clicked, setClicked] = useState(false);
  const [speakerData, setSpeakerData] = useState([])



  const toggle = i =>{
    if(clicked === i){
      return setClicked(null)
    }

    setClicked(i)
  }


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
              <DragDrop
                onChange={(e)=>console.log(e)}
              />
            </label>

          </div>

          <div>
            <label>
              <h4>Description</h4>
            </label>
            <div>
              <div style={{ padding: '2px', minHeight: '400px' }}>
                <RichTextEditor onChange={(e) => {
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
            <RichTextEditor onChange={(e) => {
                console.log(e)
                // formik.setFieldValue('refundPolicy', e.blocks)
              }} />


          </div>

          <div>
            <label>
              <h4>Conference Schedule</h4>
              
            </label>

            {days.map((item, index) => {
            return (
              <>
                <div className="wrap acc-container" onClick={() => toggle(index)} key={index}>
                  <h4>{item.date}</h4>
                  <span>{clicked === index ? <h4 style={{marginRight:'3rem'}}>  -  </h4> : <h4 style={{marginRight:'2rem'}}>  +  </h4>}</span>
                </div>
                {clicked === index ? (
                  <div className="dropdown">
                    <h4>{item.title}</h4>
                      <h5>Timings</h5>
                                  
                      <label>
                        <h5>Start time</h5>
                        
                      </label>
                      <input style={{width: '15rem'}} type="time"/>

                      <label>
                        <h5>End time</h5>
                        
                      </label>
                      <input style={{width: '15rem'}} type="time"/>

                      <label>
                        <h5>Additional Details</h5>
                      </label>
                      <textarea style={{ padding: '15px', minHeight: '200px' }} onChange={(e)=>{console.log(e.target.value)}}/>
                    

                  </div>
                ) : null}
                </>
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
