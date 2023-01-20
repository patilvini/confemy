import { useNavigate } from "react-router-dom";
import { utcToZonedTime, format } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import CreditsIcon from "../icons/CreditsIcon";
import LikeInactiveIcon from "../icons/LikeInactiveIcon";
import PropTypes from "prop-types";

export default function ConfCard({
  mode,
  city,
  src,
  title,
  startDate,
  endDate,
  timezone,
  credits,
  currency,
  basePrice,
  confId,
}) {
  const navigate = useNavigate();

  const getLocationString = () => {
    let locationStrig = "Location";
    if (mode?.length > 0) {
      if (mode?.includes("venue") && city) {
        locationStrig = city;
      }

      if (mode?.includes("onlineConf")) {
        locationStrig = "Online";
      }

      if (mode?.includes("venue") && mode?.includes("onlineConf")) {
        locationStrig = `${city} & Online`;
      }
    }
    return locationStrig;
  };

  let startDateInConfTz;
  let formattedStartDate;

  let endDateInConfTz;
  let formattedEndDate;

  if (startDate && timezone) {
    startDateInConfTz = utcToZonedTime(startDate, timezone);
    formattedStartDate = format(startDateInConfTz, "MMM-dd-yyyy, HH:mm aa", {
      timeZone: timezone,
      locale: enGB,
    });
  } else {
    startDateInConfTz = null;
    formattedStartDate = null;
  }

  if (endDate && timezone) {
    endDateInConfTz = utcToZonedTime(endDate, timezone);
    formattedEndDate = format(endDateInConfTz, "MMM-dd-yyyy, HH:mm aa", {
      timeZone: timezone,
      locale: enGB,
    });
  } else {
    endDateInConfTz = null;
    formattedEndDate = null;
  }

  return (
    <div className="conf-card">
      <div
        onClick={() => {
          navigate(`/search-conference/${confId}`);
        }}
        className="cc-img-container"
      >
        {src ? (
          <img src={src} alt="conference banner" />
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
              <h4>Banner coming</h4>
            </div>
          </div>
        )}
      </div>
      <div className="cc-content-container">
        <div
          onClick={() => navigate(`/search-conference/${confId}`)}
          className="cc-headtrunc-wrap"
        >
          <div className="confcard-header">{title}</div>
          <div className="confcard-trunc mt-8">
            <div className="flex-vc  mb-8">
              <DateIcon className="icon-xxs mr-8" />
              <span className="caption-2-regular-gray3 mr-4">Start: </span>
              <span className="caption-2-regular-gray3  cc-truncitem-wrap">
                {formattedStartDate}
              </span>
            </div>
            <div className="flex-vc  mb-8">
              <DateIcon className="icon-xxs mr-8" />
              <span className="caption-2-regular-gray3 mr-4">End: </span>
              <span className="caption-2-regular-gray3  cc-truncitem-wrap">
                {formattedEndDate}
              </span>
            </div>
            <div className="flex-vc  mb-8">
              <LocationIcon className="icon-xxs mr-8" />
              <span className="caption-2-regular-gray3 cc-truncitem-wrap">
                {getLocationString()}
              </span>
            </div>
            <div className="flex-vc  mb-8">
              <CreditsIcon className="icon-xxs mr-8" />
              <span className="caption-2-regular-gray3 cc-truncitem-wrap">
                {credits?.length > 0
                  ? `${credits[0].creditId?.name} - ${credits[0].quantity}`
                  : "Credits not added"}
              </span>
            </div>
          </div>
        </div>
        <div className="confcard-footer">
          <div className="flex-vc-sb ">
            <span className="caption-2-bold-cblack cc-truncitem-wrap">
              {currency && basePrice > 0
                ? `${currency} -  
                    ${basePrice}`
                : currency && basePrice === 0
                ? "Free"
                : "Price not availabe"}
            </span>
            <i
              onClick={() => {
                console.log("Liked");
              }}
              className="cc-likeicon-wrap"
            >
              <LikeInactiveIcon className="icon-size" />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

ConfCard.propTypes = {
  mode: PropTypes.array.isRequired,
  city: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string,
  timezone: PropTypes.string,
  credits: PropTypes.array,
  currency: PropTypes.string.isRequired,
  basePrice: PropTypes.number.isRequired,
  confId: PropTypes.string.isRequired,
};
