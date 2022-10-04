import { useEffect, useState, useCallback } from "react";
import { useFormik, validateYupSchema } from "formik";
import Dropzone from "react-dropzone";
import TextError from "../formik/TextError";
import * as yup from "yup";

import api from "../../utility/api";
import RichTextEditor from "./RichTextEditor";
import { thumb, thumbInner, img } from "./conferenceDragdropUtils";

const initialValues = {
  link: "",
  instructions: [],
  image: [],
  text: [],
  video: [],
  linkTitle: "",
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
  const [image, setImg] = useState([]);
  const [vid, setVid] = useState([]);
  const [fileD, setFile] = useState([]);

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

  const imgThumb = image.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          alt="logo"
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const vidThumb = vid.map((file) => (
    <div key={file.name}>
      <div>
        <video width="500" height="300" controls>
          <source src={file.preview} />
          Your browser does not support the video tag.
        </video>
      </div>
      <button
        onClick={() => {
          setVid([]);
        }}
      >
        Remove
      </button>
    </div>
  ));

  // const fileThumb = fileD.map((file) => (
  //   <div key={file.name}>
  //     <div>
  //       <object
  //         src={file.preview}
  //         width="800"
  //         height="500"
  //         aria-label="file-preview"
  //       />
  //     </div>
  //   </div>
  // ));

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
              onChange={(e) => {
                formik.setFieldValue("link", e.target.value);
              }}
            />
          </div>
          <div style={{ paddingTop: "10px" }}>
            <RichTextEditor
              placeholder="Add meeting instructions (optional)"
              onChange={(e) => {
                formik.setFieldValue("instructions", e.blocks);
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
            <Dropzone
              multiple={false}
              onDrop={(acceptedFiles) => {
                let filetype = acceptedFiles[0].type.split("/");

                if (filetype[0] === "image") {
                  setImg(
                    acceptedFiles.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      })
                    )
                  );

                  formik.setFieldValue("image", acceptedFiles);
                }
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div className="logo-upload-wrap">
                    <div {...getRootProps({ className: "logo-dropzone" })}>
                      <input {...getInputProps()} />

                      {imgThumb}
                    </div>
                    <div className="logo-upload-textbox">
                      <span>Drag and drop your Photo here or</span>
                      <span>Browse</span>
                      <span>to choose a file</span>
                    </div>
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
              onChange={(e) => {
                formik.setFieldValue("text", e.blocks);
              }}
            />
          </div>

          <div>
            <label>
              <h4>Video</h4>
            </label>
            <Dropzone
              multiple={false}
              onDrop={(acceptedFiles) => {
                let filetype = acceptedFiles[0].type.split("/");

                if (filetype[0] === "video") {
                  setVid(
                    acceptedFiles.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      })
                    )
                  );

                  formik.setFieldValue("video", acceptedFiles);
                }
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div>
                    <div {...getRootProps({ className: "drag-box" })}>
                      <input {...getInputProps()} />
                      <span>Drag and drop your Video here or</span>
                      <span>Browse</span>
                      <span>to choose a file</span>
                    </div>
                  </div>
                  {vidThumb}
                </section>
              )}
            </Dropzone>
          </div>

          <div>
            <label>
              <h4>Link</h4>
            </label>
            <input
              type="text"
              placeholder="Link Title"
              onChange={(e) => {
                formik.setFieldValue("linkTitle", e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Paste Link here"
              onChange={(e) => {
                formik.setFieldValue("link2", e.target.value);
              }}
            />
            <Dropzone
              multiple={false}
              onDrop={(acceptedFiles) => {
                let filetype = acceptedFiles[0].type.split("/");

                if (filetype[0] === "application") {
                  setFile(
                    acceptedFiles.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file),
                      })
                    )
                  );

                  formik.setFieldValue("file", acceptedFiles);
                }
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div>
                    <div {...getRootProps({ className: "drag-box" })}>
                      <input {...getInputProps()} />
                      <span>Drag and drop your Video here or</span>
                      <span> Browse</span>
                      <span> to choose a file</span>
                    </div>
                  </div>
                  {/* {fileThumb} */}
                </section>
              )}
            </Dropzone>
          </div>

          <button
            onClick={onSubmit}
            className="button button-primary"
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
