import React from "react";
import { useNavigate } from "react-router-dom";
import HostYourConfSketch from "../icons/HostYourConfSketch";
import "./hostYourConfs.styles.scss";
function HostYourConfs(props) {
  const navigate = useNavigate();
  return (
    <section className=" host-your-conference ">
      <div className="plan-and-host-conf">
        <h1>
          Plan and Host your <br /> conference for FREE
        </h1>
        <button
          onClick={() => navigate("/list-conferences")}
          style={{ marginTop: "2.8rem" }}
          className="button button-green"
        >
          Host your conference
        </button>
      </div>
      <div className="">
        <HostYourConfSketch className="host-your-conference-sketch" />
      </div>
    </section>
  );
}

export default HostYourConfs;
