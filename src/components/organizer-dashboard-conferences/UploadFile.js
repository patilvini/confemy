import { useState } from "react";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";

import UploadArrowIcon from "../icons/UploadArrowIcon";
import DocumentIcon from "../icons/DocumentIcon";

import api from "../../utility/api";

import { alertAction } from "../../redux/alert/alertAction";

const UploadFile = ({ data }) => {
  const [fileResponse, setFileResponse] = useState("");
  const dispatch = useDispatch();

  const uploadCertificate = (acceptedFiles) => {
    acceptedFiles.map(async (file) => {
      let fileData = new FormData();
      fileData.append("file", file);
      try {
        const response = await api.post(`fileUploads`, fileData);
        setFileResponse(response);
      } catch (err) {
        dispatch(alertAction("File(s) failed to save", "danger"));
      }
      const formData = {
        atteendeeDetails: {
          uploadCertificate: true,
          data: fileResponse?.data?.data,
        },
      };

      if (fileResponse?.data?.data) {
        try {
          const response = await api.patch(
            `/attendees/credits/users/${data._id}`,
            formData
          );
          dispatch(alertAction(response.data.message, "success"));
        } catch (error) {
          dispatch(alertAction(error.response.data.message, "error"));
        }
      }
    });
  };

  const myDropZone = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      uploadCertificate(acceptedFiles);
    },
  });

  const viewCertificate = (certificate) => {
    window.open(certificate.location);
  };

  const { getRootProps, getInputProps } = myDropZone;
  return (
    <div>
      {data.creditCertificateUploaded ? (
        <div className="flex-vc-sb  caption-1-regular-gray2">
          <div
            style={{ cursor: "pointer" }}
            className="flex-vc"
            onClick={() => viewCertificate(data.creditCertificate)}
          >
            <i className="position-relative mr-4">
              <DocumentIcon className="icon-sm " />
            </i>
            <span>View Certificate</span>
          </div>
        </div>
      ) : (
        <div className="flex-vc" {...getRootProps()}>
          <i className="position-relative mr-4">
            <UploadArrowIcon className="icon-sm" />
          </i>
          <span> Upload certificate</span>
          <input {...getInputProps()} />
        </div>
      )}
    </div>
  );
};

export default UploadFile;
