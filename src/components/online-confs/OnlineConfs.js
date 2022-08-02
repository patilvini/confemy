import React from "react";
import ConfCard from "../conf-card/ConfCard";
import "./onlineConfs.styles.scss";

function OnlineConfs() {
  return (
    <section className="bg-background conf-display">
      <div>
        <h2>Online Conferences</h2>
        <div className="grid-col-4 conf-display-grid">
          <div>
            <ConfCard />
          </div>
          <div>
            <ConfCard />
          </div>
          <div>
            <ConfCard />
          </div>
          <div>
            <ConfCard />
          </div>
        </div>
        <div className="see-all-button">
          <button className="button button-primary">See all</button>
        </div>
      </div>
    </section>
  );
}

export default OnlineConfs;
