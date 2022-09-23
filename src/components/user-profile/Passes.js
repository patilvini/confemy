import { useState, useEffect } from "react";
import SearchIcon from "../icons/SearchIcon";
import CloseIcon from "../icons/CloseIcon";
import GlobeSketch from "../icons/GlobeSketch";

import { useNavigate } from "react-router";
import api from "../../utility/api";
import { useSelector } from "react-redux/es/exports";
import Pass from "./Pass";

import TicketModal from "./TicketModal";
import SearchBar from "../search/SearchBar";

export default function Passes() {
  
  const [searchValue, setSearchValue] = useState("");
  const [modalOpen , setModalOpen ] = useState(false)
  const onDismiss = () => navigate("/user-profile");
  const userID = useSelector((state)=>state.auth.user?._id)
  const [data, setData] = useState()
  const [pass, setPass] = useState(0)
  const [display, setDisplay] = useState()




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

  useEffect(() =>{

    console.log(searchValue)

    if(data){
   

      data.filter((item)=>{
        // item.conference.title
      })
    }




  },[searchValue])




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
  
     <SearchBar onClear={()=>setSearchValue("")} setValue={(value)=>{setSearchValue(value)}} value={searchValue} data={data}/>

    </div>

    
  )

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


