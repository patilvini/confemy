import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import "./userTickets.styles.scss";

const PrintTicket = () => {
  const componentRef = useRef();

  let ticketData = JSON.parse(localStorage.getItem("ticketData"));
  console.log("data", ticketData);

  const startDateObj = new Date(ticketData?.conference?.startDate);
  const formattedStartDate = formatInTimeZone(
    startDateObj,
    ticketData?.conference?.timezone,
    "MMM-dd-yyyy, HH:mm aa",
    { locale: enGB }
  );

  const bookingDateObj = new Date(ticketData?.bookingDate);
  const formattedBookingDate = formatInTimeZone(
    bookingDateObj,
    ticketData?.conference?.timezone,
    "MMM-dd-yyyy, HH:mm aa",
    { locale: enGB }
  );

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
  return (
    <div className="p-92 container " ref={componentRef}>
      <div className="print-ticket mb-24">
        <div className="flex-vc">
          <h2 className="mr-92"> Ticket </h2>
          <h2>
            {ticketData.conference?.title
              ? ticketData.conference?.title
              : "Ticket title"}
          </h2>
        </div>
        <div className="mb-24 ml-92 pl-88">
          <div className="pt-16 caption-2-regular-gray3">
            <div className="flex-vc  mb-24">
              <h4>START DATE </h4>
              <h5 className="caption-1-regular-gray2 ml-80">
                {formattedStartDate} GMT+4
              </h5>
            </div>
            <div className="flex-vc mb-24">
              <h4>LOCATION </h4>
              <h5 className="caption-1-regular-gray2 ml-92">
                {getLocationString()}
              </h5>
            </div>
            <div className=" flex-vc mb-24">
              <h4>BOOKING DATE </h4>
              <h5 className=" caption-1-regular-gray2 ml-48">
                {formattedBookingDate} GMT+4
              </h5>
            </div>
            <div className=" flex-vc mb-24">
              <h4>BOOKING NO</h4>
              <h5 className="caption-1-regular-gray2 ml-68">
                {ticketData.bookingNumber}
              </h5>
            </div>
            <div className="flex-vc  mb-40">
              <h4>BOOKING TYPE </h4>
              <h5 className="caption-1-regular-gray2 ml-76">
                {ticketData.bookingType}
              </h5>
            </div>
            <div className="flex-vc  mb-40">
              <div className="flex-vc">
                <h4>TOTAL PRICE </h4>
                <h5 className="caption-1-regular-gray2 ml-24">
                  {ticketData.totalPrice}
                </h5>
              </div>
              <div className="flex-vc ml-80">
                <h4>CREDITS </h4>
                <h5 className="caption-1-regular-gray2 ml-24">
                  {" "}
                  {ticketData?.conference?.credits?.length > 0
                    ? `${ticketData?.conference?.credits[0]?.quantity} credits`
                    : "Credits not added"}
                </h5>
              </div>
              <div className="ml-80">
                <h5 className="caption-1-regular-gray2 ">TOTAL TICKETS </h5>
                <p className="avenir-heavy-18">
                  {ticketData?.tickets?.map((item) => {
                    return `${item.quantity} x ${item.ticket?.name}`;
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handlePrint} className="button button-primary">
        Print ticket
      </button>
    </div>
  );
};

export default PrintTicket;
