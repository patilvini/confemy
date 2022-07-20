import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utility/api";
import "./saveInput.styles.scss";

export default function SaveInput({ label, textName, inputApiValue }) {
  const [showButtons, setShowButtons] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const textInputRef = useRef();

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleInputSubmit(e) {
    e.preventDefault();
    setShowButtons(false);
    console.log("text submitted", inputValue);
    textInputRef.current.style.paddingBottom = "1.6rem";
  }

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

  console.log("from SaveInput", inputApiValue);

  return (
    <form className="form-type-1" onSubmit={handleInputSubmit}>
      <div className="material-textfield">
        <input
          ref={textInputRef}
          id={textName}
          type="text"
          name={textName}
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          placeholder=" "
          onFocus={(e) => onInputFocus(e)}
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
          className={showButtons ? "saveinput-buttons-wrap" : "display-none"}
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
