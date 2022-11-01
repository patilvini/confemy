import { useState } from "react";
import LiveStreamForm from "./LiveStreamForm";

import "./liveStream.scss";

import ZoomMeetingIcon from "../icons/ZoomMeetingIcon";
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

export default function LiveStream() {
  const [activeStep, setActiveStep] = useState(null);
  const [activeRec, setActiveRec] = useState(null);
  const [activeResourceStep, setActiveResourceStep] = useState(null);

  const tabs = [
    {
      name: "Zoom",
      icon: <ZoomMeetingIcon className="icon-xxl" />,
      value: "zoom",
    },
    {
      name: "Google Meet",
      icon: <GoogleMeetIcon className="icon-xxl" />,
      value: "googleMeet",
    },
    {
      name: "Vimeo",
      icon: <VimeoIcon className="vimeo-icon-size" />,
      value: "vimeo",
    },
    {
      name: "Youtube Live",
      icon: <YoutubeIcon className="youtube-icon-size" />,
      value: "youtube",
    },
    {
      name: "Facebook Live",
      icon: <FacebookIcon className="facebook-icon-size" />,
      value: "facebook",
    },
  ];

  const resources = [
    {
      name: "Files",
      icon: <AddFileIcon className="icon-xxl" />,
    },
    {
      name: "Text",
      icon: <AddTextIcon className="icon-xxl" />,
    },
    {
      name: "Image",
      icon: <AddImageIcon className="icon-xxl" />,
    },
    {
      name: "Video",
      icon: <AddVideoIcon className="icon-xxl" />,
    },
    {
      name: "Link",
      icon: <AddLinkIcon className="icon-xxl" />,
    },
  ];

  function renderResource(step) {
    switch (step) {
      case 0:
        return <AddDocument />;
      case 1:
        return <AddText />;
      case 2:
        return <AddImage />;
      case 3:
        return <AddVideo />;
      case 4:
        return <AddLink />;

      default:
        return null;
    }
  }

  return (
    <div className="livestream-container">
      <div className="mb-72">
        <h2 className="mb-16">Add Live video streaming</h2>
        <p className="caption-1-regular-gray3">
          Add Livestream to your online conference
        </p>
        <div className="grid-col-5 mt-56 mb-80">
          {tabs.map((tab, index) => {
            return (
              <div className="livestream-tab-wrap" key={tab.name}>
                <div
                  className={
                    activeStep === index
                      ? "active-livestream-tab"
                      : "livestream-tab"
                  }
                  onClick={() => {
                    if (activeStep === null) {
                      setActiveStep(index);
                    }
                    if (activeStep === index) {
                      setActiveStep(null);
                    }
                    if (activeStep !== index) {
                      setActiveStep(index);
                    }
                  }}
                >
                  {tab.icon}
                </div>
                <div
                  style={{ opacity: 0.6 }}
                  className="mt-24 caption-1-regular-cblack"
                >
                  {tab.name}
                </div>
              </div>
            );
          })}
        </div>
        {tabs.map(
          (tab, index) =>
            activeStep === index && (
              <LiveStreamForm
                key={tab.name}
                tabName={tab.name}
                tabIcon={tab.icon}
                tabValue={tab.value}
              />
            )
        )}
      </div>
      <div className="mb-80">
        <h2 className="mb-16 mt-32">Add Resources</h2>
        <p className="caption-1-regular-gray3">
          Share any important details with your attendees before they join the
          event.
          <br />
          These resources will be shared with the attendees only after they book
          for the conference.
        </p>
        <div className="grid-col-5 mt-56 mb-80">
          {resources.map((resource, index) => {
            return (
              <div className="livestream-tab-wrap" key={resource.name}>
                <div
                  className={
                    activeResourceStep === index
                      ? "active-livestream-tab"
                      : "livestream-tab"
                  }
                  onClick={() => {
                    if (activeResourceStep === null) {
                      setActiveResourceStep(index);
                    }
                    if (activeResourceStep === index) {
                      setActiveResourceStep(null);
                    }
                    if (activeResourceStep !== index) {
                      setActiveResourceStep(index);
                    }
                  }}
                >
                  {resource.icon}
                </div>
                <div
                  style={{ opacity: 0.6 }}
                  className="mt-24 caption-1-regular-cblack"
                >
                  {" "}
                  {resource.name}
                </div>
              </div>
            );
          })}
        </div>
        <div>{renderResource(activeResourceStep)}</div>
      </div>
    </div>
  );
}
