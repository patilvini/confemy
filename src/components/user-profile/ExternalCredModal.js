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
  confName: "",
  startDate: "",
  endDate: "",
  creditType: "",
  totalCredits: "",
  docs: [],
};

const validationSchema = yup.object({
  confName: yup.string().required("Required"),
  startDate: yup.string().required("Required"),
  endDate: yup.string().required("Required"),
  creditType: yup.string().required("Required"),
  totalCredits: yup.string().required("Required"),
  // docs: yup.array().required("Required")
});

export default function ExternalCredModal({ onDismiss }) {
  const [credits, setCredits] = useState();
  const [files, setFiles] = useState([]);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate()
  const userID = useSelector((state) => state.auth.user?._id);
  useEffect(() => {
    const getCredits = async () => {
      try {
        const r = await api.get("/conferences/credits");

        setCredits(r.data.data.credits);
      } catch (err) {
        console.log(err);
      }
    };

    getCredits();

    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const onSubmit = async (values, actions) => {
    // console.log("form values form onSubmit", values);

    const { confName, startDate, endDate, creditType, totalCredits, docs } = values;


    const formData={
      conferenceDetails:{
        creditId:creditType,
        title: confName,
        quantity: totalCredits,
        startDate,
        endDate,
        data:[],
        userId: userID
        
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
          console.log(imagesResponse)
          formData.conferenceDetails.data = imagesResponse.data.data;
          console.log("formData", docs.length, formData);
          const response = await api.post("attendees/credits/externals", formData);
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
        const response = await api.post("attendees/credits/externals", formData);
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

  credits?.forEach((item) => {
    if (options.length !== credits.length) {
      options.push({ value: item._id, label: item.name });
    }
  });

  return (
    <Modal onDismiss={onDismiss}>
      <div className="externalCredit-modal">
        <h2>Add External Credits</h2>
        <p style={{ marginBottom: "2rem" }} className="caption-2-regular-gray3">
          Add CME Credits earned outside confemy
        </p>

        <form
          className="form-type-1"
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <div className=" form-element material-textfield">
            <input
              id="confName"
              type="text"
              name="confName"
              value={formik.values.confName}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Add conference name or CME event*</label>
          </div>

          <div className="flex-container">
            <div
              style={{ marginRight: "4rem" }}
              className=" form-element material-textfield"
            >
              <input
                id="startDate"
                type="date"
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                placeholder=" "
              />
              <label>StartDate*</label>
            </div>
            <div className=" form-element material-textfield">
              <input
                id="endDate"
                type="date"
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                placeholder=" "
              />
              <label>End Date*</label>
            </div>
          </div>

          <Select
            onChange={(e) => {
              console.log(e);
              formik.setFieldValue("creditType", e.value);
            }}
            className=" form-element"
            options={options}
          />

          <div className=" form-element material-textfield">
            <input
              id="totalCredits"
              type="number"
              name="totalCredits"
              value={formik.values.totalCredits}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Total Credits*</label>
          </div>

          <div className="logo-upload-wrap">
            <div {...getRootProps({ className: "button button-secondary" })}>
              Upload your certificate
              <input {...getInputProps()} />
              {/* <CameraIcon className="camera-icon" /> */}
            </div>
            <div className="logo-upload-textbox">
              {/* <span>Drag and drop your Document here or</span>
              <span>Browse</span>
              <span>to choose a file</span> */}
            </div>
          </div>

          {/* <div className=" form-element material-textfield">
            <input
              id="title"
              type="text"
              name="title"
              // value={formik.values.title}
              // onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Upload Credit Certificate*</label>
          </div> */}

          <button
            type="submit"
            style={{ width: "100%" }}
            className=" form-element button button-primary"
          >
            Add Credits
          </button>
        </form>
      </div>
    </Modal>
  );
}
