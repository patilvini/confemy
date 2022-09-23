import { useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import CloseIcon from "../icons/CloseIcon";




export default function SearchBar({onClear, setValue, value, data, }){

    const [showSearch , setShowSearch] = useState(true)




    


    


    return(
        <>
        <input
        id="searchBar"
        type="text"
        value={value}
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
        onClick={() => onClear()}
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
        {/* <div className="position-relative">
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

            <i onClick={onClear} className={showSearch==="" || showSearch ?  "display-none" : "right-input-icon"}>
              <CloseIcon width="3rem" height="3rem" fill="#757575" className="large-icon" />
            </i>
          </div> */}
        </>
    )
}