import React from "react";
import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import CreditsIcon from "../icons/CreditsIcon";
import LikeInactiveIcon from "../icons/LikeInactiveIcon";
import PropTypes from "prop-types";

import "./ConfCard.styles.scss";

function ConfCard({
  src,
  confName,
  startDate,
  startTime,
  location,
  creditType,
  currency,
  creditAmount,
  price
}) {
  return (
    <div className="conf-card">
      <div className="conf-img-container">
        <img
          src="https://www.simplemost.com/wp-content/uploads/2016/08/beach-vacation-e1470663653924.jpeg"
          alt="conference banner"
        />
      </div>
      <p className="conf-title">
        {confName}
      </p>
      <div>
        <DateIcon className="conf-card-icons" />
        <span className="conf-card-text caption-2-regular-gray3">
          {startDate}
        </span>
      </div>
      <div className="conf-card-location">
        <LocationIcon className="conf-card-icons" />
        <span className="conf-card-text caption-2-regular-gray3">{location}</span>
      </div>
      <div>
        <CreditsIcon className="conf-card-icons" />
        <span className="conf-card-text caption-2-regular-gray3">
        AMA Cat 1
        </span>
      </div>
      <div className="conf-price-box">
        <span className="caption-2-bold-cblack">{price} onwards</span>
        <LikeInactiveIcon className="conf-likeicon" />
      </div>
    </div>
  );
}

ConfCard.propTypes = {
  src: PropTypes.string,
  confName: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  creditType: PropTypes.string,
  currency: PropTypes.string,
  creditAmount: PropTypes.number,
};

export default ConfCard;
