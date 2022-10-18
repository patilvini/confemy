import { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import { thumb, thumbInner, img } from "./conferenceDragdropUtils";
import Dropzone, { useDropzone } from "react-dropzone";
import TextError from "../formik/TextError";
// import moment from "moment";



import * as yup from "yup";

import "./conferDetails2.scss";
import api from "../../utility/api";
// import RichTextEditor from "./RichTextEditor";
import { useSelector } from "react-redux";
import Modal from "../modal/Modal";
import TextInput from "../formik/TextInput";
import AddSpeaker from "./AddSpeaker";

const initialValues = {
  bannerImage: [],
  description: [],
  speakers: [],
  courseOutline: [],
  schedule: [],

  // venueImage: [],
  // venueName: "",
  // venueCity: "",
  // venueAmenities: [],
};

const validationSchema = yup.object({
  // bannerImage: yup.array().min(1).required("Required"),
  description: yup.array().min(1).required("Required"),
  speakers: yup.array().min(1).required("Required"),
  courseOutline: yup.array().min(1).required("Required"),
  schedule: yup.array(),

  // venueImage: yup.array().min(1).required("Required"),
  // venueName: yup.string().required("Required"),
  // venueCity: yup.string().required("Required"),
  // venueAmenities: yup.array().min(1).required("Required"),
});

export default function ConfDetails2() {
  const userID = useSelector((state) => state.auth.user._id);
  const [files, setFiles] = useState([]);
  const [visibility, setVisibitly] = useState(false);
  const [days, setDays] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [speakerData, setSpeakerData] = useState([]);
  const [scheduleInput, setScheduleInput] = useState({
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  

  function onClose() {
    setVisibitly(false);
  }
  function onOpen() {
    setVisibitly(true);
  }

  const toggle = (i) => {
    if (clicked === i) {
      return setClicked(null);
    }

    setClicked(i);
  };

  // const createDays = (startDate, endDate) => {
  //   var dateArray = [];
  //   var currentDate = moment(startDate);
  //   var stopDate = moment(endDate);
  //   while (currentDate <= stopDate) {
  //     dateArray.push({
  //       date: moment(currentDate).format("YYYY, MMM, DD"),
  //       day: moment(currentDate).format("dddd"),
  //     });
  //     currentDate = moment(currentDate).add(1, "days");
  //   }

  //   return dateArray;
  // };

  useEffect(() => {
    const getSpeaker = async () => {
      try {
        const r = await api.get("/speakers?_id=" + userID + "&type=user");
        setSpeakerData(r.data.data);
      } catch (err) {
        console.log(err);
      }
    };


      

    getSpeaker();
    
  }, []);

  const onSubmit = async (values, actions) => {
    // console.log("form values form onSubmit", values);

    const conferenceDetails = {
      bannerImage: "dasd",
      courseOutline: "dasdas",
      description: "dasda",
      schedules: values.schedule,
      speakers: values.speakers,
      conferenceId: "62d7e94dc98888b8b9fbe48c",
    };

    console.log("form values form onSubmit", conferenceDetails);

    try {
      const res = await api.post("/conferences/step3", { conferenceDetails });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const submitSch = (i) => {
    const schedule = formik.values.schedule;

    schedule[i] = scheduleInput;

    formik.setFieldValue("schedule", schedule);

    // console.log(formik.values.schedule)
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

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      formik.setFieldValue("bannerImage", acceptedFiles);
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          alt="logo"
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  // console.log(formik.values)
  const [bannerImg, setBanner] = useState("");

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <div className="conf-form-wrap">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div></div>
          <h2 className="mb-32">Banner Image</h2>
          <section>
            <div className="logo-upload-wrap">
              <div {...getRootProps({ className: "logo-dropzone" })}>
                <input {...getInputProps()} />

                {thumbs}
              </div>
              <div className="logo-upload-textbox">
                <span>Drag and drop your logo here or</span>
                <span>Browse</span>
                <span>to choose a file</span>
              </div>
            </div>
          </section>

          <div>
            <label>
              <h4>Description</h4>
            </label>
            <div>
              {/* <div style={{ padding: "2px", minHeight: "400px" }}>
                <RichTextEditor
                  onChange={(e) => {
                    formik.setFieldValue("description", e.blocks);
                  }}
                />
                {touched.description && Boolean(errors.description) && (
                  <TextError>{errors.description}</TextError>
                )}
              </div> */}
            </div>
          </div>
          <div>
            <label>
              <h4>Speakers</h4>
            </label>

            <div>
              <button type={"button"} onClick={onOpen}>
                Add speaker
              </button>

              {visibility && (
                <Modal onDismiss={onClose}>
                  <AddSpeaker
                    id={userID}
                    createdBy={"user"}
                    close={() => setVisibitly(false)}
                  />
                </Modal>
              )}
            </div>

            <div>
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
            </div>
          </div>

          <div>
            <label>
              <h4>Course Outline</h4>
            </label>
            {/* <RichTextEditor
              onChange={(e) => {
                console.log(e);
                formik.setFieldValue("courseOutline", e.blocks);
              }}
            /> */}
            {touched.courseOutline && Boolean(errors.courseOutline) && (
              <TextError>{errors.courseOutline}</TextError>
            )}
          </div>

          <div>
            <label>
              <h4>Conference Schedule</h4>
            </label>
           
          </div>

          <button className="button button-primary" type="submit">
            Next
          </button>
        </form>
      </div>
    </>
  );
}
