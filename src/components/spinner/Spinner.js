import spinner from "./spinner.gif";
import "./spinner.styles.scss";

function Spinner() {
  return (
    <div className="spinner">
      <img src={spinner} alt="Loading..." />
    </div>
  );
}

export default Spinner;
