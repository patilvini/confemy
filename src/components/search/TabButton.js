
import NextIcon from "../icons/NextIcon";

export default function TabButton({visibility, name, open}){
    return(
        <>
        {!visibility && 
        <button onClick={open} className="title-grid tab-button">
        <div className="title-grid-item">
          <h4>{name}</h4>
        </div>
        <div className="title-grid-item">
          <h4 style={{ marginLeft: "50%" }}>
           <NextIcon className="icon-size" /> 
          </h4>
        </div>
      </button>}
        </>
        
    )
}