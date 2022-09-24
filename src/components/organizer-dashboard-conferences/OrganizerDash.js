import api from '../../utility/api';
import ConferenceSec from './ConferenceSec';
import './organizer-conf-dashboard.scss';
import {useSelector} from "react-redux";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../search/SearchBar';

export default function OrganizerDash(){
    const userID = useSelector((state) => state.auth.user?._id);
    const [data, setData] = useState()
    const [filtered, setFiltered] = useState([])
    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate()

    const getSaved = async () => {
        try {
          const r = await api.get("/conferences/users/628ea4c65fc8c008249c6dc3");
          console.log(r.data.data.conferences);
    
          setData(r.data.data.conferences);
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(() => {
    
      
    
        getSaved();
      }, [userID]);



      useEffect(() =>{

        console.log("searchValue:" ,searchValue)
    
        if(data){
    
          
       
    
          const dataSet = data.filter((item, index)=>{
            console.log("titles:", item.title, index)
            
       
    
            if(item.title.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1){
              
              return item
            }
    
           
            
            
            
    
            
          })
    
          console.log("dataset:",dataSet)
          setFiltered(dataSet)
    
        }
    
       
    
    
    
    
      },[searchValue])
    


    return (
        <div className="dash-wrapper">
            <div className="opposite-grid">
            <h1>Conferences</h1>
            <div className="grid-item-right">
            <button className='button button-green'>Create Conference </button>

            </div>
            <div>
              <SearchBar onClear={()=>setSearchValue("")} setValue={(value)=>{setSearchValue(value)}} value={searchValue} data={data}/>
            </div>
           

            </div>
             

<div>
  

  <div className="dash-table-heading">
    <div className="dash-table-item">Conference</div>
    <div className="dash-table-item">Sold</div>

    <div className="dash-table-item">Gross</div>

    <div className="dash-table-item">Status</div>

    
  </div>
  
    {filtered?.map((item, index)=>{
      console.log(item)
      
        return (
            <div key={index} className='dash-table'>
            <div
             onClick={()=>navigate("/organizer-preview/"+ item._id)}  
             className="dash-table-item">
                
                <ConferenceSec data={item}/>
              
                </div>
        <div className="dash-table-item">{item.totalSold}</div>
    
        <div className="dash-table-item">{item.grossPrice}</div>
    
        <div className="dash-table-item">{item.active.toString()}</div>
    
      </div>

        )
    })
        

    }
  
  
</div>
        </div>
    )
}