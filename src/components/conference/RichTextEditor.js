import { useState } from "react";
import { Editor } from "react-draft-wysiwyg"
import { EditorState } from 'draft-js';
import './conferDetails1.scss'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export default function RichTextEditor(props) {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
    
    return (

        <div className="editor">
            <div style={{ padding: '2px', minHeight: '400px', width: "100%"}}>
                <Editor
                    readOnly={props.readOnly}
                    placeholder={props.placeholder}
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onChange={props.onChange}
                />
            </div>

        </div>
    )
}