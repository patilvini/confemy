import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as yup from "yup";
import TextError from "../formik/TextError";
import "./createConference.styles.scss";

import { createConferenceAction } from "../../redux/conference/conferenceAction";

function CreateConference({ createConferenceAction }) {
  const initialValues = {
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    format: [],
    currency: "",
    amount: "",
    specialties: [],
    credits: [],
    amaCredits: "",
    aafpCredits: "",
    acepCredits: "",
    otherCredits: [{ otherCreditName: "", otherCreditNumber: "" }],
  };
  const navigate = useNavigate();

  const onSubmit = (values) => {
    const {
      title,
      description,
      specialties,
      startDate,
      endDate,
      startTime,
      endTime,
      format,
      currency,
      amount,
      credits,
      amaCredits,
      aafpCredits,
      acepCredits,
      otherCredits,
    } = values;

    const formData = {
      title,
      description,
      specialties,
      startDate,
      endDate,
      startTime,
      endTime,
      format,
      currency,
      amount,
      credits,
      amaCredits,
      aafpCredits,
      acepCredits,
      otherCredits,
    };
    createConferenceAction(formData, navigate);
  };

  const validationSchema = yup.object({
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
    startDate: yup.date().required("Required").nullable(),
    endDate: yup.date().required("Required").nullable(),
    startTime: yup.date().required("Required").nullable(),
    endTime: yup.date().required("Required").nullable(),
    format: yup.array().of(yup.string()).min(1, "Select atleast one format"),
    currency: yup.string().required("Required"),
    amount: yup.number().required("Required").nullable(),
    specialties: yup
      .array()
      .of(yup.string())
      .min(1, "Add at least one specialty")
      .compact(),
    credits: yup.array().of(yup.string()).min(1, "Select at least one type"),
    amaCredits: yup.number().when("credits", {
      is: (val) => val.includes("ama"),
      then: yup
        .number()
        .required("Add number of credits")
        .min(1, "Atleast 1 credit required")
        .nullable(),
      otherwise: yup.number().notRequired().nullable(),
    }),
    aafpCredits: yup.number().when("credits", {
      is: (val) => val.includes("aafp"),
      then: yup
        .number()
        .required("Add number of credits")
        .min(1, "Atleast 1 credit required")
        .nullable(),
      otherwise: yup.number().notRequired().nullable(),
    }),
    acepCredits: yup.number().when("credits", {
      is: (val) => val.includes("acep"),
      then: yup
        .number()
        .required("Add number of credits")
        .min(1, "Atleast 1 credit required")
        .nullable(),
      otherwise: yup.number().notRequired().nullable(),
    }),
    otherCredits: yup.array().when("credits", {
      is: (val) => val.includes("otherCredits"),
      then: yup.array().of(
        yup.object().shape({
          otherCreditName: yup.string().required("Required"),
          otherCreditNumber: yup
            .number()
            .required("Add number of credits")
            .min(1, "Atleast 1 credit required")
            .nullable(),
        })
      ),
      otherwise: yup.array().of(
        yup.object().shape({
          otherCreditName: yup.string().notRequired(),
          otherCreditNumber: yup.number().notRequired().nullable(),
        })
      ),
    }),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <div className="right-container">
        <h2 className="form-heading my-2">Create Conference</h2>
        <Form className="conf-form" autoComplete="off">
          <div className="border-medium-grey p-2 mb-1">
            <div className="mb-1">
              <label className="required-label" htmlFor="title">
                Conference Title
              </label>
              <div>
                <Field type="text" id="title" name="title" />
              </div>
              <ErrorMessage name="title" component={TextError} />
            </div>
            <div className="mb-3">
              <label className="required-label" htmlFor="description">
                Brief Description
              </label>
              <div>
                <Field
                  id="description"
                  name="description"
                  as="textarea"
                  type="text"
                  cols="10"
                  rows="5"
                />
              </div>
              <ErrorMessage name="description" component={TextError} />
            </div>
            <div className="items-makeline mb-1">
              <div>
                <label className="required-label" htmlFor="startDate">
                  Start Date
                </label>
                <div>
                  <Field name="startDate">
                    {({ form, field }) => {
                      const { setFieldValue } = form;
                      const { value } = field;
                      return (
                        <input
                          type="date"
                          id="startDate"
                          {...field}
                          name="startDate"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          selected={value}
                          onChange={(val) => setFieldValue("startDate", val)}
                        />
                      );
                    }}
                  </Field>
                </div>
                <ErrorMessage name="startDate" component={TextError} />
              </div>
              <div>
                <label className="required-label" htmlFor="endDate">
                  End Date
                </label>
                <div>
                  <Field name="endDate">
                    {({ form, field }) => {
                      const { setFieldValue } = form;
                      const { value } = field;
                      return (
                        <input
                          type="date"
                          id="endDate"
                          {...field}
                          name="endDate"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          selected={value}
                          onChange={(val) => setFieldValue("endDate", val)}
                        />
                      );
                    }}
                  </Field>
                </div>
                <ErrorMessage name="endDate" component={TextError} />
              </div>
              <div>
                <label className="required-label" htmlFor="startTime">
                  Start Time
                </label>
                <div>
                  <Field name="startTime">
                    {({ form, field }) => {
                      const { setFieldValue } = form;
                      const { value } = field;
                      return (
                        <input
                          type="date"
                          id="startTime"
                          {...field}
                          selected={value}
                          onChange={(val) => setFieldValue("startTime", val)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                        />
                      );
                    }}
                  </Field>
                </div>
                <ErrorMessage name="startTime" component={TextError} />
              </div>
              <div>
                <label className="required-label" htmlFor="endTime">
                  End Time
                </label>
                <div>
                  <Field name="endTime">
                    {({ form, field }) => {
                      const { setFieldValue } = form;
                      const { value } = field;
                      return (
                        <input
                          type="date"
                          id="endTime"
                          {...field}
                          selected={value}
                          onChange={(val) => setFieldValue("endTime", val)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                        />
                      );
                    }}
                  </Field>
                </div>
                <ErrorMessage name="endTime" component={TextError} />
              </div>
            </div>
          </div>
          <div className=" border-medium-grey p-2 mb-1">
            <div className="items-makeline mb-1">
              <div className="mr-2">
                <label className="required-label" htmlFor="confFormat">
                  Format
                </label>
                <ErrorMessage name="format" component={TextError} />
                <div>
                  <Field
                    id="attendInperson"
                    type="checkbox"
                    name="format"
                    value="attendInperson"
                  />
                  <label className="mr-2" htmlFor="attendInperson">
                    Attend in person
                  </label>
                  <Field
                    id="liveOnline"
                    type="checkbox"
                    name="format"
                    value="liveOnline"
                  />
                  <label className="mr-2" htmlFor="liveOnline">
                    Live Online
                  </label>
                  <Field
                    id="audioRecording"
                    type="checkbox"
                    name="format"
                    value="audioRecording"
                  />
                  <label className="mr-2" htmlFor="audioRecording">
                    Audio Recording
                  </label>
                  <Field
                    id="videoRecording"
                    type="checkbox"
                    name="format"
                    value="videoRecording"
                  />
                  <label className="mr-2" htmlFor="videoRecording">
                    Video Recording
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-1">
              <label className="required-label">Fee</label>
              <div className="items-makeline-left">
                <div className="mr-1">
                  <label htmlFor="currency">Currency</label>
                  <div>
                    <Field type="text" id="currency" name="currency" />
                  </div>
                  <ErrorMessage name="currency" component={TextError} />
                </div>
                <div>
                  <label htmlFor="amount">Amount</label>
                  <div>
                    <Field id="amount" type="number" name="amount" />
                  </div>
                  <ErrorMessage name="amount" component={TextError} />
                </div>
              </div>
            </div>

            <div>
              <label className="required-label">
                Assign specialties which will benefit from the conference
              </label>
              <p>
                <label>* Add as many specialties as felt applicable</label>
              </p>
            </div>

            <FieldArray
              name="specialties"
              render={(arrayHelpers) => (
                <div>
                  {arrayHelpers.form.values.specialties &&
                  arrayHelpers.form.values.specialties.length > 0 ? (
                    arrayHelpers.form.values.specialties.map(
                      (confSpecialty, index) => (
                        <Fragment key={index}>
                          <div className="items-makeline-left mb-1">
                            <div className="mr-1">
                              <Field
                                type="text"
                                name={`specialties.${index}`}
                              />
                            </div>
                            <div>
                              <div>
                                <button
                                  className="button"
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove a confSpecialty from the list
                                >
                                  - Remove Specialty
                                </button>
                              </div>
                            </div>
                            <div className="mb-1">
                              <div>
                                <button
                                  className="button"
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                                >
                                  + Add a specialty
                                </button>
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      )
                    )
                  ) : (
                    <button
                      className="button mb-1"
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                    >
                      {/* show this when user has removed all specialties from the list */}
                      + Add a specialty
                    </button>
                  )}
                </div>
              )}
            />
            <ErrorMessage name="specialties" component={TextError} />
          </div>

          <div className="border-medium-grey p-2 mb-1">
            <div className="mb-1">
              <label className="required-label">
                Please enter accredation and credits
              </label>
              <p>
                <label>* Check all that applies</label>
              </p>
              <ErrorMessage name="credits" component={TextError} />
            </div>
            <div>
              <Field name="credits">
                {(props) => {
                  return (
                    <Fragment>
                      <div className="mb-1">
                        <Field
                          id="ama"
                          type="checkbox"
                          name="credits"
                          value="ama"
                        />
                        <label className="mr-2" htmlFor="ama">
                          AMA PRA category 1 Credits
                        </label>
                        <div style={{ display: "inline-block" }}>
                          <Field type="number" name="amaCredits" />
                        </div>
                        <ErrorMessage name="amaCredits" component={TextError} />
                      </div>
                      <div className="mb-1">
                        <Field
                          id="aafp"
                          type="checkbox"
                          name="credits"
                          value="aafp"
                        />
                        <label className="mr-2" htmlFor="aafp">
                          AAFP Credits
                        </label>

                        <div style={{ display: "inline-block" }}>
                          <Field type="number" name="aafpCredits" />
                        </div>
                        <ErrorMessage
                          name="aafpCredits"
                          component={TextError}
                        />
                      </div>
                      <div className="mb-1">
                        <Field
                          id="acep"
                          type="checkbox"
                          name="credits"
                          value="acep"
                        />
                        <label className="mr-2" htmlFor="acep">
                          ACEP Credits
                        </label>
                        <div style={{ display: "inline-block" }}>
                          <Field type="number" name="acepCredits" />
                        </div>
                        <ErrorMessage
                          name="acepCredits"
                          component={TextError}
                        />
                      </div>
                      <div className="mb-1">
                        <Field
                          id="otherCredits"
                          type="checkbox"
                          name="credits"
                          value="otherCredits"
                        />
                        <label htmlFor="otherCredits">
                          Other types of Credits
                        </label>
                      </div>
                      {props.field.value.includes("otherCredits") && (
                        <FieldArray
                          name="otherCredits"
                          render={(arrayHelpers) => (
                            <Fragment>
                              {arrayHelpers.form.values.otherCredits.map(
                                (otherCredits, index) => (
                                  <div
                                    key={index}
                                    className="items-makeline-left my-1"
                                  >
                                    <div className="mr-1">
                                      <div>
                                        <Field
                                          type="text"
                                          name={`otherCredits[${index}].otherCreditName`}
                                          placeholder="Credit name"
                                        />
                                      </div>
                                      <ErrorMessage
                                        name={`otherCredits[${index}].otherCreditName`}
                                        component={TextError}
                                      />
                                    </div>
                                    <div className="mr-1">
                                      <div>
                                        <Field
                                          type="number"
                                          name={`otherCredits.${index}.otherCreditNumber`}
                                          placeholder="Credit number"
                                        />
                                      </div>
                                      <ErrorMessage
                                        name={`otherCredits.${index}.otherCreditNumber`}
                                        component={TextError}
                                      />
                                    </div>
                                    {arrayHelpers.form.values.otherCredits
                                      .length > 1 ? (
                                      <div className="mr-1">
                                        <div>
                                          <button
                                            className="button"
                                            type="button"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          >
                                            - Remove
                                          </button>
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                )
                              )}
                              <div>
                                <div className="mb-1">
                                  <button
                                    className="button"
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.push({
                                        otherCreditName: "",
                                        otherCreditNumber: "",
                                      })
                                    }
                                  >
                                    + Add more credit types
                                  </button>
                                </div>
                              </div>
                            </Fragment>
                          )}
                        />
                      )}
                    </Fragment>
                  );
                }}
              </Field>
            </div>
          </div>

          <button className="button" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </Formik>
  );
}

CreateConference.propTypes = {
  createConferenceAction: PropTypes.func.isRequired,
};

export default connect(null, { createConferenceAction })(CreateConference);
