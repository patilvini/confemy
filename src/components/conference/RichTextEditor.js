import { Editor } from "react-draft-wysiwyg"
import './conferDetails1.scss'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export default function RichTextEditor(props) {
    
    return (

        <div className="editor">
            <div style={{ padding: '2px', minHeight: '400px' }}>
                <Editor
                    placeholder="Course Outline"
                    editorState={props.editorState}
                    onEditorStateChange={props.onEditorStateChange}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onChange={props.onChange}
                />
            </div>

        </div>
    )
}