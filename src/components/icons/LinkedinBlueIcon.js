import { Fragment } from "react";
import linkedinBlueIcon from "../../assets/LI-In-Bug.png";

export default function LinkedinBlueIcon({ className }) {
  return (
    <Fragment>
      <img
        className={className}
        src={linkedinBlueIcon}
        alt="facebook blue circle logo"
      />
    </Fragment>
  );
}
