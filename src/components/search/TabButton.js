
import NextIcon from "../icons/NextIcon";
import CloseIcon from "../icons/CloseIcon";

export default function TabButton({visibility, name, open, selected, clear}){

  // console.log(selected)

  if(selected === undefined){
    return(
      <>
      {!visibility && 
        <div className="title-grid tab-button">
        <div className="title-grid-item">
          <h4>{name}</h4>
          
        </div>
        <div onClick={open} className="title-grid-item">
         
           <NextIcon className="item-icon" /> 
          
        </div>
      </div>}
      
      </>
    )
  } else if(selected.label){
    return(
      <>
      {!visibility && 
        <div  className="title-grid tab-button tab-button-selected">
        <div className="title-grid-item">
          <h5>{name}</h5>
          <h4>{selected.label}</h4>
          
        </div>
        <div onClick={clear} className="title-grid-item">
          
           <CloseIcon fill="#4cb944" className="item-icon" /> 
          
        </div>
      </div>}
      
      </>
    )

  } 
  
  
    
}