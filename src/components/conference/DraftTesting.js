import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "./conferDetails1.scss";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import api from "../../utility/api";

export default function DraftTesting() {
  const [text, setText] = useState([]);
  const [data, setData] = useState([]);

  useEffect(()=>{
    api.get('/conferences/draft/62ad9c0c087a452f7bad9437')
    .then((r)=>{
        console.log(r);
    }).catch((err)=>{
        console.log(err);
    })

  },[])

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  

  const submit = async ()=> {

    let contents = text
    try{
       const res = await api.post('/conferences/draft', {contents})
       console.log(res)
    } catch (err){
        console.log(err)
    }

  }

  return (
    <>
      <div className="editor">
        <div style={{ padding: "2px", minHeight: "400px", width: "100%" }}>
          <Editor
            // readOnly={readOn}
            // placeholder={placeholder}
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onChange={(e) => setText(e.blocks)}
          />
        </div>
      </div>
      <button onClick={submit} className="button button-green">Submit</button>


      <div>
        
      </div>
    </>
  );
}
