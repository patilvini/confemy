import Modal from "../modal/Modal";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../utility/api";
import { useDropzone } from "react-dropzone";

const initialValues = {
  docs: [],
};

const validationSchema = yup.object({
  // docs: yup.array().required("Required")
});

export default function UploadModal({ onDismiss, attendee }) {
  const [files, setFiles] = useState([]);

  const onSubmit = async (values, actions) => {
    const { docs } = values;

    const atteendeeDetails = {
      atteendeeDetails: {
        uploadCertificate: true,
        data: [],
      },
    };

    if (docs.length > 0) {
      const formDataObj = new FormData();
      formDataObj.append("file", docs[0]);
      try {
        const imagesResponse = await api.post("fileUploads", formDataObj);
        if (imagesResponse) {
          atteendeeDetails.atteendeeDetails.data = imagesResponse.data.data;
          const response = await api.patch(
            "/attendees/credits/users/" + attendee,
            atteendeeDetails
          );
          if (response) {
            actions.resetForm({ values: initialValues });
            setFiles([]);
            // navigate("/dashboard/my-organizations");
          }
        }
      } catch (err) {
        actions.setFieldError("docs", err.response?.data.message);
      }
    } else {
      try {
        const response = await api.patch(
          "attendees/credits/users/" + attendee,
          atteendeeDetails
        );
        if (response) {
          actions.resetForm({ values: initialValues });
          setFiles([]);
          // navigate("/dashboard/my-organizations");
        }
      } catch (err) {
        if (err) {
          actions.setFieldError("docs", err.response?.data.message);
        }
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".docx", ".pdf"],
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
      formik.setFieldValue("docs", acceptedFiles);
    },
  });

  // const thumbs = files.map((file) => (
  //   <div  key={file.name}>
  //     <div>
  //       <img
  //         src={file.preview}
  //         alt="file"

  //         // Revoke data uri after image is loaded
  //         onLoad={() => {
  //           URL.revokeObjectURL(file.preview);
  //         }}
  //       />
  //     </div>
  //   </div>
  // ));

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Modal onDismiss={onDismiss}>
      <div className="setGoal-modal">
        <h2>Upload Certificate</h2>

        <form
          className="form-type-1"
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <div className="logo-upload-wrap">
            <div {...getRootProps({ className: "logo-dropzone" })}>
              <input {...getInputProps()} />
              {/* <CameraIcon className="camera-icon" /> */}
            </div>
            <div className="logo-upload-textbox">
              <span>Drag and drop your Document here or</span>
              <span>Browse</span>
              <span>to choose a file</span>
            </div>
          </div>
          <button
            type="submit"
            style={{ width: "100%" }}
            className=" form-element button button-primary"
          >
            Upload
          </button>
        </form>
      </div>
    </Modal>
  );
}
