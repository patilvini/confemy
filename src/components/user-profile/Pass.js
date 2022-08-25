import DateIcon from "../icons/DateIcon";
import CreditsIcon from "../icons/CreditsIcon";
import LocationIcon from "../icons/LocationIcon";
import ResendIcon from "../icons/ResendIcon";
import ReceiptIcon from "../icons/ReceiptIcon";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";




export default function Pass ({onClick, data }){


    // const [modalOpen , setModalOpen ] = useState(false)

    
const date = DateTime.fromISO(data.conference.startDate);

let scheduleDate = date.toLocaleString({
  ...DateTime.DATE_MED_WITH_WEEKDAY,
  weekday: "short",
});






    return(

        <div onClick={()=>onClick()} style={{ margin: "3rem 0 3rem 0" }}>
      
      <div className="conf-card-passes">
        <div className="ticket-details">
          <h3 style={{ fontSize: "2rem" }}>
           {data.conference.title}
          </h3>
          <div className="ticket-details-grid">
            <DateIcon className="icon-size" />
            <p className="ticket-grid-item ticket-details-text caption-2-regular-gray3">
        
              {scheduleDate}, {data.conference.startTime} {data.conference.timezone}
            </p>
            <LocationIcon className="icon-size" />
            <div className="ticket-grid-item ticket-details-text caption-2-regular-gray3">
             
            {data.conference.mode.map((item, index) => {
                return (
                  <span style={{ marginRight: "1rem" }} key={index}>
                    {item}
                  </span>
                );
              })}
              
            </div>

            <CreditsIcon className="icon-size" />
            <div className="ticket-grid-item ticket-details-text caption-2-regular-gray3">
            {data.conference.credits.map((item, index) => {
                return (
                  <span style={{ marginRight: "1rem" }} key={index}>
                    {item.creditType} {item.quantity}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="opposite-grid">
            <div className="grid-item-left">
              <p
                style={{
                  color: "#444444",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                Items
              </p>
              <p style={{fontSize: "1.5rem", fontWeight: "bold", color:"#444444", marginTop:'.5rem'}}> 2 x Regular Passes</p>
            </div>
            <div className="grid-item-right">
              <p
                style={{
                  color: "#444444",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                Status
              </p>
              <p style={{fontSize: "1.5rem", fontWeight: "bold", color:"#444444", marginTop:'.5rem'}}>Confirmed</p>
            </div>
          </div>
        </div>
        <div  style={{marginTop:"1rem"}} className="opposite-grid">
          <button className="button-left button button-primary"><ResendIcon className="icon-button" fill="#fff"/>Resend Passes</button>
          <button className="button-right button button-primary"><ReceiptIcon className="icon-button" fill="#fff"/>Print Receipt</button>
        </div>
      </div>






      

    </div>






    )
}