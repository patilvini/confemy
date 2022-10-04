import { convertFromRaw, Editor, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import api from "../../utility/api";
import "draft-js/dist/Draft.css";

export default function DraftJsText() {

  const [editorState, setEditorState]= useState()


  useEffect(() => {
    const getData = async () => {
      try {
        const r = await api.get("/conferences/draft/62dbd4d0dd1af18951d55415");
        const x = convertFromRaw(r.data.data.descriptions[0]);
        const y = EditorState.createWithContent(x)
        setEditorState(y)

 
        
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);



  return(

    <>
      {editorState && <Editor readOnly editorState={editorState} />}
  
  
  </>
  )
  
}


