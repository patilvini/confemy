import ProfileSketch from "../icons/ProfileSketch";

import "./speakercard.styles.scss";
export default function Speakercard({ name, designation, degree, image }) {
  return (
    <div className="speakercard">
      <div className="speaker-image-container">
        <div className="speaker-image-wrap">
          <ProfileSketch className="speaker-profile-size" fill="#c4c4c4" />
        </div>
      </div>
      <div className="speaker-name-container">
        <p className="speaker-name mb-8">{name}</p>
        <p className="caption-3">{degree}</p>
        <p className="caption-3">{designation}</p>
      </div>
    </div>
  );
}
