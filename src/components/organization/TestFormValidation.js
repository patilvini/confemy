import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { alertAction } from "../../redux/alert/alertAction";
import TextError from "../formik/TextError";

import api from "../../utility/api";

import { loadOrganizationAction } from "../../redux/organization/organizationAction";

import "./saveInput.styles.scss";
export default function OSaveInput({
  label,
  inputName,
  inputApiValue,
  organizationId,
}) {
  const [state, setState] = useState({
    orgName: inputApiValue,
    // email:"",
    formErrors: {
      orgName: "",
      // email: ""
    },
    // emailValid: false,
    orgNameValid: false,
    formValid: false,
  });
  const [fieldChanged, setFieldChanged] = useState("");
  const [touched, setTouched] = useState({
    orgName: false,
    // email: ""
  });
  const [showButtons, setShowButtons] = useState(false);
  // const [orgName, setorgName] = useState("");

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const textInputRef = useRef();

  // function handleInputChange(e) {
  //   setorgName(e.target.value);
  // }

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setFieldChanged(e.target.name);
    setTouched({ ...touched, [e.target.name]: true });
  };

  async function validate() {
    let isFormValid;
    console.log("ran validation");
    let allValidationErrors = state.formErrors;
    // let isEmailValid = state.emailValid;
    let isOrgNameValid = state.orgNameValid;
    isOrgNameValid = state.orgName?.length > 0;
    allValidationErrors.orgName = isOrgNameValid ? "" : " Required";
    setState({
      ...state,
      formErrors: allValidationErrors,
      // emailValid: isEmailValid,
      orgNameValid: isOrgNameValid,
      formValid: isOrgNameValid,
      // && isEmailValid
    });
    isFormValid = isOrgNameValid;
    // && isEmailValid
    return isFormValid;
  }

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const key = inputName;
    const formData = {
      organization: {
        user: user._id,
        [key]: state.orgName,
      },
    };

    const url = `organizations/${organizationId}`;

    try {
      const response = await api.patch(url, formData);
      if (response) {
        dispatch(loadOrganizationAction(response.data.data.organization));
        setShowButtons(false);
        textInputRef.current.style.paddingBottom = "1.6rem";
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  function onInputFocus(e) {
    e.target.style.paddingBottom = "48px";
    e.target.style.border = "solid 2px #ced9de";
    setShowButtons(true);
  }

  const handleInputCancel = () => {
    setState({ ...state, orgName: inputApiValue });
    setShowButtons(false);
    textInputRef.current.style.paddingBottom = "1.6rem";
  };

  // useEffect(() => {
  //   setorgName(inputApiValue);
  // }, [inputApiValue]);

  useEffect(() => {
    console.log("ue ran");
    validate();
  }, [state[fieldChanged]]);

  console.log("state", state);
  console.log("touched", touched);

  return (
    <form
      autoComplete="off"
      className="form-type-1"
      onSubmit={handleInputSubmit}
    >
      <div className="material-textfield">
        <input
          autoComplete="false"
          name="hidden"
          type="text"
          style={{ display: "none" }}
        />
        <input
          ref={textInputRef}
          id="orgName"
          type="text"
          name="orgName"
          value={state.orgName}
          onChange={handleInputChange}
          placeholder=" "
          onFocus={(e) => onInputFocus(e)}
          onBlur={(e) => {
            console.log("onBlur ran");
            validate();
          }}
        />
        <label>{label}</label>
      </div>
      <div className="saveinput-error">
        {touched.orgName && state.formErrors.orgName?.length > 0 && (
          <TextError>{state.formErrors.orgName}</TextError>
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

OSaveInput.propTypes = {
  label: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  inputApiValue: PropTypes.string,
  organizationId: PropTypes.string.isRequired,
};
