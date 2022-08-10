import CreditsIcon from "../icons/CreditsIcon";
import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import PriceIcon from "../icons/PriceIcon";
import ShareIcon from "../icons/ShareIcon";
import LikeRedIcon from "../icons/LikeRedIcon"
import { DateTime } from "luxon";

export default function BookingCard({ data }) {
  const date = DateTime.fromISO(data?.startDate);
  let startDate = date.toLocaleString({
    ...DateTime.DATE_MED_WITH_WEEKDAY,
    weekday: "short",
  });

  

  return (
    <>
      

      <div className="conference-card">
        <h4 className="conference-card-heading">{data?.title}</h4>
        <div style={{ marginLeft: "2rem", marginBottom: "2rem" }}>
          <p className="conference-card-text caption-2-regular-gray3">
            by Harward School of Medicine{" "}
          </p>
          <button
            style={{
              padding: ".2rem 1rem",
              color: "#08415c",
              border: "2px solid #08415c",
              backgroundColor: "white",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            Follow
          </button>
        </div>

        <div className="conference-card-grid">
          <div className="conference-card-grid-item">
            <DateIcon className="conf-card-icons" />
          </div>

          <div className="conference-card-grid-item">
            <p className="conference-card-text caption-2-regular-gray3">
              {startDate}
            </p>
          </div>
          <div className="conference-card-grid-item">
            <LocationIcon className="conf-card-icons" />
          </div>
          <div className="conference-card-grid-item">
            <div className="conference-card-text caption-2-regular-gray3">
              {data?.mode.map((item) => {
                return (
                  <span style={{ marginRight: "1rem" }} key={item}>
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="conference-card-grid-item">
            <CreditsIcon className="conf-card-icons" />
          </div>
          <div className="conference-card-grid-item">
            <div className="conference-card-text caption-2-regular-gray3">
              {data?.credits.map((item, index) => {
 

                return (
                  <span style={{ marginRight: "1rem" }} key={index}>
                    {" "}
                    {item.creditType} {item.quantity}{" "}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="conference-card-grid-item">
            <PriceIcon className="conf-card-icons" />
          </div>
          <div className="conference-card-grid-item">
            <p className="conference-card-text caption-2-regular-gray3">
              {data?.currency} {data?.basePrice} onwards
            </p>
          </div>
          <div
            style={{ paddingTop: "6.5rem" }}
            className="conference-card-grid-item"
          >
            <ShareIcon className="conf-card-icons" />
          </div>
          <div className="conference-card-grid-item">
            <LikeRedIcon style={{marginTop:"1rem"}} className="conf-card-icons" />
            <button
              style={{
                fontSize: "1.2rem",
                marginTop: "6rem",
                marginLeft:'2rem',
                padding: "1rem",
                width: "70%",
              }}
              className="button button-green"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
