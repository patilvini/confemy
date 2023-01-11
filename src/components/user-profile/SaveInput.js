import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import api from "../../utility/api";

import { loadUserProfileAction } from "../../redux/user-profile/userProfileAction";
import { alertAction } from "../../redux/alert/alertAction";
import "../organization/saveInput.styles.scss";

export default function SaveInput({
  label,
  inputName,
  inputApiValue,
  userId,
  disabled,
}) {
  const [showButtons, setShowButtons] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const textInputRef = useRef();

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    const key = inputName;
    const formData = {
      user: {
        [key]: inputValue,
      },
    };
    const url = `users/${userId}`;
    try {
      const response = await api.patch(url, formData);
      if (response) {
        dispatch(loadUserProfileAction(response.data.data.user));
        setShowButtons(false);
        textInputRef.current.style.paddingBottom = "1.6rem";
      }
    } catch (err) {
      setErrorMsg(alertAction(err.response.data.message));
    }
  };

  function onInputFocus(e) {
    e.target.style.paddingBottom = "48px";
    e.target.style.border = "solid 2px #ced9de";
    setShowButtons(true);
  }

  const handleInputCancel = () => {
    setInputValue(inputApiValue);
    setShowButtons(false);
    textInputRef.current.style.paddingBottom = "1.6rem";
  };

  useEffect(() => {
    setInputValue(inputApiValue);
  }, [inputApiValue]);

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
          disabled={disabled}
        />
        <input
          ref={textInputRef}
          id={inputName}
          type="text"
          name={inputName}
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          placeholder=" "
          onFocus={(e) => onInputFocus(e)}
          disabled={disabled}
        />
        <label>{label}</label>
      </div>
      <div className="saveinput-error">
        {errorMsg}
        {/* {formik.touched.name && Boolean(formik.errors.name) && (
              <TextError>{formik.errors.name}</TextError>
            )} */}
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

SaveInput.propTypes = {
  label: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  inputApiValue: PropTypes.string,
  userId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
