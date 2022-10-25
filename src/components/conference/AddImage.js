import { useFormik } from "formik";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone-uploader";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { alertAction } from "../../redux/alert/alertAction";
import { createConferenceAction } from "../../redux/conference/conferenceAction";
import api from "../../utility/api";
// import "react-dropzone-uploader/dist/styles.css";

export default function AddImage({ source, active }) {
  const dispatch = useDispatch();
  const conference = useSelector((state) => state.conference.newConference);
  // console.log(conference);
  const conferenceId = useSelector(
    (state) => state.conference.newConference._id
  );
  

  // console.log(conference?.resourceImages)

  const deleteRec = async (key) => {
    console.log(key)
    try {
      const r = await api.delete(
        "/conferences/"+conferenceId+"/deleteFiles?fileDeleteType=resourceImages",
        {data:{
          fileDeleteDetails: {
            Key: key,
          },
        }}
      );

      // console.log(r);
      dispatch(createConferenceAction(r.data.data.conference));
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"))
    }
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    // console.log(status, meta, file);
  };

  const handleSubmit = async (files, allFiles) => {
  
    // console.log(
    //   "form on submit",
    //   files.map((f) => f.meta)
    // );
    // const reader = new FileReader();

    // reader.readAsDataURL(files[0].file);

    const resourceImages = {
      resourceImages: {
        data: [],
        conferenceId: "634b88b1b8274401566f2cee",
      },
    };

    // console.log(files);

    if (files.length > 0) {
      const formDataObj = new FormData();
      for (let i = 0; i < files.length; i++) {
        formDataObj.append("file", files[i].file);
      }
      try {
        const imagesResponse = await api.post("fileUploads", formDataObj);
        console.log("images upload response", imagesResponse);
        if (imagesResponse) {
          resourceImages.resourceImages.data = imagesResponse.data.data;
          if(conference?.resourceImages.length > 0){
            for( let i= 0; i < conference?.resourceImages.length; i++){
              resourceImages.resourceImages.data.push(conference?.resourceImages[i])
            }
          }
          // console.log("formData", files.length, resourceImages);
          const response = await api.post(
            "/conferences/step4/resources?resourceStatus=images",
            {
              resourceImages: {
                data: resourceImages.resourceImages.data,
              },
              conferenceId: conferenceId,
            }
          );
          // console.log(response);
          if (response) {
            dispatch(createConferenceAction(response.data.data.conference));
            allFiles.forEach((f) => f.remove());
          }
        }
      } catch (err) {
        dispatch(alertAction(err.response.data.message, "danger"))
      }
    }
  };

  return (
    <div>
      {active === source && (
        <div>
          {conference?.resourceImages?.length > 0 && (
            <div>
              <h1>Added Images</h1>
              <div className="mb-40 mt-40" style={{ width: "60rem" }}>
                {conference.resourceImages.map((item, index) => {
                  // console.log(item)
                  return (
                    <div className="opposite-grid" key={index}>
                      <img
                        width="100%"
                        src={item.Location}
                        alt={"carousel-images"}
                      />

                      <div style={{alignSelf:"center"}}>
                        <button 
                       
                          className="button button-red ml-40"
                          onClick={() => deleteRec(item.Key)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <h1>Add Images</h1>

          <div>
            <Dropzone
              inputContent={"Upload images"}
              inputWithFilesContent={"Add more"}
              submitButtonContent={"Submit"}
              onChangeStatus={handleChangeStatus}
              onSubmit={handleSubmit}
              styles={{ dropzone: { width: "100%" } }}
              accept="image/*"
            />
          </div>
        </div>
      )}
    </div>
  );
}
