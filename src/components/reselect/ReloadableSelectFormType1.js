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

// SelectFormType1 is form customized according to our form-type-1 design

export default function ReloadableSelectFormType1(props) {
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
        padding: "13px 0px 13px 16px",
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
  // console.log("reloadable select props", props);

  return (
    <div>
      <Select
        key={getValue(props.options, props.value)}
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
        isClearable
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

ReloadableSelectFormType1.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  // value: PropTypes.string,
};
