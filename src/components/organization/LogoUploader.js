import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import CameraIcon from "../icons/CameraIcon";
import { useDropzone } from "react-dropzone";
import { thumb, thumbInner, img } from "./organizationUtil";
import { loadOrganizationAction } from "../../redux/organization/organizationAction";

import "./createOrganization.styles.scss";

import api from "../../utility/api";

export default function LogoUploader({ apiLogo, organizationId }) {
  const [files, setFiles] = useState([]);
  const [showButtons, setShowButtons] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const myDropZone = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            Location: URL.createObjectURL(file),
          })
        )
      );
      //   formik.setFieldValue("logos", acceptedFiles);
      setShowButtons(true);
    },
  });

  const { getRootProps, getInputProps } = myDropZone;

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.Location}
          alt="logo"
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.Location);
          }}
        />
      </div>
    </div>
  ));

  const onCancel = () => {
    setFiles(apiLogo);
    setShowButtons(false);
  };

  const saveLogo = async () => {
    const formDataObj = new FormData();
    formDataObj.append("file", files[0]);
    try {
      const imagesResponse = await api.post("fileUploads", formDataObj);
      if (imagesResponse) {
        const data = {
          organization: {
            logo: imagesResponse.data.data,
            user: user._id,
          },
        };
        const url = `organizations/${organizationId}`;
        const response = await api.patch(url, data);
        if (response) {
          setShowButtons(false);
          dispatch(loadOrganizationAction(response.data.data.organization));
        }
      }
    } catch (err) {
      console.log("logo error", err.response?.data.message);
    }
  };

  useEffect(() => {
    setFiles(apiLogo);
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.Location));
  }, [apiLogo]);

  return (
    <>
      <h2 className="mb-40">Logo</h2>
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
        <div className="mb-40">
          <div
            className={`${
              showButtons ? "savelogo-buttons-wrap" : "display-none"
            }`}
          >
            <button
              type="submit"
              onClick={saveLogo}
              className="button button-primary"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="button-text button-text-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

LogoUploader.propTypes = {
  apiLogo: PropTypes.array,
  organizationId: PropTypes.string.isRequired,
};
