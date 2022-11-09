import { Fragment } from "react";
import twitterBlueIcon from "../../assets/2021 Twitter logo - blue.png";

export default function TwitterBlueIcon({ className }) {
  return (
    <Fragment>
      <img
        className={className}
        src={twitterBlueIcon}
        alt="twitter blue logo"
      />
    </Fragment>
  );
}
