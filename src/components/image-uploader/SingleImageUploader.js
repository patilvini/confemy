import PropTypes from "prop-types";
import CameraIcon from "../icons/CameraIcon";
import { useDropzone } from "react-dropzone";

import "./singleImageUploader.styles.scss";

export default function SingleImageUploader({
  dropzoneContentType,
  setFormikFieldValue,
  fieldName,
}) {
  const myDropZone = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const acceptedFilesWithUrl = acceptedFiles.map((file) =>
        Object.assign(file, {
          Location: URL.createObjectURL(file),
        })
      );
      setFormikFieldValue(fieldName, acceptedFilesWithUrl);
    },
  });

  const { getRootProps, getInputProps } = myDropZone;

  const forConfbanner = (
    <div className="singleimage-upload-textbox">
      <CameraIcon className="camera-icon mb-16" />
      <div style={{ textAlign: "center" }}>
        <span>Drag and drop your image here or</span>
        <span>Browse</span>
        <span>to choose a file</span>
      </div>
    </div>
  );
  const forSpeakerImage = <div>forSpeakerImage</div>;

  const forDefault = (
    <div className="default-si-dz-content">
      <CameraIcon className="icon-size mb-8" />
      <p>Drag and drop file(s) or click to Browse</p>
    </div>
  );

  const getDropzoneContent = (type) => {
    switch (type) {
      case "speakerImage":
        return forSpeakerImage;

      case "confbanner":
        return forConfbanner;

      default:
        return forDefault;
    }
  };

  // dropzone size and shape is controlled by its container declared in parent component
  // dropzone content comes from the switch statement above

  return (
    <div {...getRootProps({ className: "singleimage-dropzone" })}>
      <input {...getInputProps()} />
      {getDropzoneContent(dropzoneContentType)}
    </div>
  );
}

SingleImageUploader.propTypes = {
  fieldName: PropTypes.string.isRequired,
  setFormikFieldValue: PropTypes.func.isRequired,
  dropzoneContentType: PropTypes.string,
};
