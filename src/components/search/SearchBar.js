import { useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import CloseIcon from "../icons/CloseIcon";




export default function SearchBar({onClick}){

    const [showSearch , setShowSearch] = useState(true)
    


    return(
        <>
        <div className="position-relative">
            <input
              id="searchBar"
              type="text"
        
              className="search-input"
              onChange={(e)=>{

                if(e.target.value.length > 0){
                    setShowSearch(false)
                }

                if(e.target.value.length === 0){
                    setShowSearch(true)
                }


              }}
              
            
            />
            <i className={showSearch ? "left-input-icon" : "display-none" }>
              <SearchIcon width="3rem" height="3rem" className="large-icon" />
            </i>

            <i className={showSearch ?  "display-none" : "right-input-icon"}>
              <CloseIcon width="3rem" height="3rem" fill="#757575" className="large-icon" />
            </i>
          </div>
        </>
    )
}