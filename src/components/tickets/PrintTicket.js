import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import "./userTickets.styles.scss";
import api from "../../utility/api";
import { alertAction } from "../../redux/alert/alertAction";

const PrintTicket = () => {
  const [ticketData, setTicketData] = useState([]);
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  let ticketID = JSON.parse(localStorage.getItem("ticketData"));

  console.log("ticket data", ticketData);

  const getFormatedDate = (bookingData) => {
    console.log("ticketData-----------", bookingData);
    const startDateObj = new Date(bookingData?.conference?.startDate);
    if (startDateObj) {
      const formattedStartDate = formatInTimeZone(
        startDateObj,
        bookingData?.conference?.timezone,
        "MMM-dd-yyyy, HH:mm aa",
        { locale: enGB }
      );
      setStartDate(formattedStartDate);
    }
    const endDateObj = new Date(bookingData?.conference?.endDate);
    if (endDateObj) {
      const formattedEndDate = formatInTimeZone(
        endDateObj,
        bookingData?.conference?.timezone,
        "MMM-dd-yyyy, HH:mm aa",
        { locale: enGB }
      );
      setEndDate(formattedEndDate);
    }

    const bookingDateObj = new Date(bookingData?.bookingDate);
    if (bookingDateObj) {
      const formattedBookingDate = formatInTimeZone(
        bookingDateObj,
        bookingData?.conference?.timezone,
        "MMM-dd-yyyy, HH:mm aa",
        { locale: enGB }
      );
      setBookingDate(formattedBookingDate);
    }
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Print The Ticket",
  });
  const getLocationString = () => {
    let locationStrig = "Location";
    if (ticketData?.conference?.mode?.length > 0) {
      if (
        ticketData?.conference?.mode?.includes("venue") &&
        ticketData?.conference?.location
      ) {
        locationStrig = ticketData?.conference?.location;
      }

      if (ticketData?.conference?.mode?.includes("onlineConf")) {
        locationStrig = "Online";
      }

      if (
        ticketData?.conference?.mode?.includes("venue") &&
        ticketData?.conference?.mode?.includes("onlineConf")
      ) {
        locationStrig = `${ticketData?.conference?.location} & Online`;
      }
    }
    return locationStrig;
  };

  const getBookingDetails = async (id) => {
    try {
      const response = await api.get(`/conferences/bookings/${id}`);
      console.log("data", response.data);
      if (response) {
        setTicketData(response.data.data.bookingDetails);
        getFormatedDate(response.data.data.bookingDetails);
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };
  useEffect(() => {
    getBookingDetails(ticketID);
  }, [ticketID]);
  return (
    <div className="py-92 container">
      <div
        className="print-ticket "
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
        }}
      >
        <button onClick={handlePrint} className="button button-primary mb-24">
          Print ticket
        </button>
        <div className="mb-24 " ref={componentRef}>
          {ticketData?.attendees?.map((data, idx) => {
            return (
              <div
                className="print-ticket-grid print-ticket-container mb-24 "
                key={idx}
              >
                <h2> Ticket </h2>
                {/* <div className="pl-40 print-ticket-content"> */}
                <h2 className="mb-24 print-ticket-content">
                  {ticketData?.conference?.title
                    ? ticketData?.conference?.title
                    : "Ticket title"}
                </h2>
                <h4 className="py-10 print-ticket-text-1">NAME </h4>
                <h5 className="caption-1-regular-gray2 py-10 print-ticket-text-2">
                  {`${data.firstName}  ${data.lastName}`}
                </h5>
                <h4 className="py-10 print-ticket-text-1">START DATE </h4>
                <h5 className="caption-1-regular-gray2 py-10 print-ticket-text-2">
                  {startDate} GMT+4
                </h5>
                <h4 className="py-10 print-ticket-text-1">END DATE</h4>
                <h5 className=" caption-1-regular-gray2 py-10 print-ticket-text-2">
                  {endDate} GMT+4
                </h5>
                <h4 className="py-10 print-ticket-text-1">LOCATION</h4>
                <h5 className="caption-1-regular-gray2 py-10 print-ticket-text-2">
                  {getLocationString()}
                </h5>
                <h4 className="py-10 print-ticket-text-1">BOOKING DATE</h4>
                <h5 className="caption-1-regular-gray2 py-10 print-ticket-text-2">
                  {bookingDate} GMT+4{" "}
                </h5>

                <h4 className="mr-52 print-ticket-text-1 py-10">BOOKING NO </h4>
                <h5 className="caption-1-regular-gray2 py-10">
                  {ticketData?.bookingNumber}
                </h5>

                <div className="flex-vc">
                  <h4 className="mr-18 text-center py-10"> BASE PRICE </h4>
                  <h5 className="caption-1-regular-gray2 py-10">
                    {data.originalPrice === 0 ? "FREE" : data.originalPrice}
                  </h5>
                </div>
                <div className="flex-vc">
                  <h4 className="mr-18">TOTAL TICKET PRICE </h4>
                  <h5 className="caption-1-regular-gray2 py-10">
                    {data.price === 0 ? "FREE" : data.price}
                  </h5>
                </div>
              </div>
              // </div>
            );
          })}
        </div>
        <button onClick={handlePrint} className="button button-primary  ">
          Print ticket
        </button>
      </div>
    </div>
  );
};

export default PrintTicket;
