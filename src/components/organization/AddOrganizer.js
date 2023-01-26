import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import api from "../../utility/api";
import { loadOrganizationAction } from "../../redux/organization/organizationAction";
import { alertAction } from "../../redux/alert/alertAction";
import TextError from "../formik/TextError";

import "./saveInput.styles.scss";

export default function AddOrganizer({ organizationId }) {
  const [showButtons, setShowButtons] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const textInputRef = useRef();

  function handleInputChange(e) {
    setInputValue(e.target.value);
    if (e.target.value) {
      setErrMsg("");
    }
  }

  async function handleInputSubmit(e) {
    e.preventDefault();
    // validate email
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmailValid = emailRegex.test(inputValue.toLowerCase());
    if (!isEmailValid) {
      setErrMsg("Email not valid");
      return;
    }

    const organizerDetails = {
      email: inputValue,
      organizationId: organizationId,
      user: user._id,
    };

    try {
      const response = await api.post("/organizations/organizers", {
        organizerDetails,
      });
      if (response) {
        dispatch(loadOrganizationAction(response.data.data.organization));
        setInputValue("");
        setShowButtons(false);
        textInputRef.current.style.paddingBottom = "1.6rem";
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  }

  function onInputFocus(e) {
    e.target.style.paddingBottom = "48px";
    e.target.style.border = "solid 2px #ced9de";
    setShowButtons(true);
  }

  const handleInputCancel = () => {
    setInputValue("");
    setShowButtons(false);
    textInputRef.current.style.paddingBottom = "1.6rem";
    setErrMsg("");
  };

  return (
    <form
      autoComplete="off"
      autoCorrect="off"
      className="form-type-1"
      onSubmit={handleInputSubmit}
    >
      <div className="material-textfield">
        <input
          ref={textInputRef}
          id="organizersEmail"
          type="text"
          name="organizersEmail"
          value={inputValue}
          onChange={handleInputChange}
          placeholder=" "
          onFocus={onInputFocus}
        />
        <label>+ Add organizer's email</label>
      </div>
      <div>
        <TextError>{errMsg}</TextError>
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

AddOrganizer.propTypes = {
  organizationId: PropTypes.string.isRequired,
};
