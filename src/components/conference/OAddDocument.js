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
import DeleteIcon from "../icons/DeleteIcon";

export default function AddDocument({ source, active }) {
  const dispatch = useDispatch();
  const conference = useSelector((state) => state.conference.newConference);
  // console.log(conference);
  const conferenceId = useSelector(
    (state) => state.conference.newConference._id
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 300 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    // console.log(status, meta, file);
  };

  const deleteRec = async (key) => {
    try {
      const r = await api.delete(
        "/conferences/" +
          conferenceId +
          "/deleteFiles?fileDeleteType=resourceDocuments",
        {
          data: {
            fileDeleteDetails: {
              Key: key,
            },
          },
        }
      );

      console.log(r);
      dispatch(createConferenceAction(r.data.data.conference));
      dispatch(alertAction("Document deleted successfully", "success"));
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
      
    }
  };

  const handleSubmit = async (files, allFiles) => {
    // console.log(
    //   "form on submit",
    //   files.map((f) => f.meta)
    // );
    // const reader = new FileReader();

    // reader.readAsDataURL(files[0].file);

    const resourceDocuments = {
      resourceDocuments: {
        data: [],
        conferenceId: "634b88b1b8274401566f2cee",
      },
    };

    if (files.length > 0) {
      const formDataObj = new FormData();
      for (let i = 0; i < files.length; i++) {
        formDataObj.append("file", files[i].file);
      }
      try {
        const imagesResponse = await api.post("fileUploads", formDataObj);
        // console.log("images upload response", imagesResponse);
        if (imagesResponse) {
          resourceDocuments.resourceDocuments.data = imagesResponse.data.data;
          if (conference?.resourceDocuments?.length > 0) {
            for (let i = 0; i < conference?.resourceDocuments?.length; i++) {
              resourceDocuments.resourceDocuments.data.push(
                conference?.resourceDocuments[i]
              );
            }
          }

          // console.log("formData", files.length, resourceDocuments);
          const response = await api.post(
            "/conferences/step4/resources?resourceStatus=documents",
            {
              resourceDocs: {
                data: resourceDocuments.resourceDocuments.data,
              },
              conferenceId: conferenceId,
            }
          );

          // console.log(response);
          if (response) {
            dispatch(createConferenceAction(response.data.data.conference));
            dispatch(alertAction("Documents saved", "success"));
            allFiles.forEach((f) => f.remove());
          }
        }
      } catch (err) {
        console.log(err)
        // dispatch(alertAction(err.response.message, "danger"));
      }
    }
  };

  return (
    <div>
      {active === source && (
        <div>
          {conference?.resourceDocuments?.length > 0 && (
            <div>
              <h1>Added Documents</h1>

              <div className="mb-40 mt-40">
                {conference?.resourceDocuments?.map((item, index) => {
                  return (
                    <div className="opposite-grid" key={index}>
                      <a href={item.Location}>
                        <h3>Document {index + 1}</h3>
                      </a>
                      <div style={{ alignSelf: "center" }}>
                        <button
                          className="delete-button-icon"
                          onClick={() => deleteRec(item.Key)}
                        >
                          <DeleteIcon/>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <h1>Add Documents</h1>

          <div>
            <Dropzone
              inputContent={"Upload Documets"}
              inputWithFilesContent={"Add more"}
              submitButtonContent={"Save"}
              onChangeStatus={handleChangeStatus}
              onSubmit={handleSubmit}
              styles={{ dropzone: { width: "100%" } }}
              accept="text/*"
            />
          </div>
        </div>
      )}
    </div>
  );
}
