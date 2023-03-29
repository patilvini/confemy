import { useState } from "react";
import BackIcon from "../icons/BackIcon";

export default function DateSelect({ close, setValue }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [errorStart, setErrorStart] = useState();
  const [errorEnd, setErrorEnd] = useState();

  const submit = () => {
    if (!startDate) {
      setErrorStart("Please set a Start Date");
    } else {
      setErrorStart();
    }

    if (!endDate) {
      setErrorEnd("Please set an End Date");
    } else {
      setErrorEnd();
    }

    if (startDate && endDate) {
      const start = new Date(startDate).toISOString();
      const end = new Date(endDate).toISOString();
      setValue({
        startDate: start,
        endDate: end,
        label: startDate + " - " + endDate,
      });
      close();
    }
  };

  return (
    <div className="filter-component">
      <div className="flex-container filter-back-button" onClick={close}>
        <div>
          <BackIcon fill="#757575" className="filter-icon" />
        </div>
        <div style={{ marginTop: ".7rem" }}> Filters</div>
      </div>

      <h3 className="component-title">Dates</h3>

      <h4 className="component-label">Start Date</h4>
      <input
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
        className="date-input"
        type="date"
      />
      <p style={{ color: "red", paddingBottom: "1rem" }}>{errorStart}</p>
      <h4 className="component-label">End Date</h4>
      <input
        onChange={(e) => {
          setEndDate(e.target.value);
        }}
        className="date-input"
        type="date"
      />
      <p style={{ color: "red", paddingBottom: "1rem" }}>{errorEnd}</p>
      {/* <button
        onClick={() => {
          var today = new Date()
          var future = new Date();

          future.setDate(future.getDate() + 7);
          setStartDate(today)
          setEndDate(future)
          console.log({value: {startDate: startDate, endDate: endDate} , label: startDate + " - " + endDate })
          
          setValue({value: {startDate: startDate, endDate: endDate} , label: startDate + " - " + endDate })
          // close()
        }}
        className="buttons-date"
      >
        This Week
      </button>
      <button
        onClick={() => {
          var future = new Date();
          future.setDate(future.getDate() + 30);
          
          setValue({value: future, label: "This Month"})
          close()
        }}
        className="buttons-date"
      >
        This Month
      </button> */}

      <button onClick={submit} className="button button-green">
        Set
      </button>
    </div>
  );
}
