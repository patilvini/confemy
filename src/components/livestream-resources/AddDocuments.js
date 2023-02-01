import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

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
import FileTitleInput from "./FileTitleInput";

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
    onDrop: (acceptedFile) => {
      acceptedFile[0].id = uuid();
      acceptedFile[0].title = "";
      setFiles((prev) => [...prev, ...acceptedFile]);
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

    //  Submit file and add file url to formData object
    if (files?.length > 0) {
      const fd = new FormData();

      // files.forEach((file) =>
      //   !file.Key ? fd.append("file", file) : oldFiles.push(file)

      files.forEach((file) =>
        fd.append("file", file, file.title?.trim() || file.name)
      );

      // console.log("fd", Array.from(fd));

      if (fd.has("file")) {
        try {
          const awsResponse = await api.post("fileUploads", fd);
          if (awsResponse) {
            console.log("aws files", awsResponse);
            formData.resourceDocs.data = [
              ...newConference?.resourceDocuments,
              ...awsResponse.data.data,
            ];
          }
        } catch (err) {
          dispatch(alertAction("File(s) failed to save", "danger"));
          return;
        }
      }

      console.log("formData after aws", formData);

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

  console.log("files", files);

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
                <a
                  href={file.Location}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.name}
                </a>
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
            <div className="filesdz-files-container">
              {files?.map((file, indx) => (
                <div className="filesdz-files-row" key={file.name}>
                  <div>
                    <div className="flex-vc mb-8">
                      <AddFileIcon className="icon-xs mr-16" />
                      {file.name}
                    </div>
                    <FileTitleInput
                      value={file.title}
                      onChange={(e) => {
                        setFiles((prev) => {
                          prev[indx].title = e.target.value;
                          return [...prev];
                        });
                      }}
                    />
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
