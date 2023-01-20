import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CreditsIcon from "../icons/CreditsIcon";
import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import PriceIcon from "../icons/PriceIcon";
import ShareIcon from "../icons/ShareIcon";

import LikeBlueIcon from "../icons/LikeBlueIcon";
import LikeRedIcon from "../icons/LikeRedIcon";

import api from "../../utility/api";
import { getFormattedDateInTz } from "../../utility/commonUtil";
import { getLocationString } from "../../utility/commonUtil";

export default function BookingCard({
  title,
  organizer,
  startDate,
  timezone,
  endDate,
  mode,
  city,
  currency,
  basePrice,
  credits,
  confId,
  bookingTickets,
  isLiked,
  setSelectedConference,
}) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const like = async (confId, userId) => {
    const data = {
      likedConferenceDetails: {
        conferenceId: confId,
        userId: userId,
      },
    };
    try {
      const response = await api.post("/conferences/like", data);
      if (response) {
        setSelectedConference(response.data.data.conference);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const unLike = async (confId, userId) => {
    const url = `conferences/like/${confId}/users/${userId}`;
    try {
      const response = await api.delete(url);
      if (response) {
        setSelectedConference(response.data.data.conference);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="conf-details-card">
      <div>
        <h4 className="mb-14">{title}</h4>
        <p className="caption-1-regular-gray3 mb-10">by {organizer}</p>
        {/* <button className="cd-follow-button mb-48">Follow</button> */}
        <div className="icon-grid-card mt-48">
          <div className="flex-vc mb-12">
            <DateIcon className="icon-sm mr-16" />
            <p className="body-regular-gray3">
              <span>Start:</span>{" "}
              <span>{getFormattedDateInTz(startDate, timezone)}</span>
              {/* {getFormattedDateInTz(endDate, timezone)} */}
            </p>
          </div>
          <div className="flex-vc mb-12">
            <DateIcon className="icon-sm mr-16" />
            <p className="body-regular-gray3">
              <span>End: </span>
              <span>{getFormattedDateInTz(endDate, timezone)}</span>
            </p>
          </div>
          <div className="flex-vc mb-12">
            <LocationIcon className="icon-sm mr-16" />
            <p className="body-regular-gray3">
              {getLocationString(mode, city)}
            </p>
          </div>
          <div className="flex-vc mb-12">
            <CreditsIcon className="icon-sm mr-16" />
            <p className="body-regular-gray3">
              {" "}
              {credits?.length > 0
                ? `${credits[0].creditId?.name} - ${credits[0].quantity}`
                : "Credits not added"}
            </p>
          </div>
          <div className="flex-vc mb-12">
            <PriceIcon className="icon-sm mr-16" />
            <p
              className="avenir-roman-18"
              style={{
                fontWeight: 900,
                lineHeight: 1.33,
                letterSpacing: 0.2,
              }}
            >
              {currency && basePrice > 0
                ? `${currency} -  
                    ${basePrice} Onwards`
                : currency && basePrice === 0
                ? "Free"
                : "Price not availabe"}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="bottom-bar">
          <div>
            <ShareIcon className="icon-sm" />
          </div>
          <div>
            {isLiked ? (
              <i
                className="conference-card-buttons"
                onClick={() => unLike(confId, user?._id)}
              >
                <LikeRedIcon className="icon-sm" />
              </i>
            ) : (
              <i
                className="conference-card-buttons"
                onClick={() => like(confId, user?._id)}
              >
                <LikeBlueIcon className="icon-sm" />
              </i>
            )}
          </div>
          <div>
            <button
              onClick={() => {
                navigate(`/book-conference/${confId}`, {
                  state: bookingTickets,
                });
              }}
              type="button"
              className="button button-green"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
