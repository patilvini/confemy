import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

const PrintTicket = ({ ticketData }) => {
  const componentRef = useRef();

  //   let ticketData = localStorage.getItem("ticketData");
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
    <div className="p-24">
      <div ref={componentRef}>
        <h2> Ticket Details</h2>
        <div className="pt-20  mb-11">
          <h4>
            Ticket Type:
            {ticketData.conference?.title
              ? ticketData.conference?.title
              : "Ticket title"}
          </h4>
          <div className="pt-16 caption-2-regular-gray3">
            <div className="flex-vc  mb-12">
              <span className="caption-2-regular-gray3">{`Start Date :  ${formattedStartDate} GMT+4`}</span>
            </div>
            <div className=" mb-12">
              <span className="caption-2-regular-gray3">
                Location : {getLocationString()}
              </span>
            </div>
            <div className="  mb-12">
              <span className="caption-2-regular-gray3">
                Booking Date : {`${formattedBookingDate} GMT+4`}
              </span>
            </div>
            <div className="  mb-12">
              <span className="caption-2-regular-gray3">
                Booking Number : {ticketData.bookingNumber}
              </span>
            </div>
            <div className="  mb-12">
              <span className="caption-2-regular-gray3">
                Booking Type : {ticketData.bookingType}
              </span>
            </div>
            <div className="  mb-12">
              <span className="caption-2-regular-gray3">
                Total Price : {ticketData.totalPrice}
              </span>
            </div>
            <div className="flex-vc  mb-12">
              <span className="caption-2-regular-gray3">
                Credits :
                {ticketData?.conference?.credits?.length > 0
                  ? `${ticketData?.conference?.credits[0]?.quantity} credits`
                  : "Credits not added"}
              </span>
            </div>
          </div>

          <div className="my-24">
            <h5 className="caption-1-regular-gray2 mb-4">Total Tickets</h5>
            <p className="avenir-heavy-18">
              {ticketData?.tickets?.map((item) => {
                return `${item.quantity} x ${item.ticket?.name}`;
              })}
            </p>
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
