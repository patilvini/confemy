import PropTypes from "prop-types";
import "./switch.scss";

const Switch = ({ id, name, value, checked, onChange, disable }) => {
  return (
    <>
      <label className="switch">
        <input
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disable}
        />
        <span className="slider round"></span>
      </label>
    </>
  );
};

export default Switch;

Switch.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disable: PropTypes.bool,
};

// const Switch = ({ isOn, handleToggle }) => {
//   return (
//     <>
//       <label className="switch">
//         <input type="checkbox" value={isOn} onChange={handleToggle}/>
//         <span className="slider round"></span>
//       </label>
//     </>
//   );
// };

// export default Switch;
