import { useState } from "react";
import LiveStreamForm from "./LiveStreamForm";

import "./liveStream.scss";
// import GoogleIcon from "../icons/GoogleIcon";
import ZoomLogo from "../icons/ZoomLogo";
import GoogleMeetIcon from "../icons/GoogleMeetIcon";
import VimeoIcon from "../icons/VimeoIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import FacebookIcon from "../icons/FacebookIcon";
import AddFileIcon from "../icons/AddFileIcon";
import AddImageIcon from "../icons/AddImageIcon";
import AddLinkIcon from "../icons/AddLinkIcon";
import AddVideoIcon from "../icons/AddVideoIcon";
import AddTextIcon from "../icons/AddTextIcon";
import AddDocument from "./AddDocument";
import AddText from "./AddText";
import AddImage from "./AddImage";
import AddVideo from "./AddVideo";
import AddLink from "./AddLink";
import { object } from "yup";
import { useSelector } from "react-redux";

export default function LiveStream() {
  const [activeTab, setActiveTab] = useState(null);

  const [activeRec, setActiveRec] = useState(null);
  const conference = useSelector((state) => state.conference.newConference);
  const links = [conference?.zoom, conference?.googleMeet, conference?.vimeo, conference?.youtube, conference?.facebook]
  const resourceTabs = [conference?.resourceDocuments, conference?.resourceText, conference?.resourceImages, conference?.resourceVideos, conference?.resourceLinks]

  const buttonClasses = [
    "livestream-button",
    "livestream-active",
    "livestream-done",
  ];

  const tabs = [
    { name: "Zoom", icon: <ZoomLogo />, platform: "zoom", class:{}},
    { name: "Google Meet", icon: <GoogleMeetIcon />, platform: "googleMeet", class:{}},
    { name: "Vimeo", icon: <VimeoIcon />, platform: "vimeo", },
    { name: "Youtube Live", icon: <YoutubeIcon />, platform: "youtube", class:{}},
    { name: "Facebook", icon: <FacebookIcon />, platform: "facebook", class:{}},
  ];

  const recs = ["Files", "Text", "Image", "Video", "Link"];

  const resources = [
    {
      name: "Files",
      icon: <AddFileIcon />,
      component: <AddDocument active={activeRec} source={recs[0]} />,
    },
    {
      name: "Text",
      icon: <AddTextIcon />,
      component: <AddText active={activeRec} source={recs[1]} />,
    },
    {
      name: "Image",
      icon: <AddImageIcon />,
      component: <AddImage active={activeRec} source={recs[2]} />,
    },
    {
      name: "Video",
      icon: <AddVideoIcon />,
      component: <AddVideo active={activeRec} source={recs[3]} />,
    },
    {
      name: "Link",
      icon: <AddLinkIcon />,
      component: <AddLink active={activeRec} source={recs[4]} />,
    },
  ];

  return (
    <div>
      <h1>Add Live video streaming</h1>
      <p style={{ marginTop: "1.6rem" }} className="caption-2-regular-gray3">
        Add Livestream to your online conference
      </p>

      <div className="flex-container">
        {tabs.map((item, index) => {
          return (
            <div key={index}>
              <button
                className={activeTab === item.name ? "livestream-active" : (links[index]?.meetingUrl ? "livestream-done" : "livestream-button")}
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
              <LiveStreamForm
                active={activeTab}
                source={item.name}
                platform={item.platform}
              />
            </div>
          </div>
        );
      })}

      <h1>Resources</h1>
      <p
        style={{ lineHeight: "2rem", width: "88%", marginTop: "1.6rem" }}
        className="caption-2-regular-gray3"
      >
        Share any important details with your attendees before they join the
        event. These resources will be shared with the attendees only after they
        book for the conference.
      </p>

      <div className="flex-container">
        {resources.map((item, index) => {
          return (
            <div key={index}>
              <button
                className={activeRec === item.name ? "livestream-active" :  (resourceTabs[index]?.length> 0 || resourceTabs[index]?.blocks?.length>0 || resourceTabs[index][0]?.title.length > 0  ? "livestream-done" : "livestream-button")}
                onClick={() => {
                  if (activeRec === null) {
                    setActiveRec(item.name);
                  }
                  if (activeRec === item.name) {
                    setActiveRec(null);
                  }
                  if (activeRec !== item.name) {
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

      {resources.map((item, index) => {
        return <div key={index}>{item.component}</div>;
      })}
    </div>
  );
}
