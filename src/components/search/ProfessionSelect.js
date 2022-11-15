import { useState } from "react";
import Select from "react-select";
import BackIcon from "../icons/BackIcon";
import { professions } from "../../utility/commonUtil";

export default function ProfessionSelect({ close, setValue }) {
  const [profession, setProfession] = useState();
  const [error, setError] = useState();

  return (
    <div className="filter-component">
      <div className="flex-container filter-back-button" onClick={close}>
        <div>
          <BackIcon fill="#757575" className="filter-icon" />
        </div>
        <div style={{ marginTop: ".7rem" }}> Filters</div>
      </div>

      <h3 className="component-title">Profession</h3>

      <Select
        options={professions}
        className="select-input"
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: "#4cb944",
            primary: "#08415c",
          },
        })}
        onChange={(e) => setProfession(e)}
      />
      <p style={{ color: "red", paddingBottom: "1rem" }}>{error}</p>
      <button
        className="button button-green"
        onClick={() => {
          if (profession) {
            setValue(profession);
            close();
          } else {
            setError("Please select a Profession");
          }
        }}
      >
        Set
      </button>
    </div>
  );
}
