import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import api from "../../utility/api";
import "./step1.scss";
import {useSelector} from 'react-redux'


export default function BookingStep1() {
  const [data, setData] = useState();
  const userID = useSelector((state)=> state.auth.user?._id)
  const navigate = useNavigate()
  
  const confID = useParams().confID;
  const [tickets, setTickets] = useState([])
  const [details, setDetails] = useState([])

  const [total, setTotal] = useState(0)

  const options = [
   
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },
  ];


  const buy = async () => {
    let ticketDetails = {
      bookedBy: userID,
      tickets: details,
      conferenceId: confID

    }

    ticketDetails.tickets = details.filter((item)=>{
      if (item !== null) return item
    })

    // console.log("submit: " ,ticketDetails)


    try{
      const r = await api.post('conferences/bookings/step1', {ticketDetails} )
      navigate('/booking-step2/'+ r.data.data.bookingDetails._id)
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
                {item.info && <p>{item.info}</p>}
                <p>Optional donation to support the National Independent Venue
                Association, a non-profit organization whose mission is to
                preserve and nurture the ecosystem of independent venues and
                promoters throughout the United States.</p>
              </div>
              {item.price > 0 && <div style={{display:"flex"}} className="step1-grid-item">
                <div style={{marginLeft:"1rem"}}><h4>{item.currency} {item.price} x </h4></div>
                <div style={{backgroundColor:"red"}}><Select options={options} placeholder="Pick" 
                onChange={(e)=>{
                tickets[index] = item.price * e.value
              
                details[index] = {ticketId : item._id, quantity: e.value}
                // console.log(details)
                let sum = 0
                for (let i = 0; i < tickets.length; i++) {
                  sum += tickets[i];
              }
              setTotal(sum)


                }} style={{height:"3rem", padding:".5rem", width: "30%"}} type="number"/> </div>
              </div>}
              {item.price === 0 && <div style={{display:"flex"}} className="step1-grid-item">
                
                <div style={{marginLeft:"8.5rem"}}><Select options={options} placeholder="Pick" 
                onChange={(e)=>{
                // tickets[index] = item.price * e.value
              
                details[index] = {ticketId : item._id, quantity: e.value}
                // console.log(details)
                // let sum = 0
              //   for (let i = 0; i < tickets.length; i++) {
              //     sum += tickets[i];
              // }
              // setTotal(sum)


                }} style={{height:"3rem", padding:".5rem", width: "30%"}} type="number"/> </div>
              </div>}
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
