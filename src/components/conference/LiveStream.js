import { useState } from "react";
import LiveStreamForm from "./LiveStreamForm";

import "./liveStream.scss";
// import GoogleIcon from "../icons/GoogleIcon";
import ZoomLogo from "../icons/ZoomLogo";
import GoogleMeetIcon from "../icons/GoogleMeetIcon";
import VimeoIcon from "../icons/VimeoIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import FacebookIcon from "../icons/FacebookIcon";

export default function LiveStream() {
  const [activeTab, setActiveTab] = useState(null);

  const [activeRec, setActiveRec] = useState(null);

  const tabs = [
    { name: "Zoom", icon: <ZoomLogo /> },
    { name: "Google Meet", icon: <GoogleMeetIcon /> },
    { name: "Vimeo", icon: <VimeoIcon /> },
    { name: "Youtube Live", icon: <YoutubeIcon /> },
    { name: "Facebook", icon: <FacebookIcon /> },
  ];

  const resources = [
    { name: "Files", icon: <ZoomLogo /> },
    { name: "Text", icon: <GoogleMeetIcon /> },
    { name: "Image", icon: <VimeoIcon /> },
    { name: "Video", icon: <YoutubeIcon /> },
    { name: "Link", icon: <FacebookIcon /> },
  ];

  return (
    <div>
      <h1>Add Live video streaming</h1>
      <p className="caption-2-regular-gray3">
        Add Livestream to your online conference
      </p>

      <div className="flex-container">
        {tabs.map((item, index) => {
          return (
            <div key={index}>
              <button
                className="buttons-livestream"
                onClick={() => {
                  if (activeTab === null) {
                    setActiveTab(item.name);
                  }
                  if (activeTab === item.name) {
                    setActiveTab(null);
                  }
                  if (activeTab !== item.name) {
                    setActiveTab(item.name);
                  }
                }}
              >
                {item.icon}
              </button>
            </div>
          );
        })}
      </div>

      {tabs.map((item, index) => {
        return (
          <div key={index}>
            <div>
              <LiveStreamForm active={activeTab} source={item.name} />
            </div>
          </div>
        );
      })}

      <div className="flex-container">
        {resources.map((item, index) => {
          return (
            <div key={index}>
              <button
                className="buttons-livestream"
                onClick={() => {
                  if (activeTab === null) {
                    setActiveRec(item.name);
                  }
                  if (activeTab === item.name) {
                    setActiveRec(null);
                  }
                  if (activeTab !== item.name) {
                    setActiveRec(item.name);
                  }
                }}
              >
                {item.icon}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
