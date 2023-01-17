import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import DateIcon from "../icons/DateIcon";
import CreditsIcon from "../icons/CreditsIcon";
import LocationIcon from "../icons/LocationIcon";
import LikeRedIcon from "../icons/LikeRedIcon";
import ShareIcon from "../icons/ShareIcon";

import api from "../../utility/api";
import { alertAction } from "../../redux/alert/alertAction";

export default function SavedCard({ data, getSaved }) {
  console.log("data", data);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const unLike = async (confId, userId) => {
    const url = `conferences/like/${confId}/users/${userId}`;
    try {
      const response = await api.delete(url);
      if (response) {
        getSaved(userId);
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  return (
    <div className="flex saved-card mb-24">
      <div className="preview-img-wrap">
        <img
          className="preview-img"
          alt="preview"
          src={data?.conference?.banner[0]?.Location}
        />
        ;
      </div>
      <div className="sc-conf-card">
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
              <span className="caption-2-regular-gray3">
                {/* {scheduleDate
                  ? `${scheduleDate}, ${data.conference.startTime} GMT+4`
                  : "Date"} */}
                "Date"
              </span>
            </div>
            <div className="flex-vc  mb-12">
              <LocationIcon className="icon-xxs mr-12" />
              <span className="caption-2-regular-gray3">
                {data?.conference?.mode?.map((item, index) => {
                  return <span key={index}>{item}</span>;
                })}
              </span>
            </div>
            <div className="flex-vc  mb-12">
              <CreditsIcon className="icon-xxs mr-12" />
              <span className="caption-2-regular-gray3">
                {data.conference.credits.map((item, index) => {
                  return (
                    <span key={index}>
                      {item.creditType} {item.quantity}
                    </span>
                  );
                })}
              </span>
            </div>
            <div className="flex-vc mt-20">
              <span className="caption-2-regular-gray3">
                ${data.conference.basePrice} onwords
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="position-relative sc-padding">
        <div className="flex saved-card-icon">
          <span className="mr-12">
            <ShareIcon className="icon-size" />
          </span>
          <div>
            <span
              className="conference-card-buttons ml-12"
              onClick={() => {
                unLike(data?.conference?._id, user?._id);
              }}
            >
              <LikeRedIcon className="icon-size" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

SavedCard.propTypes = {
  data: PropTypes.object.isRequired,
};
