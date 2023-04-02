import NextIcon from "../icons/NextIcon";
import CloseIcon from "../icons/CloseIcon";

export default function DisabledTab({
  visibility,
  name,
  open,
  selected,
  clear,
  prerequisite,
}) {
  if (prerequisite === undefined) {
    return (
      <>
        {!visibility && (
          <div className="title-grid tab-button">
            <div className="title-grid-item">
              <h4 style={{ color: "#c4c4c4" }} className="item-tab">
                {name}
              </h4>
            </div>
            <div className="title-grid-item">
              <NextIcon fill={"#c4c4c4"} className="item-icon" />
            </div>
          </div>
        )}
      </>
    );
  } else if (prerequisite && selected === undefined) {
    return (
      <>
        {!visibility && (
          <div className="title-grid tab-button">
            <div className="title-grid-item">
              <h4 className="item-tab">{name}</h4>
            </div>
            <div onClick={open} className="title-grid-item">
              <NextIcon className="item-icon" />
            </div>
          </div>
        )}
      </>
    );
  } else if (selected.label) {
    return (
      <>
        {!visibility && (
          <div className="title-grid tab-button tab-button-selected">
            <div className="title-grid-item">
              <h5 className="item">{name}</h5>
              <h4>{selected.label}</h4>
            </div>
            <div onClick={clear} className="title-grid-item">
              <CloseIcon fill="#4cb944" className="item-icon" />
            </div>
          </div>
        )}
      </>
    );
  }
}
