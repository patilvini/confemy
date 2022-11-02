import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddVideoIcon from "../icons/AddVideoIcon";
import CloseIcon from "../icons/CloseIcon";
import { useDropzone } from "react-dropzone";
import {
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle,
} from "./fileUplaoderStyles";

import { createConferenceAction } from "../../redux/conference/conferenceAction";
import { alertAction } from "../../redux/alert/alertAction";

import api from "../../utility/api";
import "./fileUploader.styles.scss";
import DeleteIcon from "../icons/DeleteIcon";

export default function AddVideoResource() {
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const newConference = useSelector((state) => state.conference.newConference);

  const myDropZone = useDropzone({
    accept: {
      "video/*": [".mp4", ".wmv"],
    },
    maxFiles: 2,
    onDrop: (acceptedFiles) => {
      const acceptedFilesWithUrl = acceptedFiles.map((file) =>
        Object.assign(file, {
          Location: URL.createObjectURL(file),
        })
      );
      setFiles((prev) => [...prev, ...acceptedFilesWithUrl]);
    },
  });

  const { isFocused, isDragAccept, isDragReject, getRootProps, getInputProps } =
    myDropZone;

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newConference?.completedStep1) {
      dispatch(alertAction("Complete step-1 first", "danger"));
      return;
    }
    if (files.length < 1) {
      dispatch(
        alertAction("Drag and drop videos or browse and upload", "danger")
      );
      return;
    }

    const formData = {
      resourceVideos: {
        data: [],
      },
      conferenceId: newConference._id,
    };

    //  Submit  images to AWS
    if (files?.length > 0) {
      const imageDataObj = new FormData();
      files.map((file) => imageDataObj.append("file", file));

      if (imageDataObj.has("file")) {
        try {
          const imagesResponse = await api.post("fileUploads", imageDataObj);
          if (imagesResponse) {
            formData.resourceVideos.data = [
              ...newConference?.resourceVideos,
              ...imagesResponse.data.data,
            ];
          }
        } catch (err) {
          dispatch(alertAction("Image(s) failed to save", "danger"));
          return;
        }
      }

      console.log("formData", formData);

      try {
        const url = "/conferences/step4/resources?resourceStatus=videos";
        const response = await api.post(url, formData);
        if (response) {
          console.log("Videoupload response", response);
          setFiles([]);
          dispatch(createConferenceAction(response?.data?.data?.conference));
          dispatch(alertAction(response.data.message, "success"));
        }
      } catch (err) {
        dispatch(alertAction(err.response.data.message, "danger"));
      }
    }
  };

  const deleteResource = async (key) => {
    const url = `/conferences/${newConference._id}/deleteFiles?fileDeleteType=resourceVideos`;
    const formData = {
      data: {
        fileDeleteDetails: {
          Key: key,
        },
      },
    };
    try {
      const response = await api.delete(url, formData);
      console.log("deleted files", response);
      dispatch(createConferenceAction(response.data.data.conference));
      dispatch(alertAction("Document deleted successfully", "success"));
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <h2 className="mb-32">Saved videos</h2>
      <div
        className={
          newConference?.resourceVideos?.length > 0
            ? "display-none"
            : "body-bold flex-hc"
        }
      >
        No saved videos
      </div>
      <div className="resource-media-display-wrap mb-72">
        <ul>
          {newConference?.resourceVideos?.length > 0 &&
            newConference?.resourceVideos.map((file) => (
              <li key={file._id} className=" mx-24">
                <div>
                  <video controls width={600}>
                    <source src={file.Location} type="video/mp4" />
                  </video>
                </div>
                <i onClick={() => deleteResource(file.Key)}>
                  <DeleteIcon className="icon-size" />
                </i>
              </li>
            ))}
        </ul>
      </div>
      <h2 className="mb-32">Upload new videos</h2>
      <form onSubmit={handleSubmit}>
        <div className="filesdz-section-wrap mb-24">
          <div className="filesdz-section-innerwrap">
            <div className="filesdz-files-container">
              {files?.map((file) => (
                <div className="filesdz-files-row" key={file.name}>
                  <div>
                    <video controls width={300}>
                      <source src={file.Location} type="video/mp4" />
                    </video>
                  </div>
                  <i
                    onClick={() => {
                      const remainingFiles = files.filter(
                        (item) => item.name !== file.name
                      );
                      setFiles(remainingFiles);
                    }}
                  >
                    <CloseIcon className="icon-size" fill="#08415c" />
                  </i>
                </div>
              ))}
            </div>
            <div className={files?.length > 0 ? "filesdz-wrap" : null}>
              <div
                {
                  ...getRootProps({ style })
                  // {...getRootProps({ className: "files-dz" })
                }
              >
                <input {...getInputProps()} />
                <div className="filesdz-label-container">
                  <AddVideoIcon className="icon-lg mb-16" />
                  <div style={{ textAlign: "center" }}>
                    <span>Drag and drop your videos here or </span>
                    <span>Browse</span>
                    <span> to choose a file</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-8 mr-8 mt-16 mb-16">
              <button type="submit" className="button button-primary p-4">
                Save Files
              </button>
              <button
                onClick={() => setFiles([])}
                //  cleanup paths after delete
                type="button"
                className={"button button-green ml-8 p-4"}
                disabled={files.length < 1}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
