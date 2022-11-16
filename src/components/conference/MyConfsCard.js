import { useSelector, useDispatch } from "react-redux";

import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import CreditsIcon from "../icons/CreditsIcon";

import "./myConfsCard.styles.scss";

export default function MyConfsCard() {
  const newConference = useSelector((state) => state.conference.newConference);

  return (
    <div className="myconfs-imgcard-wrap">
      <div className="myconfs-img-wrap">
        {newConference?.banner?.length > 0 ? (
          <img
            className="myconfs-img"
            alt="preview"
            src={newConference?.banner[0]?.Location}
          />
        ) : (
          <div className="myconfs-no-img">
            <div className="text-align-center">
              <p>Banner</p>
            </div>
          </div>
        )}
      </div>
      <div className="myconfs-card">
        <div className="confcard-header mb-6">
          <p>
            {newConference?.title ? newConference?.title : "Conference title "}
          </p>
        </div>
        <div className="myconfs-card-body">
          <div className="flex-vc  mb-6">
            <DateIcon className="icon-xxs mr-12" />
            <span className="caption-2-regular-gray3">
              {newConference?.startDate ? newConference?.startDate : "Date"}
            </span>
          </div>
          <div className="flex-vc  mb-4">
            <LocationIcon className="icon-xxs mr-12" />
            <span className="caption-2-regular-gray3">
              {/* {getLocationString()} */}
            </span>
          </div>
          <div className="flex-vc  mb-6">
            <CreditsIcon className="icon-xxs mr-12" />
            <span className="caption-2-regular-gray3">
              {newConference?.credits?.length > 0
                ? `${newConference?.credits[0].creditId.name} - ${newConference?.credits[0].quantity}`
                : "Credits not added"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
