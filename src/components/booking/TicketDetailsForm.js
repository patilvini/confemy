import { useEffect, useState } from "react";

export default function TicketDetailsForm({ title , setValue, i}) {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        ticketId:i.tickets[0].ticketId._id

    })

    
   

  return (
    <form className="form-type-1">
      <h4 style={{ marginBottom: "1rem" }}>{title}</h4>

      <div style={{ margin: "1.6rem 0 1.6rem 0" }} className="form-type-1 ">
        <div className="flex-container-std">
          <div
            style={{ width: "50%", margin: "0 2rem 2rem 0rem" }}
            className="material-textfield"
          > 
            <input onChange={(e)=>{
                data.firstName=e.target.value
                setValue(data)
        
        
            }} type="text" placeholder=" " />
            <label>First Name*</label>
          </div>
          <div
            style={{ width: "50%", margin: "0 0rem 2rem 0rem" }}
            className="material-textfield"
          >
            <input onChange={(e)=>{
                data.lastName = e.target.value
                setValue(data)
                
                }} type="text" placeholder=" " />
            <label>Last Name*</label>
          </div>  
        </div>
        <div className="material-textfield">
          <input onChange={(e)=>{
            data.email = e.target.value
            setValue(data)
            }} type="email" placeholder=" " />
          <label>Email*</label>
        </div>
      </div>
    </form>
  );
}
