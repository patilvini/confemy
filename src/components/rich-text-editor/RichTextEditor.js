import { useState } from "react";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import PropTypes from "prop-types";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./richTextEditor.styles.scss";

export default function RichTextEditor({ setFieldValue }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (state) => {
    const forFormik = convertToRaw(editorState.getCurrentContent());
    setFieldValue(forFormik);
    setEditorState(state);
  };
  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
}

RichTextEditor.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
};
