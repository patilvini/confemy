import Select, { components } from "react-select";
import PropTypes from "prop-types";

const confemyWhite = "#ffffff";
const confemyBlac = "#000000";
const shade1 = "#ced9de";
const shade2 = "#ecf0f2";
const shade3 = "#fcfdfd";
const shade4 = "#aabdc7";

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

// SelectFormType3 is form customized according to our form-type-3 design

export default function SelectFormType3(props) {
  // function to set up Select Value. If options array not given, it sets empty value

  const getValue = (options, value, isMulti) => {
    if (isMulti) {
      return value;
    } else {
      return options ? options?.find((option) => option.value === value) : "";
    }
  };

  const Checkbox = ({ children, ...props }) => (
    <label style={{ marginRight: "1em" }}>
      <input type="checkbox" {...props} />
      {children}
    </label>
  );

  const customStyles = {
    control: (styles, state) => {
      return {
        ...styles,
        backgroundColor: confemyWhite,
        border: state.isFocused ? "1px solid #55a0fa" : `2px solid ${shade1}`,
        // padding: "13px 0px 13px 16px",
        padding: "4px 0px 4px 16px",
        fontFamily: "Avenir-Roman",
        fontSize: 16,

        ":hover": {
          border: state.isFocused ? "1px solid #55a0fa" : `solid 2px ${shade4}`,
        },
      };
    },

    placeholder: (provided) => ({
      ...provided,
      // fontSize: "1em",
      // color: confemyBlac,
      // fontWeight: 400,
    }),

    // this is for options list
    menuList: (base) => ({
      ...base,
      position: "fixed !important",
      backgroundColor: "white",
      borderRadius: "4px",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
      width: "20rem",
    }),

    option: (provided, state) => {
      return {
        ...provided,
        color: confemyBlac,
        backgroundColor: state.isSelected ? shade1 : "#fff",
        fontSize: 16,
        fontFamily: "Avenir-Roman",
        padding: 8,
        ":hover": {
          backgroundColor: shade2,
        },
      };
    },

    dropdownIndicator: (provided, state) => {
      return {
        ...provided,
        color: shade1,
        ":hover": {
          color: shade4,
        },
      };
    },

    noOptionsMessage: (provided, state) => {
      return {
        ...provided,
        backgroundColor: shade3,
        color: confemyBlac,
        fontSize: 16,
      };
    },
  };

  //  key prop if given to Select, it renders a new component in dom after its value cahnges.
  //  Setting key equal to default value. renders a new component when default value changes

  // console.log("get Value", getValue(props.options, props.value, props.isMulti));
  // console.log(props.isMulti);
  // console.log("get value:", getValue(props.value));

  return (
    <div>
      <Select
        // key={getValue(props.options, props.value)}
        value={getValue(props.options, props.value, props.isMulti)}
        onChange={(value) => {
          props.onChange(value);
        }}
        options={props.options}
        className="basic-single"
        classNamePrefix="select"
        components={{ Placeholder }}
        placeholder={props.placeholder}
        // defaultValue={props.defaultValue}

        // isClearable
        isSearchable
        isDisabled={props.isDisabled}
        name={props.name}
        // onChange={props.handleChange}
        noOptionsMessage={() => "No option found"}
        styles={customStyles}
        isMulti={props.isMulti}
      />
    </div>
  );
}

SelectFormType3.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  // value: PropTypes.string,
};
