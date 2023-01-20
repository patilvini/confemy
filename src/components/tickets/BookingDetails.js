import { useDispatch } from "react-redux";
import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import CreditsIcon from "../icons/CreditsIcon";
import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import RedirectIcon from "../icons/RedirectIcon";
import ResendIcon from "../icons/ResendIcon";
import ReceiptIcon from "../icons/ReceiptIcon";
import PriceIcon from "../icons/PriceIcon";

export default function BookingDetails({ bookingDetails }) {
  const startDateObj = new Date(bookingDetails?.conference?.startDate);
  let formattedStartDate;
  if (startDateObj && bookingDetails?.conference?.timezone) {
    formattedStartDate = formatInTimeZone(
      startDateObj,
      bookingDetails?.conference?.timezone,
      "MMM-dd-yyyy, HH:mm aa",
      { locale: enGB }
    );
  }

  let formattedBookingDate;
  const bookingDateObj = new Date(bookingDetails?.bookingDate);
  if (bookingDateObj && bookingDetails?.conference?.timezone) {
    formattedBookingDate = formatInTimeZone(
      bookingDateObj,
      bookingDetails?.conference?.timezone,
      "MMM-dd-yyyy, HH:mm aa",
      { locale: enGB }
    );
  }

  const getLocationString = () => {
    let locationStrig = "Location";
    if (bookingDetails?.conference?.mode?.length > 0) {
      if (
        bookingDetails?.conference?.mode?.includes("venue") &&
        bookingDetails?.conference?.location
      ) {
        locationStrig = bookingDetails?.conference?.location;
      }

      if (bookingDetails?.conference?.mode?.includes("onlineConf")) {
        locationStrig = "Online";
      }

      if (
        bookingDetails?.conference?.mode?.includes("venue") &&
        bookingDetails?.conference?.mode?.includes("onlineConf")
      ) {
        locationStrig = `${bookingDetails?.conference?.location} & Online`;
      }
    }
    return locationStrig;
  };

  return (
    <>
      <div className="ut-modal-wrap">
        <div className="flex-vc">
          <RedirectIcon />
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
          {bookingDetails?.conference
            ? bookingDetails?.conference?.title
            : "Ticket title"}
        </h4>
        <span className="caption-2-regular-gray3">
          {`Booking number : #${bookingDetails?.bookingNumber} on  ${formattedBookingDate} `}
        </span>

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
              {bookingDetails?.conference?.credits?.length > 0
                ? `${bookingDetails?.conference?.credits[0]?.quantity} credits`
                : "Credits not added"}
            </span>
          </div>
          <div className="flex-vc  mb-12">
            <PriceIcon className="icon-sm mr-12" />
            <span className="caption-2-regular-gray3">
              {bookingDetails?.totalPrice} /-
            </span>
          </div>
        </div>
        <div>
          {bookingDetails?.attendees?.map((guest, idx) => {
            console.log("object,", bookingDetails?.attendees);
            return (
              <div key={guest._id}>
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-vc-sb mt-16">
        <div className="user-ticket-resend flex-vchc">
          <ResendIcon className="icon-button" fill="#fff" />
          <p className="ml-4 avenir-roman-18 ">Resend Tickets</p>
        </div>
        <div className="user-ticket-resend user-ticket-print flex-vchc ">
          <ReceiptIcon className="icon-button" fill="#fff" />
          <p className="ml-4 avenir-roman-18 ">Print Receipt</p>
        </div>
      </div>
    </>
  );
}
