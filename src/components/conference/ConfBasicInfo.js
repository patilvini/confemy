import { useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Async, { useAsync } from "react-select/async";
import Select from "react-select";

import TextError from "../formik/TextError";
import DateView from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import api from "../../utility/api";
import "./createConference.styles.scss";
import SingleSelect from "../reselect/SingleSelect";
import PassesIcon from "../icons/PassesIcon";
import DropdownIcon from "../icons/DropdownIcon";
import { timezones } from "../reselect/timezonesUtil";
import { useEffect } from "react";

const initialValues = {
  title: "",
  host: "",
  organizationId: "",

  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,
  timezone: "",

  mode: [],
  venueName: "",
  street1: "",
  street2: "",
  state: "",
  country: "",
  city: "",

  isFree: false,
  currency: "",
  basePrice: Number,
};

const validationSchema = yup.object().shape({
  title: yup.string().required("Required"),
  host: yup
    .string()
    .required("Required. Choose who is organizing the conference"),
  organizationId: yup.string().when("host", {
    is: "organization",
    then: yup.string().required("Required"),
  }),
  startDate: yup.date().required("Required").nullable(),
  startTime: yup.date().required("Required").nullable(),
  endDate: yup.date().required("Required").nullable(),
  endTime: yup.date().required("Required").nullable(),
  timezone: yup.string().required("Required"),
  mode: yup
    .array()
    .of(yup.string())
    .min(1, "Choose a conference format")
    .compact(),
  venueName: yup.string().when("mode", {
    is: (mode) => mode.includes("venue"),
    then: yup.string().required("Required"),
  }),
  street1: yup.string().when("mode", {
    is: (mode) => mode.includes("venue"),
    then: yup.string().required("Required"),
  }),
  city: yup.string().when("mode", {
    is: (mode) => mode.includes("venue"),
    then: yup.string().required("Required"),
  }),
  state: yup.string().when("mode", {
    is: (mode) => mode.includes("venue"),
    then: yup.string().required("Required"),
  }),
  country: yup.string().when("mode", {
    is: (mode) => mode.includes("venue"),
    then: yup.string().required("Required"),
  }),
  // isFree: yup.boolean().when(["isFree", "isThereBasePrice"], {
  //   is: (isFree, isThereBasePrice) => isFree == isThereBasePrice,
  //   then: yup.bool().isTrue("Choose free or set a baseprice"),
  // }),
});

export default function ConfBasicInfo() {
  const user = useSelector((state) => state.auth.user);
  const [myOrganizations, setMyOrganizations] = useState([]);
  const [inputValue, setInputValue] = useState("");

  async function onSubmit(values, actions) {
    const {
      title,
      host,
      organizationId,
      isFree,
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

    const formData = {
      conferenceDetails: {
        title,
        organizationId,
        userId: user._id,
        isFree,
        currency,
        basePrice,
        startDate,
        endDate,
        startTime,
        endTime,
        timezone,
        mode,
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

    // if (organizationId) {
    //   formData.organizationId = organizationId;
    // }

    try {
      console.log(formData);
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

  // handle input change event
  // const handleInputChange = (newValue) => {
  //   const inputValue = newValue.replace(/\W/g, "");
  //   setInputValue(newValue);
  //   return inputValue;
  // };

  // // handle selection
  // const handleChange = (option) => {
  //   setSelectedValue(option);
  // };

  // const loadOrgnizations = (inputValue, callback) => {
  //   const url = `organizations/users/${user._id}`;
  //   api
  //     .get(url)
  //     .then((res) => {
  //       console.log(res);
  //       return res.data.data.organization;
  //     })
  //     .then((data) => {
  //       let tempArray = [];
  //       data.forEach((element) => {
  //         tempArray.push({
  //           label: `${element.organization.name}`,
  //           value: element.organization._id,
  //         });
  //       });
  //       function filterOrganization(inputValue) {
  //         return tempArray.filter((i) =>
  //           i.label.toLowerCase().includes(inputValue.toLowerCase())
  //         );
  //       }
  //       // call back is what shows options in select dropdown
  //       callback(filterOrganization(inputValue));
  //     })
  //     .catch((err) => console.log(err));
  // };

  const loadMyOrgnizations = async (id) => {
    const url = `organizations/users/${id}`;
    let tempArray = [];
    try {
      const response = await api.get(url);
      console.log("organization res", response);
      if (response) {
        response.data.data.organization.forEach((element) => {
          tempArray.push({
            label: `${element.organization.name}`,
            value: element.organization._id,
          });
        });
        setMyOrganizations(tempArray);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadMyOrgnizations(user._id);
  }, [user._id]);

  return (
    <main className="conf-form-wrap">
      <form
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <section className="mb-72">
          <h2>Basic Info</h2>
          <h4>Title</h4>
          <div className="material-textfield">
            <input
              id="title"
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder=" "
            />
            <label>Conference title*</label>
          </div>
          <div className="mb-24">
            {formik.touched.title && Boolean(formik.errors.title) && (
              <TextError>{formik.errors.title}</TextError>
            )}
          </div>

          <h4>Hosted by</h4>
          <div>
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
          </div>
          <div className="mb-32">
            {formik.touched.host && Boolean(formik.errors.host) && (
              <TextError>{formik.errors.host}</TextError>
            )}
          </div>
          <div
            className={`${
              formik.values.host == "organization" ? "" : "display-none"
            }`}
          >
            <SingleSelect
              options={myOrganizations}
              name="organizationId"
              handleChange={(option) => {
                formik.setFieldValue("organizationId", option?.value);
              }}
              isDisabled={formik.values.host !== "organization"}
            />
            <div>
              {formik.touched.organizationId &&
                Boolean(formik.errors.organizationId) && (
                  <TextError>{formik.errors.organizationId}</TextError>
                )}
            </div>
          </div>
        </section>
        <section className="conf-schedule mb-72">
          <h2>Conference Schedule</h2>

          <div className="grid-col-2">
            <div className="grid-1st-col">
              <h4>Start Date</h4>
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
              <div className="mb-24">
                {formik.touched.startDate &&
                  Boolean(formik.errors.startDate) && (
                    <TextError>{formik.errors.startDate}</TextError>
                  )}
              </div>
            </div>
            <div className="grid-2nd-col">
              <h4>Start time</h4>
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
              <div className=" mb-24">
                {formik.touched.startTime &&
                  Boolean(formik.errors.startTime) && (
                    <TextError>{formik.errors.startTime}</TextError>
                  )}
              </div>
            </div>
            <div className=" grid-1st-col ">
              <h4>End Date</h4>
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
              <div className="mb-24">
                {formik.touched.endDate && Boolean(formik.errors.endDate) && (
                  <TextError>{formik.errors.endDate}</TextError>
                )}
              </div>
            </div>
            <div className="grid-2nd-col">
              <h4>End Time</h4>
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
              <div className="mb-24">
                {formik.touched.endTime && Boolean(formik.errors.endTime) && (
                  <TextError>{formik.errors.endTime}</TextError>
                )}
              </div>
            </div>
            <div className="grid-1st-col">
              <h4>Timezone</h4>
              <SingleSelect
                options={timezones}
                label="timezone"
                name="timezone"
                handleChange={(option) => {
                  formik.setFieldValue("timezone", option?.value);
                }}
              />
              <div className="mb-24">
                {formik.touched.timezone && Boolean(formik.errors.timezone) && (
                  <TextError>{formik.errors.timezone}</TextError>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="mb-72">
          <h2>Location</h2>
          <div>
            <input
              style={{ display: "none" }}
              type="checkbox"
              id="conf-venue"
              name="mode"
              value="venue"
              checked={formik.values.mode.includes("venue")}
              onChange={formik.handleChange}
            />
            <label htmlFor="conf-venue">
              <div
                className={`mr-20 ${
                  formik.values.mode.includes("venue")
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
              name="mode"
              value="onlineConf"
              checked={formik.values.mode.includes("onlineConf")}
              onChange={formik.handleChange}
            />
            <label htmlFor="online-conf">
              <div
                type="button"
                className={`mr-20 ${
                  formik.values.mode.includes("onlineConf")
                    ? "button-outlined-active"
                    : "button-outlined-inactive"
                }`}
              >
                Online Conference
              </div>
            </label>
          </div>
          <div className="mb-24">
            {formik.touched.mode && Boolean(formik.errors.mode) && (
              <TextError>{formik.errors.mode}</TextError>
            )}
          </div>

          <div>
            <div
            // className={`${
            //   formik.values.mode.includes("venue")
            //     ? "slow-height"
            //     : "display-none"
            // }`}
            >
              <h4>Venue Details</h4>
              <div className="grid-col-2">
                <div className="grid-1st-col">
                  <div className="material-textfield">
                    <input
                      id="venueName"
                      type="text"
                      name="venueName"
                      value={formik.values.venueName}
                      onChange={formik.handleChange}
                      placeholder=" "
                    />
                    <label>Venue Name*</label>
                  </div>
                  <div className="mb-24">
                    {formik.touched.venueName &&
                      Boolean(formik.errors.venueName) && (
                        <TextError>{formik.errors.venueName}</TextError>
                      )}
                  </div>
                </div>

                <div className="grid-2nd-col">
                  <div className="material-textfield">
                    <input
                      id="street1"
                      type="text"
                      name="street1"
                      value={formik.values.street1}
                      onChange={formik.handleChange}
                      placeholder=" "
                    />
                    <label>Address line 1</label>
                  </div>
                  <div className="mb-24">
                    {formik.touched.street1 &&
                      Boolean(formik.errors.street1) && (
                        <TextError>{formik.errors.street1}</TextError>
                      )}
                  </div>
                </div>
                <div className="grid-1st-col">
                  <div className="material-textfield">
                    <input
                      id="street2"
                      type="text"
                      name="street2"
                      value={formik.values.street2}
                      onChange={formik.handleChange}
                      placeholder=" "
                    />
                    <label>Address line 2</label>
                  </div>
                  <div className="mb-24">
                    {formik.touched.street2 &&
                      Boolean(formik.errors.street2) && (
                        <TextError>{formik.errors.street2}</TextError>
                      )}
                  </div>
                </div>
                <div className="grid-2nd-col">
                  <div className="material-textfield">
                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      placeholder=" "
                    />
                    <label>City</label>
                  </div>
                  <div className="mb-24">
                    {formik.touched.city && Boolean(formik.errors.city) && (
                      <TextError>{formik.errors.city}</TextError>
                    )}
                  </div>
                </div>
                <div className="grid-1st-col">
                  <div className="material-textfield">
                    <input
                      id="state"
                      type="text"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      placeholder=" "
                    />
                    <label>State</label>
                  </div>
                  <div className="mb-24">
                    {formik.touched.state && Boolean(formik.errors.state) && (
                      <TextError>{formik.errors.state}</TextError>
                    )}
                  </div>
                </div>
                <div className="grid-2nd-col">
                  <div className="material-textfield">
                    <input
                      id="country"
                      type="text"
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      placeholder=" "
                    />
                    <label>Country*</label>
                  </div>
                  <div className="mb-24">
                    {formik.touched.country &&
                      Boolean(formik.errors.country) && (
                        <TextError>{formik.errors.country}</TextError>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-72">
          <h2>Pricing</h2>
          <div>
            <input
              type="checkbox"
              style={{ display: "none" }}
              id="isFree"
              name="isFree"
              value="isFree"
              checked={formik.values.isFree}
              onChange={(e) => {
                formik.setFieldValue("basePrice", Number);
                formik.setFieldValue("currency", "");
                formik.handleChange(e);
              }}
            />
            <label htmlFor="isFree">
              <div
                className={`mr-20 ${
                  formik.values.isFree
                    ? "button-outlined-active"
                    : "button-outlined-inactive"
                }`}
              >
                Free
              </div>
            </label>
            <button
              type="button"
              className={`mr-20 ${
                formik.values.isFree
                  ? "button-outlined-inactive"
                  : "button-outlined-active"
              }`}
              onClick={(e) => {
                formik.setFieldValue("isFree", !formik.values.isFree);
                // formik.setFieldValue("basePrice", Number);
                // formik.setFieldValue("currency", "");
              }}
            >
              Add Baseprice
            </button>
          </div>
          <div className="mb-24">
            {/* {formik.touched.isFree && Boolean(formik.errors.isFree) && (
              <TextError>{formik.errors.isFree}</TextError>
            )} */}
          </div>

          <div className={`${formik.values.isFree ? "display-none" : ""}`}>
            <div className="grid-col-2">
              <div className="grid-1st-col">
                <h4>Currency</h4>
                <SingleSelect
                  options={[
                    { label: "USD", value: "usd" },
                    { label: "INR", value: "inr" },
                    { label: "Pound", value: "pound" },
                  ]}
                  label="currency"
                  name="currency"
                  handleChange={(option) => {
                    formik.setFieldValue("currency", option?.value);
                  }}
                />
                <div className="mb-24">
                  {formik.touched.currency &&
                    Boolean(formik.errors.currency) && (
                      <TextError>{formik.errors.currency}</TextError>
                    )}
                </div>
              </div>
              <div className="grid-2nd-col">
                <h4>Amount</h4>
                <div className="material-textfield">
                  <input
                    id="basePrice"
                    type="number"
                    name="basePrice"
                    value={formik.values.basePrice}
                    onChange={formik.handleChange}
                    placeholder=" "
                  />
                  <label>Choose Amount</label>
                </div>
                <div className="mb-24">
                  {formik.touched.basePrice &&
                    Boolean(formik.errors.basePrice) && (
                      <TextError>{formik.errors.basePrice}</TextError>
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-72">
          <button type="button" className="button button-green mr-8">
            Cancel
          </button>
          <button type="submit" className="button button-primary">
            Next
          </button>
        </section>
      </form>
    </main>
  );
}
