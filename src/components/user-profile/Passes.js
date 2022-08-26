import { useState, useEffect } from "react";
import SearchIcon from "../icons/SearchIcon";
import CloseIcon from "../icons/CloseIcon";
import GlobeSketch from "../icons/GlobeSketch";

import { useNavigate } from "react-router";
import api from "../../utility/api";
import { useSelector } from "react-redux/es/exports";
import Pass from "./Pass";

import TicketModal from "./TicketModal";

export default function Passes() {
  const [showSearch, setShowSearch] = useState(true);
  const [value, setValue] = useState();
  const [modalOpen , setModalOpen ] = useState(false)
  const onDismiss = () => navigate("/user-profile");
  const userID = useSelector((state)=>state.auth.user?._id)
  const [data, setData] = useState()
  const [pass, setPass] = useState(0)




  let component;
  const navigate = useNavigate()

  useEffect(()=>{


    const getData = async()=> {
      try{
        const r = await api.get("/conferences/bookings/passes/users/"+ userID)
        // console.log(r.data.data)
        setData(r.data.data.bookingDetails)
        

      }
      catch(err){
        console.log(err)
      }
    }

    
      getData()
    
  },[userID])




  const noPasses = (
    <div>
      <GlobeSketch className="icon-plshld" />
      <div className="passes-list">
        <h2>You haven't booked any conference</h2>
        <button
          style={{ margin: "2rem 0 6rem 0" }}
          className="button button-primary"
        >
          Explore Trending Conferences
        </button>
      </div>
    </div>
  );

  const search = (
    <div style={{ position: "relative" }} className="search-bar">
      <input
        id="searchBar"
        type="text"
        className="search-input"
        onChange={(e) => {
          if (e.target.value.length > 0) {
            setShowSearch(false);
          }

          if (e.target.value.length === 0) {
            setShowSearch(true);
          }

          setValue(e.target.value);
        }}
      />
      <i
        className={
          showSearch === "" || showSearch ? "left-input-icon" : "display-none"
        }
      >
        <SearchIcon width="3rem" height="3rem" className="large-icon" />
      </i>

      <i
        onClick={() => console.log("clear")}
        className={
          showSearch === "" || showSearch ? "display-none" : "right-side-icon"
        }
      >
        <CloseIcon
          width="3rem"
          height="3rem"
          fill="#757575"
          className="large-icon"
        />
      </i>
    </div>
  );

  const passes = (
    <div>
    {search}
    <h3 style={{ margin: "2rem 0 2rem 29%" }}>Upcoming Conferences</h3>
    
    {data?.map((item, index)=>{
      return(
        <div key={item._id}>
          <Pass data={data[index]}  onClick={()=>{
          setPass(index)
          setModalOpen(true)
        }}/>
          </div>
        
      )

    })}
    
    
    </div>
  );

  if (true) {
    component = passes;
  }

  return <div>{
  
  component}
  
 {modalOpen && <TicketModal data={data[pass]} onDismiss={()=>  {
 
 onDismiss()
 setModalOpen(false)
 }} /> }
  
  </div>;
}
