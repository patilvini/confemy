import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddFileIcon from "../icons/AddFileIcon";
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

export default function AddDocuments({ dropzoneContentType = "forDefault" }) {
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const newConference = useSelector((state) => state.conference.newConference);

  const myDropZone = useDropzone({
    accept: {
      // "image/*": [".jpeg", ".png"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
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
        alertAction("Drag and drop files or browse and upload files", "danger")
      );
      // return;
    }

    const formData = {
      resourceDocs: {
        data: [],
      },
      conferenceId: newConference._id,
    };

    //  Submit banner image and add image url to formData object
    if (files?.length > 0) {
      const imageDataObj = new FormData();

      // files.forEach((file) =>
      //   !file.Key ? imageDataObj.append("file", file) : oldFiles.push(file)

      files.forEach((file) => imageDataObj.append("file", file));

      if (imageDataObj.has("file")) {
        try {
          const imagesResponse = await api.post("fileUploads", imageDataObj);
          if (imagesResponse) {
            formData.resourceDocs.data = [
              ...newConference?.resourceDocuments,
              ...imagesResponse.data.data,
            ];
          }
        } catch (err) {
          dispatch(alertAction("File(s) failed to save", "danger"));
          return;
        }
      }

      try {
        const url = "/conferences/step4/resources?resourceStatus=documents";
        const response = await api.post(url, formData);
        if (response) {
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
    const url = `/conferences/${newConference._id}/deleteFiles?fileDeleteType=resourceDocuments`;
    const formData = {
      data: {
        fileDeleteDetails: {
          Key: key,
        },
      },
    };
    try {
      const response = await api.delete(url, formData);
      dispatch(createConferenceAction(response.data.data.conference));
      dispatch(alertAction("Document deleted successfully", "success"));
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  return (
    <>
      <h2 className="mb-32">Saved Files</h2>
      <div
        className={
          newConference?.resourceDocuments?.length > 0
            ? "display-none"
            : "body-bold flex-hc"
        }
      >
        No saved files
      </div>
      <ul className="mb-72">
        {newConference?.resourceDocuments?.length > 0 &&
          newConference?.resourceDocuments.map((file) => (
            <li key={file._id} className="flex-vc body-bold mx-24">
              <AddFileIcon className="icon-lg mr-16" />
              <div style={{ flexGrow: 1 }}>
                <a href={file.Location}>{file._id}</a>
              </div>
              <i onClick={() => deleteResource(file.Key)}>
                <DeleteIcon className="icon-size" />
              </i>
            </li>
          ))}
      </ul>
      <h2 className="mb-32">Upload new files</h2>
      <form onSubmit={handleSubmit}>
        <div className="filesdz-section-wrap mb-24">
          <div className="filesdz-section-innerwrap">
            <div
              className="filesdz-files-container"
              // style={{
              //   borderBottom: files?.length > 0 ? "1px solid #c4c4c4" : null,
              // }}
            >
              {files?.map((file) => (
                <div className="filesdz-files-row" key={file.name}>
                  <div className="flex-vc">
                    <AddFileIcon className="icon-xs mr-16" />
                    {file.name}
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
                  <AddFileIcon className="icon-lg mb-16" />
                  <div style={{ textAlign: "center" }}>
                    <span>Drag and drop your file here or </span>
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
