import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";

import { useNavigate } from "react-router-dom";

import DateView from "react-datepicker";
import DatePicker from "react-datepicker";
import { CalendarContainer } from "react-datepicker";
import { forwardRef } from "react";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getYear";
import CustomDatepicker from "../react-datepicker/CustomDatepicker";

// import "react-datepicker/dist/react-datepicker.css";

import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import CreditsIcon from "../icons/CreditsIcon";
import PriceIcon from "../icons/PriceIcon";
import RadioIcon from "../icons/RadioIcon";
import RadioFilledIcon from "../icons/RadioFilled";
import Modal from "../modal/Modal";

import { createConferenceAction } from "../../redux/conference/conferenceAction";
import { alertAction } from "../../redux/alert/alertAction";

import api from "../../utility/api";
import "./createConference.styles.scss";

const validationSchema = yup.object().shape({});

export default function ConfPreview() {
  const [open, setopen] = useState(false);
  const newConference = useSelector((state) => state.conference.newConference);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    const formData = {
      conferenceDetails: {
        conferenceId: newConference._id,
        whenToPublish: values.whenToPublish,
        publishDate: values.publishDate,
      },
    };
    try {
      const response = await api.post("conferences/step6", formData);
      if (response) {
        console.log("submit step1 response", response);
        dispatch(createConferenceAction(response.data.data.conference));
        navigate("/dashboard/create-conf/step-2");
        dispatch(alertAction(response.data.message, "success"));
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };
  const formik = useFormik({
    initialValues: {
      whenToPublish: "",
      publishDate: new Date(),
    },
    onSubmit: onSubmit,
    // validationSchema: validationSchema,
  });

  const getLocationString = () => {
    let locationStrig = "Location";
    if (newConference?.mode?.length > 0) {
      if (newConference?.mode?.includes("venue") && newConference?.venue.city) {
        locationStrig = newConference?.venue.city;
        console.log("venue", locationStrig);
      }

      if (newConference?.mode?.includes("onlineConf")) {
        locationStrig = "Online";
        console.log("online", locationStrig);
      }

      if (
        newConference?.mode?.includes("venue") &&
        newConference?.mode?.includes("onlineConf")
      ) {
        locationStrig = `${newConference?.venue.city} & Online`;
        console.log("both", locationStrig);
      }
    }
    return locationStrig;
  };

  const openModal = () => {
    setopen(true);
  };
  const closeModal = () => {
    setopen(false);
  };

  const MyContainer = ({ className, children }) => {
    return (
      <div
        style={{
          padding: "8px",
          background: "#216ba5",
          color: "#fff",
        }}
      >
        <CalendarContainer className={className}>
          <div>Pick a date to publish the conference</div>
          <div
            style={{
              position: "relative",
              fontSize: 14,
              width: 350,
              height: 250,
            }}
          >
            {children}
          </div>
        </CalendarContainer>
      </div>
    );
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="button button-primary" onClick={onClick} ref={ref}>
      pick date to publish
      {value}
    </button>
  ));

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

  return (
    <div>
      <h2 className="mb-32 color-primary">Preview and publish conference</h2>
      <div className="preview-imgcard-wrap mb-44">
        <div className="preview-img-wrap">
          {newConference?.banner?.length > 0 ? (
            <img
              className="preview-img"
              alt="preview"
              src={newConference?.banner[0]?.Location}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                padding: 40,
                backgroundColor: "#ecf0f2",
              }}
            >
              <div className="text-align-center">
                <h4>Add Banner to improve visibility through Details 2 step</h4>
              </div>
            </div>
          )}
        </div>
        <div className="preview-card">
          <div style={{ flex: 1 }}>
            <div className="confcard-header mb-8">
              <p>
                {newConference?.title
                  ? newConference?.title
                  : "Conference title"}
              </p>
            </div>
            <div className="confcard-body">
              <div className="flex-vc  mb-12">
                <DateIcon className="icon-xxs mr-12" />
                <span className="caption-2-regular-gray3">
                  {newConference?.startDate ? newConference?.startDate : "Date"}
                </span>
              </div>
              <div className="flex-vc  mb-12">
                <LocationIcon className="icon-xxs mr-12" />
                <span className="caption-2-regular-gray3">
                  {getLocationString()}
                </span>
              </div>
              <div className="flex-vc  mb-12">
                <CreditsIcon className="icon-xxs mr-12" />
                <span className="caption-2-regular-gray3">
                  {newConference?.credits?.length > 0
                    ? `${newConference?.credits[0].creditId.name} - ${newConference?.credits[0].quantity}`
                    : "Credits not added"}
                </span>
              </div>
              <div className="flex-vc ">
                <PriceIcon className="icon-xxs mr-12" />
                <span className="caption-2-regular-gray3">
                  {newConference?.currency && newConference?.basePrice > 0
                    ? `${newConference?.currency} -  
                    ${newConference?.basePrice}`
                    : newConference?.currency && newConference?.basePrice === 0
                    ? "Free conference"
                    : "Price"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <button onClick={openModal} className="button button-primary mt-24">
              Preview
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="confcard-header mb-18">
          When should we publish your event?
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex-column mb-16">
            <label className="body-regular-gray3 flex-vc mb-18">
              <input
                style={{ appearance: "none" }}
                type="radio"
                id="publishNow"
                name="whenToPublish"
                value="now"
                onChange={formik.handleChange}
              />
              {formik.values.whenToPublish === "now" ? (
                <RadioFilledIcon className="icon-size  mr-12" />
              ) : (
                <RadioIcon className="icon-size  mr-12" />
              )}
              Publish now
            </label>
            <label className="body-regular-gray3 flex-vc mb-18">
              <input
                style={{ appearance: "none" }}
                type="radio"
                id="publishLater"
                name="whenToPublish"
                value="later"
                onChange={formik.handleChange}
              />
              {formik.values.whenToPublish === "later" ? (
                <RadioFilledIcon className="icon-size  mr-12" />
              ) : (
                <RadioIcon className="icon-size  mr-12" />
              )}
              Pubish later
            </label>
          </div>
          <div className="mb-72">
            {/* <DatePicker
              id="publishDate"
              name="publishDate"
              selected={formik.values.publishDate}
              onChange={(date) => formik.setFieldValue("publishDate", date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              showYearDropdown
              dropdownMode="select"
              // showMonthDropdown
              // peekNextMonth
              calendarContainer={MyContainer}
              customInput={<ExampleCustomInput />}
            ></DatePicker>*/}
          </div>

          <div className="mb-72" style={{ fontSize: 18 }}>
            <CustomDatepicker
              selected={formik.values.publishDate}
              onChange={(date) => formik.setFieldValue("publishDate", date)}
              minDate={new Date()}
              maxDate={jsStartDateObj}
            />
          </div>
          <div>
            <button type="submit" className="button button-primary">
              Publish Conference
            </button>
          </div>
        </form>
      </div>

      {open && (
        <Modal>
          <div>
            <div>Show Modal content</div>
            <button onClick={closeModal} className="button button-primary">
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
