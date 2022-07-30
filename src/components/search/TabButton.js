
import NextIcon from "../icons/NextIcon";
import CloseIcon from "../icons/CloseIcon";

export default function TabButton({visibility, name, open, selected}){

  console.log(selected)

  if(selected === undefined){
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
  } else if(selected.label){
    return(
      <>
      {!visibility && 
        <button onClick={open}  className="title-grid tab-button tab-button-selected">
        <div className="title-grid-item">
          <h5>{name}</h5>
          <h4>{selected.label}</h4>
          
        </div>
        <div className="title-grid-item">
          <h4 style={{ margin: ".5rem 50%" }}>
           <CloseIcon className="icon-size" /> 
          </h4>
        </div>
      </button>}
      
      </>
    )

  } else {
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

  
    
}