import { convertFromRaw, Editor,  EditorState } from "draft-js"
import { useEffect, useState } from "react"
import api from "../../utility/api"
import 'draft-js/dist/Draft.css';


export default function DraftJsText(){
    

    const [state, setState] = useState()

    useEffect(()=>{
        api.get('/conferences/draft/62dbd4d0dd1af18951d55415')
        .then((r)=>{
          console.log(r.data.data.descriptions)
          const x = convertFromRaw(r.data.data.descriptions[0])
          setState(x)

          
         
                      
            
        }).catch((err)=>{
            console.log(err);
        })
    
      },[])

      const editorState =  EditorState.createWithContent(state)


    return(
        <Editor readOnly editorState={editorState} />
        
    )
}