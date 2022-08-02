import Select from "react-select";
import PropTypes from "prop-types";
import { timezones } from "./timezonesUtil.js";

export default function SingleSelect(props) {
  const Checkbox = ({ children, ...props }) => (
    <label style={{ marginRight: "1em" }}>
      <input type="checkbox" {...props} />
      {children}
    </label>
  );

  return (
    <div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        // defaultValue={props?.options[0]}
        isClearable
        isSearchable
        isDisabled={props.isDisabled}
        name={props.name}
        options={props.options}
        onChange={props.handleChange}
      />
    </div>
  );
}

SingleSelect.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};
