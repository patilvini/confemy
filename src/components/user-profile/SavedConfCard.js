import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import DateIcon from "../icons/DateIcon";
import CreditsIcon from "../icons/CreditsIcon";
import LocationIcon from "../icons/LocationIcon";
import LikeRedIcon from "../icons/LikeRedIcon";
import ShareIcon from "../icons/ShareIcon";

import api from "../../utility/api";
import { alertAction } from "../../redux/alert/alertAction";

export default function SavedCard({ data, getSaved }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const startDateObj = new Date(data?.conference?.startDate);
  const formattedStartDate = formatInTimeZone(
    startDateObj,
    data?.conference?.timezone,
    "MMM-dd-yyyy, HH:mm aa",
    { locale: enGB }
  );

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

  const getLocationString = () => {
    let locationStrig = "Location";
    if (data?.conference?.mode?.length > 0) {
      if (
        data?.conference?.mode?.includes("venue") &&
        data?.conference?.location
      ) {
        locationStrig = data?.conference?.location;
      }

      if (data?.conference?.mode?.includes("onlineConf")) {
        locationStrig = "Online";
      }

      if (
        data?.conference?.mode?.includes("venue") &&
        data?.conference?.mode?.includes("onlineConf")
      ) {
        locationStrig = `${data?.conference?.location} & Online`;
      }
    }
    return locationStrig;
  };

  return (
    <div className="savedconfs-card">
      <div className="sc-conf-img-wrap">
        {data?.conference?.banner[0] ? (
          <img
            className="sc-conf-img"
            alt="preview"
            src={data?.conference?.banner[0]?.Location}
          />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              padding: 40,
              backgroundColor: "#ecf0f2",
            }}
          >
            <div className="text-align-center">
              <p className="body-bold">Banner is comming soon</p>
            </div>
          </div>
        )}
      </div>
      <div className="ml-24" style={{ flexGrow: 1 }}>
        <div className="savedconfs-title">
          <p>
            {data.conference?.title
              ? data.conference?.title
              : "Conference title"}
          </p>
          <div className="flex-vc ml-24">
            <i className="mr-12">
              <ShareIcon className="icon-size" />
            </i>

            <i
              onClick={() => {
                unLike(data?.conference?._id, user?._id);
              }}
              style={{ position: "relative", paddingTop: 5 }}
            >
              <LikeRedIcon className="icon-size" />
            </i>
          </div>
        </div>
        <div className="pt-16">
          <div className="flex-vc  mb-12">
            <DateIcon className="icon-xxs mr-12" />
            <span className="caption-2-regular-gray3">
              {`${formattedStartDate} GMT+4`}
            </span>
          </div>
          <div className="flex-vc  mb-12">
            <LocationIcon className="icon-xxs mr-12" />
            <span className="caption-2-regular-gray3">
              {getLocationString()}
            </span>
          </div>
          <div className="flex-vc  mb-12">
            <CreditsIcon className="icon-xxs mr-12" />
            <span className="caption-2-regular-gray3">
              {data?.conference?.credits?.length > 0
                ? `${data?.conference?.credits[0]?.quantity} credits`
                : "Credits not added"}
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
  );
}

SavedCard.propTypes = {
  data: PropTypes.object.isRequired,
};
