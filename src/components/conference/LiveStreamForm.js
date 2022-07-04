import { useEffect, useState, useCallback } from "react";
import { useFormik, validateYupSchema } from "formik";
import Dropzone from "react-dropzone";
import TextError from "../formik/TextError";
import * as yup from "yup";

import api from "../../utility/api";
import RichTextEditor from "./RichTextEditor";

const initialValues = {
  link: "",
  instructions: [],
  image: [],
  text: [],
  video: [],
  linkTitle:"",
  link2: "",
  document: [],
};

const validationSchema = yup.object({
  link: yup.string().required("Please enter a URL to your session"),
  instructions: yup.array(),
  image: yup.array().min(1).required("Please enter your cover Image"),
  text: yup.array(),
  video: yup.array(),
  linkTitle: yup.string(),
  link2: yup.string(),
  document: yup.array(),
});

export default function LiveStreamForm(props) {

  const [img, setImg] = useState("")
  const [vid, setVid] = useState("")
  const [file, setFile] = useState("")
    

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

  console.log(values);

  return (
    <div style={props.style}>
      <div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>{props.source}</h2>

          <div>
            <input
              type="text"
              placeholder="enter URL"
              onChange={(e) =>{
                formik.setFieldValue("link", e.target.value)
              }}
            />
          </div>
          <div style={{ paddingTop: "10px" }}>
            <RichTextEditor
              placeholder="Add meeting instructions (optional)"
              onChange={(e) => {
                formik.setFieldValue("instructions", e.blocks)
              }}
            />
            {/* {touched.description && Boolean(errors.description) && (
            <TextError>{errors.description}</TextError>
          )} */}
          </div>

          <div>
            <label>
              <h4>Image</h4>
            </label>
            <Dropzone multiple={false} onDrop={(acceptedFiles) => {
            
              let filetype = acceptedFiles[0].type.split("/")
              

              if(filetype[0] === "image") {
                
                formik.setFieldValue("image", acceptedFiles)
                console.log(formik.values.image[0].name)
                // setImg(formik.values.image[0].path)

              }
              
              
              }}>
              {({ getRootProps, getInputProps }) => (
                <section >
                  
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p  className="drag-box">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                   
                    {/* <h4>{img}</h4> */}
                    
                    
                    
                  </div>
                </section>
              )}
            </Dropzone>
            
          </div>

          <div>
            <label>
                <h4>Text</h4>
                
            </label>

            <RichTextEditor
                onChange={e=>{formik.setFieldValue('text', e.blocks)}}
                />



          </div>
          
          <div>
            <label>
                <h4>Video</h4>
            </label>
            <Dropzone multiple={false} onDrop={(acceptedFiles) => {
              let filetype = acceptedFiles[0].type.split("/")
              // console.log(formik.values.image[0].path)

              if(filetype[0] === "image") {
                // formik.setFieldValue("image", acceptedFiles)
                // setImg(formik.values.image[0].path)

              }
              
              
              }}>
              {({ getRootProps, getInputProps }) => (
                <section >
                  
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p  className="drag-box">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                   
                    <h4>{img}</h4>
                    
                    
                    
                  </div>
                </section>
              )}
            </Dropzone>
            
          </div>

          <div>
            <label>
                <h4>Link</h4>

            </label>
            <input type="text" placeholder="Link Title" onChange={e=>{formik.setFieldValue('linkTitle', e.target.value)}}/>
            <input type="text" placeholder="Paste Link here" onChange={e=>{formik.setFieldValue('link2', e.target.value)}}/>
            <Dropzone multiple={false} onDrop={(acceptedFiles) => {
              let filetype = acceptedFiles[0].type.split("/")
              // console.log(formik.values.image[0].path)

              if(filetype[0] === "image") {
                // formik.setFieldValue("file", acceptedFiles)
                // setFile(formik.values.image[0].path)

              }
              
              
              }}>
              {({ getRootProps, getInputProps }) => (
                <section >
                  
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p  className="drag-box">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                   
                    <h4>{img}</h4>
                    
                    
                    
                  </div>
                </section>
              )}
            </Dropzone>

          
          </div>

          <button onClick={onSubmit} className="button button-primary" type="submit">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
