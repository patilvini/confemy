import OnePlace from "../SVG-assets/OnePlace";
import Wallet from "../SVG-assets/Wallet";
import SetCreditGoals from "../SVG-assets/SetCreditGoals";
import ManageCMECredits from "../SVG-assets/ManageCMECredits";
import "./coverpages.scss";

export default function TrackCredits() {
  return (
    <div>
      <div className="cover-grid">
        <div className="section-one">
          <h1 style={{ width: "52.3rem",  fontSize:"4.8rem", color:"#000000" }}>
            All your CME credits in one place.
          </h1>
          <p
            style={{ margin: "2.4rem 0 3.2rem 0", width: "48.5rem" }}
            className="caption-2-regular-gray3"
          >
            With Confemy it's easier than ever to manage and track CME Credits.
          </p>
          <button className="button button-green">Track CME Credits</button>
        </div>
        <div>
          <OnePlace className="onePlace" />
        </div>
      </div>

      <div style={{ backgroundColor: "#ecf0f2" }} className="cover-grid">
        <div className="section-two">
          <h1 >Earn CME Credits</h1>
          <p
            style={{ margin: "2.4rem 0 3.2rem 0", width: "34.1rem", lineHeight:"2.4rem" }}
            className="caption-2-regular-gray3"
          >
           Attend conferences to earn more credits. Keep all your credit certificates in one place.
          </p>
         
        </div>
        <div>
          <Wallet className="wallet" />
        </div>
      </div>
      <div className="cover-grid">
      <div>
          <ManageCMECredits className="manageCME" />
        </div>

        <div className="section-three">
        
          <h1 >Manage CME Credits</h1>
          <p
            style={{ margin: "2.4rem 0 3.2rem 0", width: "39.9rem", lineHeight:"2.4rem" }}
            className="caption-2-regular-gray3"
          >
           Attend conferences to earn more credits. Keep all your credit certificates in one place.
          </p>
         
        </div>
        
      </div>
      <div style={{ backgroundColor: "#ecf0f2" }} className="cover-grid">
        <div className="section-four">
          <h1 >Set Credit Goals</h1>
          <p
            style={{ margin: "2.4rem 0 3.2rem 0", width: "38.4rem", lineHeight:"2.4rem" }}
            className="caption-2-regular-gray3"
          >
           Set credit goals for different credit types. Achieve your goals in time by attending more conferences on confemy.
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
