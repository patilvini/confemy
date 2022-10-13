import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import draftToMarkdown from "draftjs-to-markdown";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editorContainer.scss";

import api from "../../utility/api";

const EditorContainer = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [htmlContent, sethtmlContent] = useState(null);
  const [rawContent, setrawContent] = useState(null);
  const [draftId, setdraftId] = useState("");

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    sethtmlContent(convertToHTML(editorState.getCurrentContent()));
    // sethtmlContent(convertToHTML(rawContent));
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const onSave = async () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());

    const formData = {
      contents: rawContent,
    };

    console.log("formData from onSave", formData);
    try {
      const res = await api.post("conferences/draft", formData);
      if (res) {
        console.log(" response on save", res);
        setdraftId(res.data.data._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getRawContent = async (id) => {
    const url = `conferences/draft/${id}`;
    try {
      const res = await api.get(url);
      if (res) {
        console.log("raw data from get API", res);
        setrawContent(res.data.data.contents);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRawContent(draftId);
  }, [draftId]);

  return (
    <div>
      <header className="editor-header">Rich Text Editor Example</header>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(htmlContent)}
      ></div>

      <button onClick={onSave} className="button button-primary mb-20">
        Save
      </button>

      <div>
        <textarea disabled value={draftToHtml(rawContent)} />
      </div>

      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(draftToHtml(rawContent))}
      ></div>

      <textarea
        disabled
        value={
          editorState &&
          draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
        }
      />
    </div>
  );
};
export default EditorContainer;
