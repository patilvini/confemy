import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import SingleImageUploader from "../image-uploader/SingleImageUploader";
import { alertAction } from "../../redux/alert/alertAction";

import api from "../../utility/api";
import TextError from "../formik/TextError";
import DeleteIcon from "../icons/DeleteIcon";

import "./speakerForm.styles.scss";

const validationSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  degree: yup.string().required("Required"),
  designation: yup.string().required("Required"),
});

const initialValues = {
  images: [],
  firstName: "",
  lastName: "",
  degree: "",
  designation: "",
};

export default function SpeakerForm(props) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const newConference = useSelector((state) => state.conference.newConference);

  async function onSubmit(values, actions) {
    if (newConference?.completedStep > 0) {
      const formData = {
        speakerDetails: {
          data: values.images,
          firstName: values.firstName,
          lastName: values.lastName,
          degree: values.degree,
          designation: values.designation,
          createdBy: newConference?.host,
          userId: user._id,
          organizationId: newConference?.hostedBy.organization,
        },
      };

      if (values.images?.length > 0) {
        const formDataObj = new FormData();
        formDataObj.append("file", values.images[0]);
        try {
          const imagesResponse = await api.post("fileUploads", formDataObj);
          // console.log("images upload response", imagesResponse);
          if (imagesResponse) {
            formData.speakerDetails.data = imagesResponse.data.data;
            // console.log("formData", values.images.length, formData);

            const response = await api.post("/speakers", formData);
            if (response) {
              console.log("speaker saved res", response);
              props.setFormikSpeakers(response.data.data.newSpeaker);
              actions.resetForm({ values: initialValues });
              props.onClose();
            }
          }
        } catch (err) {
          actions.setFieldError("logos", err.response?.data.message);
        }
      } else {
        try {
          const response = await api.post("/speakers", formData);
          if (response) {
            console.log("speaker saved res", response);
            props.setFormikSpeakers(response.data.data.newSpeaker);
            // props.setMySpeakers((prev) => [
            //   ...prev,
            //   response.data.data.newSpeaker,
            // ]);
            actions.resetForm({ values: initialValues });

            props.onClose();
          }
        } catch (err) {
          if (err) {
            dispatch(alertAction(err.response.data.message, "danger"));
          }
        }
      }
    } else {
      dispatch(alertAction("Complete step-1 first", "danger"));
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  function setFormikFieldValue(field, value) {
    formik.setFieldValue(field, value);
  }

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      formik.values.images?.forEach((file) =>
        URL.revokeObjectURL(file.Location)
      );
  }, [formik.values.images]);

  return (
    <div className="register-modal white-modal">
      <div className="modal-form-wrapper">
        <form
          className="form-type-1"
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
          <div className="speaker-dzimg-container mb-40">
            {formik.values?.images?.length > 0 ? (
              formik.values.images?.map((image) => (
                <div key={image.Location} className="speakerimage-container">
                  <div className="speakerimage-wrap">
                    <img
                      className="speakerimage"
                      alt="speaker image"
                      src={image.Location}
                      // Revoke data uri after image is loaded
                      onLoad={() => {
                        URL.revokeObjectURL(image.Location);
                      }}
                    />
                  </div>
                  <div className="speakerimage-overlay"></div>
                  <div
                    onClick={() => {
                      const imagesLeft = formik.values.images?.filter(
                        (e) => e !== image
                      );
                      formik.setFieldValue("images", imagesLeft);
                    }}
                    className="speakerimage-delete-circle"
                  >
                    <DeleteIcon className="icon-size" />
                  </div>
                </div>
              ))
            ) : (
              // className="speaker-image-dropzone-container" controls the size if SingleImageUploader
              <div className="speaker-image-dropzone-wrap">
                <SingleImageUploader
                  fieldName="images"
                  setFormikFieldValue={setFormikFieldValue}
                  // dropzoneContentType="speakerImage"
                />
              </div>
            )}
          </div>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <div className="material-textfield">
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  placeholder=" "
                />
                <label>First Name*</label>
              </div>
              <div>
                {formik.touched.firstName &&
                  Boolean(formik.errors.firstName) && (
                    <TextError>{formik.errors.firstName}</TextError>
                  )}
              </div>
            </div>
            <div className="grid-2nd-col">
              <div className="material-textfield">
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  placeholder=" "
                />
                <label>Last Name*</label>
              </div>
              <div>
                {formik.touched.lastName && Boolean(formik.errors.lastName) && (
                  <TextError>{formik.errors.lastName}</TextError>
                )}
              </div>
            </div>
            <div className="grid-1st-col">
              <div className="material-textfield">
                <input
                  id="degree"
                  type="text"
                  name="degree"
                  value={formik.values.degree}
                  onChange={formik.handleChange}
                  placeholder=" "
                />
                <label>Degree*</label>
              </div>
              <div>
                {formik.touched.degree && Boolean(formik.errors.degree) && (
                  <TextError>{formik.errors.degree}</TextError>
                )}
              </div>
            </div>
            <div className="grid-2nd-col">
              <div className="material-textfield">
                <input
                  id="designation"
                  type="text"
                  name="designation"
                  value={formik.values.designation}
                  onChange={formik.handleChange}
                  placeholder=" "
                />
                <label>Designation*</label>
              </div>
              <div>
                {formik.touched.designation &&
                  Boolean(formik.errors.designation) && (
                    <TextError>{formik.errors.designation}</TextError>
                  )}
              </div>
            </div>
            <div className="grid-1st-col">
              <button
                className="button button-primary"
                type="button"
                onClick={props.onClose}
              >
                Cancel
              </button>
            </div>
            <div className="grid-2nd-col">
              <button className="button button-green" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
