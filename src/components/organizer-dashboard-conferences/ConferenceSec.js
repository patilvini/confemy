import { DateTime } from "luxon";
import CreditsIcon from "../icons/CreditsIcon";
import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";


export default function ConferenceSec({ data }) {
  const date = DateTime.fromISO(data.startDate);

  let scheduleDate = date.toLocaleString({
    ...DateTime.DATE_MED_WITH_WEEKDAY,
    weekday: "short",
  });

  return (
    <div className="conference-card-dash">
      <img
        className="conf-image-dash"
        alt="conference title"
        src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbmZlcmVuY2V8ZW58MHx8MHx8&w=1000&q=80"
      />

      <div className="dash-conf-details">
        <span style={{ fontSize: "2rem"}}>{data.title}</span>
        <div className="details-grid">
          <div className="ticket-item">
            <DateIcon className="card-icons" />
          </div>
          <div className="ticket-item">
            <p className="caption-2-regular-gray3">
              {scheduleDate},
              {/* {data.startTime}{" "}
            {data.timezone} */}
            </p>
          </div>
          <div className="ticket-item">
            <LocationIcon className="card-icons" />
          </div>
          <div className="ticket-item">
            <div className="caption-2-regular-gray3">
              {data.mode.map((item, index) => {
                return (
                  <span style={{ marginRight: "1rem" }} key={index}>
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="ticket-item">
            <CreditsIcon className="card-icons" />
          </div>
          <div className="ticket-item">
            <div className="caption-2-regular-gray3">
              {data.credits.map((item, index) => {
                return (
                  <span style={{ marginRight: "1rem" }} key={index}>
                    {item.creditType} {item.quantity}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
