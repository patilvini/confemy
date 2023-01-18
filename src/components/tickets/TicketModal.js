import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import Modal from "../modal/Modal";

import CreditsIcon from "../icons/CreditsIcon";
import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import RedirectIcon from "../icons/RedirectIcon";
import ResendIcon from "../icons/ResendIcon";
import ReceiptIcon from "../icons/ReceiptIcon";

import api from "../../utility/api";

export default function TicketModal({ onDismiss, data }) {
  console.log("data tickets", data);
  const startDateObj = new Date(data?.conference?.startDate);
  const formattedStartDate = formatInTimeZone(
    startDateObj,
    data?.conference?.timezone,
    "MMM-dd-yyyy, HH:mm aa",
    { locale: enGB }
  );

  const getLocationString = () => {
    let locationStrig = "Location";
    if (data?.conference?.mode?.length > 0) {
      if (
        data?.conference?.mode?.includes("venue") &&
        data?.conference?.location
      ) {
        locationStrig = data?.conference?.location;
      }

      if (data?.conference?.mode?.includes("onlineConf")) {
        locationStrig = "Online";
      }

      if (
        data?.conference?.mode?.includes("venue") &&
        data?.conference?.mode?.includes("onlineConf")
      ) {
        locationStrig = `${data?.conference?.location} & Online`;
      }
    }
    return locationStrig;
  };

  // useEffect(() => {
  //   const getBooking = async () => {
  //     try {
  //       const r = await api.get("/conferences/bookings/" + data._id);
  //       setDetails(r.data.data.bookingDetails.attendees);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getBooking();
  // }, []);

  return (
    <Modal onDismiss={onDismiss}>
      <div className="user-ticket-modal">
        <div className="flex-vc">
          <RedirectIcon />{" "}
          <span
            style={{
              fontSize: "2rem",
              color: "#55A0FA",
            }}
            className="ml-10"
          >
            Preview
          </span>
        </div>
        <h4 className="mt-21">
          {data?.conference ? data?.conference?.title : "Ticket title"}
        </h4>
        <div className="pt-16">
          <div className="flex-vc  mb-12">
            <DateIcon className="icon-sm mr-12" />
            <span className="caption-2-regular-gray3">
              {`${formattedStartDate} GMT+4`}
            </span>
          </div>
          <div className="flex-vc  mb-12">
            <LocationIcon className="icon-sm mr-12" />
            <span className="caption-2-regular-gray3">
              {" "}
              {getLocationString()}
            </span>
          </div>
          <div className="flex-vc  mb-12">
            <CreditsIcon className="icon-sm mr-12" />
            <span className="caption-2-regular-gray3">
              {data?.conference?.credits?.length > 0
                ? `${data?.conference?.credits[0]?.quantity} credits`
                : "Credits not added"}
            </span>
          </div>
        </div>

        <div style={{ marginTop: "9rem" }} className="opposite-grid">
          <button className="button-left button button-primary">
            <ResendIcon className="icon-button" fill="#fff" />
            Resend Passes
          </button>
          <button className="button-right button button-primary">
            <ReceiptIcon className="icon-button" fill="#fff" />
            Print Receipt
          </button>
        </div>
      </div>
    </Modal>
  );
}
