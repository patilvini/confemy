import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import moment from "moment";
import TextError from "../formik/TextError";
import * as yup from "yup";
import api from "../../utility/api";
import CameraIcon from "../icons/CameraIcon";
import "./createOrganization.styles.scss";
import FacebookBlueCircle from "../icons/FacebookBlueCircle";
import LinkedinBlueIcon from "../icons/LinkedinBlueIcon";
import TwitterBlueIcon from "../icons/TwitterBlueIcon";
import InstagramGradientIcon from "../icons/InstagramGradientIcon";

import SaveInput from "./SaveInput";
import PsaveInput from "./PsaveInput";

import {
  loadOrganizationAction,
  organizationErrorAction,
} from "../../redux/organization/organizationAction";

import { thumbsContainer, thumb, thumbInner, img } from "./organizationUtil";

const initialValues = {
  logos: [],
  name: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  country: "",
  website: "",
  description: "",
  facebook: "",
  twitter: "",
  linkedin: "",
  instagram: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  city: yup.string().required("Required"),
  country: yup.string().required("Required"),
});

export default function OneComponentOrganization() {
  const user = useSelector((state) => state.auth.user);
  // const { organization, isLoading, isError } = useSelector(
  //   (state) => state.organization
  // );

  // for the drop zone and logo upload
  const [files, setFiles] = useState([]);

  //Set formData before Display
  const [formData, setFormData] = useState([]);

  //Set organization, isLoading, isError and errorMsg on state after API call
  const [organization, setOrganization] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Set msg to display msg after API call
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { organizationId } = useParams();

  const onSubmit = async (values, actions) => {
    const {
      name,
      logos,
      city,
      country,
      website,
      description,
      facebook,
      twitter,
      linkedin,
      instagram,
    } = values;

    const formData = {
      organization: {
        name,
        description,
        user: user?._id,
        country,
        city,
        website,
        facebook,
        twitter,
        linkedin,
        instagram,
      },
    };

    if (logos.length > 0) {
      const formDataObj = new FormData();
      formDataObj.append("file", logos[0]);
      try {
        const imagesResponse = await api.post("fileUploads", formDataObj);
        console.log("images upload response", imagesResponse);
        if (imagesResponse) {
          formData.organization.logos = imagesResponse.data.data;

          const response = await api.post("organizations", formData);
          if (response) {
            actions.resetForm({ values: initialValues });
            setFiles([]);
            navigate("/dashboard/my-organizations");
          }
        }
      } catch (err) {
        actions.setFieldError("logos", err.response?.data.message);
      }
    } else {
      console.log("values from submit", values);
      // try {
      //   const response = await api.post("organizations", formData);
      //   if (response) {
      //     actions.resetForm({ values: initialValues });
      //     setFiles([]);
      //     navigate("/dashboard/my-organizations");
      //   }
      // } catch (err) {
      //   if (err) {
      //     actions.setFieldError("name", err.response?.data.message);
      //   }
      // }
    }
  };

  const formik = useFormik({
    initialValues: formData || initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const onCancel = () => {
    setFiles([]);
    formik.resetForm({ values: initialValues });
  };

  const myDropZone = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      console.log("accepted files ondrop", acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            Location: URL.createObjectURL(file),
          })
        )
      );
      formik.setFieldValue("logos", acceptedFiles);
    },
  });

  const { getRootProps, getInputProps } = myDropZone;

  // const thumbs = files.map((file) => (
  //   <div style={thumb} key={file.name}>
  //     <div style={thumbInner}>
  //       <img
  //         src={file.preview}
  //         alt="logo"
  //         style={img}
  //         // Revoke data uri after image is loaded
  //         onLoad={() => {
  //           URL.revokeObjectURL(file.preview);
  //         }}
  //       />
  //     </div>
  //   </div>
  // ));

  const thumbs = files.map((file) => (
    <div
      style={{
        position: "absolute",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      key={file.name}
    >
      <div style={{ width: 80, height: "auto" }}>
        <img
          src={file.Location}
          alt="logo"
          style={{ width: "100%", height: "auto" }}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.Location);
          }}
        />
      </div>
    </div>
  ));

  const getCurrentOrganization = useCallback(async (id) => {
    const url = `organizations/${id}`;
    try {
      const response = await api.get(url);
      if (response) {
        console.log("get current organization api", response);
        setOrganization(response.data.data.organization);
        setIsLoading(false);
        setIsError(false);
        // dispatch(loadOrganizationAction(response.data.data.organization));
      }
    } catch (err) {
      if (err) {
        setIsError(true);
        setIsLoading(false);
        // dispatch(organizationErrorAction());
      }
    }
  }, []);

  useEffect(() => {
    if (organizationId !== organization?._id)
      getCurrentOrganization(organizationId);
    if (!isLoading && organization) {
      const organizationData = { ...initialValues };
      for (const key in organization) {
        if (key in organizationData) organizationData[key] = organization[key];
      }
      setFormData(organizationData);
      setFiles(organizationData?.logos);
      console.log("organizationData from U Effect ", organizationData);
    }
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.Location));
  }, [organizationId, isLoading, organization, getCurrentOrganization]);

  // console.log("files state", files);
  // console.log("organizaiton from state", organization);

  // console.log("myDropZone obj", myDropZone);

  return (
    <div className="create-org-wrap">
      <form className="form-type-1" onSubmit={formik.handleSubmit}>
        <SaveInput name="name" label="Organization name*" formik={formik} />
      </form>

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
              {thumbs}
            </div>
            <div className="logo-upload-textbox">
              <span>Drag and drop your logo here or</span>
              <span>Browse</span>
              <span>to choose a file</span>
            </div>
          </div>
          {/* <aside style={thumbsContainer}>{thumbs}</aside> */}
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

        {/* <div className="input-container mt-40 ">
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
        </div> */}

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
        <section className="socialmedia-wrap">
          <h2 className="mb-16 mt-40">Social Media</h2>
          <p className="mb-24 caption-1-regular-gray3">
            Connect your social media accounts for better reachability.
          </p>
          <div className="input-container">
            <div className="position-relative">
              <input
                id="facebook"
                type="text"
                name="facebook"
                value={formik.values.facebook}
                onChange={formik.handleChange}
                placeholder="Facebook (optional)"
              />
              <i className="left-input-icon">
                <FacebookBlueCircle className="large-icon" />
              </i>
            </div>
            {formik.touched.facebook && Boolean(formik.errors.facebook) && (
              <TextError>{formik.errors.facebook}</TextError>
            )}
          </div>

          <div className="input-container">
            <div className="position-relative">
              <input
                id="instagram"
                type="text"
                name="instagram"
                value={formik.values.instagram}
                onChange={formik.handleChange}
                placeholder="Instagram (optional)"
              />
              <i className="left-input-icon">
                <InstagramGradientIcon className="large-icon" />
              </i>
            </div>
            {formik.touched.instagram && Boolean(formik.errors.instagram) && (
              <TextError>{formik.errors.instagram}</TextError>
            )}
          </div>
          <div className="input-container">
            <div className="position-relative">
              <input
                id="twitter"
                type="text"
                name="twitter"
                value={formik.values.twitter}
                onChange={formik.handleChange}
                placeholder="Twitter (optional)"
              />
              <i className="left-input-icon">
                <TwitterBlueIcon className="large-icon" />
              </i>
            </div>
            {formik.touched.twitter && Boolean(formik.errors.twitter) && (
              <TextError>{formik.errors.twitter}</TextError>
            )}
          </div>
          <div className="input-container">
            <div className="position-relative">
              <input
                id="linkedin"
                type="text"
                name="linkedin"
                value={formik.values.linkedin}
                onChange={formik.handleChange}
                placeholder="Linkedin (optional)"
              />
              <i className="left-input-icon">
                <LinkedinBlueIcon className="large-icon" />
              </i>
            </div>
            {formik.touched.linkedin && Boolean(formik.errors.linkedin) && (
              <TextError>{formik.errors.linkedin}</TextError>
            )}
          </div>
        </section>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            marginBotton: 3,
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            className="button-text button-text-primary mr-24"
          >
            Cancel
          </button>
          <button type="submit" className="button button-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
