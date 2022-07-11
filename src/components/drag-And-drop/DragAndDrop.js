import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./dragAndDrop.styles.scss";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function DragAndDrop(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
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
    <section className="dnd-container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

// import { useCallback, useState } from "react";
// import ShowImage from "./ShowImage";

// import DropBox from "./DropBox";

// export default function DragAndDrop() {
//   const [images, setImages] = useState([]);

//   const onDrop = useCallback((acceptedFiles) => {
//     acceptedFiles.map((file, index) => {
//       const reader = new FileReader();

//       reader.onload = function (e) {
//         setImages((prevState) => [
//           ...prevState,
//           { id: index, src: e.target.result },
//         ]);
//       };

//       reader.readAsDataURL(file);
//       return file;
//     });
//   }, []);

//   console.log("images", images);

//   return (
//     <div>
//       <DropBox onDrop={onDrop} />
//       <ShowImage images={images} />
//     </div>
//   );
// }
