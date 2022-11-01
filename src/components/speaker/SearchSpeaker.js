import Select, { components } from "react-select";
// import SearchAndAdd from "../reselect/SearchAndAdd";
import AddIcon from "../icons/AddIcon";
import "./searchSpeaker.styles.scss";
import "../reselect/searchAndAdd.styles.scss";

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

// function to set up Select Value. If options array not given, it sets empty value
const getValue = (options, value, isMulti) => {
  if (isMulti) {
    return value;
  } else {
    return options ? options?.find((option) => option.value === value) : "";
  }
};

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

export default function SearchSpeaker({
  options,
  value,
  isMulti,
  onChange,
  placeholder,
  isDisabled,
  name,
  showForm,
  setFormikSpeakers,
  onClose,
}) {
  return (
    <div className="register-modal white-modal">
      <div className="modal-form-wrapper">
        <div className="search-speaker-wrap">
          <div style={{ flexGrow: 1 }}>
            <h2 className="flex-vchc mb-40">Search and add speaker</h2>
            <div>
              <Select
                value={getValue(options, value, isMulti)}
                // onChange={handleChange}
                onChange={(value) => {
                  onChange(value);
                }}
                options={options}
                className="basic-single"
                classNamePrefix="select"
                components={{ Placeholder }}
                placeholder={placeholder}
                // defaultValue={defaultValue}

                isClearable
                isSearchable
                isDisabled={isDisabled}
                name={name}
                noOptionsMessage={() => {
                  return (
                    <div className="sns-buttons-wrap">
                      <button
                        className="button button-primary"
                        onClick={() => showForm(true)}
                      >
                        <AddIcon className="icon-sm mr-8" fill="#fff" /> New
                        spearker
                      </button>
                    </div>
                  );
                }}
                styles={customStyles}
                isMulti={isMulti}
              />

              {/* <SearchAndAdd
                options={props.options}
                label={props.label}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                isMulti={props.isMulti}
                showForm={props.showForm}
              /> */}
            </div>
          </div>
          <div className="flex">
            <button
              type="button"
              className="button button-primary mr-8"
              onClick={() => {
                const SpeakerToAdd = options?.find(
                  (option) => option.value === value
                );
                setFormikSpeakers(SpeakerToAdd);
                onClose();
              }}
            >
              Add
            </button>
            <button
              type="button"
              className="button-outlined button-outlined-green ml-8"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
