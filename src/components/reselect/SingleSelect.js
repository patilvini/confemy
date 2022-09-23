import Select, { components, PlaceholderProps } from "react-select";
import PropTypes from "prop-types";
import { timezones } from "./timezonesUtil.js";
import { hover } from "@testing-library/user-event/dist/hover.js";

const confemyWhite = "#ffffff";
const confemyBlac = "#000000";
const shade1 = "#ced9de";
const shade2 = "#ecf0f2";
const shade3 = "#fcfdfd";
const shade4 = "#aabdc7";

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

export default function SingleSelect(props) {
  const Checkbox = ({ children, ...props }) => (
    <label style={{ marginRight: "1em" }}>
      <input type="checkbox" {...props} />
      {children}
    </label>
  );

  const customStyles = {
    control: (styles, state) => {
      // console.log("styles from control", styles);
      // console.log("control state", state);
      return {
        ...styles,
        backgroundColor: confemyWhite,
        border: `2px solid ${shade1}`,
        padding: "13px 0px 13px 16px",
        fontFamily: "Avenir-Roman",
        fontSize: 16,

        ":hover": {
          border: state.isFocused ? "1px solid #55a0fa" : `solid 3px ${shade4}`,
        },

        ":focus": {
          border: "1px solid #55a0fa",
        },
      };
    },

    placeholder: (provided) => ({
      ...provided,
      // fontSize: "1em",
      // color: confemyBlac,
      // fontWeight: 400,
    }),

    option: (provided, state) => {
      return {
        ...provided,
        color: confemyBlac,
        backgroundColor: state.isSelected ? shade2 : "#fff",
        fontSize: 16,
        fontFamily: "Avenir-Roman",
        padding: 16,
      };
    },

    dropdownIndicator: (provided, state) => {
      // console.log("DownChevron provided", provided);
      // console.log("DownChevron state", state);
      return {
        ...provided,
        color: shade1,
        ":hover": {
          color: shade4,
        },
      };
    },
  };

  return (
    <div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        components={{ Placeholder }}
        placeholder={props.placeholder}
        // defaultValue={props?.options[0]}
        isClearable
        isSearchable
        isDisabled={props.isDisabled}
        name={props.name}
        options={props.options}
        onChange={props.handleChange}
        styles={customStyles}
      />
    </div>
  );
}

SingleSelect.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
};
