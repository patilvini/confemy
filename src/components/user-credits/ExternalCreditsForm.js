import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";

import * as yup from "yup";

import TextError from "../formik/TextError";
import OnlyDatepicker from "../react-datepicker/OnlyDatePicker";
import { alertAction } from "../../redux/alert/alertAction";

import { loadUserExternalCreditsAction } from "../../redux/user-profile/userProfileAction";

import "./usercredits.styles.scss";
import ReloadableSelectFormType1 from "../reselect/ReloadableSelectFormType1";
import api from "../../utility/api";
import { loadCreditTypesList } from "../../utility/commonUtil";

const initialValues = {
  conferenceName: "",
  startDate: "",
  endDate: "",
  creditType: "",
  totalCredits: "",
  certificate: [],
};

const validationSchema = yup.object().shape({
  conferenceName: yup.string().required("Required"),
  startDate: yup.string().required("Required"),
  endDate: yup.string().required("Required"),
  creditType: yup.string().required("Required"),
  totalCredits: yup.string().required("Required"),
});

const ExternalCreditsForm = () => {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const creditTypesList = useSelector((state) => state.list.creditTypesList);

  const myDropZone = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
  });

  const { isFocused, isDragAccept, isDragReject, getRootProps, getInputProps } =
    myDropZone;
  const onSubmit = async (values, actions) => {
    const { conferenceName, startDate, endDate, creditType, totalCredits } =
      values;

    const formData = {
      conferenceDetails: {
        userId: user._id,
        title: conferenceName,
        startDate: startDate,
        endDate: endDate,
        creditId: creditType,
        quantity: totalCredits,
      },
    };

    if (files?.length > 0) {
      const fileDataObj = new FormData();

      files.forEach((file) => fileDataObj.append("file", file));

      if (fileDataObj.has("file")) {
        try {
          const fileResponse = await api.post("fileUploads", fileDataObj);
          if (fileResponse) {
            formData.conferenceDetails.data = fileResponse.data.data;
            let response = await api.post(
              `attendees/credits/externals`,
              formData
            );
            if (response) {
              dispatch(
                loadUserExternalCreditsAction(
                  response.data.data.externalCredits
                )
              );
            }
          }
        } catch (err) {
          dispatch(alertAction("File(s) failed to save", "danger"));
        }
      }
    } else {
      try {
        let response = await api.post(`attendees/credits/externals`, formData);
        if (response) {
          dispatch(
            loadUserExternalCreditsAction(response.data.data.externalCredits)
          );
        }
      } catch (error) {
        dispatch(alertAction(error.response.data.message, "danger"));
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const getAllExternalCredits = async (userID) => {
    try {
      let response = await api.get(`attendees/${userID}/credits/externals`);
      dispatch(
        loadUserExternalCreditsAction(response.data.data.externalCredits)
      );
    } catch (error) {
      dispatch(alertAction(error.response.data.message, "danger"));
    }
  };

  useEffect(() => {
    loadCreditTypesList();
  }, []);

  useEffect(() => {
    getAllExternalCredits(user?._id);
  }, [user?._id]);

  return (
    <div className="ec-form-wrap">
      <div className="text-align-center">
        <p className="section-title-1">Add external credits</p>
        <p className="caption-1-regular-gray3 mb-24 mt-12">
          Add CME earned outside confemy
        </p>
      </div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="form-type-1 mb-72">
          <div className="material-textfield my-16">
            <input
              id="conferenceName"
              type="text"
              name="conferenceName"
              value={formik.values.conferenceName}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Add conference name or CME event*</label>
          </div>
          <div className="mb-24">
            {formik.touched.conferenceName &&
              Boolean(formik.errors.conferenceName) && (
                <TextError>{formik.errors.conferenceName}</TextError>
              )}
          </div>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              {/* <DateIcon className="icon-sm" /> */}
              <OnlyDatepicker
                id="startDate"
                name="startDate"
                selected={formik.values.startDate}
                onChange={(date) => formik.setFieldValue("startDate", date)}
                minDate={new Date()}
                maxDate={formik.values.endDate}
                placeholder="Start Date"
                disabled={false}
              />
              <div className="mb-24">
                {formik.touched.startDate &&
                  Boolean(formik.errors.startDate) && (
                    <TextError>{formik.errors.startDate}</TextError>
                  )}
              </div>
            </div>

            <div className="grid-2nd-col">
              <OnlyDatepicker
                id="endDate"
                name="endDate"
                selected={formik.values.endDate}
                onChange={(date) => formik.setFieldValue("endDate", date)}
                minDate={formik.values.startDate}
                placeholder="End Date"
                disabled={false}
              />
              <div className="mb-24">
                {formik.touched.endDate && Boolean(formik.errors.endDate) && (
                  <TextError>{formik.errors.endDate}</TextError>
                )}
              </div>
            </div>
          </div>
          <div>
            <ReloadableSelectFormType1
              label="creditType"
              name="creditType"
              options={creditTypesList}
              value={formik.values.creditType}
              isMulti={false}
              onChange={(value) => {
                formik.setFieldValue("creditType", value?.value);
              }}
              placeholder="Credit Type*"
            />
            <div className="mb-24">
              {Boolean(formik.errors.creditType) && (
                <TextError>{formik.errors.creditType}</TextError>
              )}
            </div>
          </div>
          <div className="material-textfield">
            <input
              id="totalCredits"
              type="text"
              name="totalCredits"
              value={formik.values.totalCredits}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Total Credits*</label>
          </div>
          <div className="mb-24">
            {formik.touched.totalCredits &&
              Boolean(formik.errors.totalCredits) && (
                <TextError>{formik.errors.totalCredits}</TextError>
              )}
          </div>
          <div>
            {files?.map((file) => (
              <div className="" key={file.name}>
                <div className="flex-vc">{file.name}</div>
                <i
                  onClick={() => {
                    const remainingFiles = files.filter(
                      (item) => item.name !== file.name
                    );
                    setFiles(remainingFiles);
                  }}
                ></i>
              </div>
            ))}
            <div
              {...getRootProps()}
              // style={{
              //   border: "solid gray 1px",
              //   borderRadius: "5px",
              //   width: "100%",
              //   height: "60px",
              //   paddingTop: "18px",
              //   paddingLeft: "24px",
              // }}
            >
              <p className="caption-1-regular-gray3">Upload your certificate</p>
              <input {...getInputProps()} />
            </div>
            {/* <div className="mb-24">
              {formik.touched.certificate &&
                Boolean(formik.errors.certificate) && (
                  <TextError>{formik.errors.certificate}</TextError>
                )}
            </div> */}
          </div>
          <div className="mt-40">
            <button type="submit" className="button button-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExternalCreditsForm;
