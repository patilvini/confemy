
import NextIcon from "../icons/NextIcon";
import CloseIcon from "../icons/CloseIcon";

export default function CreditsTabButton({visibility, name, open, selected}){
    console.log(selected)
    const labels = []
    for(let i=0; i<selected.length;i++){
        labels.push(selected[i].label)
    }

    console.log(labels)
    
    

   


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
    } else if(labels.length > 0){
      return(
        <>
        {!visibility && 
          <button onClick={open}  className="title-grid tab-button tab-button-selected">
          <div className="title-grid-item">
            <h3>{name}</h3>
          
            {labels.map((i)=>{
                return(
                    <div key={i}>
                        <h5>{i}</h5>
                    </div>
                )
            })}
            
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