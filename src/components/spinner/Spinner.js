import "./spinner.styles.scss";
let spinner;
function Spinner() {
  return (
    <div className="spinner">
      <img src={spinner} alt="Loading..." />
    </div>
  );
}

export default Spinner;
