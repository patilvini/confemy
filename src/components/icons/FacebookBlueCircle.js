import { Fragment } from "react";
import facebookBlueCircle from "../../assets/f_logo_RGB-Blue_58.png";

function FacebookBlueCircle({ className }) {
  return (
    <Fragment>
      <img
        className={className}
        src={facebookBlueCircle}
        alt="facebook blue circle logo"
      />
    </Fragment>
  );
}

export default FacebookBlueCircle;
