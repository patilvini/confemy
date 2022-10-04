import { useState, useEffect } from "react";
import api from "../../utility/api";
import { useSelector } from "react-redux";
import DeleteIcon from "../icons/DeleteIcon";
import { useNavigate } from "react-router-dom";

export default function BookingCart() {
  const userID = useSelector((state) => state.auth.user?._id);
  const navigate = useNavigate()

  const [data, setData] = useState();


  const getData = async () => {
    try {
      const r = await api.get("/conferences/bookings/users/" + userID);
      setData(r.data.data);
      console.log(r.data.data);
     
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    
    getData();
  }, [userID]);


  

  const deleteConf = async (index, id) =>{
  
  

   
   try{
    const r = await api.delete("/conferences/bookings/" + id)
    console.log(r)

    getData()
   

   } catch (err){
    console.log(err)
   }
   
    
  }

  return (
    <div className="cart">
      <h2> Cart {data?.count}</h2>
      <hr  style={{marginTop:"2rem", marginBottom:"2rem", width:"100%"}}/>
      {data?.bookingDetails.map((item, index) => {
        
        return (
          <div key={index}>
            <div className="cart-grid" key={index}>
              <h3 onClick={()=>{navigate("/booking-step2/"+item._id)}} className="cart-item">{item.conference.title}</h3>
              <p  className="cart-item" style={{ fontSize: "1.5rem" }}>
                {item.conference.currency} {item.totalPrice}
              </p>
              <div className="cart-item">
                <button onClick={()=>deleteConf(index, item._id)} className="credits-button">
                  <DeleteIcon fill="grey" />
                </button>
              </div>
            </div>
            {item.tickets.map((innerItem, innerIndex) => {
              return (
                <div
                  style={{ width: "100%", marginTop:'2rem' }}
                  className="cart-grid"
                  key={innerItem._id}
                >
                  <strong><p style={{ fontSize: "1.4rem" }} className="cart-item">{innerItem.ticketId.name}</p></strong>
                  <p style={{ fontSize: "1.4rem" }} className="cart-item">
                    {innerItem.quantity} x {item.conference.currency}
                    {innerItem.ticketId.price}
                  </p>
                  <div className="cart-item">
                    
                  </div>
                  
                </div>
              );
            })}
            <hr  style={{marginTop:"2rem", marginBottom:"2rem", width:"100%"}}/>
          </div>
        );
      })}
    </div>
  );
}
