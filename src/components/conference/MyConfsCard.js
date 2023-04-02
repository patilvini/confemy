import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import CreditsIcon from "../icons/CreditsIcon";

import "./myConfsCard.styles.scss";

export default function MyConfsCard({
  banner,
  title,
  startDate,
  timezone,
  credits,
  city,
  mode,
}) {
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

  const startDateObj = new Date(startDate);
  const formattedStartDate = formatInTimeZone(
    startDateObj,
    timezone,
    "MMM-dd-yyyy, HH:mm aa",
    { locale: enGB }
  );

  return (
    <div className="myconfs-imgcard-wrap">
      <div className="myconfs-img-wrap">
        {banner?.length > 0 ? (
          <img
            className="myconfs-img"
            alt="preview"
            src={banner[0]?.Location}
          />
        ) : (
          <div className="myconfs-no-img">
            <div className="text-align-center">
              <p>Banner?</p>
            </div>
          </div>
        )}
      </div>
      <div className="myconfs-card">
        <div className="confcard-header mb-6">
          <p>{title}</p>
        </div>
        <div className="myconfs-card-body">
          <div className="flex-vc  mb-6">
            <DateIcon className="icon-xxs mr-12" />
            <span className="caption-2-regular-gray3">
              {formattedStartDate}
            </span>
          </div>
          <div className="flex-vc  mb-4">
            <LocationIcon className="icon-xxs mr-12" />
            <span className="caption-2-regular-gray3">
              {getLocationString()}
            </span>
          </div>
          <div className="flex-vc  mb-6">
            <CreditsIcon className="icon-xxs mr-12" />
            <span className="caption-2-regular-gray3">
              {credits?.length > 0
                ? `${credits[0].creditId.name} - ${credits[0].quantity}`
                : "Credits not added"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
