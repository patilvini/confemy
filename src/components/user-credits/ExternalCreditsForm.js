import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { alertAction } from "../../redux/alert/alertAction";
import PropTypes from "prop-types";

import * as yup from "yup";

import TextError from "../formik/TextError";
import OnlyDatepicker from "../react-datepicker/OnlyDatePicker";
import CloseIcon from "../icons/CloseIcon";

import SubmitCancelButtonWithLoader from "../button/SubmitCancelButtonWithLoader";
import ReloadableSelectFormType1 from "../reselect/ReloadableSelectFormType1";

import {
  clearUserSingleExternalCreditAction,
  loadUserExternalCreditsAction,
} from "../../redux/user-profile/userProfileAction";

import { loadCreditTypesList } from "../../utility/commonUtil";
import api from "../../utility/api";

import "./usercredits.styles.scss";
import UploadArrowIcon from "../icons/UploadArrowIcon";
import DocumentIcon from "../icons/DocumentIcon";

const validationSchema = yup.object().shape({
  conferenceName: yup.string().required("Required"),
  startDate: yup.date().required("Required").nullable(),
  endDate: yup.date().required("Required").nullable(),
  creditType: yup.string().required("Required"),
  totalCredits: yup.string().required("Required"),
});

const ExternalCreditsForm = ({
  editMode,
  setEditMode,
  setShowExternalCreditForm,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const creditTypesList = useSelector((state) => state.list.creditTypesList);
  const editData = useSelector(
    (state) => state.userProfile.userSingleExternalCredit
  );

  const myDropZone = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      console.log("accepted files:", acceptedFiles);
      formik.setFieldValue("certificate", acceptedFiles);
    },
  });

  const { isFocused, isDragAccept, isDragReject, getRootProps, getInputProps } =
    myDropZone;

  let formatedStartDate;
  let formatedEndDate;
  if (editData) {
    formatedStartDate = new Date(editData?.startDate);
    formatedEndDate = new Date(editData?.endDate);
  }

  const onSubmit = async (values) => {
    const {
      conferenceName,
      startDate,
      endDate,
      creditType,
      totalCredits,
      deteledCertificate,
    } = values;

    const formData = {
      conferenceDetails: {
        deleteCreditCertificate: deteledCertificate?.length > 0,
        creditCertificateKey: deteledCertificate,
        userId: user._id,
        title: conferenceName,
        startDate: startDate,
        endDate: endDate,
        creditId: creditType,
        quantity: totalCredits,
      },
    };

    if (formik.values.certificate?.length > 0) {
      let oldFiles = [];
      let newFiles = [];
      formik.values.certificate?.map((file) =>
        file.key ? oldFiles.push(file) : newFiles.push(file)
      );
      if (newFiles.length > 0) {
        const fileDataObj = new FormData();
        newFiles.forEach((file) => fileDataObj.append("file", file));
        if (fileDataObj.has("file")) {
          try {
            const fileResponse = await api.post("fileUploads", fileDataObj);
            if (fileResponse) {
              formData.conferenceDetails.data = fileResponse.data.data;
              formData.conferenceDetails.data[0].name =
                formik.values.certificate[0]?.name;
            }
          } catch (err) {
            dispatch(alertAction("File(s) failed to save", "danger"));
            return;
          }
        }
      }

      try {
        let response;
        let url;
        if (editMode) {
          url = `attendees/${user?._id}/credits/externals/${editData?._id}`;
          response = await api.patch(url, formData);
        } else {
          url = `attendees/credits/externals`;
          response = await api.post(url, formData);
        }

        if (response) {
          dispatch(
            loadUserExternalCreditsAction(response.data.data.externalCredits)
          );
          if (editMode) {
            setEditMode(false);
          } else {
            setShowExternalCreditForm(false);
          }
          dispatch(alertAction(response.data.message, "success"));
        }
      } catch (err) {
        dispatch(alertAction(err.response.data.message, "danger"));
      }
    } else {
      try {
        let response;
        let url;
        if (editMode) {
          url = `attendees/${user?._id}/credits/externals/${editData?._id}`;
          response = await api.patch(url, formData);
        } else {
          url = `attendees/credits/externals`;
          response = await api.post(url, formData);
        }
        if (response) {
          dispatch(
            loadUserExternalCreditsAction(response.data.data.externalCredits)
          );
          if (editMode) {
            setEditMode(false);
          } else {
            setShowExternalCreditForm(false);
          }
          dispatch(alertAction(response.data.message, "success"));
        }
      } catch (err) {
        dispatch(alertAction(err.response.data.message, "danger"));
      }
    }
  };

  // const onSubmitHandle = async (values, actions) => {
  //   const { conferenceName, startDate, endDate, creditType, totalCredits } =
  //     values;

  //   const formData = {
  //     conferenceDetails: {
  //       userId: user._id,
  //       title: conferenceName,
  //       startDate: startDate,
  //       endDate: endDate,
  //       creditId: creditType,
  //       quantity: totalCredits,
  //     },
  //   };

  //   if (files?.length > 0) {
  //     const fileDataObj = new FormData();

  //     files.forEach((file) => fileDataObj.append("file", file));

  //     if (fileDataObj.has("file")) {
  //       try {
  //         const fileResponse = await api.post("fileUploads", fileDataObj);
  //         if (fileResponse) {
  //           formData.conferenceDetails.data = fileResponse.data.data;
  //           let response = await api.post(
  //             `attendees/credits/externals`,
  //             formData
  //           );
  //           if (response) {
  //             dispatch(
  //               loadUserExternalCreditsAction(
  //                 response.data.data.externalCredits
  //               )
  //             );
  //           }
  //         }
  //       } catch (err) {
  //         dispatch(alertAction("File(s) failed to save", "danger"));
  //       }
  //     }
  //   } else if (!editMode) {
  //     try {
  //       let response = await api.post(`attendees/credits/externals`, formData);
  //       if (response) {
  //         dispatch(
  //           loadUserExternalCreditsAction(response.data.data.externalCredits)
  //         );
  //       }
  //     } catch (error) {
  //       dispatch(alertAction(error.response.data.message, "danger"));
  //     }
  //   }
  //   if (editMode) {
  //     try {
  //       let response = await api.patch(
  //         `attendees/${user._id}/credits/externals/${editData._id}`,
  //         formData
  //       );
  //       dispatch(
  //         loadUserExternalCreditsAction(response.data.data.externalCredits)
  //       );
  //     } catch (error) {
  //       dispatch(alertAction(error.response.data.message, "danger"));
  //     }
  //     setEditMode(false);
  //   }
  //   setShowExternalCreditForm(false);
  // };

  const initialValues = {
    conferenceName: editData?.conferenceTitle || "",
    startDate: formatedStartDate || null,
    endDate: formatedEndDate || null,
    creditType: editData?.credit?._id || "",
    totalCredits: editData?.quantity || "",
    certificate: (editData?.certificate && [editData?.certificate]) || [],
    deteledCertificate: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (!creditTypesList?.length > 0) {
      loadCreditTypesList();
    }
    return () => dispatch(clearUserSingleExternalCreditAction());
  }, []);

  return (
    <div className="ec-form-wrap">
      <div className="text-align-center mb-16">
        <p className="section-title-1">Add external credits</p>
        <p className="caption-1-regular-gray3 mb-24 mt-12">
          Add CME earned outside confemy
        </p>
      </div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="form-type-1">
          <div className="material-textfield mb-16">
            <input
              id="conferenceName"
              type="text"
              name="conferenceName"
              value={formik.values.conferenceName}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Conference or CME name*</label>
          </div>
          <div className="mb-16">
            {formik.touched.conferenceName &&
              Boolean(formik.errors.conferenceName) && (
                <TextError>{formik.errors.conferenceName}</TextError>
              )}
          </div>
          <div className="grid-col-2 ">
            <div className="grid-1st-col">
              <OnlyDatepicker
                id="startDate"
                name="startDate"
                selected={formik.values.startDate}
                onChange={(date) => formik.setFieldValue("startDate", date)}
                maxDate={formik.values.endDate}
                placeholder="Start Date"
                disabled={false}
              />
              <div className="mb-16">
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
              <div className="mb-16">
                {formik.touched.endDate && Boolean(formik.errors.endDate) && (
                  <TextError>{formik.errors.endDate}</TextError>
                )}
              </div>
            </div>
          </div>
          <div className="mb-16">
            <ReloadableSelectFormType1
              label="creditType"
              name="creditType"
              options={creditTypesList}
              value={formik.values.creditType}
              onChange={(value) => {
                formik.setFieldValue("creditType", value?.value);
              }}
              placeholder="Credit Type"
            />
            <div className="mb-16">
              {formik.touched.creditType &&
                Boolean(formik.errors.creditType) && (
                  <TextError>{formik.errors.creditType}</TextError>
                )}
            </div>
          </div>
          <div className="material-textfield">
            <input
              id="totalCredits"
              type="number"
              name="totalCredits"
              value={formik.values.totalCredits}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Total Credits*</label>
          </div>
          <div className="mb-16">
            {formik.touched.conferenceName &&
              Boolean(formik.errors.totalCredits) && (
                <TextError>{formik.errors.totalCredits}</TextError>
              )}
          </div>
          <div className="mb-24">
            {formik.values.certificate?.length > 0 ? (
              <>
                <div className="flex-vc-sb uc-uploadfile-input pb-24 caption-1-regular-gray2">
                  <div className="flex-vc">
                    <i className="mr-8">
                      <DocumentIcon className="icon-sm" />
                    </i>
                    <p>{formik.values.certificate[0]?.name || "Certificate"}</p>
                  </div>
                  <i
                    onClick={() => {
                      if (formik.values.certificate[0]?.key) {
                        formik.setFieldValue(
                          "deteledCertificate",
                          formik.values.certificate[0]?.key
                        );
                      }
                      formik.setFieldValue("certificate", []);
                    }}
                  >
                    <CloseIcon className="icon-sm" fill="#000000" />
                  </i>
                </div>
              </>
            ) : (
              <div {...getRootProps({ className: "uc-uploadfile-input" })}>
                <div className="flex-vc">
                  <i className="position-relative pt-5 mr-8">
                    <UploadArrowIcon className="icon-sm" />
                  </i>
                  <p className="caption-1-regular-gray2 ml-5">
                    Click & browse to upload credit certificate
                  </p>
                </div>
                <input {...getInputProps()} />
              </div>
            )}
          </div>
          <div>
            <SubmitCancelButtonWithLoader
              isSubmitting={formik.isSubmitting}
              onCancel={() => {
                if (editMode) {
                  setEditMode(false);
                } else {
                  setShowExternalCreditForm(false);
                }
              }}
              cancelButtonClass="button button-green"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExternalCreditsForm;

ExternalCreditsForm.propTypes = {
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func,
  setShowExternalCreditForm: PropTypes.func,
};
