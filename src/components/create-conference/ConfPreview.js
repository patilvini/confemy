import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

import { useNavigate } from "react-router-dom";
import CustomDatepicker from "../react-datepicker/CustomDatepicker";

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
import SubmitButtonWithLoader from "../button/SubmitButtonWithLoader";

const validationSchema = yup.object().shape({
  whenToPublish: yup
    .string()
    .required("Required, pick when to publish the conference, now or later"),
  publishDate: yup
    .date()
    .nullable()
    .when("whenToPublish", {
      is: (val) => val === "later",
      then: yup
        .date()
        .typeError("Enter a valid date to publish")
        .required("Required, pick when to publish the conference"),
      otherwise: yup.date().notRequired().nullable(),
    }),
});

export default function ConfPreview() {
  const [open, setopen] = useState(false);
  const newConference = useSelector((state) => state.conference.newConference);
  const { completedStep1, completedStep2, completedStep3, completedStep5 } =
    newConference;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    if (
      !completedStep1 ||
      !completedStep2 ||
      !completedStep3 ||
      !completedStep5
    ) {
      dispatch(
        alertAction(
          `Except Live Stream page, all steps are required to be completed before publishing the conference.`,
          "danger"
        )
      );
      return;
    }

    const formData = {
      conferenceDetails: {
        conferenceId: newConference._id,
        whenToPublish: values.whenToPublish,
        // publishDate: values.publishDate,
        publishDate: zonedTimeToUtc(
          values.publishDate,
          newConference?.timezone
        ).toISOString(),
      },
    };
    try {
      const response = await api.post("conferences/step6", formData);
      if (response) {
        console.log("submit step1 response", response);
        dispatch(createConferenceAction(response.data.data.conference));
        navigate("/dashboard/my-conferences");
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
    validationSchema: validationSchema,
  });

  const getLocationString = () => {
    let locationStrig = "Location";
    if (newConference?.mode?.length > 0) {
      if (newConference?.mode?.includes("venue") && newConference?.city) {
        locationStrig = newConference?.city;
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
        locationStrig = `${newConference?.city} & Online`;
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

  // function getJsDateObj(str) {
  //   let jsDateObj;
  //   if (str) {
  //     jsDateObj = new Date(str);
  //   } else {
  //     jsDateObj = null;
  //   }
  //   return jsDateObj;
  // }

  // const jsStartDateObj = getJsDateObj(newConference?.startDate);

  let apiStartDate;
  if (newConference?.startDate && newConference?.timezone) {
    apiStartDate = utcToZonedTime(
      newConference?.startDate,
      newConference?.timezone
    );
  } else {
    apiStartDate = null;
  }

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
          <div>
            <div className="preview-label-wrap mb-18">
              <label className="body-regular-gray3">
                <div className="flex-vc">
                  <input
                    style={{ appearance: "none" }}
                    type="radio"
                    id="publishNow"
                    name="whenToPublish"
                    value="now"
                    onChange={(e) => {
                      const date = new Date();
                      if (formik.values.whenToPublish === "now") {
                        formik.setFieldValue("publishDate", date);
                      }
                      formik.handleChange(e);
                    }}
                  />
                  {formik.values.whenToPublish === "now" ? (
                    <RadioFilledIcon className="icon-size  mr-12" />
                  ) : (
                    <RadioIcon className="icon-size  mr-12" />
                  )}
                  Publish now
                </div>
              </label>
            </div>
            <div className="preview-label-wrap mb-18">
              <label className="body-regular-gray3  mb-18">
                <div className="flex-vc">
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
                </div>
              </label>
            </div>
            {formik.touched.whenToPublish &&
              Boolean(formik.errors.whenToPublish) && (
                <TextError>{formik.errors.whenToPublish}</TextError>
              )}
          </div>
          <div className="mb-72">
            <div
              className={
                formik.values.whenToPublish !== "later"
                  ? "display-none"
                  : "publish-date-wrap"
              }
            >
              <CustomDatepicker
                selected={formik.values.publishDate}
                onChange={(date) => formik.setFieldValue("publishDate", date)}
                minDate={new Date()}
                // maxDate={utcToZonedTime(
                //   newConference?.startDate,
                //   newConference?.timezone
                // )}
                maxDate={apiStartDate}
                placeholder="Pick date to publish"
                disabled={formik.values.whenToPublish === "now"}
              />
              {formik.touched.publishDate &&
                Boolean(formik.errors.publishDate) && (
                  <TextError>{formik.errors.publishDate}</TextError>
                )}
            </div>
          </div>
          <div>
            <SubmitButtonWithLoader
              isSubmitting={formik.isSubmitting}
              className="button button-primary"
              text="Publish conference"
            />
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
