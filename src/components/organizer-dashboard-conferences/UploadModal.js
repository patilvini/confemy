import Modal from "../modal/Modal";
import { useFormik } from "formik";
import Select from "react-select";
import * as yup from "yup";
import { useEffect, useState } from "react";
import api from "../../utility/api";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const initialValues = {
  
  docs: [],
};

const validationSchema = yup.object({
 
  // docs: yup.array().required("Required")
});

export default function UploadModal({ onDismiss , attendee}) {
    
  const [files, setFiles] = useState([]);
  const userID = useSelector((state) => state.auth.user?._id);
  
  const navigate = useNavigate()

 

  const onSubmit = async (values, actions) => {
    // console.log("form values form onSubmit", values);

    const { docs } = values;


    const formData={
      atteedeeDetails:{
        uploadCertificate:true,       
        docs
      }
    }
    console.log(formData)

    if (docs.length > 0) {
      const formDataObj = new FormData();
      formDataObj.append("file", docs[0]);
      try {
        const imagesResponse = await api.post("fileUploads", formDataObj);
        console.log("images upload response", imagesResponse);
        if (imagesResponse) {
         
          formData.atteedeeDetails.data = imagesResponse.data.data;
          console.log("formData", docs.length, formData);
          const response = await api.patch("attendees/credits/users/6318cd9c106aaa5e009f7c80", formData);
          console.log(response)
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
        const response = await api.patch("attendees/credits/users/"+attendee, formData);
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
