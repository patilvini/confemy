import { useEffect, useState, useCallback } from "react";
import { useFormik, validateYupSchema } from "formik";
import Dropzone from "react-dropzone";
import TextError from "../formik/TextError";
import * as yup from "yup";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import api from "../../utility/api";
// import RichTextEditor from "./RichTextEditor";
import { thumb, thumbInner, img } from "./conferenceDragdropUtils";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const initialValues = {
  link: "",
  instructions: {},
  // image: [],
  // text: [],
  // video: [],
  // linkTitle: "",
  // link2: "",
  // document: [],
};

const validationSchema = yup.object({
  link: yup.string().required("Please enter a URL to your session"),
  instructions: yup.object(),
  // image: yup.array().min(1).required("Please enter your cover Image"),
  // text: yup.array(),
  // video: yup.array(),
  // linkTitle: yup.string(),
  // link2: yup.string(),
  // document: yup.array(),
});

export default function LiveStreamForm({source, active}) {

  // console.log(active)
  // const [image, setImg] = useState([]);
  // const [vid, setVid] = useState([]);
  // const [fileD, setFile] = useState([]);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  
  const onSubmit = (values, actions) => {
    console.log("form on submit", values);

    const platformDetails = {
      conferenceId: "634b88b1b8274401566f2cee",
      meetingUrl:  values.link,
      instructions: values.instructions,
      platformName: source

    }

    console.log(platformDetails)
  };

  const onEditorStateChange = (state) => {
    const forFormik = convertToRaw(editorState.getCurrentContent());
    formik.setFieldValue("instructions", forFormik);
    setEditorState(state);
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

  // const imgThumb = image.map((file) => (
  //   <div style={thumb} key={file.name}>
  //     <div style={thumbInner}>
  //       <img
  //         src={file.preview}
  //         alt="logo"
  //         style={img}
  //         // Revoke data uri after image is loaded
  //         onLoad={() => {
  //           URL.revokeObjectURL(file.preview);
  //         }}
  //       />
  //     </div>
  //   </div>
  // ));

  // const vidThumb = vid.map((file) => (
  //   <div key={file.name}>
  //     <div>
  //       <video width="500" height="300" controls>
  //         <source src={file.preview} />
  //         Your browser does not support the video tag.
  //       </video>
  //     </div>
  //     <button
  //       onClick={() => {
  //         setVid([]);
  //       }}
  //     >
  //       Remove
  //     </button>
  //   </div>
  // ));

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

  // console.log(values);

  return (
    <div>
      {active === source && <div>
      <div className="conf-form-wrap">
        <form className="form-type-1" autoComplete="off" onSubmit={handleSubmit}>
          <h2>{source}</h2>

          <div>
          <div className="material-textfield">
              <input
                id="link"
                type="text"
                name="link"
                value={formik.values.link} 
                onChange={formik.handleChange}
                placeholder=" "
              />
              <label>Add your {source} link here*</label>
            </div>
            {touched.link && Boolean(errors.link) && (
            <TextError>{errors.link}</TextError>
          )}
          </div>
          <div style={{ marginTop: "2rem" }}>
          <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName="wrapper-class"
              editorClassName="editr-class"
              toolbarClassName="toolbar-class"
              placeholder="Add any instruction you have for the attendees"
            />
            {touched.instructions && Boolean(errors.instructions) && (
            <TextError>{errors.instructions}</TextError>
          )}
          </div>

          

          

          

          

          <button
          style={{margin:"5rem 0"}}
            onClick={handleSubmit}
            className="button button-primary"
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
    </div>}

    </div>
    
  );
}
