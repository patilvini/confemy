import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";

import { createConferenceAction } from "../../redux/conference/conferenceAction";
import { alertAction } from "../../redux/alert/alertAction";

import api from "../../utility/api";

import Modal from "../modal/Modal";
import SpeakerForm from "../speaker/SpeakerForm";
import SearchSpeaker from "../speaker/SearchSpeaker";
import SpeakerOptions from "../speaker/SpeakerOptions";
import Speakercard from "../speaker/Speakercard";
import SelectFormType1 from "../reselect/SelectFormType1";
import TextEditor from "../text-editor/TextEditor";

import SingleImageUploader from "../image-uploader/SingleImageUploader";
import MultiImageUploader from "../image-uploader/MultiImageUploader";

import AddGreenIcon from "../icons/AddGreenIcon";
import "./createConference.styles.scss";
import DeleteIcon from "../icons/DeleteIcon";
import SubmitCancelButtonWithLoader from "../button/SubmitCancelButtonWithLoader";

const validationSchema = yup.object().shape({
  speakers: yup.array().of(yup.object()).min(1, "Add speaker(s)").compact(),
});

export default function ConfDetails2() {
  const [open, setOpen] = useState(false);
  const [showSpeakerOptions, setShowSpeakerOptions] = useState(true);
  const [showSpeakerForm, setShowSpeakerForm] = useState(false);

  const [amenities, setAmenities] = useState([]);
  const [speakerList, setSpeakerList] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const newConference = useSelector((state) => state.conference.newConference);

  const initialValues = {
    banner: [],
    description: {},
    speaker: "",
    speakers: [],
    schedules: {},
    courseOutline: {},
    amenities: [],
    venueImages: [],
    deletedBanner: [],
    deletedVenueImages: [],
    deletedSpeakers: [],
  };

  async function onSubmit(values, actions) {
    if (!newConference?.completedStep1) {
      dispatch(alertAction("Complete step-1 first", "danger"));
      return;
    }
    const {
      banner,
      description,
      speakers,
      schedules,
      courseOutline,
      amenities,
      venueImages,
      deletedBanner,
      deletedVenueImages,
    } = values;

    const formData = {
      conferenceDetails: {
        speakers: speakers,
        conferenceId: newConference?._id,
        banner: banner,
        deletedBanner: deletedBanner,
        description: description,
        schedules: schedules,
        courseOutline: courseOutline,
        venueImages: [],
        amenities: amenities,
        deletedVenueImages: deletedVenueImages,
      },
    };

    //  Submit banner image and add image url to formData object
    if (banner?.length > 0) {
      const imageDataObj = new FormData();
      let oldBanners = [];
      banner.map((img) =>
        !img.Key ? imageDataObj.append("file", img) : oldBanners.push(img)
      );

      if (imageDataObj.has("file")) {
        try {
          const imagesResponse = await api.post("fileUploads", imageDataObj);
          if (imagesResponse) {
            formData.conferenceDetails.banner = [
              ...oldBanners,
              ...imagesResponse.data.data,
            ];
          }
        } catch (err) {
          dispatch(alertAction("Image(s) failed to save", "danger"));
        }
      }
    }

    if (venueImages?.length > 0) {
      const imageDataObj = new FormData();
      let oldVenueImages = [];

      venueImages.map((img) =>
        !img.Key ? imageDataObj.append("file", img) : oldVenueImages.push(img)
      );

      if (imageDataObj.has("file")) {
        try {
          const imagesResponse = await api.post("fileUploads", imageDataObj);
          if (imagesResponse) {
            formData.conferenceDetails.venueImages = [
              ...oldVenueImages,
              ...imagesResponse.data.data,
            ];
          }
        } catch (err) {
          dispatch(alertAction("Image(s) failed to save", "danger"));
        }
      }
    }

    console.log("details 2 formData", formData);

    try {
      const response = await api.post("conferences/step3", formData);
      if (response) {
        dispatch(createConferenceAction(response.data.data.conference));
        actions.resetForm({ values: initialValues });
        navigate("/dashboard/create-conf/step-4");
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  }

  const formik = useFormik({
    initialValues: {
      banner: newConference?.banner || [],
      description: newConference?.description || {},
      speaker: "",
      speakers: newConference?.conferenceSpeakers || [],
      schedules: newConference?.schedules || {},
      courseOutline: newConference?.courseOutline || {},
      amenities: newConference?.conferenceAmenities || [],
      venueImages: newConference?.venueImages || [],
      deletedBanner: [],
      deletedVenueImages: [],
      deletedSpeakers: [],
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

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

  // set formik field speakers value

  function setFormikSpeakers(newSpeaker) {
    const speakerAlreadyAssigned = formik.values.speakers.find(
      (speaker) => speaker._id === newSpeaker._id
    );

    if (
      speakerAlreadyAssigned &&
      Object.keys(speakerAlreadyAssigned).length > 0
    ) {
      dispatch(alertAction("Speaker is already assigned", "danger"));
    } else {
      formik.setFieldValue("speakers", [...formik.values.speakers, newSpeaker]);
    }
  }

  //  set formik Venue Images
  function setFormikVenueImages(newImages) {
    formik.setFieldValue("venueImages", [
      ...formik.values.venueImages,
      ...newImages,
    ]);
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

  const removeConfSpeaker = (val) => {
    const speakersLeft = formik.values.speakers.filter(
      (speaker) => speaker.value !== val
    );
    formik.setFieldValue("speakers", speakersLeft);
  };

  function deleteBanner(image) {
    let imagesDeleted = [];
    let imagesLeft = [];

    formik.values.banner.map((item) =>
      item.Location !== image.Location
        ? imagesLeft.push(item)
        : item.Key && item.Location === image.Location
        ? imagesDeleted.push(item)
        : null
    );

    formik.setFieldValue("banner", imagesLeft);
    formik.setFieldValue("deletedBanner", [
      ...formik.values.deletedBanner,
      ...imagesDeleted,
    ]);
  }

  function deletedVenueImage(image) {
    let imagesDeleted = [];
    let imagesLeft = [];

    formik.values.venueImages.map((item) =>
      item.Location !== image.Location
        ? imagesLeft.push(item)
        : item.Key && item.Location === image.Location
        ? imagesDeleted.push(item)
        : null
    );

    formik.setFieldValue("venueImages", imagesLeft);
    formik.setFieldValue("deletedVenueImages", [
      ...formik.values.deletedVenueImages,
      ...imagesDeleted,
    ]);
  }

  useEffect(() => {
    loadAmenities();
    let confHostId;
    if (newConference?.host === "organization") {
      confHostId = newConference?.hostedBy.organization;
    } else {
      confHostId = user?._id;
    }
    loadSpeakers(newConference?.host, confHostId);
  }, [open]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      formik.values.banner?.forEach((file) =>
        URL.revokeObjectURL(file.Location)
      );
  }, [formik.values.banner]);

  return (
    <main className="conf-form-wrap">
      <form
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div className="mb-72">
          <h2>Banner image</h2>
          {formik.values?.banner?.length > 0 ? (
            formik.values.banner?.map((image) => (
              <div key={image.Location} className="confbanner-container">
                <div className="confbanner-wrap">
                  <img
                    className="confbanner"
                    alt="conference banner"
                    src={image.Location}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                      URL.revokeObjectURL(image.Location);
                    }}
                  />
                </div>
                <div className="confbanner-overlay"></div>
                <div
                  onClick={() => deleteBanner(image)}
                  className="confbanner-delete-circle"
                >
                  <DeleteIcon className="icon-size" />
                </div>
              </div>
            ))
          ) : (
            // className="confbanner-dropzone-container " controls the size if SingleImageUploader
            <div className="confbanner-dropzone-container ">
              <SingleImageUploader
                fieldName="banner"
                setFormikFieldValue={setFormikFieldValue}
                dropzoneContentType="confbanner"
              />
            </div>
          )}
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
              apiRawContent={newConference?.description}
            />
          </div>
        </div>

        <div className="mb-72">
          <h2>Speakers</h2>
          <div>
            {formik.values.speakers?.map((speaker) => (
              <Speakercard
                key={speaker?.label}
                name={speaker?.label}
                degree={speaker?.degree}
                value={speaker.value}
                designation={speaker?.designation}
                image={speaker.images}
                removeConfSpeaker={removeConfSpeaker}
              />
            ))}
            <div>
              <div className="add-speaker-button">
                <div onClick={onOpen}>
                  <AddGreenIcon className="icon-lg" />
                </div>
              </div>
              <div>
                {formik.touched.speakers && Boolean(formik.errors.speakers) && (
                  <TextError>{formik.errors.speakers}</TextError>
                )}
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
                  placeholder="Choose speaker"
                  isMulit={false}
                  onClose={onClose}
                  showForm={setShowSpeakerForm}
                  setFormikSpeakers={setFormikSpeakers}
                  isDisabled={false}
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

        {newConference?.venueName && newConference?.venueName?.length > 0 && (
          <div className="details2-venue-wrap">
            <h2>Venue and Amenities</h2>

            <div className=" details2-venue caption-2-regular-gray3 ">
              <h4>{newConference?.venueName}</h4>
              <p>{newConference?.street1}</p>
              <p>{newConference?.street2}</p>
              <p>
                <span> {newConference?.city},</span>{" "}
                <span> {newConference?.state}</span>
              </p>
              <p>
                {newConference?.country}, {newConference?.zipcode}
              </p>
            </div>

            <div className="mb-48">
              <h4>Add Venue images</h4>
              {formik.values?.venueImages?.length > 0 &&
                formik.values.venueImages?.map((image) => (
                  <div
                    key={image.Location}
                    className="confbanner-container mb-16"
                  >
                    <div className="confbanner-wrap">
                      <img
                        className="confbanner"
                        alt="venue images"
                        src={image.Location}
                        // Revoke data uri after image is loaded
                        onLoad={() => {
                          URL.revokeObjectURL(image.Location);
                        }}
                      />
                    </div>
                    <div className="confbanner-overlay"></div>
                    <div
                      className="confbanner-delete-circle"
                      onClick={() => deletedVenueImage(image)}
                    >
                      <DeleteIcon className="icon-size" />
                    </div>
                  </div>
                ))}

              <div className="confbanner-dropzone-container ">
                <MultiImageUploader
                  // fieldName="venueImages"
                  setFormikImagefieldValue={setFormikVenueImages}
                  dropzoneContentType="confbanner"
                  maxFiles={10}
                />
              </div>
            </div>
            <div className="mb-80">
              <h4>Add Venue Amenities</h4>
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

        <div className="mb-72">
          <SubmitCancelButtonWithLoader
            isSubmitting={formik.isSubmitting}
            onCancel={() => formik.resetForm({})}
          />
        </div>
      </form>
    </main>
  );
}
