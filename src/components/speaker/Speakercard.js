import DeleteIcon from "../icons/DeleteIcon";
import ProfileSketch from "../icons/ProfileSketch";

import "./speakercard.styles.scss";
export default function Speakercard({
  name,
  designation,
  degree,
  image,
  value,
  removeConfSpeaker,
}) {
  return (
    <div className="speakercard">
      <div className="speaker-image-container">
        <div className="speaker-image-wrap">
          {image && image?.length > 0 ? (
            <img
              alt="profile picture"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={image[0].Location}
            />
          ) : (
            <ProfileSketch
              className="speaker-profilesketch-size"
              fill="#c4c4c4"
            />
          )}
        </div>
      </div>
      <div className="speaker-name-container">
        <p className="speaker-name mb-8">{name}</p>
        <p className="caption-3">{degree}</p>
        <p className="caption-3">{designation}</p>
      </div>

      <div className="speakercard-overlay"></div>
      <div
        onClick={() => removeConfSpeaker(value)}
        className="speakercard-delete-circle"
      >
        <DeleteIcon className="icon-size" />
      </div>
    </div>
  );
}
