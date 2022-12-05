import { useNavigate, useParams } from "react-router-dom";
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
  data,
  reload,
}) {
  const navigate = useNavigate();
  const confID = useParams().confID;
  const userID = useSelector((state) => state.auth.user?._id);

  const like = async () => {
    const likedConferenceDetails = { conferenceId: confID, userId: userID };
    try {
      const r = await api.post("/conferences/like", { likedConferenceDetails });
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
      <div>
        <h4 className="mb-14">{title}</h4>
        <p className="caption-1-regular-gray3 mb-10">by {organizer}</p>
        <button className="cd-follow-button mb-48">Follow</button>
        <div className="icon-grid-card ">
          <div className="flex-vc mb-12">
            <DateIcon className="icon-sm mr-16" />
            <p className="body-regular-gray3">
              {getFormattedDateInTz(startDate, timezone)} -{" "}
              {getFormattedDateInTz(endDate, timezone)}
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
            {data?.isLiked && (
              <i
                className="conference-card-buttons"
                onClick={() => unLike(data._id)}
              >
                <LikeRedIcon className="icon-sm" />
              </i>
            )}
            {!data?.isLiked && (
              <i className="conference-card-buttons" onClick={() => like()}>
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
