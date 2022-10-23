import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// react-dropzone
import { useDropzone } from "react-dropzone";
import CameraIcon from "../icons/CameraIcon";
import { thumb, thumbInner, img } from "../organization/organizationUtil";

// react-dropzone-uploader
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

import { useFormik } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";

import { createConferenceAction } from "../../redux/conference/conferenceAction";
import { alertAction } from "../../redux/alert/alertAction";

import api from "../../utility/api";

import Modal from "../modal/Modal";
import SpeakerForm from "./SpeakerForm";
import SearchSpeaker from "./SearchSpeaker";
import SpeakerOptions from "./SpeakerOptions";
import Speakercard from "../speaker/Speakercard";
import SelectFormType1 from "../reselect/SelectFormType1";
import TextEditor from "../text-editor/TextEditor";

import AddGreenIcon from "../icons/AddGreenIcon";
import "./createConference.styles.scss";

export default function ConferenceDetails2() {
  const [open, setOpen] = useState(false);
  const [showSpeakerOptions, setShowSpeakerOptions] = useState(true);
  const [showSpeakerForm, setShowSpeakerForm] = useState(false);
  const [files, setFiles] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [speakerList, setSpeakerList] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const newConference = useSelector((state) => state.conference.newConference);

  async function onSubmit(values, actions) {
    let step1CompletedCheck = true;
    // newConference?.completedStep > 0
    if (newConference?.completedStep > 0) {
      const formData = {
        conferenceDetails: {
          speakers: values.speakers,
          conferenceId: newConference?._id,
          image: values.image,
          description: values.description,
          schedules: values.schedules,
          courseOutline: values.courseOutline,
          venue: {
            images: [],
            ameneties: values.amenities,
          },
        },
      };

      console.log("formData", formData);
      try {
        const response = await api.post("conferences/step3", formData);
        if (response) {
          console.log("step 2", response);
          dispatch(createConferenceAction(response.data.data.conference));
          navigate("/dashboard/create-conf/step-4");
        }
      } catch (err) {
        dispatch(alertAction(err.response.data.message, "danger"));
      }
    } else {
      dispatch(alertAction("Complete step-1 first", "danger"));
    }
  }

  const formik = useFormik({
    initialValues: {
      conferenceId: newConference?._id,
      image: [],
      description: {},
      speaker: "",
      speakers: newConference?.speakers || [],
      schedules: {},
      courseOutline: {},
      amenities: [],
      venueImages: [],
      venue: {},
    },
    // validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  //    images set up
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
      formik.setFieldValue("image", acceptedFiles);
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          alt="banner"
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  //  on calcelling the image upload
  const onCancel = () => {
    setFiles([]);
    formik.resetForm({ image: [] });
  };

  // load amenities from backend
  async function loadAmenities() {
    try {
      const response = await api.get("conferences/amenities");
      if (response) {
        setAmenities(response.data.data.amenities);
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  }
  //   load Speakers

  async function loadSpeakers(host, id) {
    const url = `speakers?_id=${id}&type=${host}`;
    // const organizationUrl = `speakers?_id=${id}&type=organization`
    try {
      const response = await api.get(url);
      if (response) {
        setSpeakerList(response.data.data.speakers);
      }
    } catch (err) {
      if (err) {
        dispatch(alertAction(err.response.data.message, "danger"));
      }
    }
  }

  //   function to set up texteditor field value
  function setFormikFieldValue(fieldName, fieldValue) {
    formik.setFieldValue(fieldName, fieldValue);
  }

  // set formik field spears value

  function setFormikSpeakers(newSpeaker) {
    formik.setFieldValue("speakers", [...formik.values.speakers, newSpeaker]);
  }

  // Modal open and close
  function onClose() {
    setOpen(false);
    setShowSpeakerForm(false);
    setShowSpeakerOptions(true);
    formik.setFieldValue("speaker", "");
  }
  function onOpen() {
    setOpen(true);
  }
  // Show and not show speaker form
  function onShowSpeakerFom() {
    setShowSpeakerForm(true);
  }
  function onCloseSpeakerFom() {
    setShowSpeakerForm(false);
  }

  // react-dropzone-uploader
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: "https://dev.confemy.com/api/fileUploads" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  useEffect(() => {
    loadAmenities();
    let confHostId;
    if (newConference?.host == "organization") {
      confHostId = newConference?.hostedBy.organizationId;
    } else {
      confHostId = user?._id;
    }
    loadSpeakers(newConference?.host, confHostId);

    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [open, files]);

  console.log("Details2 formik", formik);

  return (
    <main className="conf-form-wrap">
      <form
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div className="mb-72">
          <h2>Banner image</h2>
          <div className="logo-upload-wrap">
            <div {...getRootProps({ className: "logo-dropzone" })}>
              <input {...getInputProps()} />
              <CameraIcon className="camera-icon" />
              {thumbs}
            </div>
            <div className="logo-upload-textbox">
              <span>Drag and drop your banner image here or</span>
              <span>Browse</span>
              <span>to choose a file</span>
            </div>
          </div>
        </div>

        <div className="mb-72">
          <h2>Description</h2>
          <div className="mb-24">
            <p className="caption-1-regular-gray3">
              Describe conference in few words.
            </p>
          </div>
          <div>
            <TextEditor
              setFormikFieldValue={setFormikFieldValue}
              fieldName="description"
              apiRawContent={newConference?.refundDescription}
            />
          </div>
        </div>

        <div className="mb-72">
          <h2>Speakers</h2>
          <div className="grid-col-2">
            {formik.values.speakers?.map((speaker) => (
              <div key={speaker?.label} style={{}}>
                <Speakercard
                  name={speaker?.label}
                  degree={speaker?.degree}
                  designation={speaker?.designation}
                />
              </div>
            ))}
            <div className="add-speaker-button">
              <div
                onClick={onOpen}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              >
                <AddGreenIcon className="large-icon" />
              </div>
            </div>
          </div>
          {open && (
            <Modal>
              {showSpeakerOptions ? (
                <SpeakerOptions
                  setShowSpeakerForm={setShowSpeakerForm}
                  setShowSpeakerOptions={setShowSpeakerOptions}
                  setOpen={setOpen}
                  onClose={onClose}
                />
              ) : showSpeakerForm ? (
                <SpeakerForm
                  onClose={onClose}
                  //   setSpeakerList={setSpeakerList}
                  setFormikSpeakers={setFormikSpeakers}
                />
              ) : (
                <SearchSpeaker
                  options={speakerList}
                  name="speaker"
                  value={formik.values.speaker}
                  onChange={(value) =>
                    formik.setFieldValue("speaker", value?.value)
                  }
                  label="Search Speaker"
                  placeholder="Choose speaker"
                  isMulit={false}
                  onClose={onClose}
                  showForm={setShowSpeakerForm}
                  setFormikSpeakers={setFormikSpeakers}
                />
              )}
            </Modal>
          )}
        </div>

        <div className="mb-72">
          <h2>Schedules</h2>
          <div className="mb-24">
            <p className="caption-1-regular-gray3">
              Describe conference schedule.
            </p>
          </div>
          <div>
            <TextEditor
              setFormikFieldValue={setFormikFieldValue}
              fieldName="schedules"
              apiRawContent={newConference?.schedules}
            />
          </div>
        </div>

        <div className="mb-72">
          <h2>Course outline</h2>
          <div className="mb-24">
            <p className="caption-1-regular-gray3">
              Describe conference in few words.
            </p>
          </div>
          <div>
            <TextEditor
              setFormikFieldValue={setFormikFieldValue}
              fieldName="courseOutline"
              apiRawContent={newConference?.courseOutline}
            />
          </div>
        </div>

        {newConference?.venue && Object.keys(newConference?.venue)?.length > 0 && (
          <div className="details2-venue-wrap">
            <h2>Venue and Amenities</h2>

            <div className=" details2-venue caption-2-regular-gray3 ">
              <h4>{newConference?.venue?.venueName}</h4>
              <p>{newConference?.venue?.street1}</p>
              <p>{newConference?.venue?.street2}</p>
              <p>
                <span> {newConference?.venue?.city},</span>{" "}
                <span> {newConference?.venue?.state}</span>
              </p>
              <p>{newConference?.venue?.country}, 4110348 </p>
            </div>
            <div className="mb-32">
              <div className="details2-image-dropzone">
                <div className="details2-camera-wrap mb-12">
                  <CameraIcon className="details2-camera-icon" />
                </div>
                <div className="caption-1-regular-gray3">
                  Drag and drop venue images
                  <br />
                  or click to browse and select.
                </div>
              </div>
            </div>
            <div className="mb-80">
              <h4>Add Amenities</h4>
              <SelectFormType1
                options={amenities}
                label="amenities"
                value={formik.values.amenities}
                onChange={(value) => {
                  return formik.setFieldValue("amenities", value);
                }}
                placeholder="Choose amenities"
                isMulti={true}
              />
            </div>
          </div>
        )}
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          accept="image/*,audio/*,video/*"
        />
        <div className="mb-72">
          <button type="button" className="button button-green mr-8">
            Cancel
          </button>
          <button type="submit" className="button button-primary">
            Save and Continue
          </button>
        </div>
      </form>
    </main>
  );
}
