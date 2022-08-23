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
  
  //  let bookingDetails = data.bookingDetails.filter((item)=> {
  //   return item !== data.bookingDetails[index]

  //  })

   
   try{
    const r = await api.delete("/conferences/bookings/" + id)
    console.log(r)
   

   } catch (err){
    console.log(err)
   }
   
    
  }

  return (
    <div className="cart">
      <h2> Cart {data?.count}</h2>
      <hr className="divider" />
      {data?.bookingDetails.map((item, index) => {
        console.log(item)
        return (
          <div key={index}>
            <div className="cart-grid" key={index}>
              <h3 className="cart-item">{item.conference.title}</h3>
              <p className="cart-item" style={{ fontSize: "1.5rem" }}>
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
                  style={{ width: "50rem", marginTop:'2rem' }}
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
            <hr className="divider" />
          </div>
        );
      })}
    </div>
  );
}
