import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import api from "../../utility/api";
import "./step1.scss";
import {useSelector} from 'react-redux'

export default function BookingStep1() {
  const [data, setData] = useState();
  const userID = useSelector((state)=> state.auth.user?._id)
  
  const confID = useParams().confID;
  const [tickets, setTickets] = useState([])
  const [details, setDetails] = useState([])

  const [total, setTotal] = useState(0)

  const options = [
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
  ];


  

  

  const buy = async () => {
    let ticketDetails = {
      bookedBy: userID,
      tickets: details,
      conferenceId: confID

    }



    try{
      const r = await api.post('conferences/booking/step1', {ticketDetails} )
      console.log(r)
    } catch (err){
      console.log(err)
    }
    
  }
  


  useEffect(() => {
    const getData = async () => {
      try {
        const r = await api.get("/conferences/" + confID);
        console.log(r.data.data.conferences);
        setData(r.data.data.conferences);

        
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const date1 = DateTime.fromISO(data?.startDate);
  let startDate = date1.toFormat("LLL dd");

  const date2 = DateTime.fromISO(data?.endDate);
  let endDate = date2.toFormat("LLL dd");

  return (
    <div className="step1-page">
      <div className="step1-heading">
        <h3>{data?.title}</h3>
        <p className="conference-card-text caption-2-regular-gray3">
          {data?.mode.map((item, index) => {
            return (
              <span style={{ marginRight: "1rem" }} key={index}>
                {item}
              </span>
            );
          })}{" "}
          {startDate} {data?.startTime} - {endDate} {data?.endTime}{" "}
        </p>
      </div>

      <div style={{marginTop:"10rem"}}>
        {
        
        data?.tickets.map((item, index) => {
          
          
          
       
          return (
            <div  className="step1-tickets-grid" key={index}>
              <div className="step1-grid-item">
                <h3>{item.name}</h3>
                <h4>{item.type}</h4>
                {/* {item.info && <p>{item.info}</p>} */}
                {/* <p>Optional donation to support the National Independent Venue
                Association, a non-profit organization whose mission is to
                preserve and nurture the ecosystem of independent venues and
                promoters throughout the United States.</p> */}
              </div>
              <div style={{display:"flex"}} className="step1-grid-item">
                <div style={{marginLeft:"1rem"}}><h4>{item.currency} {item.price} x </h4></div>
                <div style={{marginLeft:"1rem"}}><Select options={options} placeholder="Pick" 
                onChange={(e)=>{
                tickets[index] = item.price * e.value
              
                details[index] = {ticketId : item._id, quantity: e.value}
                console.log(details)
                let sum = 0
                for (let i = 0; i < tickets.length; i++) {
                  sum += tickets[i];
              }
              setTotal(sum)


                }} style={{height:"3rem", padding:".5rem", width: "30%"}} type="number"/> </div>
              </div>
            </div>
          );
        })}
        <hr className="tickets-page-divider"/>

        <div className="buy-button-grid">
          
          <div className="step1-grid-item">

          </div>
          <div style={{display:"flex"}} className="step1-grid-item">
          <h4 style={{marginRight: "2rem" , marginTop:"1.2rem"}}>Total: {data?.tickets[0].currency} {total}</h4>
            <button onClick={()=>buy()} className="button button-green">Buy</button>

          </div>
        </div>
      </div>
    </div>
  );
}
