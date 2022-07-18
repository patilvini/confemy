import { Fragment } from "react";
import instagramGradientIcon from "../../assets/Instagram_Glyph_Gradient_RGB.png";

export default function InstagramGradientIcon({ className }) {
  return (
    <Fragment>
      <img
        className={className}
        src={instagramGradientIcon}
        alt="facebook blue circle logo"
      />
    </Fragment>
  );
}
