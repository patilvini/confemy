import PropTypes from "prop-types";
import CameraIcon from "../icons/CameraIcon";
import { useDropzone } from "react-dropzone";

import "./singleImageUploader.styles.scss";

export default function MultiImageUploader({
  dropzoneContentType,
  setFormikImagefieldValue,
  maxFiles,
  // fieldName,
}) {
  const myDropZone = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: { maxFiles },
    onDrop: (acceptedFiles) => {
      const acceptedFilesWithUrl = acceptedFiles.map((file) =>
        Object.assign(file, {
          Location: URL.createObjectURL(file),
        })
      );
      setFormikImagefieldValue(acceptedFilesWithUrl);
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

MultiImageUploader.propTypes = {
  // fieldName: PropTypes.string.isRequired,
  setFormikImagefieldValue: PropTypes.func.isRequired,
  dropzoneContentType: PropTypes.string,
  maxFiles: PropTypes.number.isRequired,
};

// import React, { useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import DeleteIcon from "../icons/DeleteIcon";
// import CameraIcon from "../icons/CameraIcon";
// import "./multiImageUploader.styles.scss";

// const img = {
//   objectFit: "contain",
//   width: "100%",
//   height: "100%",
// };

// export default function MultiImageUploader({
//   setFormikImagesFieldValue,
//   removeFormikImage,
//   apiImages,
//   setFormikFieldValue,
// }) {
//   const [files, setFiles] = useState([]);
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       "image/*": [],
//     },
//     onDrop: (acceptedFiles) => {
//       setFiles((prevState) => {
//         const imagesForPreview = acceptedFiles.map((file) =>
//           Object.assign(file, {
//             Location: URL.createObjectURL(file),
//           })
//         );
//         return [...prevState, ...imagesForPreview];
//       });
//       // formik.setFieldValue("logos", acceptedFiles);
//       setFormikImagesFieldValue(acceptedFiles);
//     },
//   });

//   useEffect(() => {
//     setFiles(apiImages);
//     // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
//     return () => files.forEach((file) => URL.revokeObjectURL(file.Location));
//   }, [apiImages]);

//   return (
//     <section className="mb-72">
//       {/* Image preview container */}
//       <aside className="multiimage-container mb-48">
//         {files?.map((file) => (
//           <div key={file.name || file.Location} className="multiimage-row">
//             <div className="multiimage-wrap">
//               <img
//                 src={file.Location}
//                 style={img}
//                 // Revoke data uri after image is loaded
//                 onLoad={() => {
//                   URL.revokeObjectURL(file.Location);
//                 }}
//               />
//             </div>
//             <div className="multiimage-delete-button">
//               <i
//                 onClick={() => {
//                   setFiles((prevState) => prevState.filter((e) => e !== file));
//                   removeFormikImage(file);
//                 }}
//               >
//                 <DeleteIcon className="icon-size" />
//               </i>
//             </div>
//           </div>
//         ))}
//       </aside>
//       {/* dropzone */}
//       <div {...getRootProps({ className: "details2-image-dropzone" })}>
//         <input {...getInputProps()} />
//         <div className="details2-camera-wrap mb-12">
//           <CameraIcon className="details2-camera-icon" />
//         </div>
//         <div className="caption-1-regular-gray3">
//           Drag and drop venue images
//           <br />
//           or click to browse and select.
//         </div>
//       </div>
//     </section>
//   );
// }
