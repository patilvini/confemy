import CreditsIcon from "../icons/CreditsIcon";
import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import PriceIcon from "../icons/PriceIcon";
import ShareIcon from "../icons/ShareIcon";

import LikeBlueIcon from "../icons/LikeBlueIcon";
import LikeRedIcon from "../icons/LikeRedIcon";
import { DateTime } from "luxon";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../utility/api";
import { useState } from "react";

export default function BookingCard({ data, reload }) {
  console.log(data);

  const navigate = useNavigate();

  const date1 = DateTime.fromISO(data?.startDate);
  let startDate = date1.toLocaleString({
    ...DateTime.DATE_MED_WITH_WEEKDAY,
    weekday: "short",
  });

  const startTime = DateTime.fromISO(data?.startTime);

  console.log(startTime.toLocaleString(DateTime.DATETIME_MED));

  const endTime = DateTime.fromISO(data?.endTime);

  console.log(startTime.toFormat("h:mm a"));

  const date2 = DateTime.fromISO(data?.endDate);
  let endDate = date2.toLocaleString({
    ...DateTime.DATE_MED_WITH_WEEKDAY,
    weekday: "short",
  });

  const confID = useParams().confID;

  const userID = useSelector((state) => state.auth.user?._id);

  const like = async () => {
    const likedConferenceDetails = { conferenceId: confID, userId: userID };
    try {
      const r = await api.post("/conferences/like", { likedConferenceDetails });

      console.log(r);
      reload();
    } catch (err) {
      console.log(err);
    }
  };

  const unLike = async (id) => {
    try {
      const r = await api.delete("/conferences/like/" + userID, {
        data: { conferenceIds: [id] },
      });

      reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="conf-details-card">
      <h4>{data?.title}</h4>
      <p className="caption-1-regular-gray3 mt-14">
        by Harvard School of Medicine
      </p>
      <button
        style={{
          marginTop: ".5rem",
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

      <div className="icon-grid-card">
        <div>
          <DateIcon className="icon-sm" />
        </div>
        <div>Wed, May 23, 11:00 AM - Fri, May 25, 12:30 PM</div>
        <div>
          <LocationIcon className="icon-sm" />{" "}
        </div>
        <div>Norwich, Online Event </div>
        <div>
          <CreditsIcon className="icon-sm" />
        </div>
        <div>AMA cat1 - 20 credits</div>
        <div>
       
          <PriceIcon className="icon-sm" />
        </div>
        <div style={{fontWeight:"900"}}>$20 onwards</div>
      </div>

      <div className="bottom-bar">
        <div><ShareIcon className="icon-sm" /></div>
        <div>{data?.isLiked && <i className="conference-card-buttons" onClick={()=>unLike(data._id)}>
                  <LikeRedIcon className="icon-sm" />
                </i>}
              {!data?.isLiked && <i className="conference-card-buttons" onClick={()=>like()}>
                  <LikeBlueIcon  className="icon-sm" />
                </i> }</div>
        <div>
        <button
              onClick={() => {
                navigate("/booking-step1/" + data?._id);
              }}
              type="button"
              className="button button-green"
            >
              Book
            </button>
        </div>
      </div>


    </div>
  );
}

{
  /* 
<h4 className="conference-card-heading">{data?.title}</h4>
        <div style={{ marginLeft: "2rem", marginBottom: "2rem" }}>
          <p className="conference-card-text caption-2-regular-gray3">
            by Harward School of Medicine{" "}
          </p>
          <button
            style={{
              marginTop: ".5rem",
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
              {startDate}, {startTime.toFormat('h:mm a')} - {endDate} {endTime.toFormat('h:mm a')}
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
            <p
              style={{ fontWeight: "bold" }}
              className="conference-card-text caption-2-regular-gray3"
            >
              {data?.currency} {data?.basePrice} onwards
            </p>
          </div>
          <div
            style={{ marginTop: "18rem", display: "flex" }}
            className="conference-card-grid-item"
          >
            <div>
              <ShareIcon className="conf-card-icons" />
            </div>
            <div>
              

              {data?.isLiked && <button className="conference-card-buttons" onClick={()=>unLike(data._id)}>
                  <LikeRedIcon className="conf-card-icons" />
                </button>}
              {!data?.isLiked && <button className="conference-card-buttons" onClick={()=>like()}>
                  <LikeBlueIcon  className="conf-card-icons" />
                </button> }


            </div>
          </div>
          <div className="conference-card-grid-item">
            <button
              onClick={() => {
                navigate("/booking-step1/" + data?._id);
              }}
              style={{
                fontSize: "1.2rem",
                marginTop: "16.5rem",
                marginLeft: "4rem",
                marginBottom: "1rem",
                padding: "1rem",
                width: "80%",
              }}
              className="button button-green"
            >
              Book
            </button>
          </div>
        </div> */
}
