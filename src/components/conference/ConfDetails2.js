import { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import { thumb, thumbInner, img } from "./conferenceDragdropUtils";
import Dropzone, { useDropzone } from "react-dropzone";
import TextError from "../formik/TextError";
import moment from "moment";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constants";

import * as yup from "yup";

import "./conferDetails2.scss";
import api from "../../utility/api";
import RichTextEditor from "./RichTextEditor";
import { useSelector } from "react-redux";
import Modal from "../modal/Modal";
import TextInput from "../formik/TextInput";
import AddSpeaker from "./AddSpeaker";
import EditorTest from "./EditorTest";

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
  const EditorJS = createReactEditorJS();

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

  const createDays = (startDate, endDate) => {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(endDate);
    while (currentDate <= stopDate) {
      dateArray.push({
        date: moment(currentDate).format("YYYY, MMM, DD"),
        day: moment(currentDate).format("dddd"),
      });
      currentDate = moment(currentDate).add(1, "days");
    }

    return dateArray;
  };

  useEffect(() => {
    const getSpeaker = async () => {
      try {
        const r = await api.get("/speakers?_id=" + userID + "&type=user");
        setSpeakerData(r.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getConference = async () => {
      try {
        const res = await api.get("conferences/62d7e94dc98888b8b9fbe48c");
        console.log(res);

        setDays(
          createDays(
            new Date(res.data.data.conferences.startDate),
            new Date(res.data.data.conferences.endDate)
          )
        );

        let scheduleTemplate = [];

        for (let a = 0; a < days.length; a++) {
          scheduleTemplate.push({
            date: "",
            startTime: "",
            endTime: "",
            description: "",
          });
        }

        formik.setFieldValue("schedule", scheduleTemplate);
        console.log(scheduleTemplate);
      } catch (err) {
        console.log(err);
      }
    };

    getSpeaker();
    getConference();
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
          <div>
            
          </div>
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
            <EditorJS 
            onChange={(e)=>console.log(e.blocks)}
            tools={EDITOR_JS_TOOLS}
            data={{
              time: 1556098174501,
              blocks: [
                {
                  type: "header",
                  data: {
                    text: "Editor.js",
                    level: 1,
                  },
                },
                {
                  type: "paragraph",
                  data: {
                    text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
                  
                  },
                },
                {
                  type: "header",
                  data: {
                    text: "Key features",
                    level: 3,
                  },
                },
                {
                  type: "list",
                  data: {
                    style: "unordered",
                    items: [
                      "It is a block-styled editor",
                      "It returns clean data output in JSON",
                      "Designed to be extendable and pluggable with a simple API",
                    ],
                  },
                },
                {
                  type: "header",
                  data: {
                    text: "What does it mean «block-styled editor»",
                    level: 3,
                  },
                },
                {
                  type: "paragraph",
                  data: {
                    text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
                  },
                },
                {
                  type: "paragraph",
                  data: {
                    text: 'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.',
                  },
                },
                {
                  type: "header",
                  data: {
                    text: "What does it mean clean data output",
                    level: 3,
                  },
                },
                {
                  type: "paragraph",
                  data: {
                    text: "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below",
                  },
                },
                {
                  type: "paragraph",
                  data: {
                    text: 'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.',
                  },
                },
                {
                  type: "paragraph",
                  data: {
                    text: "Clean data is useful to sanitize, validate and process on the backend.",
                  },
                },
                {
                  type: "delimiter",
                  data: {},
                },
                {
                  type: "paragraph",
                  data: {
                    text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
                  },
                },
                {
                  type: "image",
                  data: {
                    file: {
                      url: "https://images.template.net/wp-content/uploads/2014/11/best-natural-cover-photo-of-forest.jpg"
                    },
                    caption: "It's an image that I took from the internet",
                    withBorder: true,
                    stretched: false,
                    withBackground: false,
                  },
                },
              ],
              version: "2.12.4",
            }}
            />

            {/* {days.map((item, index) => {
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
                      <h4>{item.day}</h4>
                      <h5>Timings</h5>

                      <label>
                        <h5>Start time</h5>
                      </label>
                      <input
                        onChange={(e) => {
                          setScheduleInput({
                            ...scheduleInput,
                            startTime: e.target.value,
                            date: item.date,
                          });
                        }}
                        style={{ width: "15rem" }}
                        type="time"
                      />

                      <label>
                        <h5>End time</h5>
                      </label>
                      <input
                        onChange={(e) => {
                          setScheduleInput({
                            ...scheduleInput,
                            endTime: e.target.value,
                            date: item.date,
                          });
                        }}
                        style={{ width: "15rem" }}
                        type="time"
                      />

                      <label>
                        <h5>Additional Details</h5>
                      </label>
                      <textarea
                        style={{ padding: "15px", minHeight: "200px" }}
                        onChange={(e) => {
                          setScheduleInput({
                            ...scheduleInput,
                            description: e.target.value,
                            date: item.date,
                          });
                        }}
                      />
                      <button
                        type="button"
                        className="button button-primary"
                        onClick={() => submitSch(index)}
                      >
                        Add
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })} */}
          </div>

          <button className="button button-primary" type="submit">
            Next
          </button>
        </form>
      </div>
    </>
  );
}
