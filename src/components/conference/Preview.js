import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import api from "../../utility/api";
import CreditsIcon from "../icons/CreditsIcon";
import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import PriceIcon from "../icons/PriceIcon";
import "./preview.scss";

export default function Preview() {
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const r = await api.get("/conferences/6318cd9c106aaa5e009f7c80");
      console.log(r.data.data.conferences);
      setData(r.data.data.conferences);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  const date1 = DateTime.fromISO(data?.startDate);
  let startDate = date1.toLocaleString({
    ...DateTime.DATE_MED_WITH_WEEKDAY,
    weekday: "short",
  });

  const startTime = DateTime.fromISO(data?.startTime)
  


  return (
    <div className="conf-form-wrap">
      <h2>Pubish Your Conference</h2>
      <div style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.08)"}} className="preview-card">
        <div>
          <img src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbmZlcmVuY2V8ZW58MHx8MHx8&w=1000&q=80" />
        </div>
        <div className="preview-details">
          <h3 style={{ fontSize: "2rem" }}>{data?.title}</h3>
          <div className="ticket-details-grid">
            <DateIcon className="preview-icon" />
            <p className="preview-grid-item ticket-details-text caption-2-regular-gray3">
              {startDate}, 
              {startTime.toFormat('h:mm a')} {data?.timezone}
            </p>
            <LocationIcon className="preview-icon" />
            <div className="preview-grid-item ticket-details-text caption-2-regular-gray3">
              {data?.mode.map((item, index) => {
                return (
                  <span style={{ marginRight: "1rem" }} key={index}>
                    {item}
                  </span>
                );
              })}
            </div>

            <CreditsIcon className="preview-icon" />
            <div className="preview-grid-item ticket-details-text caption-2-regular-gray3">
              {data?.credits.map((item, index) => {
                return (
                  <span style={{ marginRight: "1rem" }} key={index}>
                    {item.creditType} {item.quantity}
                  </span>
                );
              })}
            </div>


            <PriceIcon className="preview-icon" />
            <div className="preview-grid-item ticket-details-text caption-2-regular-gray3">@{data?.basePrice} {data?.currency} onwards</div>
          </div>

          <button
            style={{ margin: ".4rem 0 0rem 0", width: "95%" }}
            className="button button-primary"
          >
            Preview
          </button>
        </div>
      </div>

      <h3> When should we publish your event?</h3>

      <form>
        <div style={{ marginTop: "2rem",width: "20rem" }} className="preview-select-grid">
          <div className="preview-grid-item">
            <input type="radio" id="publish-now" name="publish-now" value="publish-now" />
          </div>
          <div className="preview-grid-item">
            <label for="publish-now"><p className="caption-2-regular-gray3">Publish Now</p></label>
          </div>
          <div className="preview-grid-item">
            <input type="radio" id="schedule-for-later" name="schedule-for-later" value="schedule-for-later" />
          </div>
          <div className="preview-grid-item">
            <label for="schedule-for-later"><p className="caption-2-regular-gray3">Schedule for later</p></label>
          </div>
        </div>
      </form>
    </div>
  );
}
