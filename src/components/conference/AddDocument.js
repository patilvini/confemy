import { useFormik } from "formik";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone-uploader";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { createConferenceAction } from "../../redux/conference/conferenceAction";
import api from "../../utility/api";

export default function AddDocument({ source, active }) {
  // const [files, setFiles] = useState([]);
  // const conferenceId = useSelector(
  //   (state) => state.conference.newConference._id
  // );

  // const onSubmit = async (values, actions) => {
  //   console.log("form on submit", values);

  //   const { documents } = values;

  //   const resourceDocs = {

  //       data: [],

  //     conferenceId: conferenceId,
  //   };

  //   if (documents.length > 0) {
  //     const formDataObj = new FormData();

  //     for (let i = 0; i < documents.length; i++) {
  //       formDataObj.append("file", documents[i]);
  //     }

  //     try {
  //       const imagesResponse = await api.post("fileUploads", formDataObj);
  //       console.log("images upload response", imagesResponse);
  //       if (imagesResponse) {
  //         resourceDocs.data = imagesResponse.data.data;
  //         console.log("formData", documents.length, resourceDocs);
  //         const response = await api.post(
  //           "/conferences/step4/resources?resourceStatus=documents",
  //           {
  //             resourceDocs: {data: resourceDocs.data},
  //             conferenceId
  //           }
  //         );
  //         console.log(response);
  //         if (response) {
  //           actions.resetForm({ values: initialValues });
  //           setFiles([]);
  //           // navigate("/dashboard/my-organizations");
  //         }
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       actions.setFieldError("documents", err.response?.data.message);
  //     }
  //   } else {
  //     console.log("else");

  //     try {
  //       const response = await api.post(
  //         "/conferences/step4/resources?resourceStatus=documents",
  //         {
  //           resourceDocs: {
  //             data: resourceDocs.data,
  //           },
  //           conferenceId: conferenceId,
  //         }
  //       );
  //       console.log(response);
  //       if (response) {
  //         actions.resetForm({ values: initialValues });
  //         setFiles([]);
  //         // navigate("/dashboard/my-organizations");
  //       }
  //     } catch (err) {
  //       if (err) {
  //         actions.setFieldError("documents", err.response?.data.message);
  //       }
  //     }
  //   }
  // };

  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: {
  //     "image/*": [".docx", ".pdf"],
  //   },
  //   maxFiles: 4,
  //   onDrop: (acceptedFiles) => {
  //     formik.setFieldValue("documents", values.documents.concat(acceptedFiles));
  //   },
  // });

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit,
  // });
  // const {
  //   errors,
  //   touched,
  //   values,
  //   isSubmitting,
  //   handleSubmit,
  //   getFieldProps,
  //   handleChange,
  // } = formik;

  // return (
  //   <div>
  //     {active === source && (
  //       <form
  //         className="form-type-1"
  //         autoComplete="off"
  //         onSubmit={handleSubmit}
  //       >
  //         <h1>Add Documents</h1>
  //         <div className="logo-upload-wrap">
  //           <div {...getRootProps({ className: "file-dropzone" })}>
  //             <input {...getInputProps()} />
  //           </div>
  //           <div className="logo-upload-textbox">
  //             <span>Drag and drop your Document here or</span>
  //             <span>Browse</span>
  //             <span>to choose a file</span>
  //           </div>
  //         </div>

  //         <button type="submit" className="button button-primary">
  //           Submit
  //         </button>
  //       </form>
  //     )}
  //   </div>
  // );

  const dispatch = useDispatch();
  const conference = useSelector((state) => state.conference.newConference);
  console.log(conference);
  const conferenceId = useSelector(
    (state) => state.conference.newConference._id
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 300 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  const deleteRec = async (key) => {
 
    try {
      const r = await api.delete(
        "/conferences/"+conferenceId+"/deleteFiles?fileDeleteType=resourceDocuments",
        {data:{
          fileDeleteDetails: {
            Key: key,
          },
        }}
      );

      console.log(r);
      dispatch(createConferenceAction(r.data.data.conference));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (files, allFiles) => {
    console.log(
      "form on submit",
      files.map((f) => f.meta)
    );
    // const reader = new FileReader();

    // reader.readAsDataURL(files[0].file);

    const resourceDocuments = {
      resourceDocuments: {
        data: [],
        conferenceId: "634b88b1b8274401566f2cee",
      },
    };

    console.log(files);

    if (files.length > 0) {
      const formDataObj = new FormData();
      for (let i = 0; i < files.length; i++) {
        formDataObj.append("file", files[i].file);
      }
      try {
        const imagesResponse = await api.post("fileUploads", formDataObj);
        console.log("images upload response", imagesResponse);
        if (imagesResponse) {
          resourceDocuments.resourceDocuments.data = imagesResponse.data.data;
          if(conference?.resourceImages.length > 0){
            for( let i= 0; i < conference?.resourceDocuments.length; i++){
              resourceDocuments.resourceDocuments.data.push(conference?.resourceDocuments[i])
            }
          }

          console.log("formData", files.length, resourceDocuments);
          const response = await api.post(
            "/conferences/step4/resources?resourceStatus=documents",
            {
              resourceDocs: {
                data: resourceDocuments.resourceDocuments.data ,
              },
              conferenceId: conferenceId,
            }
          );

          
          console.log(response);
          if (response) {
            dispatch(createConferenceAction(response.data.data.conference));
            allFiles.forEach((f) => f.remove());
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      {active === source && (
        <div>
          {conference?.resourceDocuments.length > 0 && (
            <div>
              <h1>Added Documents</h1>

              <div className="mb-40 mt-40">
                {conference.resourceDocuments.map((item, index) => {
                  return (
                    <div className="opposite-grid" key={index}>
                      <a href={item.Location}><h3>Document {index + 1}</h3></a>
                      <div style={{alignSelf:"center"}}>
                        <button 
                       
                          className="button button-red ml-40"
                          onClick={() => deleteRec(item.Key)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <h1>Add Documents</h1>

          <div>
            <Dropzone
              inputContent={"Upload Documets"}
              inputWithFilesContent={"Add more"}
              submitButtonContent={"Save"}
              onChangeStatus={handleChangeStatus}
              onSubmit={handleSubmit}
              styles={{ dropzone: { width: "100%" } }}
              accept="text/*"
            />
          </div>
        </div>
      )}
    </div>
  );
}
