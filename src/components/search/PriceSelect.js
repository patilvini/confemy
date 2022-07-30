import BackIcon from "../icons/BackIcon";

export default function PriceSelect({close}){
    return(
        <>
        <button onClick={close} className="filter-back-button">
        <BackIcon className="icon-size" /> 
        Filters
        </button>
        <h3 className="component-title">Price</h3>

        
        
        
        </>
    )
}