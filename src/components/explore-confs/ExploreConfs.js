import React from "react";
import GlobeSketch from "../icons/GlobeSketch";
import VideoconfSketch from "../icons/VideoconfSketch";
import CreditcardsSketch from "../icons/CreditcardsSketch";
import "./exploreConfs.styles.scss";
import { useNavigate } from "react-router-dom";

function ExploreConfs(props) {
  const navigate = useNavigate();
  return (
    <div className="grid-col-8">
      <div
        onClick={() => {
          navigate("/search-conference");
        }}
        className="explore-section-1"
      >
        <GlobeSketch className="globe-sketch" />
        <h3 className="mb-8">Explore Conferences</h3>
        <p className="body-regular-gray3">
          Find the best medical conferences around the world.
        </p>
      </div>
      <div
        onClick={() => {
          navigate("/list-conferences");
        }}
        className="explore-section-2"
      >
        <VideoconfSketch className="videoconference-sketch" />
        <h3 className="mb-8">Host Conferences </h3>
        <p className="body-regular-gray3">
          Host your conferences. Keep track of bookings with smart analytics.
        </p>
      </div>
      <div
        onClick={() => {
          navigate("/track-credits");
        }}
        className="explore-section-3"
      >
        <CreditcardsSketch className="creditcards-sketch" />
        <h3 className="mb-8">Track Credits</h3>
        <p className="body-regular-gray3">
          Confemy is the best place for managing your CME Credits.
        </p>
      </div>
    </div>
  );
}

export default ExploreConfs;
