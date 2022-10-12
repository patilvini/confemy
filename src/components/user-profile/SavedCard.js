import DateIcon from "../icons/DateIcon";
import CreditsIcon from "../icons/CreditsIcon";
import LocationIcon from "../icons/LocationIcon";
import ResendIcon from "../icons/ResendIcon";
import ReceiptIcon from "../icons/ReceiptIcon";
import LikeRedIcon from "../icons/LikeRedIcon";
import ShareIcon from "../icons/ShareIcon";
import { DateTime } from "luxon";
import api from "../../utility/api";
import { useSelector } from "react-redux";

export default function SavedCard({ data, unliked}) {
  const date = DateTime.fromISO(data.conference.startDate);




  const userID = useSelector((state)=>state.auth.user?._id)
  let scheduleDate = date.toLocaleString({
    ...DateTime.DATE_MED_WITH_WEEKDAY,
    weekday: "short",
  });

  const unLike = async (confID) => {
  

    
    
    
    try{
      const r = await api.delete("/conferences/like/"+userID, {data:{conferenceIds:[confID]}})
    

      console.log(r)
      unliked()
   
    } catch (err){
      console.log(err)
    }
  }

  return (
    
        <div className="saved-card">
      <div>
        <img src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbmZlcmVuY2V8ZW58MHx8MHx8&w=1000&q=80" />
      </div>
      <div className="ticket-details">
        <h3 style={{ fontSize: "2rem" }}>{data.conference.title}</h3>
        <div className="ticket-details-grid">
          <DateIcon className="icon-size" />
          <p className="ticket-grid-item ticket-details-text caption-2-regular-gray3">
            {scheduleDate}, {data.conference.startTime}{" "}
            {data.conference.timezone}
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
      </div>
      <div><div
            style={{ marginTop: "2rem", display:'flex' }}
            className="conference-card-grid-item"
          >
            <div>
            <ShareIcon className="conf-card-icons" />

            </div>
            <div>
              <button className="conference-card-buttons" onClick={()=>{
                
                unLike(data.conference._id)
                }} ><LikeRedIcon className="conf-card-icons" /></button>
            

            </div>
            

            
          </div></div>
    </div>
    

   
    
  );
}
