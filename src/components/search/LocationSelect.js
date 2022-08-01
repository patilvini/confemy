import BackIcon from "../icons/BackIcon";

export default function LocationSelect({close}){
    return(
        <>
        <button className="filter-back-button" onClick={close}>
        <BackIcon  fill="#757575" className="filter-icon" /> 
        Filters

        </button>
        
        <h1>Location</h1>
        
        </>
    )
}