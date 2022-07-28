import "./spinner.styles.scss";
import SearchIcon from "../icons/SearchIcon";
import CameraIcon from "../icons/CameraIcon";

function Spinner() {
  return (
    <div className="spinner">
      <CameraIcon className={"large-icon"} />
      <div className="ml-16">loading ....</div>
    </div>
  );
}

export default Spinner;
