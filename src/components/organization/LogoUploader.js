import { useState, useEffect, useCallback } from "react";
import CameraIcon from "../icons/CameraIcon";
import { useDropzone } from "react-dropzone";
import { thumb, thumbInner, img } from "./organizationUtil";
import "./createOrganization.styles.scss";

import api from "../../utility/api";

export default function LogoUploader({ apiLogoArray }) {
  const [files, setFiles] = useState([]);

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
      //   formik.setFieldValue("logos", acceptedFiles);
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

  useEffect(() => {
    setFiles(apiLogoArray);
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.Location));
  }, [apiLogoArray]);

  return (
    <>
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
      </section>
    </>
  );
}
