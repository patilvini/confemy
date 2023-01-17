import DateIcon from "../icons/DateIcon";
import CreditsIcon from "../icons/CreditsIcon";
import LocationIcon from "../icons/LocationIcon";
import ResendIcon from "../icons/ResendIcon";
import ReceiptIcon from "../icons/ReceiptIcon";

import { DateTime } from "luxon";

export default function UserTicket({ onClick, data }) {
  const date = DateTime.fromISO(data.conference.startDate);

  let scheduleDate = date.toLocaleString({
    ...DateTime.DATE_MED_WITH_WEEKDAY,
    weekday: "short",
  });

  return (
    <div className="user-ticket-card">
      <div className="user-ticket-details">
        <div style={{ flex: 1, textOverflow: "ellipsis" }}>
          <div className="confcard-title">
            <p>
              {data.conference?.title
                ? data.conference?.title
                : "Conference title"}
            </p>
          </div>
          <div className="pt-16">
            <div className="flex-vc  mb-12">
              <DateIcon className="icon-xxs mr-12" />
              <span className="caption-2-regular-gray3">{`$ GMT+4`}</span>
            </div>
            <div className="flex-vc  mb-12">
              <LocationIcon className="icon-xxs mr-12" />
              <span className="caption-2-regular-gray3">jjjjjjjjj</span>
            </div>
            <div className="flex-vc  mb-12">
              <CreditsIcon className="icon-xxs mr-12" />
              <span className="caption-2-regular-gray3">
                {data?.conference?.credits?.length > 0
                  ? `${data?.conference?.credits[0]?.quantity} credits`
                  : "Credits not added"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-vc-sb mt-16">
        <div className="grid-item-left">
          <p
            style={{
              color: "#444444",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Items
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#444444",
              marginTop: ".5rem",
            }}
          >
            {" "}
            2 x Regular Passes
          </p>
        </div>
        <div className="grid-item-right">
          <p
            style={{
              color: "#444444",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Status
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#444444",
              marginTop: ".5rem",
            }}
          >
            Confirmed
          </p>
        </div>
      </div>
      <div style={{ marginTop: "1rem" }} className="opposite-grid">
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
  );
}
