import { useFormik } from "formik";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone-uploader";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { createConferenceAction } from "../../redux/conference/conferenceAction";
import api from "../../utility/api";
// import "react-dropzone-uploader/dist/styles.css";



export default function AddVideo({ source, active }) {

  const dispatch = useDispatch()
  const conference = useSelector((state) => state.conference.newConference);
  console.log(conference)
  const conferenceId = useSelector(
    (state) => state.conference.newConference._id
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 300},
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    
  };
 
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  const deleteRec = async (key) => {
    console.log(key)
    try {
      const r = await api.delete(
        "/conferences/"+conferenceId+"/deleteFiles?fileDeleteType=resourceVideos",
        {data:{
          fileDeleteDetails: {
            Key: key,
          },
        }}
      );

      console.log(r);
      dispatch(createConferenceAction(r.data.data.conference));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (files, allFiles) => {
   
    console.log("form on submit", files.map((f) => f.meta));
    const reader = new FileReader();

    reader.readAsDataURL(files[0].file);

    const resourceVideos = {
          resourceVideos: {
            data: [],
            conferenceId:"634b88b1b8274401566f2cee"
          },
        };

        console.log(files)

      


        if (files.length > 0) {
              const formDataObj = new FormData();
              for (let i=0; i<files.length; i++){
                formDataObj.append("file", files[i].file);
              }
              try {
                const imagesResponse = await api.post("fileUploads", formDataObj);
                console.log("images upload response", imagesResponse);
                if (imagesResponse) {
                  resourceVideos.resourceVideos.data = imagesResponse.data.data;
                  console.log("formData", files.length, resourceVideos);
                  const response = await api.post("/conferences/step4/resources?resourceStatus=videos", {
                    resourceVideos  : {
                        data: resourceVideos.resourceVideos.data
        
                    },
                    conferenceId: conferenceId
                } );
                  console.log(response);
                  if (response) {
                    dispatch(createConferenceAction(response.data.data.conference));
                  allFiles.forEach(f => f.remove());
          
                  }
                }
              } catch (err) {
                console.log(err)
              }
            } 

    
  };

  return (
    <div>
       { (active === source) &&  <div>
{conference?.resourceVideos?.length > 0 && <div> 

  <h1>Added Videos</h1>

  <div>

<div className="mb-40 mt-40" style={{width:"80%"}}>
            {conference.resourceVideos.map((item, index)=>{
              return(
                <div className="opposite-grid" key={index}>
                  <video controls width={"100%"}>
                  <source src={item.Location} type="video/mp4"/>

                  </video>

                  <div style={{alignSelf:"center"}}>
                        <button 
                       
                          className="button button-red ml-40"
                          onClick={() => deleteRec(item.Key)}
                        >
                          Delete
                        </button>
                      </div>

                 
                  
                </div>
              )
            })}
             
                
          </div>
    

  </div>
  
  
  
  </div> }



      <h1>Add Videos</h1>



      <div>
        <Dropzone
        
          inputContent={"Upload videos"}
          inputWithFilesContent={"Add more"}
          submitButtonContent={"Submit"}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          styles={{dropzone:{width:"100%"}}}
          accept="video/*"
          
        />
      </div>
    </div>}
    </div>
 
  );
}
