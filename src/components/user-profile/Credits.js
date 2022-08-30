import AddIcon from "../icons/AddIcon.js";
import GlobeSketch from "../icons/GlobeSketch";
import DropdownIcon from "../icons/DropdownIcon";
import EditIcon from "../icons/EditIcon.js";
import api from "../../utility/api.js";
import { useSelector } from "react-redux/es/exports.js";
import { useState } from "react";
import ExternalCredModal from "./ExternalCredModal.js";

export default function Credits() {
  let component;


  const [externalOpen , setExternalOpen ] = useState(false)
  const userID = useSelector((state)=>state.auth.user?._id)
  

  

  let a = [1, 2 ,2 ]

  const noCredits = (
    <div>
      <GlobeSketch className="icon-plshld" />
      <div className="passes-list">
        <h2>No Credits found. Book Conference to earn credits. </h2>
        <h3 style={{ color: "grey", margin: "2rem" }}>OR</h3>
        <button
          style={{ margin: "0rem 0 6rem 0" }}
          className="button button-primary"
        >
          Add CME Credits
        </button>
        <button
          style={{ margin: "0rem 1rem 6rem 1rem" }}
          className="button button-primary"
        >
          Set Credit Goals
        </button>
      </div>
    </div>
  );

  const credits = (
    <div>
      <h1 style={{ margin: "7.7rem 0 3rem 12.2rem" }}>Credits</h1>

      <div className="credits-wrapper">
        <div style={{ width: "100%" }} className="opposite-grid">
          <div className="grid-item-left flex-container">
            <div style={{ alignSelf: "center" }}>
              <button onClick={()=> {
                console.log("dasndjn")
                setExternalOpen(true)
                }} className="circle-button">
                <AddIcon />
              </button>
            </div>
            <div className="circle-label">
              <span className="caption-2-regular-gray3">
                Add external credits
              </span>
            </div>
          </div>
          <div className="grid-item-right">
            <button className="button button-secondary">
              Last 30 days <DropdownIcon className="icon-size" />{" "}
            </button>
          </div>
        </div>

        <div className="credits-table-heading">
          <div className="credit-table-item">Credit Type</div>
          <div className="credit-table-item">Total Credits</div>

          <div className="credit-table-item">Registered Credits</div>

          <div className="credit-table-item">Pending Clearance</div>

          <div className="credit-table-item">To Goal</div>
        </div>
        {a.map((item, index)=>{
          return (
            <div key={index}>
              <div className="credits-table">
          <div className="credit-table-item">AMA Category1</div>
          <div className="credit-table-item">30</div>

          <div className="credit-table-item">20</div>

          <div className="credit-table-item">10</div>

          <div className="credit-table-item">20 <button style={{backgroundColor:"#fafbfc", border: "none"}} ><EditIcon /></button></div>
      
        </div> </div>
          )
        })}
      </div>

      {externalOpen && <ExternalCredModal  onDismiss={()=>{setExternalOpen(false)}} /> }
    </div>
  );

  if (true) {
    component = credits;
  }
  return <div>{component}</div>;
}
