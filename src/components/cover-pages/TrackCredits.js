import OnePlace from "../SVG-assets/OnePlace";
import Wallet from "../SVG-assets/Wallet";
import SetCreditGoals from "../SVG-assets/SetCreditGoals";
import ManageCMECredits from "../SVG-assets/ManageCMECredits";
import "./coverpages.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TrackCredits() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <div className="section-1-grid">
        <div className="section-one">
          <h1>All your CME credits in one place.</h1>
          <p className="caption-2-regular-gray3">
            With Confemy it's easier than ever to manage and track CME Credits.
          </p>
          <button
            className="button button-green"
            onClick={() => navigate("/user-profile/credits")}
          >
            Track CME Credits
          </button>
        </div>
        <div>
          <OnePlace className="trackCredit-sketch" />
        </div>
      </div>

      <div style={{ backgroundColor: "#ecf0f2" }} className="section-grid">
        <div className="section-header">
          <h1>Earn CME Credits</h1>
          <p className="caption-2-regular-gray3">
            Attend conferences to earn more credits. Keep all your credit
            certificates in one place.
          </p>
        </div>
        <div>
          <Wallet className="wallet" />
        </div>
      </div>
      <div className="section-grid">
        <div>
          <ManageCMECredits className="manageCME" />
        </div>

        <div className="section-header">
          <h1>Manage CME Credits</h1>
          <p className="caption-2-regular-gray3">
            Attend conferences to earn more credits. Keep all your credit
            certificates in one place.
          </p>
        </div>
      </div>
      <div style={{ backgroundColor: "#ecf0f2" }} className="section-grid">
        <div className="section-header">
          <h1>Set Credit Goals</h1>
          <p className="caption-2-regular-gray3">
            Set credit goals for different credit types. Achieve your goals in
            time by attending more conferences on confemy.
          </p>
        </div>
        <div>
          <SetCreditGoals className="setGoals" />
        </div>
      </div>
      <div className="getStarted">
        <h1>Get Started</h1>
        <p>It's Completely free</p>
        <button className="button button-primary">Set Credit Goals</button>
      </div>
    </div>
  );
}
