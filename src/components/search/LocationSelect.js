import BackIcon from "../icons/BackIcon";

export default function LocationSelect({close}){
    return(
        <>
        <button className="filter-back-button" onClick={close}>
        <BackIcon className="icon-size" /> 
        Filters

        </button>
        
        <h1>Location</h1>
        
        </>
    )
}