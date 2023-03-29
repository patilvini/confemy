import BackIcon from "../icons/BackIcon";

export default function LocationSelect({close}){
    return(
        <>
        <div className="flex-container filter-back-button" onClick={close}>
        <div><BackIcon fill="#757575" className="filter-icon" /></div>
        <div style={{marginTop:".7rem"}}> Filters</div>
        
       
      </div>
        
        <h1>Location</h1>
        
        </>
    )
}