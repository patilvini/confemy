import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import TextError from "../formik/TextError";
import * as yup from "yup";
import api from "../../utility/api";

import DragAndDrop from "../drag-And-drop/DragAndDrop";
import CameraIcon from "../icons/CameraIcon";

import "./createOrganization.styles.scss";
import DragDrop from "../drag-drop/DragDrop";

const thumbsContainer = {
  display: "flex",
  alignItems: "center",
  // marginBottom: "80px",
};

const thumb = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 2,
  padding: 4,
  marginRight: 24,
  backgroundColor: "#ecf0f2",
  width: "168px",
  height: "168px",
  maxWidth: "168px",
  maxHeight: "168px",
};

const thumbInner = {
  minWidth: 0,
  border: "1px solid #fcfdfd",
  overflow: "hidden",
  width: "104px",
  height: "104px",
  maxWidth: "104px",
  maxHeight: "104px",
};

const img = {
  width: "auto",
  height: "100%",
  // objectFit: "cover",
};

const initialValues = {
  logos: null,
  name: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  country: "",
  website: "",
  description: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  city: yup.string().required("Required"),
  country: yup.string().required("Required"),
  // logos: yup.mixed().required(),
});

let isSubmitting = true;

export default function CreateOrganization() {
  // for the drop zone and logo upload

  const user = useSelector((state) => state.auth.user);

  const [files, setFiles] = useState([]);

  const onSubmit = async (values, actions) => {
    const {
      name,
      logos,
      street1,
      street2,
      city,
      state,
      country,
      website,
      description,
    } = values;
    console.log(values);

    const myLogoData = {
      file: logos,
    };

    const formData = {
      organization: {
        name,
        description,
        user: user?._id,
        street1,
        street2,
        state,
        country,
        city,
        website,
      },
    };

    

    // console.log("actions", actions);
    // actions.resetForm({ initialValues });
    const imageData = new FormData();
    imageData.append("file", logos[0]);

    try {
      const imagesResponse = await api.post("fileUploads", imageData);
      console.log("images upload response", imagesResponse);
      if (imagesResponse) {
        formData.organization.logos = imagesResponse.data.data;
        const response = await api.post("organizations", formData);
        if (response) {
          console.log("organization submitted", response);
          console.log("actions", actions);
          actions.resetForm({ values: initialValues });
          setFiles([]);
        }
      }
    } catch (err) {
      if (err) {
        console.log(err)
        actions.setFieldError("name", err.response?.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const onCancel = () => {
    setFiles([]);
    formik.resetForm({ values: initialValues });
  };

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
      formik.setFieldValue("logos", acceptedFiles);
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

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div className="create-org-wrap">
      <form
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <h2 className="mb-32">Logo</h2>
        <section>
          <div className="logo-upload-wrap">
            <div {...getRootProps({ className: "logo-dropzone" })}>
              <input {...getInputProps()} />
              <CameraIcon className="camera-icon" />
            </div>
            <div className="logo-upload-textbox">
              <span>Drag and drop your logo here or</span>
              <span>Browse</span>
              <span>to choose a file</span>
            </div>
          </div>
          <aside style={thumbsContainer}>
            {thumbs}
            {/* <div>
            <button className="button-outlined button-outlined-green">
              Reset
            </button>
          </div> */}
          </aside>
        </section>
        <h2 className="mb-16 mt-40">Basic Information</h2>
        <div className="input-container">
          <input
            id="name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Organization name*"
          />
          {formik.touched.name && Boolean(formik.errors.name) && (
            <TextError>{formik.errors.name}</TextError>
          )}
        </div>
        <div className="input-container">
          <input
            id="city"
            type="text"
            name="city"
            value={formik?.values.city}
            onChange={formik?.handleChange}
            placeholder="City*"
          />
          {formik?.touched.city && Boolean(formik?.errors.city) && (
            <TextError>{formik?.errors.city}</TextError>
          )}
        </div>
        <div className="input-container">
          <input
            id="country"
            type="text"
            name="country"
            value={formik?.values.country}
            onChange={formik?.handleChange}
            placeholder="Country*"
          />
          {formik?.touched.country && Boolean(formik?.errors.country) && (
            <TextError>{formik?.errors.country}</TextError>
          )}
        </div>

        <div className="input-container mt-40 ">
          <input
            id="street1"
            type="text"
            name="street1"
            value={formik?.values.street1}
            onChange={formik?.handleChange}
            placeholder="Address line 1 (optional)"
          />

          {formik?.touched.street1 && Boolean(formik?.errors.street1) && (
            <TextError>{formik?.errors.street1}</TextError>
          )}
        </div>

        <div className="input-container">
          <input
            id="street2"
            type="text"
            name="street2"
            value={formik?.values.street2}
            onChange={formik?.handleChange}
            placeholder="Address line 2 (optional)"
          />

          {formik?.touched.street2 && Boolean(formik?.errors.street2) && (
            <TextError>{formik?.errors.street2}</TextError>
          )}
        </div>

        <div className="input-container">
          <input
            id="state"
            type="text"
            name="state"
            value={formik?.values.state}
            onChange={formik?.handleChange}
            placeholder="State (optional)"
          />

          {formik?.touched.state && Boolean(formik?.errors.state) && (
            <TextError>{formik?.errors.state}</TextError>
          )}
        </div>

        <div className="input-container">
          <input
            id="website"
            type="text"
            name="website"
            value={formik.values.website}
            onChange={formik.handleChange}
            placeholder="Website (optional)"
          />
          {formik.touched.website && Boolean(formik.errors.website) && (
            <TextError>{formik.errors.website}</TextError>
          )}
        </div>
        <div className="input-container">
          <textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Describe your organization (optional)"
          />
          {formik.touched.description && Boolean(formik.errors.description) && (
            <TextError>{formik.errors.description}</TextError>
          )}
        </div>
        {/* <div className="mt-40">
          <div>
            <button
              onClick={onCancel}
              type="button"
              className="button button-green mr-24"
            >
              Cancel
            </button>
            <div>
              <button type="submit" className="button button-primary">
                Submit
              </button>
              {formik.isSubmitting && (
                <div
                  style={{
                    width: 24,
                    height: 24,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                    zIndex: 1,
                  }}
                >
                  ...Loading
                </div>
              )}
            </div>
          </div>
        </div> */}

        <div
          style={{
            display: "flex",
            marginTop: 6,
            marginBotton: 3,
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            className="button button-green mr-24"
          >
            Cancel
          </button>

          <div style={{ position: "relative" }}>
            <button
              type="submit"
              className="button button-primary"
              // disabled={formik.isSubmitting}
            >
              Submit
            </button>
            {/* {formik.isSubmitting && (
              <div
                style={{
                  width: 24,
                  height: 24,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                  zIndex: 1,
                }}
              >
                ...Loading
              </div>
            )} */}
          </div>
        </div>
      </form>
    </div>
  );
}
