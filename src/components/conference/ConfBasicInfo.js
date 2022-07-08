import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";
import DateView from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import api from "../../utility/api";
import "./createConference.styles.scss";

const initialValues = {
  title: "",
  format: [],

  host: "",

  timezone: "",
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,

  mode: [],
  venueName: "",
  street1: "",
  street2: "",
  state: "",
  country: "",
  city: "",

  registrationFee: "",
  currency: "",
  basePrice: Number,
};

const validationSchema = yup.object({
  title: yup.string().required("Required"),
  host: yup
    .string()
    .required("Required. Choose who is organizing the conference"),
});

export default function ConfBasicInfo() {
  const user = useSelector((state) => state.auth.user);

  async function onSubmit(values, actions) {
    const {
      title,
      format,
      host,
      registrationFee,
      currency,
      basePrice,
      startDate,
      endDate,
      startTime,
      endTime,
      timezone,
      mode,
      venueName,
      street1,
      street2,
      city,
      state,
      country,
    } = values;

    let isFree = false;
    let organizationId;

    const formData = {
      conferenceDetails: {
        title,
        userId: user.id,
        organizationId,
        currency,
        basePrice,
        startDate,
        endDate,
        isFree,
        startTime,
        endTime,
        timezone: "Asia/Kolkata",
        mode: format,
        host,
        venue: {
          name: venueName,
          state,
          country,
          city,
          street1,
          street2,
        },
      },
    };

    if (organizationId) {
      formData.organizationId = organizationId;
    }

    console.log(formData);

    try {
      const response = await api.post("conferences/step1", formData);
      if (response) {
        console.log(response);
      }
    } catch (err) {
      // if (err) actions.setFieldError("emailOtp", err.response?.data.message);
    }
  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  // console.log("formik object", formik);

  return (
    <div className="conf-form-wrap">
      <form
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <section>
          <h2>Basic Info</h2>
          <h4>Title</h4>
          <div className="input-container">
            <input
              id="title"
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Conference Title*"
            />
            {formik.touched.title && Boolean(formik.errors.title) && (
              <TextError>{formik.errors.title}</TextError>
            )}
          </div>

          <h4>Hosted by</h4>
          <div className="input-container">
            <input
              type="radio"
              style={{ display: "none" }}
              id="conf-org"
              name="host"
              value="organization"
              checked={formik.values.host === "organization"}
              onChange={formik.handleChange}
            />
            <label htmlFor="conf-org">
              <div
                className={`mr-20 ${
                  formik.values.host === "organization"
                    ? "button-outlined-active"
                    : "button-outlined-inactive"
                }`}
              >
                Organization
              </div>
            </label>
            <input
              type="radio"
              style={{ display: "none" }}
              name="host"
              id="conf-myself"
              value="user"
              checked={formik.values.host === "user"}
              onChange={formik.handleChange}
            />
            <label htmlFor="conf-myself">
              <div
                className={`mr-20 ${
                  formik.values.host === "user"
                    ? "button-outlined-active"
                    : "button-outlined-inactive"
                }`}
              >
                Myself
              </div>
            </label>
            {formik.touched.host && Boolean(formik.errors.host) && (
              <TextError>{formik.errors.host}</TextError>
            )}
          </div>
        </section>
        <section className="conf-schedule">
          <h2>Conference Schedule</h2>
          <div className="grid-col-2">
            <div className="grid-1st-col input-container">
              <DateView
                id="startDate"
                name="startDate"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={formik.values.startDate}
                onChange={(date) => formik.setFieldValue("startDate", date)}
              />

              {formik.touched.startDate && Boolean(formik.errors.startDate) && (
                <TextError>{formik.errors.startDate}</TextError>
              )}
            </div>
            <div className="grid-2nd-col input-container">
              <DatePicker
                id="startTime"
                selected={formik.values.startTime}
                onChange={(time) => formik.setFieldValue("startTime", time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
              {formik.touched.startTime && Boolean(formik.errors.startTime) && (
                <TextError>{formik.errors.startTime}</TextError>
              )}
            </div>

            <div className=" grid-1st-col input-container">
              <DateView
                id="endDate"
                name="endDate"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={formik.values.endDate}
                onChange={(date) => formik.setFieldValue("endDate", date)}
              />

              {formik.touched.endDate && Boolean(formik.errors.endDate) && (
                <TextError>{formik.errors.endDate}</TextError>
              )}
            </div>
            <div className="grid-2nd-col input-container">
              <DatePicker
                id="endTime"
                selected={formik.values.endTime}
                onChange={(time) => formik.setFieldValue("endTime", time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
              {formik.touched.endTime && Boolean(formik.errors.endTime) && (
                <TextError>{formik.errors.endTime}</TextError>
              )}
            </div>
          </div>
        </section>
        <div>
          <h2>Location</h2>
          <div>
            <input
              style={{ display: "none" }}
              type="checkbox"
              id="conf-venue"
              name="format"
              value="venue"
              checked={formik.values.format.includes("venue")}
              onChange={formik.handleChange}
            />
            <label htmlFor="conf-venue">
              <div
                className={`mr-20 ${
                  formik.values.format.includes("venue")
                    ? "button-outlined-active"
                    : "button-outlined-inactive"
                }`}
              >
                Venue
              </div>
            </label>

            <input
              style={{ display: "none" }}
              type="checkbox"
              id="online-conf"
              name="format"
              value="onlineConf"
              checked={formik.values.format.includes("onlineConf")}
              onChange={formik.handleChange}
            />
            <label htmlFor="online-conf">
              <div
                type="button"
                className={`mr-20 ${
                  formik.values.format.includes("onlineConf")
                    ? "button-outlined-active"
                    : "button-outlined-inactive"
                }`}
              >
                Online Conference
              </div>
            </label>
          </div>

          <div>
            <div
              className={`${
                formik.values.format.includes("venue")
                  ? "slow-height"
                  : "display-none"
              }`}
            >
              <div>
                <h4>Venue Details</h4>
                <div className="input-container">
                  <input
                    id="venueName"
                    type="text"
                    name="venueName"
                    value={formik.values.venueName}
                    onChange={formik.handleChange}
                    placeholder="Venue Name*"
                  />
                  {formik.touched.venueName &&
                    Boolean(formik.errors.venueName) && (
                      <TextError>{formik.errors.venueName}</TextError>
                    )}
                </div>
              </div>
              <div>
                <div className="input-container">
                  <input
                    id="street1"
                    type="text"
                    name="street1"
                    value={formik.values.street1}
                    onChange={formik.handleChange}
                    placeholder="Address line 1"
                  />
                </div>
                {formik.touched.street1 && Boolean(formik.errors.street1) && (
                  <TextError>{formik.errors.street1}</TextError>
                )}
              </div>
              <div>
                <div className="input-container">
                  <input
                    id="street2"
                    type="text"
                    name="street2"
                    value={formik.values.street2}
                    onChange={formik.handleChange}
                    placeholder="Address line 2"
                  />
                </div>
                {formik.touched.street2 && Boolean(formik.errors.street2) && (
                  <TextError>{formik.errors.street2}</TextError>
                )}
              </div>
              <div>
                <div className="input-container">
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    placeholder="City"
                  />
                </div>
                {formik.touched.city && Boolean(formik.errors.city) && (
                  <TextError>{formik.errors.city}</TextError>
                )}
              </div>
              <div>
                <div className="input-container">
                  <input
                    id="state"
                    type="text"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    placeholder="State"
                  />
                </div>
                {formik.touched.state && Boolean(formik.errors.state) && (
                  <TextError>{formik.errors.state}</TextError>
                )}
              </div>
              <div>
                <div className="input-container">
                  <input
                    id="country"
                    type="text"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    placeholder="Country*"
                  />
                </div>
                {formik.touched.country && Boolean(formik.errors.country) && (
                  <TextError>{formik.errors.country}</TextError>
                )}
              </div>
            </div>
          </div>
        </div>
        <section>
          <h2>Pricing</h2>
          <div className="input-container">
            <input
              type="radio"
              style={{ display: "none" }}
              id="conf-isNotFree"
              name="registrationFee"
              value="isNotFree"
              checked={formik.values.registrationFee === "isNotFree"}
              onChange={formik.handleChange}
            />
            <label htmlFor="conf-isNotFree">
              <div
                className={`mr-20 ${
                  formik.values.registrationFee === "isNotFree"
                    ? "button-outlined-active"
                    : "button-outlined-inactive"
                }`}
              >
                Set Base Price
              </div>
            </label>

            <input
              type="radio"
              style={{ display: "none" }}
              name="registrationFee"
              id="conf-isFree"
              value="isFree"
              checked={formik.values.registrationFee === "isFree"}
              onChange={formik.handleChange}
            />
            <label htmlFor="conf-isFree">
              <div
                className={`mr-20 ${
                  formik.values.registrationFee === "isFree"
                    ? "button-outlined-active"
                    : "button-outlined-inactive"
                }`}
              >
                Free
              </div>
            </label>
          </div>
          <div
            className={`${
              formik.values.registrationFee === "isNotFree"
                ? ""
                : "display-none"
            }`}
          >
            <div className="grid-col-2">
              <div className="grid-1st-col">
                <input
                  id="currency"
                  type="text"
                  name="currency"
                  value={formik.values.currency}
                  onChange={formik.handleChange}
                  placeholder="Choose currency"
                />

                {formik.touched.currency && Boolean(formik.errors.currency) && (
                  <TextError>{formik.errors.currency}</TextError>
                )}
              </div>
              <div className="grid-2nd-col">
                <input
                  id="basePrice"
                  type="text"
                  name="basePrice"
                  value={formik.values.basePrice}
                  onChange={formik.handleChange}
                  placeholder="Choose Amount"
                />

                {formik.touched.basePrice &&
                  Boolean(formik.errors.basePrice) && (
                    <TextError>{formik.errors.basePrice}</TextError>
                  )}
              </div>
            </div>
          </div>
        </section>
        <section className="my-24">
          <button type="button" className="button button-green mr-8">
            Cancel
          </button>
          <button type="submit" className="button button-primary">
            Next
          </button>
        </section>
      </form>
    </div>
  );
}
