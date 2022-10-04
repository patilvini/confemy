import { DateTime } from "luxon";
import CreditsIcon from "../icons/CreditsIcon";
import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import RedirectIcon from "../icons/RedirectIcon";
import ResendIcon from "../icons/ResendIcon";
import ReceiptIcon from "../icons/ReceiptIcon";
import Modal from "../modal/Modal";
import { useEffect, useState } from "react";
import api from "../../utility/api";

export default function TicketModal({ onDismiss, data }) {
  const [bookingDetails, setDetails] = useState([]);

  useEffect(() => {
    const getBooking = async () => {
      try {
        const r = await api.get("/conferences/bookings/" + data._id);
        console.log(r.data.data.bookingDetails.attendees);
        setDetails(r.data.data.bookingDetails.attendees);
      } catch (err) {
        console.log(err);
      }
    };

    getBooking();
  },[]);

  return (
    <Modal onDismiss={onDismiss}>
      <div className="passes-modal">
        <div className="ticket-details">
          <RedirectIcon style={{}} />{" "}
          <span
            style={{
              fontSize: "2rem",
              margin: "0 0 0rem .5rem",
              color: "#55A0FA",
            }}
          >
            Preview
          </span>
          <h3 style={{ margin: "2.1rem 0 2.1rem 0" }}>
            {data.conference.title}
          </h3>
          <p className="caption-2-regular-gray3">
            Registration no. {data.registrationNumber} on{" "}
            {DateTime.fromISO(data.bookingDate).toLocaleString({
              ...DateTime.DATE_MED_WITH_WEEKDAY,
              weekday: "short",
            })}
          </p>
          <div className="ticket-details-grid">
            <DateIcon className="icon-size" />
            <p className="ticket-grid-item ticket-details-text caption-2-regular-gray3">
              {DateTime.fromISO(data.conference.startDate).toLocaleString({
                ...DateTime.DATE_MED_WITH_WEEKDAY,
                weekday: "short",
              })}{" "}
              {data.conference.startTime} {data.conference.timezone}
            </p>
            <LocationIcon className="icon-size" />
            <div className="ticket-grid-item ticket-details-text caption-2-regular-gray3">
              {data.conference.mode.map((item, index) => {
                return (
                  <span style={{ marginRight: "1rem" }} key={index}>
                    {item}
                  </span>
                );
              })}
            </div>
            <CreditsIcon className="icon-size" />
            <div className="ticket-grid-item ticket-details-text caption-2-regular-gray3">
              {data.conference.credits.map((item, index) => {
                return (
                  <span style={{ marginRight: "1rem" }} key={index}>
                    {item.creditType} {item.quantity}
                  </span>
                );
              })}
            </div>
          </div>
          {bookingDetails.map((item, index) => {
            return <div key={index}>
              <h3 style={{ marginTop: "1rem" }}> Guest {index + 1} </h3>
          <p className="caption-2-regular-gray3">{item.user.firstName} {item.user.lastName}</p>
          <p className="caption-2-regular-gray3">{item.user.email}</p>

            </div>;
          })}
          
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
