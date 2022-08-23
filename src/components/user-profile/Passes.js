import SearchBar from "../search/SearchBar";
import { useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import CloseIcon from "../icons/CloseIcon";



export default function Passes (){

    const [showSearch , setShowSearch] = useState(true)
    const [value, setValue] = useState()


    return <div>
 <div className="position-relative search-bar">
            <input
              id="searchBar"
              type="text"
              value={value}
        
              className="search-input"
              onChange={(e)=>{

                if(e.target.value.length > 0){
                    setShowSearch(false)
                }

                if(e.target.value.length === 0){
                    setShowSearch(true)
                }

                setValue(e.target.value)


              }}
              
            
            />
            <i className={showSearch===""|| showSearch ? "left-input-icon" : "display-none" }>
              <SearchIcon width="3rem" height="3rem" className="large-icon" />
            </i>

            <i onClick={()=>console.log('clear')} className={showSearch==="" || showSearch ?  "display-none" : "right-input-icon"}>
              <CloseIcon width="3rem" height="3rem" fill="#757575" className="large-icon" />
            </i>
          </div>
    </div>
}