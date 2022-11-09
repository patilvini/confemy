import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";
// import { formatInTimeZone } from "date-fns-tz";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

import TextError from "../formik/TextError";
import DateView from "react-datepicker";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import api from "../../utility/api";

import SelectFormType1 from "../reselect/SelectFormType1";

import { createConferenceAction } from "../../redux/conference/conferenceAction";
import { timezones, currencylist } from "../../utility/commonUtil";
import "./createConference.styles.scss";
import { loadMyOrganizationsSelectListAction } from "../../redux/organization/myOrganizationsAction";
import { alertAction } from "../../redux/alert/alertAction";
import CustomDatepicker from "../react-datepicker/CustomDatepicker";
import SubmitCancelButtonWithLoader from "../button/SubmitCancelButtonWithLoader";

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
  // startTime: yup.date().required("Required").nullable(),
  endDate: yup.date().required("Required").nullable(),
  // endTime: yup.date().required("Required").nullable(),
  timezone: yup.string().required("Required"),
  mode: yup
    .array()
    .of(yup.string())
    .min(1, "Choose a conference location")
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
  zipcode: yup.string().when("mode", {
    is: (mode) => mode.includes("venue"),
    then: yup.string().required("Required"),
  }),
  // currency: yup.string().when("isFree", {
  //   is: false,
  //   then: yup.string().required("Required"),
  // }),
  // isFree: yup.boolean(),
  // basePrice: yup
  //   .number()
  //   .nullable(true)
  //   .transform((v) => (v === "" ? null : v))
  //   .when("isFree", {
  //     is: false,
  //     then: yup
  //       .number("Give a valid number")
  //       .typeError("Enter a number")
  //       .required("Required")
  //       .positive("Enter amount more than 0"),
  //   }),
});

export default function ConfBasicInfo() {
  // const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const conference = useSelector((state) => state.conference);
  const { newConference } = conference;
  const organizationsListForSelect = useSelector(
    (state) => state.myOrganizations.organizationsListForSelect
  );

  async function onSubmit(values, actions) {
    const {
      title,
      host,
      organizationId,

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
      zipcode,
    } = values;

    const utcDate = zonedTimeToUtc(startDate, timezone); // In June 10am in Los Angeles is 5pm UTC
    console.log(utcDate.toISOString()); // post 2014-06-25T17:00:00.000Z, America/Los_Angeles

    const apiDate = utcToZonedTime(utcDate.toISOString(), timezone);
    console.log("api", apiDate);

    const formData = {
      conferenceDetails: {
        title,
        conferenceId: newConference?._id,
        organizationId,
        userId: user._id,
        startDate: zonedTimeToUtc(startDate, timezone).toISOString(),
        endDate: zonedTimeToUtc(endDate, timezone).toISOString(),
        startTime,
        endTime,
        timezone,
        mode,
        host,
        venue: {
          venueName,
          street1,
          street2,
          city,
          state,
          country,
          zipcode,
        },
      },
    };
    console.log("formData", formData);
    try {
      const response = await api.post("conferences/step1", formData);
      if (response) {
        console.log("submit step1 response", response);
        dispatch(createConferenceAction(response.data.data.conference));
        navigate("/dashboard/create-conf/step-2");
        dispatch(alertAction(response.data.message, "success"));
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  }

  function getJsDateObj(str) {
    let jsDateObj;
    if (str) {
      jsDateObj = new Date(str);
    } else {
      jsDateObj = null;
    }
    return jsDateObj;
  }

  const jsStartDateObj = getJsDateObj(newConference?.startDate);
  const jsEndDateObj = getJsDateObj(newConference?.endDate);
  const jsStartTimeObj = getJsDateObj(newConference?.startTime);
  const jsEndTimeObj = getJsDateObj(newConference?.endTime);

  const formik = useFormik({
    initialValues: {
      title: newConference?.title || "",
      host: newConference?.host || "",
      organizationId: newConference?.hostedBy?.organization || "",
      startDate:
        utcToZonedTime(newConference?.startDate, newConference?.timezone) ||
        null,
      // startDate: newDateToDisplay || null,
      // startTime: jsStartTimeObj || null,
      endDate:
        utcToZonedTime(newConference?.endDate, newConference?.timezone) || null,
      // endDate: jsEndDateObj || null,
      // endTime: jsEndTimeObj || null,
      timezone: newConference?.timezone || "",

      mode: newConference?.mode || [],
      venueName: newConference?.venue?.venueName || "",
      street1: newConference?.venue?.street1 || "",
      street2: newConference?.venue?.street2 || "",
      state: newConference?.venue?.state || "",
      country: newConference?.venue?.country || "",
      city: newConference?.venue?.city || "",
      zipcode: newConference?.venue?.zipcode || "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  const loadMyOrgnizations = async (id) => {
    const url = `organizations/users/${id}?orgForConference=true`;
    try {
      const response = await api.get(url);
      if (response) {
        dispatch(
          loadMyOrganizationsSelectListAction(response.data?.data?.organization)
        );
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  useEffect(() => {
    loadMyOrgnizations(user._id);
  }, [user._id]);

  return (
    <>
      <main className="conf-form-wrap">
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="form-type-1 mb-72">
            <h2>Basic Information</h2>
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
                formik.values.host === "organization" ? "" : "display-none"
              }`}
            >
              <SelectFormType1
                label="organizationId"
                options={organizationsListForSelect}
                name="organizationId"
                onChange={(value) =>
                  formik.setFieldValue("organizationId", value?.value)
                }
                placeholder="Select organization"
                value={formik.values.organizationId}
                isDisabled={formik.values.host !== "organization"}
              />

              <div>
                {formik.touched.organizationId &&
                  Boolean(formik.errors.organizationId) && (
                    <TextError>{formik.errors.organizationId}</TextError>
                  )}
              </div>
            </div>
          </div>
          <div className="conf-schedule mb-72">
            <h2>Conference Schedule</h2>

            <div className="grid-col-2">
              <div className="grid-1st-col">
                <h4>Start Date and Time</h4>
                <CustomDatepicker
                  id="startDate"
                  name="startDate"
                  selected={formik.values.startDate}
                  onChange={(date) => formik.setFieldValue("startDate", date)}
                  minDate={new Date()}
                  maxDate={formik.values.endDate}
                  placeholder="Pick start date and time"
                  disabled={false}
                />
                <div className="mb-24">
                  {formik.touched.startDate &&
                    Boolean(formik.errors.startDate) && (
                      <TextError>{formik.errors.startDate}</TextError>
                    )}
                </div>
              </div>
              {/* <div className="grid-2nd-col">
                <h4>Start time</h4>
                <DatePicker
                  id="startTime"
                  wrapperClassName="mydate-picker"
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
              </div> */}
              <div className="grid-2nd-col">
                <h4>End Date and Time</h4>
                <CustomDatepicker
                  id="endDate"
                  name="endDate"
                  selected={formik.values.endDate}
                  onChange={(date) => formik.setFieldValue("endDate", date)}
                  minDate={formik.values.startDate}
                  placeholder="Pick end date and time"
                  disabled={false}
                />
                <div className="mb-24">
                  {formik.touched.endDate && Boolean(formik.errors.endDate) && (
                    <TextError>{formik.errors.endDate}</TextError>
                  )}
                </div>
              </div>
              {/* <div className="grid-2nd-col">
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
              </div> */}
              <div className="grid-1st-col">
                <h4>Timezone</h4>

                <SelectFormType1
                  label="timezone"
                  options={timezones}
                  name="timezone"
                  onChange={(value) =>
                    formik.setFieldValue("timezone", value?.value)
                  }
                  placeholder="Select conference timezone"
                  value={formik.values.timezone}
                />
                <div className="mb-24">
                  {formik.touched.timezone &&
                    Boolean(formik.errors.timezone) && (
                      <TextError>{formik.errors.timezone}</TextError>
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-72">
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
                  Pick Venue
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

            <div className="form-type-1">
              <div
                className={`${
                  formik.values.mode.includes("venue")
                    ? "slow-height"
                    : "display-none"
                }`}
              >
                <h4>Venue Details</h4>
                <div className="grid-col-2">
                  <div style={{ gridColumn: "1/-1" }}>
                    <div className="material-textfield">
                      <input
                        id="venueName"
                        type="text"
                        name="venueName"
                        value={formik.values.venueName}
                        onChange={formik.handleChange}
                        placeholder=" "
                        disabled={!formik.values.mode.includes("venue")}
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

                  <div className="grid-1st-col">
                    <div className="material-textfield">
                      <input
                        id="street1"
                        type="text"
                        name="street1"
                        value={formik.values.street1}
                        onChange={formik.handleChange}
                        placeholder=" "
                        disabled={!formik.values.mode.includes("venue")}
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
                  <div className="grid-2nd-col">
                    <div className="material-textfield">
                      <input
                        id="street2"
                        type="text"
                        name="street2"
                        value={formik.values.street2}
                        onChange={formik.handleChange}
                        placeholder=" "
                        disabled={!formik.values.mode.includes("venue")}
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
                  <div className="grid-1st-col">
                    <div className="material-textfield">
                      <input
                        id="city"
                        type="text"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        placeholder=" "
                        disabled={!formik.values.mode.includes("venue")}
                      />
                      <label>City</label>
                    </div>
                    <div className="mb-24">
                      {formik.touched.city && Boolean(formik.errors.city) && (
                        <TextError>{formik.errors.city}</TextError>
                      )}
                    </div>
                  </div>
                  <div className="grid-2nd-col">
                    <div className="material-textfield">
                      <input
                        id="state"
                        type="text"
                        name="state"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        placeholder=" "
                        disabled={!formik.values.mode.includes("venue")}
                      />
                      <label>State</label>
                    </div>
                    <div className="mb-24">
                      {formik.touched.state && Boolean(formik.errors.state) && (
                        <TextError>{formik.errors.state}</TextError>
                      )}
                    </div>
                  </div>
                  <div className="grid-1st-col">
                    <div className="material-textfield">
                      <input
                        id="country"
                        type="text"
                        name="country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        placeholder=" "
                        disabled={!formik.values.mode.includes("venue")}
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
                  <div className="grid-2nd-col">
                    <div className="material-textfield">
                      <input
                        id="zipcode"
                        type="text"
                        name="zipcode"
                        value={formik.values.zipcode}
                        onChange={formik.handleChange}
                        placeholder=" "
                        disabled={!formik.values.mode.includes("venue")}
                      />
                      <label>Zip Code*</label>
                    </div>
                    <div className="mb-24">
                      {formik.touched.zipcode &&
                        Boolean(formik.errors.zipcode) && (
                          <TextError>{formik.errors.zipcode}</TextError>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-72">
            <SubmitCancelButtonWithLoader isSubmitting={formik.isSubmitting} />
          </div>
        </form>
      </main>
    </>
  );
}
