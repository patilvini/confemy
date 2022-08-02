import NextIcon from "../icons/NextIcon";
import CloseIcon from "../icons/CloseIcon";
import DeleteIcon from "../icons/DeleteIcon";

export default function MultiTabButton({
  visibility,
  name,
  open,
  selected,
  clear,
  clearOne,
  prerequisite
}) {
  console.log(selected);


  const labels = [];
  for (let i = 0; i < selected?.length; i++) {
    labels.push(selected[i].label);
  }

  if (prerequisite === undefined) {
    return (
      <>
      {!visibility && (
          <div className="title-grid tab-button">
            <div className="title-grid-item">
              <h4  style={{color:"#c4c4c4"}} className="item-tab">{name}</h4>
            </div>
            <div className="title-grid-item">
              <NextIcon fill={'#c4c4c4'} className="item-icon" />
            </div>
          </div>
        )}
      
      </>
    )
      

  }

 else if (prerequisite && selected===undefined) {
    return (
      <>
        {!visibility && (
          <div className="title-grid tab-button">
            <div className="title-grid-item">
              <h4>{name}</h4>
            </div>
            <div onClick={open} className="title-grid-item">
              <NextIcon className="item-icon" />
            </div>
          </div>
        )}
      </>
    );
  } else if (labels.length > 0) {
    return (
      <>
        {!visibility && (
          <div className="title-grid tab-button tab-button-selected">
            <div className="title-grid-item">
              <h3>{name}</h3>

              {labels.map((i) => {
                return (
                  <div key={i}>
                    <div className="flex-container">
                      <div>
                        <button
                          className="credits-button"
                          onClick={() => {
                            clearOne(i);
                          }}
                        >
                          <DeleteIcon fill="red" className="delete-icon" />
                        </button>{" "}
                      </div>
                      <div>
                        <p
                          style={{
                            color: "black",
                            fontSize: "1.2rem",
                            paddingTop: ".5rem",
                          }}
                        >
                          {i}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div onClick={clear} className="title-grid-item">
              <CloseIcon fill="#4cb944" className="item-icon" />
            </div>
          </div>
        )}
      </>
    );
  }
   else {
    return (
      <>
        {!visibility && (
          <div className="title-grid tab-button">
            <div className="title-grid-item">
              <h4>{name}</h4>
            </div>
            <div onClick={open} className="title-grid-item">
              <NextIcon className="item-icon" />
            </div>
          </div>
        )}
      </>
    );
  }
}
