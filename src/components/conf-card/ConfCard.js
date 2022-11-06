import DateIcon from "../icons/DateIcon";
import LocationIcon from "../icons/LocationIcon";
import CreditsIcon from "../icons/CreditsIcon";
import LikeInactiveIcon from "../icons/LikeInactiveIcon";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

import { useNavigate } from "react-router-dom";

function ConfCard({
  src,
  confName,
  startDate,
  startTime,
  location,
  credits,
  currency,
  creditAmount,
  price,
  link,
}) {
  const navigate = useNavigate();
  const date = DateTime.fromISO(startDate);
  let start = date.toLocaleString({
    ...DateTime.DATE_MED_WITH_WEEKDAY,
    weekday: "short",
  });

  const time = DateTime.fromISO(startTime);
  // console.log(time.toFormat('h:mm a'))

  return (
    <div
      onClick={() => navigate("/search-conference/" + link)}
      className="conf-card"
    >
      <div className="conf-img-container">
        <img
          src="https://www.simplemost.com/wp-content/uploads/2016/08/beach-vacation-e1470663653924.jpeg"
          alt="conference banner"
        />
      </div>
      <div className="confcard-header mt-12 mr-23 mb-9 ml-12">
        <p>{confName}</p>
      </div>

      <div className="flex-vc">
        <DateIcon className="conf-card-icons" />
        <span className="caption-2-regular-gray3">
          {start} - {time.toFormat("h:mm a")}
        </span>
      </div>
      <div className="conf-card-location">
        <LocationIcon className="conf-card-icons" />
        <span className="conf-card-text caption-2-regular-gray3">London</span>
      </div>
      <div>
        <CreditsIcon className="conf-card-icons" />
        {/* {credits.map((item)=>{
          console.log(item)

          return(
            <span className="conf-card-text caption-2-regular-gray3" key={item._id}>
              

            </span>
          )
        })} */}
        <span className="conf-card-text caption-2-regular-gray3">AMA 10</span>
      </div>
      <div className="card-grid-container conf-price-box">
        <div style={{ marginTop: ".5rem" }}>
          <span className="caption-2-bold-cblack">
            {currency} {price} onwards
          </span>
        </div>
        <div>
          <LikeInactiveIcon className="conf-likeicon" />
        </div>
      </div>
    </div>
  );
}

ConfCard.propTypes = {
  src: PropTypes.string,
  confName: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  // startTime: PropTypes.string.isRequired,
  // location: PropTypes.string.isRequired,
  creditType: PropTypes.string,
  currency: PropTypes.string,
  creditAmount: PropTypes.number,
};

export default ConfCard;
