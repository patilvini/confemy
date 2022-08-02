import { useState } from "react";
import Select from "react-select";
import BackIcon from "../icons/BackIcon";
import NextIcon from "../icons/NextIcon";

const options = [
  { value: "physician", label: "Physician" },
  { value: "physicianAssistant", label: "Physician Assistant" },
  { value: "nursePractitioner", label: "Nurse Practitioner" },
  { value: "dentist", label: "Dentist" },
  { value: "nurse", label: "Nurse" },
  { value: "pharmacist", label: "Pharmacist" },
  { value: "physicalTherapist", label: "Physical Therapist" },
  { value: "occupationalTherapist", label: "Occupational Therapist" },
  { value: "speechTherapist", label: "Speech Therapist" },
  { value: "respiratoryTherapist", label: "Respiratory Therapist" },
  { value: "dietitian", label: "Dietitian" },
  { value: "socialWorker", label: "Social Worker" },
  { value: "caseManagement", label: "Case Management" },
  { value: "other", label: "Other" },
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
      close()
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
    <div className="filter-component">
      <button className="filter-back-button" onClick={close}>
        <BackIcon fill="#757575" className="filter-icon" />
        Filters
      </button>

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
