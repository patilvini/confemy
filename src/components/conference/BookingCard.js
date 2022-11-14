import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CreditsIcon from "../icons/CreditsIcon";
import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import PriceIcon from "../icons/PriceIcon";
import ShareIcon from "../icons/ShareIcon";

import LikeBlueIcon from "../icons/LikeBlueIcon";
import LikeRedIcon from "../icons/LikeRedIcon";
import { DateTime } from "luxon";

import api from "../../utility/api";

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
      <div>
        <h4>Lorem Ipsum Lorem ipsum dolor, laudantium est repellat nam?</h4>
        <div>
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
        </div>
        <div className="icon-grid-card ">
          <div>
            <DateIcon className="icon-sm" />
          </div>
          <div>Wed, May 23, 11:00 AM - Fri, May 25, 12:30 PM</div>
          <div>
            <LocationIcon className="icon-sm" />{" "}
          </div>
          <div>Norwich, Online Event dsasa dsada asdsa </div>
          <div>
            <CreditsIcon className="icon-sm" />
          </div>
          <div>AMA cat1 - 20 credits</div>
          <div>
            <PriceIcon className="icon-sm" />
          </div>
          <div style={{ fontWeight: "900" }}>$20 onwards</div>
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
    </div>
  );
}
