import { useState } from "react";
import Select from "react-select";
import BackIcon from "../icons/BackIcon";

const options = [
  { value: "ama", label: "AMA" },
  { value: "aecp", label: "AECP" },
];

export default function CreditsSelect({ close, setValue }) {
  const [type, setType] = useState();
  const [amount, setAmount] = useState();
  const [errorAmount, setErrorAmount] = useState();
  const [errorSelect, setErrorSelect] = useState();

  const submit = () => {
    if (type && amount) {
      setValue({
        value: { type: type, amount: amount },
        label: type.label + ", " + amount,
      });
      close();
    }
    if (!type) {
      setErrorSelect("Please select a Credit Type");
    } else {
      setErrorSelect();
    }
    if (!amount) {
      setErrorAmount("Please enter an Amount");
    } else {
      setErrorAmount();
    }
  };

  return (
    <div className="filter-component ">
      <div className="flex-container filter-back-button" onClick={close}>
        <div>
          <BackIcon fill="#757575" className="filter-icon" />
        </div>
        <div style={{ marginTop: ".7rem" }}> Filters</div>
      </div>

      <h3 className="component-title">Credits</h3>

      {/* <h4 style={{marginTop:'2rem'}} className="component-label">Type</h4> */}
      <Select
        options={options}
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
        onChange={(e) => setType(e)}
      />
      <p style={{ color: "red", paddingBottom: "1rem" }}>{errorSelect}</p>

      <h4 className="component-label">Amount</h4>

      <input
        onChange={(e) => setAmount(e.target.value)}
        className="date-input"
        type="number"
      />
      <p style={{ color: "red", paddingBottom: "1rem" }}>{errorAmount}</p>

      <button
        className="button button-green"
        onClick={() => {
          submit();
        }}
      >
        set
      </button>
    </div>
  );
}
