import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import api from "../../utility/api";
import GlobeSketch from "../icons/GlobeSketch";
import SavedCard from "./SavedCard";


export default function SavedConfs() {
  let component;

  const [data, setData] = useState()
  const userID = useSelector((state)=>state.auth.user?._id)

  useEffect(()=>{
    const getSaved = async () => {
        try{
            const r = await api.get('/conferences/like/'+ userID)
            console.log(r.data.data.conferences)
            setData(r.data.data.conferences)
        } catch (err) {
            console.log(err)
        }
    }

    getSaved()
  }, [userID])

  

  const navigate = useNavigate();

  const noSaved = (<div>
      <GlobeSketch className="icon-plshld" />
      <div className="passes-list">
        <h2>You haven't saved any conference</h2>
        <button
          style={{ margin: "2rem 0 6rem 0" }}
          className="button button-primary"
        >
          Explore Trending Conferences
        </button>
      </div>
    </div>)

  const savedConfs = (<div>
    <h3 style={{ margin: "2rem 0 3rem 12.2rem" }}>Saved Conferences</h3>
    
    {data?.map((item, index)=>{
      return(
        <div key={index}>
          <SavedCard data={data[index]}/>

          
          </div>
        
      )

    })}

    


  </div>)
  

  if (true) {
    component = savedConfs;
  }

  return (
    <div>
        { component }

    </div>)
}
