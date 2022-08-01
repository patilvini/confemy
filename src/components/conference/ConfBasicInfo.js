import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import TextError from "../formik/TextError";
import DateView from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import api from "../../utility/api";
import "./createConference.styles.scss";
import TimeZones from "../timezones/TimeZones";
import PassesIcon from "../icons/PassesIcon";

const options = [
  { value: "AED", label: "Arabic Dirham" },
  { value: "AFN", label: "Afghani" },
  { value: "ALL", label: "Lek" },
  { value: "AMD", label: "Dram" },
  { value: "ANG", label: "Netherlands Antillean Guilder" },
  { value: "AOA", label: "Kwanza" },
  { value: "ARS", label: "Argentine Peso" },
  { value: "AUD", label: "Australian Dollar" },
  { value: "AWG", label: "Guilder" },
  { value: "AZN", label: "Manat" },
  { value: "BAM", label: "Convertible Mark" },
  { value: "BBD", label: "Barbadian Dollar" },
  { value: "BDT", label: "Taka" },
  { value: "BGN", label: "Bulgarian Lev" },
  { value: "BHD", label: "Bahrain Dinar" },
  { value: "BIF", label: "Burundi Franc" },
  { value: "BMD", label: "Bermudian Dollar" },
  { value: "BND", label: "Brunei Dollar" },
  { value: "BOB", label: "Boliviano" },
  { value: "BRL", label: "Real" },
  { value: "BSD", label: "Bahamian Dollar" },
  { value: "BTN", label: "Ngultrum" },
  { value: "BWP", label: "Pula" },
  { value: "BYR", label: "Belarus Rubel" },
  { value: "BZD", label: "Belize Dollar" },
  { value: "CAD", label: "Canadian Dollar" },
  { value: "CDF", label: "Congolais Franc" },
  { value: "CHF", label: "Swiss Franc" },
  { value: "CKD", label: "Cook Dollar" },
  { value: "CLP", label: "Chilean Peso" },
  { value: "CNY", label: "Renminbi Yuan" },
  { value: "COP", label: "Colombian Peso" },
  { value: "CRC", label: "Colón" },
  { value: "CUP", label: "Cuban Peso" },
  { value: "CVE", label: "Cape Verdean Escudo" },
  { value: "CZK", label: "Czech Krone" },
  { value: "DJF", label: "Djibouti Franc" },
  { value: "DKK", label: "Danish Krone" },
  { value: "DOP", label: "Dominican Peso" },
  { value: "DZD", label: "Algerian Dinar" },
  { value: "EGP", label: "Egypt Pound" },
  { value: "ERN", label: "Nakfa" },
  { value: "ETB", label: "Birr" },
  { value: "EUR", label: "Euro" },
  { value: "FJD", label: "Fidschi Dollar" },
  { value: "FKP", label: "Falklands Pound" },
  { value: "FOK", label: "Faroese Krona" },
  { value: "GBP", label: "Sterling Pound" },
  { value: "GEL", label: "Georgian Lari" },
  { value: "GGP", label: "Guernsey Pound" },
  { value: "GHS", label: "Ghana Cedi" },
  { value: "GIP", label: "Gibraltar Pound" },
  { value: "GMD", label: "Dalasi" },
  { value: "GNF", label: "Guinea Franc" },
  { value: "GTQ", label: "Quetzal" },
  { value: "GYD", label: "Guyana Dollar" },
  { value: "HKD", label: "Hong Kong Dollar" },
  { value: "HNL", label: "Lempira" },
  { value: "HRK", label: "Kuna" },
  { value: "HTG", label: "Gourde" },
  { value: "HUF", label: "Hungarian Forint" },
  { value: "IDR", label: "Indonesian Rupiah" },
  { value: "ILS", label: "Israeli Shekel" },
  { value: "IMP", label: "Manx Pound" },
  { value: "INR", label: "Indian Rupee" },
  { value: "IQD", label: "Iraqi Dinar" },
  { value: "IRR", label: "Iranian Rial" },
  { value: "ISK", label: "Icelandic Krone" },
  { value: "JEP", label: "Jersey Sterling Pound" },
  { value: "JMD", label: "Jamaica Dollar" },
  { value: "JOD", label: "Jordanian Dinar" },
  { value: "JPY", label: "Japanese Yen" },
  { value: "KES", label: "Kenian Schilling" },
  { value: "KGS", label: "Som" },
  { value: "KHR", label: "Cambodian Riel" },
  { value: "KID", label: "Kiribati Dollar" },
  { value: "KMF", label: "Comorian Franc" },
  { value: "KPW", label: "Won" },
  { value: "KRW", label: "Won" },
  { value: "KWD", label: "Kuwaiti Dinar" },
  { value: "KYD", label: "Cayman Dollar" },
  { value: "KZT", label: "Tenge" },
  { value: "LAK", label: "Kip" },
  { value: "LBP", label: "Lebanese Pound" },
  { value: "LKR", label: "Sri Lanka Rupee" },
  { value: "LRD", label: "Liberian Dollar" },
  { value: "LSL", label: "Lesotho Loti" },
  { value: "LYD", label: "Libyan Dinar" },
  { value: "MAD", label: "Moroccan Dirham" },
  { value: "MDL", label: "Leu" },
  { value: "MGA", label: "Malagasy Ariary" },
  { value: "MKD", label: "Denar" },
  { value: "MMK", label: "Kyat" },
  { value: "MNT", label: "Tugrik" },
  { value: "MOP", label: "Macanese Pataca" },
  { value: "MRO", label: "Ouguiya" },
  { value: "MUR", label: "Mauritian Rupee" },
  { value: "MVR", label: "Maldivian Rufiyaa" },
  { value: "MWK", label: "Kwacha" },
  { value: "MXN", label: "Mexican Peso" },
  { value: "MYR", label: "Ringgit" },
  { value: "MZN", label: "Metical" },
  { value: "NAD", label: "Namibian Dollar" },
  { value: "NGN", label: "Naira" },
  { value: "NIO", label: "Córdoba Oro" },
  { value: "NOK", label: "Norwegian Krone" },
  { value: "NPR", label: "Nepalese Rupee" },
  { value: "NZD", label: "New Zealand Dollar" },
  { value: "OMR", label: "Omani Rial" },
  { value: "PAB", label: "Panamanian Balboa" },
  { value: "PEN", label: "Nuevo Sol" },
  { value: "PGK", label: "Kina" },
  { value: "PHP", label: "Philippine Peso" },
  { value: "PKR", label: "Pakistanian Rupee" },
  { value: "PLN", label: "Zloty" },
  { value: "PYG", label: "Guaraní" },
  { value: "QAR", label: "Qatari Rial" },
  { value: "RON", label: "Leu" },
  { value: "RSD", label: "Serbian Dinar" },
  { value: "RUB", label: "Russian Rubel" },
  { value: "RWF", label: "Rwandan Franc" },
  { value: "SAR", label: "Saudi Rial" },
  { value: "SBD", label: "Salomon Dollar" },
  { value: "SCR", label: "Seychelles Rupee" },
  { value: "SDG", label: "Sudanese Pound" },
  { value: "SEK", label: "Swedish Krone" },
  { value: "SGD", label: "Singapore Dollar" },
  { value: "SHP", label: "St.-Helena Pound" },
  { value: "SLL", label: "Leone" },
  { value: "SOS", label: "Somalian Shilling" },
  { value: "SRD", label: "Surinam Dollar" },
  { value: "SSP", label: "South Sudanese Pound" },
  { value: "STD", label: "Dobra" },
  { value: "SYP", label: "Syrian Pound" },
  { value: "SZL", label: "Swazi Lilangeni" },
  { value: "THB", label: "Thai Baht" },
  { value: "TJS", label: "Somoni" },
  { value: "TMT", label: "Manat" },
  { value: "TND", label: "Tunesian Dinar" },
  { value: "TOP", label: "Pa'anga" },
  { value: "TRY", label: "Turkish Lira" },
  { value: "TTD", label: "Trinidad and Tobago Dollar" },
  { value: "TVD", label: "Tuvaluan Dollar" },
  { value: "TWD", label: "New Taiwan Dollar" },
  { value: "TZS", label: "Tansanian Shilling" },
  { value: "UAH", label: "Hrywnja" },
  { value: "UGX", label: "Ugandan Schilling" },
  { value: "USD", label: "US Dollar" },
  { value: "UYU", label: "Uruguay Peso" },
  { value: "UZS", label: "Uzbekistan Sum" },
  { value: "VEF", label: "Bolívar fuerte" },
  { value: "VND", label: "Dong" },
  { value: "VUV", label: "Vatu" },
  { value: "WST", label: "Tala" },
  { value: "XAF", label: "Central African Franctied to: Euro" },
  { value: "XCD", label: "East Caribbean Dollar" },
  { value: "XOF", label: "West African Franctied to: Euro" },
  { value: "XPF", label: "Pacific Franctied to: Euro" },
  { value: "YER", label: "Jemen Rial" },
  { value: "ZAR", label: "South African Rand" },
  { value: "ZMW", label: "Zambian Kwacha" },
  { value: "ZWL", label: "Zimbabwe Dollar" },
];

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
  console.log(user._id);

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
    let organizationId = "62d7e94dc98888b8b9fbe48c";

    const formData = {
      conferenceDetails: {
        title,
        userId: user._id,
        organizationId,
        currency:currency.value,
        basePrice,
        startDate,
        endDate,
        isFree,
        startTime,
        endTime,
        timezone,
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
          <TimeZones
            label="timezone"
            // value={formik.values.timezone}
            handleChange={(value) => {
              formik.setFieldValue("timezone", value.value);
            }}
          />

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
              <Select
            
            label="currency"
            // name="profession"
            options={options}
            onChange={(value) => {
              console.log("value from onchange handler", value);
              formik.setFieldValue("currency", value);
            }}
            value={formik.values.currency}
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
