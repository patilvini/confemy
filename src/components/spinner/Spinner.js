import "./spinner.styles.scss";
import CameraIcon from "../icons/CameraIcon";

function Spinner() {
  return (
    <div className="spinner">
      <CameraIcon className={"icon-lg"} />
      <div className="ml-16">loading ....</div>
    </div>
  );
}

export default Spinner;
