import ProfileSketch from "../icons/ProfileSketch";

export default function SpeakerCard({
  name,
  designation,
  degree,
  image,
  value,
  removeConfSpeaker,
}) {
  return (
    <div className="speaker-card">
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
    </div>
  );
}
