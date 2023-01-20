import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import ModalX from "../modal/ModalX";

import CreditsIcon from "../icons/CreditsIcon";
import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import RedirectIcon from "../icons/RedirectIcon";
import ResendIcon from "../icons/ResendIcon";
import ReceiptIcon from "../icons/ReceiptIcon";

import api from "../../utility/api";
import PriceIcon from "../icons/PriceIcon";

export default function TicketModal({ onDismiss, userData }) {
  const [ticketDetails, setTicketDetails] = useState();
  const startDateObj = new Date(userData?.conference?.startDate);

  const formattedStartDate = formatInTimeZone(
    startDateObj,
    userData?.conference?.timezone,
    "MMM-dd-yyyy, HH:mm aa",
    { locale: enGB }
  );
  const bookingDateObj = new Date(userData?.bookingDate);
  const formattedBookingDate = formatInTimeZone(
    bookingDateObj,
    userData?.conference?.timezone,
    "MMM-dd-yyyy, HH:mm aa",
    { locale: enGB }
  );

  const getLocationString = () => {
    let locationStrig = "Location";
    if (userData?.conference?.mode?.length > 0) {
      if (
        userData?.conference?.mode?.includes("venue") &&
        userData?.conference?.location
      ) {
        locationStrig = userData?.conference?.location;
      }

      if (userData?.conference?.mode?.includes("onlineConf")) {
        locationStrig = "Online";
      }

      if (
        userData?.conference?.mode?.includes("venue") &&
        userData?.conference?.mode?.includes("onlineConf")
      ) {
        locationStrig = `${userData?.conference?.location} & Online`;
      }
    }
    return locationStrig;
  };

  const getBookingDetails = async () => {
    try {
      let { data } = await api.get(`/conferences/bookings/${userData._id}`);
      setTicketDetails(data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getBookingDetails();
  }, []);

  return (
    <ModalX onDismiss={onDismiss}>
      <div className="ut-modal-wrap">
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
        <h4 className="mt-21 mb-12">
          {userData?.conference ? userData?.conference?.title : "Ticket title"}
        </h4>
        <span className="caption-2-regular-gray3">{`Booking number : #${ticketDetails?.bookingDetails?.bookingNumber} on ${formattedBookingDate}`}</span>
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
              {userData?.conference?.credits?.length > 0
                ? `${userData?.conference?.credits[0]?.quantity} credits`
                : "Credits not added"}
            </span>
          </div>
          <div className="flex-vc  mb-12">
            <PriceIcon className="icon-sm mr-12" />
            <span className="caption-2-regular-gray3">
              {userData?.totalPrice} /-
            </span>
          </div>
        </div>
        <div>
          {ticketDetails?.bookingDetails?.attendees?.map((guest, idx) => {
            console.log("object,", ticketDetails?.bookingDetails?.attendees);
            return (
              <>
                <h4 className="mb-10 mt-24">{`Guest ${idx + 1}`}</h4>
                <div className="caption-2-regular-gray3">
                  <div className="flex-vc">
                    <p className="caption-1-heavy-cblack my-6">{`First Name : `}</p>
                    <p className="ml-10">{guest.firstName}</p>
                  </div>
                  <div className="flex-vc">
                    <p className="caption-1-heavy-cblack ">{`Last Name : `}</p>
                    <p className="ml-10">{guest.lastName}</p>
                  </div>
                  <div className="flex-vc my-6">
                    <p className="caption-1-heavy-cblack">{`Email : `}</p>
                  </div>
                  <p className="caption-1-heavy-cblack">{`Tickest Details : `}</p>
                  <div className="flex-vc">
                    <p className="my-6 mr-5">Ticket Name : </p>
                    <p className="ml-5">{guest?.ticket?.name}</p>
                  </div>
                  <div className="flex-vc">
                    <p className="mr-5">Ticket Price : </p>
                    <p>{guest?.ticket?.price}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="flex-vc-sb mt-40">
        <div className="user-ticket-resend flex-vchc">
          <ResendIcon className="icon-button" fill="#fff" />
          <p className="ml-4 avenir-roman-18 ">Resend Tickets</p>
        </div>
        <div className="user-ticket-print flex-vchc ">
          <ReceiptIcon className="icon-button" fill="#fff" />
          <p className="ml-4 avenir-roman-18 ">Print Receipt</p>
        </div>
      </div>
    </ModalX>
  );
}
