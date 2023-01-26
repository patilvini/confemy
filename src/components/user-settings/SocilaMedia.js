import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import TextError from "../formik/TextError";
import api from "../../utility/api";
import CloseIcon from "../icons/CloseIcon";

import { capitalize } from "../../utility/commonUtil";

import "../organization/socialmedia.styles.scss";
import { loadUserProfileAction } from "../../redux/user-profile/userProfileAction";
import { alertAction } from "../../redux/alert/alertAction";

export default function SocialMedia({
  socialMediaIcon,
  label,
  name,
  removeName,
  socialMediaApiValue,
  userId,
}) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();
  const socialInputRef = useRef();

  function handleInputChange(e) {
    setInputValue(e.target.value);
    if (e.target.value) {
      setErrMsg("");
    }
  }

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue?.trim()?.length > 0) {
      setErrMsg(`${label} can't be empty`);
      return;
    }
    try {
      const key = name;
      const formData = {
        user: {
          [key]: inputValue,
        },
      };
      const url = `/users/${userId}`;
      const response = await api.patch(url, formData);
      if (response) {
        setInputValue("");
        socialInputRef.current.value = "";
        dispatch(loadUserProfileAction(response.data.data.user));
        setShowInput(false);
        socialInputRef.current.style.paddingBottom = "1.6rem";
      }
    } catch (err) {
      dispatch(alertAction(err.response?.data.message, "danger"));
    }
  };

  function onInputFocus(e) {
    e.target.style.paddingBottom = "48px";
    e.target.style.border = "solid 2px #ced9de";
    setShowInput(true);
  }

  const handleInputCancel = () => {
    setInputValue("");
    setShowInput(false);
    socialInputRef.current.style.paddingBottom = "1.6rem";
    setErrMsg("");
  };

  const deleteSocialMediaLink = async () => {
    try {
      const key = removeName;
      const formData = {
        user: {
          [key]: true,
        },
      };
      const url = `/users/${userId}`;
      const response = await api.patch(url, formData);
      if (response) {
        setInputValue("");
        socialInputRef.current.value = "";
        dispatch(loadUserProfileAction(response.data.data.user));
      }
    } catch (err) {
      dispatch(alertAction(err.response?.data.message, "danger"));
    }
  };

  return (
    <>
      <div className="social-display-grid">
        <div className="grid-1st-col flex-vc">
          <i className="mr-16">{socialMediaIcon} </i>
          <p className="body-bold">{capitalize(name)}</p>
        </div>
        <div className="grid-2nd-col">
          <div className="ellipsis-text">
            {socialMediaApiValue && (
              <span className="body-bold">{socialMediaApiValue}</span>
            )}
          </div>
        </div>
        <div className="grid-3rd-col">
          {socialMediaApiValue ? (
            <button
              onClick={deleteSocialMediaLink}
              type="button"
              className="social-delete-button"
            >
              <CloseIcon fill="#000" className="icon-size" />
            </button>
          ) : (
            <button
              onClick={() => setShowInput((prev) => !prev)}
              type="button"
              className="button button-primary"
            >
              Link
            </button>
          )}
        </div>
      </div>
      <form
        onSubmit={handleInputSubmit}
        className={showInput ? " form-type-1 mt-8 " : "display-none"}
        autoComplete="off"
      >
        <div className="material-textfield">
          <input
            autoComplete="false"
            name="hidden"
            type="text"
            style={{ display: "none" }}
          />
          <input
            ref={socialInputRef}
            id={name}
            type="text"
            name={name}
            value={inputValue}
            onChange={(e) => handleInputChange(e)}
            placeholder=" "
            onFocus={(e) => onInputFocus(e)}
          />
          <label>{label}</label>
        </div>
        <TextError>{errMsg}</TextError>
        <div className="mb-20">
          <div className="saveinput-buttons-wrap">
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
    </>
  );
}

SocialMedia.propTypes = {
  socialMediaIcon: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  removeName: PropTypes.string.isRequired,
  socialMediaApiValue: PropTypes.string,
  userId: PropTypes.string,
};
