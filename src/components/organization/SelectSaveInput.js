import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import PropTypes from "prop-types";
import { alertAction } from "../../redux/alert/alertAction";
import TextError from "../formik/TextError";

import api from "../../utility/api";
import { getValue } from "../../utility/commonUtil";
import { loadCountryList } from "../../utility/commonUtil";

import { loadOrganizationAction } from "../../redux/organization/organizationAction";

import "./saveInput.styles.scss";
export default function SelectSaveInput({
  label,
  inputName,
  inputApiValue,
  organizationId,
  options,
  isMulti,
}) {
  const [state, setState] = useState({
    fieldName: inputApiValue || "",
    formErrors: {
      fieldName: "",
    },
    fieldNameValid: false,
    formValid: false,
  });
  const [fieldChanged, setFieldChanged] = useState("");
  const [touched, setTouched] = useState({
    fieldName: false,
  });
  const [showButtons, setShowButtons] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const selectRef = useRef();

  //   const handleInputChange = (e) => {

  //     setState({ ...state, [e.target.fieldName]: e.target.value });
  //     setFieldChanged(e.target.fieldName);
  //     setTouched({ ...touched, [e.target.fieldName]: true });

  //   };

  const onChange = (option, metaAction) => {
    setState({ ...state, fieldName: option.value });
    setFieldChanged("fieldName");
    setTouched({ ...touched, fieldName: true });
  };

  function validate() {
    console.log("ran validation");
    let allValidationErrors = state.formErrors;
    let isfieldNameValid = state.fieldNameValid;
    isfieldNameValid = state.fieldName?.length > 0;
    allValidationErrors.fieldName = isfieldNameValid ? "" : " Required";
    setState({
      ...state,
      formErrors: allValidationErrors,
      fieldNameValid: isfieldNameValid,
      formValid: isfieldNameValid,
    });
  }

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (!state.formValid) {
      return;
    }
    const key = inputName;
    const formData = {
      organization: {
        user: user._id,
        [key]: state.fieldName,
      },
    };

    const url = `organizations/${organizationId}`;

    try {
      const response = await api.patch(url, formData);
      if (response) {
        dispatch(loadOrganizationAction(response.data.data.organization));
        setShowButtons(false);
        selectRef.current.style.paddingBottom = "1.6rem";
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  function onInputFocus(e) {
    // e.target.style.paddingBottom = "48px";
    // e.target.style.border = "solid 2px #ced9de";
    setShowButtons(true);
  }

  const handleInputCancel = () => {
    setState({ ...state, fieldName: inputApiValue });
    setShowButtons(false);
    console.log("select ref", selectRef.current);
    // selectRef.current.style.paddingBottom = "1.6rem";
  };

  // useEffect(() => {
  //   setfieldName(inputApiValue);
  // }, [inputApiValue]);

  useEffect(() => {
    console.log("ue ran");
    validate();
  }, [state[fieldChanged]]);

  useEffect(() => {
    loadCountryList();
  }, []);

  console.log("state", state);
  console.log("touched", touched);

  return (
    <form
      autoComplete="off"
      className="form-type-1"
      onSubmit={handleInputSubmit}
    >
      <div>
        {/* <input
          ref={selectRef}
          id="name"
          type="text"
          name="name"
          value={state.name}
          onChange={handleInputChange}
          placeholder=" "
          onFocus={(e) => onInputFocus(e)}
          onBlur={(e) => {
            console.log("onBlur ran");
            validate();
          }}
        /> */}
        {/* <Select
          ref={selectRef}
          options={options}
          onChange={onChange}
          value={getValue(options, state.name, isMulti)}
          name="fieldName"
          placeholder={label}
        /> */}

        <Select
          ref={selectRef}
          // key={getValue(props.options, props.value)}
          value={getValue(options, state.fieldName, isMulti)}
          onChange={onChange}
          options={options}
          placeholder={label}
          isSearchable
          name="fieldName"
          noOptionsMessage={() => "No option found"}
          onFocus={(e) => onInputFocus(e)}
          onBlur={(e) => {
            console.log("onBlur ran");
            validate();
          }}
        />
      </div>
      <div className="saveinput-error">
        {touched.name && state.formErrors.name?.length > 0 && (
          <TextError>{state.formErrors.name}</TextError>
        )}
      </div>
      <div className="mb-20">
        <div
          className={`${
            showButtons ? "saveinput-buttons-wrap" : "display-none"
          }`}
        >
          <button type="submit" className="button button-primary">
            Save
          </button>
          <button
            type="button"
            onClick={handleInputCancel}
            className="button-text button-text-primary"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

SelectSaveInput.propTypes = {
  label: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  inputApiValue: PropTypes.string,
  organizationId: PropTypes.string.isRequired,
};
