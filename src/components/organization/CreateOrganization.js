import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import TextError from "../formik/TextError";
import * as yup from "yup";

import CameraIcon from "../icons/CameraIcon";
import FacebookBlueCircle from "../icons/FacebookBlueCircle";
import LinkedinBlueIcon from "../icons/LinkedinBlueIcon";
import TwitterBlueIcon from "../icons/TwitterBlueIcon";
import InstagramGradientIcon from "../icons/InstagramGradientIcon";
import SelectFormType1 from "../reselect/SelectFormType1";
import ReloadableSelectFormType1 from "../reselect/ReloadableSelectFormType1";

import api from "../../utility/api";
import {
  loadCountryList,
  loadStateList,
  loadCityList,
} from "../../utility/commonUtil";

import { thumb, thumbInner, img } from "./organizationUtil";
import "./createOrganization.styles.scss";
import SubmitCancelButtonWithLoader from "../button/SubmitCancelButtonWithLoader";

const initialValues = {
  logos: [],
  name: "",
  city: "",
  country: "",
  state: "",
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
  state: yup.string().required("Required"),
  // logos: yup.mixed().required(),
});

export default function CreateOrganization() {
  // for the drop zone and logo upload

  const user = useSelector((state) => state.auth.user);
  const [files, setFiles] = useState([]);

  const { countryList, stateList, cityList } = useSelector(
    (state) => state.list
  );
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    const {
      name,
      logos,
      city,
      country,
      state,
      website,
      description,
      facebook,
      twitter,
      linkedin,
      instagram,
    } = values;

    const formData = {
      organization: {
        user: user?._id,
        name,
        city,
        state,
        country,
        website,
        description,
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
        if (imagesResponse) {
          formData.organization.logo = imagesResponse.data.data;
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
      try {
        const response = await api.post("organizations", formData);
        if (response) {
          actions.resetForm({ values: initialValues });
          setFiles([]);
          navigate("/dashboard/my-organizations");
        }
      } catch (err) {
        if (err) {
          actions.setFieldError("name", err.response?.data.message);
        }
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
  }, [files]);

  useEffect(() => {
    if (!countryList.length > 0) {
      loadCountryList();
    }
  }, []);

  console.log(formik);

  return (
    <div className="create-org-wrap">
      <form
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <h2 className="mb-32">Logo</h2>
        <section className="mb-40">
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
        </section>
        <h2 className="mb-16">Basic Information</h2>
        <div className="material-textfield">
          <input
            id="name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder=" "
          />
          <label>Organization name*</label>
        </div>
        <div className="mb-24">
          {formik.touched.name && Boolean(formik.errors.name) && (
            <TextError>{formik.errors.name}</TextError>
          )}
        </div>
        <div>
          <SelectFormType1
            options={countryList}
            value={formik.values.country}
            onChange={(value) => {
              if (formik.values.country !== value?.value) {
                formik.setFieldValue("state", "");
                formik.setFieldValue("city", "");
              }
              formik.setFieldValue("country", value?.value);
              loadStateList(value?.countryId);
            }}
            placeholder="Select country*"
            isDisabled={false}
            name="country"
          />
          <div className="mb-24">
            {formik.touched.country && Boolean(formik.errors.country) && (
              <TextError>{formik.errors.country}</TextError>
            )}
          </div>
        </div>

        <div>
          <ReloadableSelectFormType1
            options={stateList}
            value={formik.values.state}
            onChange={(value) => {
              if (formik.values.state !== value?.value) {
                formik.setFieldValue("city", "");
              }
              formik.setFieldValue("state", value?.value);
              loadCityList(value?.stateId);
            }}
            placeholder="Select state*"
            isDisabled={false}
            name="state"
          />

          <div className="mb-24">
            {formik.touched.state && Boolean(formik.errors.state) && (
              <TextError>{formik.errors.state}</TextError>
            )}
          </div>
        </div>
        <div>
          <ReloadableSelectFormType1
            options={cityList}
            value={formik.values.city}
            onChange={(value) => {
              formik.setFieldValue("city", value?.value);
            }}
            placeholder="Select city*"
            isDisabled={false}
            name="city"
          />

          <div className="mb-24">
            {formik.touched.city && Boolean(formik.errors.city) && (
              <TextError>{formik.errors.city}</TextError>
            )}
          </div>
        </div>
        {/* <div className="material-textfield">
          <input
            id="city"
            type="text"
            name="city"
            value={formik?.values.city}
            onChange={formik?.handleChange}
            placeholder=" "
          />
          <label>City*</label>
        </div>
        <div className="mb-24">
          {formik?.touched.city && Boolean(formik?.errors.city) && (
            <TextError>{formik?.errors.city}</TextError>
          )}
        </div>
        <div className="material-textfield">
          <input
            id="country"
            type="text"
            name="country"
            value={formik?.values.country}
            onChange={formik?.handleChange}
            placeholder=" "
          />
          <label>Country*</label>
        </div>
        <div className="mb-24">
          {formik?.touched.country && Boolean(formik?.errors.country) && (
            <TextError>{formik?.errors.country}</TextError>
          )}
        </div> */}

        <div className="material-textfield">
          <input
            id="website"
            type="text"
            name="website"
            value={formik.values.website}
            onChange={formik.handleChange}
            placeholder=" "
          />
          <label>Website</label>
        </div>
        <div className="mb-24">
          {formik.touched.website && Boolean(formik.errors.website) && (
            <TextError>{formik.errors.website}</TextError>
          )}
        </div>
        <div>
          <textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Describe your organization "
          />
        </div>
        <div className="mb-24">
          {formik.touched.description && Boolean(formik.errors.description) && (
            <TextError>{formik.errors.description}</TextError>
          )}
        </div>

        <section className="socialmedia-wrap">
          <h2 className="mb-16 mt-40">Social Media</h2>
          <p className="mb-24 caption-1-regular-gray3">
            Connect your social media accounts for better reachability.
          </p>
          <div className="position-relative">
            <input
              id="facebook"
              type="text"
              name="facebook"
              value={formik.values.facebook}
              onChange={formik.handleChange}
              placeholder="Facebook "
            />
            <i className="left-input-icon">
              <FacebookBlueCircle className="icon-lg" />
            </i>
          </div>
          <div className="mb-24">
            {formik.touched.facebook && Boolean(formik.errors.facebook) && (
              <TextError>{formik.errors.facebook}</TextError>
            )}
          </div>

          <div className="position-relative">
            <input
              id="instagram"
              type="text"
              name="instagram"
              value={formik.values.instagram}
              onChange={formik.handleChange}
              placeholder="Instagram "
            />
            <i className="left-input-icon">
              <InstagramGradientIcon className="icon-lg" />
            </i>
          </div>
          <div className="mb-24">
            {formik.touched.instagram && Boolean(formik.errors.instagram) && (
              <TextError>{formik.errors.instagram}</TextError>
            )}
          </div>

          <div className="position-relative">
            <input
              id="twitter"
              type="text"
              name="twitter"
              value={formik.values.twitter}
              onChange={formik.handleChange}
              placeholder="Twitter "
            />
            <i className="left-input-icon">
              <TwitterBlueIcon className="icon-lg" />
            </i>
          </div>
          <div className="mb-24">
            {formik.touched.twitter && Boolean(formik.errors.twitter) && (
              <TextError>{formik.errors.twitter}</TextError>
            )}
          </div>

          <div className="position-relative">
            <input
              id="linkedin"
              type="text"
              name="linkedin"
              value={formik.values.linkedin}
              onChange={formik.handleChange}
              placeholder="Linkedin "
            />
            <i className="left-input-icon">
              <LinkedinBlueIcon className="icon-lg" />
            </i>
          </div>
          <div className="mb-24">
            {formik.touched.linkedin && Boolean(formik.errors.linkedin) && (
              <TextError>{formik.errors.linkedin}</TextError>
            )}
          </div>
        </section>
        <div className="mt-60">
          <SubmitCancelButtonWithLoader
            isSubmitting={formik.isSubmitting}
            onCancel={onCancel}
            cancelButtonClass="button-text button-text-red"
          />
        </div>

        {/* <div className="mt-40 mb-32">
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
        </div> */}
      </form>
    </div>
  );
}
