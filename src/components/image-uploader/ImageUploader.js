import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import CameraIcon from "../icons/CameraIcon";
import { useDropzone } from "react-dropzone";
import { thumb, thumbInner, img } from "./imageUploaderUtil";

import "./imageUploader.styles.scss";

import api from "../../utility/api";

export default function ImageUploader({
  apiImage,
  alt,
  files,
  setFiles,
  setFormikFieldValue,
  fieldName,
}) {
  //   const [files, setFiles] = useState([]);
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
      // formik.setFieldValue("logos", acceptedFiles);
      setFormikFieldValue(fieldName, acceptedFiles);
      setShowButtons(true);
    },
  });

  const { getRootProps, getInputProps } = myDropZone;

  const thumbs = files?.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.Location}
          alt={alt}
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
    setFiles(apiImage);
    setShowButtons(false);
  };

  //   const onSaveImage = async () => {
  //     const formDataObj = new FormData();
  //     formDataObj.append("file", files[0]);
  //     try {
  //       const imagesResponse = await api.post("fileUploads", formDataObj);
  //       if (imagesResponse) {
  //         const data = {
  //           organization: {
  //             logo: imagesResponse.data.data,
  //             user: user._id,
  //           },
  //         };
  //         const url = `organizations/${organizationId}`;
  //         const response = await api.patch(url, data);
  //         if (response) {
  //           setShowButtons(false);
  //           //   dispatch(loadOrganizationAction(response.data.data.organization));
  //         }
  //       }
  //     } catch (err) {
  //       console.log("logo error", err.response?.data.message);
  //     }
  //   };

  //   useEffect(() => {
  //     setFiles(apiImage);
  //     // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //     return () => files?.forEach((file) => URL.revokeObjectURL(file.Location));
  //   }, [apiImage]);

  return (
    <>
      <section>
        <div className="image-upload-wrap">
          <div {...getRootProps({ className: "image-dropzone" })}>
            <input {...getInputProps()} />
            <div className="image-upload-textbox">
              <CameraIcon className="camera-icon mb-16" />
              <div style={{ textAlign: "center" }}>
                <span>Drag and drop your image here or</span>
                <span>Browse</span>
                <span>to choose a file</span>
              </div>
            </div>
            {thumbs}
          </div>
        </div>
        <div className="mb-40">
          <div
            className={`${
              showButtons ? "saveimage-buttons-wrap" : "display-none"
            }`}
          >
            {/* <button
              type="submit"
              onClick={onSaveImage}
              className="button button-primary"
            >
              Save
            </button> */}
            <button
              type="button"
              onClick={onCancel}
              className="button-text button-text-primary"
            >
              Reset Image
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

// ImageUploader.propTypes = {
//   apiImage: PropTypes.array,
//   organizationId: PropTypes.string.isRequired,
// };
