import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../utility/api";
import { loadOrganization } from "./organizationUtil";
import "./saveInput.styles.scss";

export default function AddOrganizer({ organizationId }) {
  const [showButtons, setShowButtons] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const user = useSelector((state) => state.auth.user);

  const textInputRef = useRef();

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  async function handleInputSubmit(e) {
    const organizerDetails = {
      email: inputValue,
      organizationId,
    };
    e.preventDefault();

    try {
      const response = await api.post("/organizations/organizers", {
        organizerDetails,
      });
      if (response) {
        console.log("organizer Submit resp", response);
        loadOrganization(organizationId, user._id);
        setInputValue("");
        setShowButtons(false);
        textInputRef.current.style.paddingBottom = "1.6rem";
      }
    } catch (err) {
      console.log(err);
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
  };

  // useEffect(() => {
  //   setInputValue(inputApiValue);
  // }, [inputApiValue]);

  return (
    <form className="form-type-1" onSubmit={handleInputSubmit}>
      <div className="material-textfield">
        <input
          ref={textInputRef}
          id="organizersEmail"
          type="email"
          name="organizersEmail"
          value={inputValue}
          onChange={handleInputChange}
          placeholder=" "
          onFocus={onInputFocus}
        />
        <label>+ Add organizer's email</label>
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
