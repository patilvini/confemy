import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import TextError from "../formik/TextError";
import SelectFormType1 from "../reselect/SelectFormType1";
import OnlyDatepicker from "../react-datepicker/OnlyDatePicker";

import DateIcon from "../icons/DateIcon";

import "./usercredits.styles.scss";
import ReloadableSelectFormType1 from "../reselect/ReloadableSelectFormType1";

const validationSchema = yup.object().shape({
  conferenceName: yup.string().required("Required"),
  startDate: yup.string().required("Required"),
  endDate: yup.string().required("Required"),
  creditType: yup.string().required("Required"),
  totalCredits: yup.string().required("Required"),
});

const ExternalCreditsForm = () => {
  const SelecetStartDate = () => {
    return (
      <div className="flex-vc">
        <i>
          <DateIcon className="icon-sm" />
        </i>
        <span> Start Date</span>
      </div>
    );
  };
  const onSubmit = async (values, action) => {
    const formData = {
      conferenceName: values.conferenceName || "",
      startDate: values.startDate || "",
      endDate: values.endDate || "",
      creditType: values.creditType || "",
      totalCredits: values.totalCredits || "",
    };
  };

  const initialValues = {
    conferenceName: "",
    startDate: "",
    endDate: "",
    creditType: "",
    totalCredits: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });
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
          {/* <div className="mb-24">
            {formik.touched.title && Boolean(formik.errors.title) && (
              <TextError>{formik.errors.title}</TextError>
            )}
          </div> */}
          <div className="grid-col-2 mb-16">
            <div className="grid-1st-col">
              {/* <DateIcon className="icon-sm" /> */}
              <OnlyDatepicker
                id="startDate"
                name="startDate"
                selected={""}
                onChange={""}
                minDate={new Date()}
                maxDate={""}
                customInput={SelecetStartDate}
                disabled={false}
              />
              {/* <div className="mb-24">
                  {formik.touched.startDate &&
                    Boolean(formik.errors.startDate) && (
                      <TextError>{formik.errors.startDate}</TextError>
                    )}
                </div> */}
            </div>

            <div className="grid-2nd-col">
              <OnlyDatepicker
                id="endDate"
                name="endDate"
                selected=""
                onChange=""
                minDate=""
                placeholder="End Date"
                disabled={false}
              />
              {/* <div className="mb-24">
                  {formik.touched.endDate && Boolean(formik.errors.endDate) && (
                    <TextError>{formik.errors.endDate}</TextError>
                  )}
                </div> */}
            </div>
          </div>
          <div className="mb-16">
            <ReloadableSelectFormType1
              options=""
              value=""
              onChange=""
              placeholder="Credit Type*"
              isDisabled=""
              name="state"
            />
            {/* <div className="mb-24">
                {Boolean(formik.errors.creditType) && (
                  <TextError>{formik.errors.creditType}</TextError>
                )}
              </div> */}
          </div>
          <div className="material-textfield mb-16">
            <input
              id="totalCredits"
              type="number"
              name="totalCredits"
              value=""
              onChange=""
              placeholder=" "
            />
            <label>Total Credits*</label>
          </div>
          {/* <div className="mb-24">
            {formik.touched.title && Boolean(formik.errors.title) && (
              <TextError>{formik.errors.title}</TextError>
            )}
          </div> */}
          <div className="material-textfield">
            <input
              id="certificate"
              type="text"
              name="certificate"
              value=""
              onChange=""
              placeholder=" "
            />
            <label>Upload credit certificate*</label>
          </div>
          {/* <div className="mb-24">
            {formik.touched.title && Boolean(formik.errors.title) && (
              <TextError>{formik.errors.title}</TextError>
            )}
          </div> */}
          <div className="mt-40">
            <button className="button button-primary">Add Credits</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExternalCreditsForm;
