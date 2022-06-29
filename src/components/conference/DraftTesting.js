import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import {convertFromRaw, convertToRaw, EditorState, Editor as Edit, convertFromHTML } from "draft-js";
import DOMPurify from "dompurify";

import "./conferDetails1.scss";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import api from "../../utility/api";

export default function DraftTesting() {
  const [text, setText] = useState([]);
  const [data, setData] = useState([]);
  const [content, setContent] = useState("")
  const  [convertedContent, setConvertedContent] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(()=>{
    api.get('/conferences/draft/62bc4df09ba8326f28fe64ce')
    .then((r)=>{
      console.log(r.data.data)
        setContent(r.data.data)
        let x = convertFromRaw( r.data.data.descriptions[0] )
       console.log(x)
       setData(convertToHTML(x))
        
    }).catch((err)=>{
        console.log(err);
    })

  },[])

  

  const handleEditorChange = (state) => {
    setEditorState(state);

    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML({
      styleToHTML: (style) => {
        if (style === 'BOLD') {
          return <span style={{color: 'blue'}} />;
        }
      },
      blockToHTML: (block) => {
        if (block.type === 'PARAGRAPH') {
          return <p />;
        }
      },
      entityToHTML: (entity, originalText) => {
        if (entity.type === 'LINK') {
          return <a href={entity.data.url}>{originalText}</a>;
        }
        else if (entity.type === "IMAGE")
        return originalText;
      }
    })(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    // console.log(typeof convertedContent)
  }

  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }



  

  const submit = async ()=> {

    console.log(text)
    let contents = text
  
    console.log(convertedContent)
    
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
            // readOnly={true}
            // placeholder={placeholder}
            editorState={editorState}
            onEditorStateChange = {(editorState) => {
              handleEditorChange(editorState)
              const contentState = editorState.getCurrentContent()
              setText(convertToRaw(contentState))
              console.log('content State', convertToRaw(contentState))
      
              setEditorState(editorState)
              


            }}
           
            
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            // onChange={(e) => {
              
            //   setText(editorState.getCurrentContent())
            //   let currentC = setText(convertToRaw(text))
              
           
            // }}
          />
        </div>
      </div>
      <button onClick={submit} className="button button-green">Submit</button>


      <div dangerouslySetInnerHTML={createMarkup(data)}></div>

{/* 
      <Edit
         
            // editorState={editorState}
            onChange = {(e)=>console.log(e)}
            readOnly={true}
            
           
         
         
          /> */}
        



        
      
    </>
  );
}
