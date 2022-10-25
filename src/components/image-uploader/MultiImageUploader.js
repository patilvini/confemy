import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "../icons/DeleteIcon";
import CameraIcon from "../icons/CameraIcon";
import "./multiImageUploader.styles.scss";

const img = {
  objectFit: "contain",
  width: "100%",
  height: "100%",
};

export default function MultiImageUploader({
  setFormikImagesFieldValue,
  removeFormikImage,
  apiImages,
}) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles((prevState) => {
        const imagesForPreview = acceptedFiles.map((file) =>
          Object.assign(file, {
            Location: URL.createObjectURL(file),
          })
        );
        return [...prevState, ...imagesForPreview];
      });
      // formik.setFieldValue("logos", acceptedFiles);
      setFormikImagesFieldValue(acceptedFiles);
    },
  });

  useEffect(() => {
    setFiles(apiImages);
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.Location));
  }, [apiImages]);

  return (
    <section className="mb-72">
      {/* Image preview container */}
      <aside className="multiimage-container mb-48">
        {files.map((file) => (
          <div key={file.name || file.Location} className="multiimage-row">
            <div className="multiimage-wrap">
              <img
                src={file.Location}
                style={img}
                // Revoke data uri after image is loaded
                onLoad={() => {
                  URL.revokeObjectURL(file.Location);
                }}
              />
            </div>
            <div className="multiimage-delete-button">
              <i
                onClick={() => {
                  setFiles((prevState) => prevState.filter((e) => e !== file));
                  removeFormikImage(file);
                }}
              >
                <DeleteIcon className="icon-size" />
              </i>
            </div>
          </div>
        ))}
      </aside>
      {/* dropzone */}
      <div {...getRootProps({ className: "details2-image-dropzone" })}>
        <input {...getInputProps()} />
        <div className="details2-camera-wrap mb-12">
          <CameraIcon className="details2-camera-icon" />
        </div>
        <div className="caption-1-regular-gray3">
          Drag and drop venue images
          <br />
          or click to browse and select.
        </div>
      </div>
    </section>
  );
}
