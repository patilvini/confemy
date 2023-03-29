import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSketch from "../icons/HeroSketch";
import "./hero.styles.scss";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-background">
      <div className="hero-container">
        <div className="hero-text">
          <p className="landing-page-title">Discover the best</p>
          <p className="landing-huge-title">Medical conferences</p>
          <button
            onClick={() => {
              navigate("/search-conference");
            }}
            style={{ maxWidth: "60%", fontSize: "1.1vw" }}
            className="button button-green"
          >
            Explore Trending Conferences
          </button>
        </div>
        <div className="">
          <HeroSketch className="hero-sketch" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
