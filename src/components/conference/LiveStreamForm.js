import { useEffect, useState, useCallback } from "react";
import { useFormik, validateYupSchema } from "formik";
import { useDropzone } from "react-dropzone";
import TextError from "../formik/TextError";
import * as yup from "yup";

import api from "../../utility/api";
import RichTextEditor from "./RichTextEditor";

const initialValues = {
  confUrl: "",
  instructions: [],
  coverImage: [],
  text: [],
  video: [],
  file: [],
};

const validationSchema = yup.object({
  confUrl: yup.string().required("Please enter a URL to your session"),
  instructions: yup.array(),
  coverImage: yup.array().min(1).required("Please enter your cover Image"),
  text: yup.array(),
  video: yup.array(),
  file: yup.array(),
});

export default function LiveStreamForm() {
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
        let type = acceptedFiles[0].type.split('/')[0]
        console.log(type)
        if(type === "image"){
            formik.setFieldValue('coverImage', acceptedFiles)
        }
        else if(type === "video"){
            formik.setFieldValue('video', acceptedFiles)
        } else {
            formik.setFieldValue('file', acceptedFiles)
        }

     
      }, []);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  const onSubmit = (values, actions) => {
    console.log("form on submit", values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    handleChange,
  } = formik;

//   console.log(values);

  return (
    <>
      <div className="conf-form-wrap">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Google Meet</h2>

          <div>
            <input
              type="text"
              placeholder="enter URL"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
          <div style={{ paddingTop: "10px" }}>
            <RichTextEditor
              placeholder="Add meeting instructions (optional)"
              onChange={(e) => console.log(e.blocks)}
            />
            {/* {touched.description && Boolean(errors.description) && (
            <TextError>{errors.description}</TextError>
          )} */}
          </div>

          <div>
            <label>
              <h4>Image</h4>
            </label>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="drag-box">
                {isDragActive ? (
                  <p className="dragbox-text">Drop the files here ...</p>
                ) : (
                  <p className="dragbox-text">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                )}
              </div>
            </div>
            
          </div>

          <div>
            <label>
                <h4>Text</h4>
                
            </label>

            <RichTextEditor
                onChange={e=>console.log(e.blocks)}
                />



          </div>
          
          <div>
            <label>
                <h4>Video</h4>
            </label>
          <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="drag-box">
                {isDragActive ? (
                  <p className="dragbox-text">Drop the files here ...</p>
                ) : (
                  <p className="dragbox-text">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                )}
              </div>
            </div>
            
          </div>

          <div>
            <label>
                <h4>Link</h4>

            </label>
            <input type="text" placeholder="Link Title" onChange={e=>console.log(e.target.value)}/>
            <input type="text" placeholder="Paste Link here" onChange={e=>console.log(e.target.value)}/>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="drag-box">
                {isDragActive ? (
                  <p className="dragbox-text">Drop the files here ...</p>
                ) : (
                  <p className="dragbox-text">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                )}
              </div>
            </div>

          
          </div>
        </form>
      </div>
    </>
  );
}
