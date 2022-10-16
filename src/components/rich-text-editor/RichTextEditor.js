import { useEffect, useState } from "react";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import PropTypes from "prop-types";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./richTextEditor.styles.scss";

export default function RichTextEditor(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [rawContent, setrawContent] = useState(null);

  const onEditorStateChange = (state) => {
    const forFormik = convertToRaw(editorState.getCurrentContent());
    props?.setFieldValue(forFormik);
    setEditorState(state);
  };

  useEffect(() => {
    setrawContent(props?.apiData);
    console.log("raw content", rawContent);
  }, []);
  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="wrapper-class"
        editorClassName="editr-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
}

RichTextEditor.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
};
