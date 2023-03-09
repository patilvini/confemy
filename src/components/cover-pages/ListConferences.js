import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HostConferences from "../SVG-assets/HostConferences";
import EasySetup from "../SVG-assets/EasySetup";
import SmartTicketing from "../SVG-assets/SmartTicketing";
import RealTimeAnalytics from "../SVG-assets/RealTimeAnalytics";
import "./coverpages.scss";

export default function ListConferences() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <div className="cover-grid">
        <div className="section-one">
          <h1
            style={{ width: "52.3rem", fontSize: "4.8rem", color: "#000000" }}
          >
            Host your conference on confemy. It's Free!
          </h1>
          <p
            style={{ margin: "2.4rem 0 3.2rem 0", width: "48.5rem" }}
            className="caption-2-regular-gray3"
          >
            Confemy is a new age platform for hosting medical conferences, in
            few easy steps.
          </p>
          <button
            className="button button-green"
            onClick={() => navigate("/dashboard/create-conference")}
          >
            HOST YOUR CONFERENCE
          </button>
        </div>
        <div>
          <HostConferences className="hostConfs" />
        </div>
      </div>

      <div style={{ backgroundColor: "#ecf0f2" }} className="cover-grid">
        <div className="section-two">
          <h1>Easy Setup</h1>
          <p
            style={{
              margin: "2.4rem 0 3.2rem 0",
              width: "30.9rem",
              lineHeight: "2.4rem",
            }}
            className="caption-2-regular-gray3"
          >
            Hosting conferences on confemy is super easy and super fast.
          </p>
        </div>
        <div>
          <EasySetup className="wallet" />
        </div>
      </div>
      <div className="cover-grid">
        <div>
          <SmartTicketing className="smartTicketing" />
        </div>

        <div className="section-three">
          <h1>Smart Ticketing</h1>
          <p
            style={{
              margin: "2.4rem 0 3.2rem 0",
              width: "30.9rem",
              lineHeight: "2.4rem",
            }}
            className="caption-2-regular-gray3"
          >
            Create multiple ticket types, in just few easy steps.
          </p>
        </div>
      </div>
      <div style={{ backgroundColor: "#ecf0f2" }} className="cover-grid">
        <div className="section-four">
          <h1>Real-time Analytics</h1>
          <p
            style={{
              margin: "2.4rem 0 3.2rem 0",
              width: "38.4rem",
              lineHeight: "2.4rem",
            }}
            className="caption-2-regular-gray3"
          >
            Keep track of all your conferences with real time analytics.
          </p>
        </div>
        <div>
          <RealTimeAnalytics className="setGoals" />
        </div>
      </div>
      <div className="getStarted">
        <h1>Get Started</h1>
        <p>It's Completely free</p>
        <button
          className="button button-primary"
          onClick={() => navigate("/signin")}
        >
          HOST YOUR CONFERENCE
        </button>
      </div>
    </div>
  );
}
