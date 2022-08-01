import NextIcon from "../icons/NextIcon";
import CloseIcon from "../icons/CloseIcon";
import DeleteIcon from "../icons/DeleteIcon";

export default function CreditsTabButton({
  visibility,
  name,
  open,
  selected,
  clear,
  clearOne,
}) {
  console.log(selected);
  const labels = [];
  for (let i = 0; i < selected.length; i++) {
    labels.push(selected[i].label);
  }

  if (selected === undefined) {
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
  } else {
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
