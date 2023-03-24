import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";

import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import CreditsIcon from "../icons/CreditsIcon";
import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import RedirectIcon from "../icons/RedirectIcon";
import ResendIcon from "../icons/ResendIcon";
import ReceiptIcon from "../icons/ReceiptIcon";
import PriceIcon from "../icons/PriceIcon";

import { alertAction } from "../../redux/alert/alertAction";
import api from "../../utility/api";

export default function Receipt() {
  const [receiptData, setReceiptData] = useState("");
  const componentRef = useRef();
  let ticketID = JSON.parse(localStorage.getItem("receiptData"));
  const dispatch = useDispatch();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Print The Ticket",
  });

  const getBookingDetails = async (bookingId) => {
    try {
      let { data } = await api.get(`/conferences/bookings/${bookingId}`);
      setReceiptData(data.data.bookingDetails);
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const startDateObj = new Date(receiptData?.conference?.startDate);
  let formattedStartDate;
  if (startDateObj && receiptData?.conference?.timezone) {
    formattedStartDate = formatInTimeZone(
      startDateObj,
      receiptData?.conference?.timezone,
      "MMM-dd-yyyy, HH:mm aa",
      { locale: enGB }
    );
  }
  const endtDateObj = new Date(receiptData?.conference?.endDate);
  let formattedEndtDate;
  if (endtDateObj && receiptData?.conference?.timezone) {
    formattedEndtDate = formatInTimeZone(
      endtDateObj,
      receiptData?.conference?.timezone,
      "MMM-dd-yyyy, HH:mm aa",
      { locale: enGB }
    );
  }

  let formattedBookingDate;
  const bookingDateObj = new Date(receiptData?.bookingDate);
  if (bookingDateObj && receiptData?.conference?.timezone) {
    formattedBookingDate = formatInTimeZone(
      bookingDateObj,
      receiptData?.conference?.timezone,
      "MMM-dd-yyyy, HH:mm aa",
      { locale: enGB }
    );
  }

  const getLocationString = () => {
    let locationStrig = "Location";
    if (receiptData?.conference?.mode?.length > 0) {
      if (
        receiptData?.conference?.mode?.includes("venue") &&
        receiptData?.conference?.location
      ) {
        locationStrig = receiptData?.conference?.location;
      }

      if (receiptData?.conference?.mode?.includes("onlineConf")) {
        locationStrig = "Online";
      }

      if (
        receiptData?.conference?.mode?.includes("venue") &&
        receiptData?.conference?.mode?.includes("onlineConf")
      ) {
        locationStrig = `${receiptData?.conference?.location} & Online`;
      }
    }
    return locationStrig;
  };
  useEffect(() => {
    getBookingDetails(ticketID);
  }, [ticketID]);

  return (
    <div
      className="container p-92"
      style={{ display: "flex", flexDirection: "column", alignItems: "end" }}
    >
      <button onClick={handlePrint} className="button button-primary mb-24">
        Print ticket
      </button>
      <div
        ref={componentRef}
        className="mb-24 p-24"
        style={{ border: "1px solid black", width: "100%" }}
      >
        <h1>Ticket Details</h1>
        <h4 className="mt-21 mb-12">
          Ticket :{" "}
          {receiptData?.conference
            ? receiptData?.conference?.title
            : "Ticket title"}
        </h4>

        <p className="caption-2-regular-gray3 mb-16">
          <span className="caption-1-heavy-cblack">Booking number : </span>
          <span>{receiptData?.bookingNumber} </span>
          <span className="caption-1-heavy-cblack ml-12">Booking Date : </span>
          <span>{formattedBookingDate}</span>
        </p>
        <p className="caption-2-regular-gray3 ">
          <span className="caption-1-heavy-cblack">Booking Type : </span>
          <span>{receiptData?.bookingType} </span>
        </p>

        <div className="pt-16">
          <div className="flex-vc  mb-12">
            <DateIcon className="icon-sm mr-12" />
            <span className="caption-2-regular-gray3">
              Start Date : {`${formattedStartDate} GMT+4`}
            </span>
          </div>
          <div className="flex-vc  mb-12">
            <DateIcon className="icon-sm mr-12" />
            <span className="caption-2-regular-gray3">
              End Date : {`${formattedEndtDate} GMT+4`}
            </span>
          </div>
          <div className="flex-vc  mb-12">
            <LocationIcon className="icon-sm mr-12" />
            <span className="caption-2-regular-gray3">
              Location : {getLocationString()}
            </span>
          </div>
          <div className="flex-vc  mb-12">
            <CreditsIcon className="icon-sm mr-12" />
            <span className="caption-2-regular-gray3">
              {receiptData?.conference?.credits?.length > 0
                ? `${receiptData?.conference?.credits[0]?.quantity} credits`
                : "Credits not offered"}
            </span>
          </div>
          {/* <div className="flex-vc  mb-12">
            <PriceIcon className="icon-sm mr-12" />
            <span className="caption-2-regular-gray3">
              Base Price :{" "}
              {receiptData?.conference?.basePrice === 0
                ? "FREE"
                : receiptData?.conference?.basePrice + "/-"}
            </span>
          </div> */}
          <div className="flex-vc  mb-12">
            <PriceIcon className="icon-sm mr-12" />
            <span className="caption-2-regular-gray3">
              Total Price :{" "}
              {receiptData?.totalPrice === 0
                ? "FREE"
                : receiptData?.totalPrice + "/-"}
            </span>
          </div>
        </div>
        <div>
          {receiptData?.attendees?.map((guest, idx) => {
            return (
              <div key={guest._id}>
                <h4 className="mb-10 mt-24">{`Guest ${idx + 1}`}</h4>
                <div className="caption-2-regular-gray3">
                  <div className="flex-vc mb-10">
                    <p className="caption-1-heavy-cblack my-6">{`First Name : `}</p>
                    <p className="ml-10">{guest.firstName}</p>
                  </div>
                  <div className="flex-vc mb-10">
                    <p className="caption-1-heavy-cblack ">{`Last Name : `}</p>
                    <p className="ml-10">{guest.lastName}</p>
                  </div>
                  <div className="flex-vc mb-10">
                    <p className="caption-1-heavy-cblack mt-6">Email : </p>
                    <p className="ml-10">{guest.user.email}</p>
                  </div>
                </div>
                <div className="mt-6 caption-2-regular-gray3 ">
                  <p className="caption-1-heavy-cblack mb-10">
                    Ticket Details{" "}
                  </p>
                  <div className="flex-vc mb-10">
                    <p className="mr-10">Ticket number :</p>
                    <p>{guest.registrationNumber}</p>
                  </div>
                  <div className="flex-vc mb-10">
                    <p className="mr-10">Ticket Name :</p>
                    <p>{guest.ticket.name}</p>
                  </div>
                  <div className="flex-vc mb-10">
                    <p className="mr-10">Ticket price :</p>

                    <p>
                      <span>
                        {guest.price > 0
                          ? `${receiptData.orderCurrency} -`
                          : null}
                      </span>
                      <span>
                        {" "}
                        {guest.price > 0 ? guest.originalPrice : "FREE"}
                      </span>
                    </p>
                  </div>
                  <div className="flex-vc mb-10">
                    <p className="mr-10">Service Charges :</p>
                    <p>
                      <span>
                        {guest.price > 0
                          ? `${receiptData.orderCurrency} -`
                          : null}
                      </span>
                      <span>
                        {" "}
                        {guest.price > 0
                          ? guest.price - guest.originalPrice
                          : "0"}
                      </span>
                    </p>
                  </div>
                  <div className="flex-vc ">
                    <p className="mr-10 caption-1-heavy-cblack">Total :</p>
                    <p>
                      <span>
                        {guest.price > 0
                          ? `${receiptData.orderCurrency} -`
                          : null}
                      </span>
                      <span> {guest.price > 0 ? guest.price : "FREE"}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={handlePrint} className="button button-primary mb-24">
        Print ticket
      </button>
    </div>
  );
}
