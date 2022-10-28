import { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import PropTypes from "prop-types";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./textEditor.styles.scss";

export default function TextEditor(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // to capture changes in texteditor
  const onEditorStateChange = (state) => {
    const fieldValue = convertToRaw(editorState.getCurrentContent());
    // props.formik.setFieldValue(props.fieldValue, fieldValue);
    props.setFormikFieldValue(props.fieldName, fieldValue);
    setEditorState(state);
  };

  useEffect(() => {
    let blocks;
    if (props.apiRawContent && Object.keys(props.apiRawContent).length > 0) {
      // console.log("refund Description", newConference.refundDescription);
      blocks = convertFromRaw(props.apiRawContent);
      // setEditorState(EditorState.createWithContent(blocks));
      setEditorState(
        EditorState.push(editorState, blocks, "update-contentState")
      );
    }
    if(!props.apiRawContent){
      setEditorState(EditorState.createEmpty())

    }
    
  }, [props.apiRawContent]);

  
  

  return (
    <>
      <Editor
      
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        // wrapperClassName="wrapper-class"
        editorClassName="editr-class"
        toolbarClassName="toolbar-class"
      />
    </>
  );
}

TextEditor.propTypes = {
  setFormikFieldValue: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  apiRawContent: PropTypes.object,
};
