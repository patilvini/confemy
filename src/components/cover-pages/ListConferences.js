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
      <div className="section-1-grid">
        <div className="section-one">
          <h1>Host your conference on confemy. It's Free!</h1>
          <p className="caption-2-regular-gray3">
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

      <div style={{ backgroundColor: "#ecf0f2" }} className="section-grid">
        <div className="section-header">
          <h1>Easy Setup</h1>
          <p className="caption-2-regular-gray3">
            Hosting conferences on confemy is super easy and super fast.
          </p>
        </div>
        <div>
          <EasySetup className="wallet" />
        </div>
      </div>
      <div className="section-grid">
        <div>
          <SmartTicketing className="smartTicketing" />
        </div>

        <div className="">
          <h1>Smart Ticketing</h1>
          <p className="caption-2-regular-gray3">
            Create multiple ticket types, in just few easy steps.
          </p>
        </div>
      </div>
      <div style={{ backgroundColor: "#ecf0f2" }} className="section-grid">
        <div className="section-header">
          <h1>Real-time Analytics</h1>
          <p className="caption-2-regular-gray3">
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
