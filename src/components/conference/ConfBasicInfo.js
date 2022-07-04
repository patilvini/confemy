import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";

import "./createConference.styles.scss";

const initialValues = {
  title: "",
  format: [],

  host: "",

  timezone: "",
  startDate: Date,
  startTime: Date,
  endDate: Date,
  endTime: Date,

  mode: "",
  venueName: "",
  street1: "",
  street2: "",
  state: "",
  country: "",
  city: "",

  currency: "",
  basePrice: Number,
};

const validationSchema = yup.object({
  title: yup.string().required("Required"),
});

export default function ConfBasicInfo() {
  const user = useSelector((state) => state.auth.user);

  function onSubmit(values, actions) {
    const {
      title,
      format,
      host,
      currency,
      basePrice,
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
        format,
        host,
        userId: user.id,
        startDate: startTime,
        endDate: endTime,
        timezone,
        mode,
        type: host,
        venue: {
          name: venueName,
          street1,
          street2,
          city,
          state,
          country,
        },
        currency,
        basePrice,
      },
    };
    console.log(values);
  }
  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  console.log("formik object", formik);

  return (
    <div className="conf-form-wrap">
      <form
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div>
          <h2>Basic Info</h2>
          <h4>Title</h4>
          <div>
            <div>
              <input
                id="title"
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder="Conference Title*"
              />
            </div>
            {formik.touched.title && Boolean(formik.errors.title) && (
              <TextError>{formik.errors.title}</TextError>
            )}
          </div>
          <h4>Hosted by</h4>
          <button type="button" className="button-outlined-inactive  mr-20">
            Organization
          </button>
          <button type="button" className="button-outlined-inactive">
            Self or User
          </button>
        </div>
        <div>
          <h2>Conference Schedule</h2>
          <div>
            <div>
              <input
                id="startDate"
                type="date"
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.startDate && Boolean(formik.errors.startDate) && (
              <TextError>{formik.errors.startDate}</TextError>
            )}
          </div>

          <div>
            <div>
              <input
                id="startTime"
                type="time"
                name="startTime"
                value={formik.values.startTime}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.startTime && Boolean(formik.errors.startTime) && (
              <TextError>{formik.errors.startTime}</TextError>
            )}
          </div>
          <div>
            <div>
              <input
                id="endDate"
                type="date"
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.endDate && Boolean(formik.errors.endDate) && (
              <TextError>{formik.errors.endDate}</TextError>
            )}
          </div>
          <div>
            <div>
              <input
                id="endTime"
                type="time"
                name="endTime"
                value={formik.values.endTime}
                onChange={formik.handleChange}
                placeholder="Conference Start Time*"
              />
            </div>
            {formik.touched.endTime && Boolean(formik.errors.endTime) && (
              <TextError>{formik.errors.endTime}</TextError>
            )}
          </div>
        </div>
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
                type="button"
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
            <h4>Venue Details</h4>
            <div>
              <input
                id="venueName"
                type="text"
                name="venueName"
                value={formik.values.venueName}
                onChange={formik.handleChange}
                placeholder="Venue Name*"
              />
            </div>
            {formik.touched.venueName && Boolean(formik.errors.venueName) && (
              <TextError>{formik.errors.venueName}</TextError>
            )}
          </div>

          <div>
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div>
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
        <div>
          <h2>Pricing</h2>
          <button type="button" className="button-outlined-inactive mr-20">
            Free
          </button>
          <button type="button" className="button-outlined-inactive">
            Set Baseprice
          </button>
          <div>
            <div>
              <input
                id="currency"
                type="text"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                placeholder="Choose currency"
              />
            </div>
            {formik.touched.currency && Boolean(formik.errors.currency) && (
              <TextError>{formik.errors.currency}</TextError>
            )}
          </div>
          <div>
            <div>
              <input
                id="basePrice"
                type="text"
                name="basePrice"
                value={formik.values.basePrice}
                onChange={formik.handleChange}
                placeholder="Choose Amount"
              />
            </div>
            {formik.touched.basePrice && Boolean(formik.errors.basePrice) && (
              <TextError>{formik.errors.basePrice}</TextError>
            )}
          </div>
        </div>
        <button type="button" className="button button-green">
          Cancel
        </button>
        <button type="submit" className="button button-primary">
          Next
        </button>
      </form>
    </div>
  );
}
