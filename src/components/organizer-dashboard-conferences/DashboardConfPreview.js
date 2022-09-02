import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import api from "../../utility/api"

export default function DashboardConfPreview ( ) {

    const [data, setData] = useState()

    useEffect(()=>{
        const getData = async()=> {
            try{
              const r = await api.get("/organizers/conferences/62f0aaaf5d91b79ba8f66da6")
              console.log(r.data.data.conferenceDetails)
              setData(r.data.data.conferenceDetails)
              
      
            }
            catch(err){
              console.log(err)
            }
          }
      
          
            getData()
          
        },[]

    )

    const date = DateTime.fromISO(data?.activeDate);


    // const userID = useSelector((state)=>state.auth.user?._id)
    let scheduleDate = date.toLocaleString({
      ...DateTime.DATE_MED_WITH_WEEKDAY,
      weekday: "short",
    });

   
    return <div className="dash-wrapper">
        <div className="opposite-grid">
        <div>
        <h2>{data?.title}</h2>
        <p className="caption-2-regular-gray3">{scheduleDate}</p>

        </div>
       
        <div className="grid-item-right">
            <button style={{marginRight:"1rem"}} className="button button-primary">Preview</button>
            <button style={{marginRight:"1rem"}} className="button button-primary">Duplicate</button>
            <button className="button button-green">Edit</button>
        </div>



        </div>
        <div className="data-grid">
            <div className="data-container">
            <p className="caption-2-regular-gray3">Tickets Sold</p>
            <h2 style={{padding: "1rem"}}>{data?.totalTicketSold}/{data?.totalTicketQuantity}</h2>


            </div>
            <div className="data-container">
            <p className="caption-2-regular-gray3">Gross</p>
            <h2 style={{padding: "1rem"}}>{data?.currency}{data?.grossPrice}</h2>

            </div>
            <div className="data-container">

            <p className="caption-2-regular-gray3">Status</p>
            <h2 style={{padding: "1rem"}}>Live</h2>

            </div>
            <div className="data-container">
            <p className="caption-2-regular-gray3">Refund Requests</p>
            <h2 style={{padding: "1.6rem"}}>2</h2>

            </div>
        </div>
        <h3>Sales by Ticket Type</h3>


        <div className="overview-table-heading">
          <div style={{textAlign: "left", marginLeft: "2rem"}} className="overview-table-item">Ticket Type</div>
          <div className="overview-table-item">Price</div>

          <div className="overview-table-item">Sold</div>

          <div className="overview-table-item">Status</div>

         
        </div>

        {data?.tickets.map((item, index)=>{
          return (
            <div key={index}>
              <div className="overview-table">
          <div style={{textAlign: "left", marginLeft: "2rem"}} className="overview-table-item">{item.name} </div>
          <div className="overview-table-item">{item.currency}{item.price}</div>

          <div className="overview-table-item">{item.sold}/{item.left}</div>

          <div className="overview-table-item">{item.left}</div>

          
        </div> </div>
          )
        })}



<h3 style={{marginTop: "9.2rem"}}>Attendee (#total attedees)</h3>


<div className="overview-table-heading">
  <div style={{textAlign: "left", marginLeft: "2rem"}} className="overview-table-item">Name</div>
  <div className="overview-table-item">Registration no.</div>

  <div className="overview-table-item">Booked</div>

  <div className="overview-table-item">Booking Status</div>

 
</div>

{data?.attendees.map((item, index)=>{
  return (
    <div key={index}>
      <div className="overview-table">
  <div style={{textAlign: "left", marginLeft: "2rem"}} className="overview-table-item"><h4>{item.user.firstName} {item.user.lastName}</h4> <p className="caption-2-regular-gray3">{item.user.profession}</p></div>
  <div className="overview-table-item">#3498r34b34</div>

  <div className="overview-table-item">Oct 21, 2021</div>

  <div className="overview-table-item">Confirmed Booking</div>

  
</div> </div>
  )
})}


<h3 style={{marginTop: "9.2rem"}}>Your Links</h3>
        
        
    </div>
}