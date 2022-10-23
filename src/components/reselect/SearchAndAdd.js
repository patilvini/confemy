import Select, { components, PlaceholderProps } from "react-select";
import PropTypes from "prop-types";
import { useState } from "react";
import "./searchAndAdd.styles.scss";
import AddGreenIcon from "../icons/AddGreenIcon";
import AddIcon from "../icons/AddIcon";

const speakers = [
  { label: "Prakash Rathore", value: "prakash" },
  { label: "Sanjeev Raniyal", value: "sanjeev" },
  { label: "Praveen Tomar", value: "praveen" },
  { label: "Salim Shekh", value: "salim" },
];

const confemyWhite = "#ffffff";
const confemyBlac = "#000000";
const shade1 = "#ced9de";
const shade2 = "#ecf0f2";
const shade3 = "#fcfdfd";
const shade4 = "#aabdc7";
const primary = "#08415c";

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

export default function SearchAndAdd(props) {
  // function to set up Select Value. If options array not given, it sets empty value
  const getValue = (options, value, isMulti) => {
    if (isMulti) {
      return value;
    } else {
      return options ? options?.find((option) => option.value === value) : "";
    }
  };

  //   const Checkbox = ({ children, ...props }) => (
  //     <label style={{ marginRight: "1em" }}>
  //       <input type="checkbox" {...props} />
  //       {children}
  //     </label>
  //   );

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
          border: state.isFocused ? "1px solid #55a0fa" : `solid 3px ${shade4}`,
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
        display: "flex",
        alignItems: "center",
        borderRadius: "4px",
        // margin: "0 4px",
        height: 52,
        backgroundColor: confemyWhite,
        fontSize: 18,
      };
    },
  };

  //  key prop if given to Select, it renders a new component in dom after its value cahnges.
  //  Setting key equal to default value. renders a new component when default value changes

  return (
    <>
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

        isClearable
        isSearchable
        isDisabled={props.isDisabled}
        name={props.name}
        // onChange={props.handleChange}
        noOptionsMessage={() => {
          return (
            <div className="sns-buttons-wrap">
              <button
                className="button button-primary"
                onClick={() => props.showForm(true)}
              >
                <AddIcon className="small-icon mr-8" fill="#fff" /> New spearker
              </button>
            </div>
          );
        }}
        styles={customStyles}
        isMulti={props.isMulti}
      />
    </>
  );
}

// SearchAndAdd.propTypes = {
//   options: PropTypes.array,
//   name: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
//   isDisabled: PropTypes.bool,
//   placeholder: PropTypes.string.isRequired,
//   isMulti: PropTypes.bool,
//   // value: PropTypes.string,
// };
