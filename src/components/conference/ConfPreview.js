import { useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import TextError from "../formik/TextError";

import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import CreditsIcon from "../icons/CreditsIcon";
import PriceIcon from "../icons/PriceIcon";
import RadioIcon from "../icons/RadioIcon";
import RadioFilledIcon from "../icons/RadioFilled";
import Modal from "../modal/Modal";

import "./createConference.styles.scss";

const validationSchema = yup.object().shape({});

export default function ConfPreview() {
  const [open, setopen] = useState(false);
  const newConference = useSelector((state) => state.conference.newConference);

  const onSubmit = (values, actions) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues: {
      whenToPublish: "",
      publishDate: Date,
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
                    ? newConference?.credits[0].creditId.name
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
          <div className="mb-80">
            <input type="Date" />
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
