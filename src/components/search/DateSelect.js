import { useState } from "react";
import BackIcon from "../icons/BackIcon";

export default function DateSelect({ close, setValue }) {
  const [date, setStartDate] = useState();

  return (
    <div className="filter-component">
      <button className="filter-back-button" onClick={close}>
        <BackIcon className="filter-icon" fill="#757575" />
        Filters
      </button>

      <h3 className="component-title">Dates</h3>

      <h4 className="component-label">Pick a Date</h4>
      <input
        onChange={(e) =>{
          setValue({ value: e.target.value, label: e.target.value })
          close()
        }
        }
        className="date-input"
        type="date"
      />
      {/* <h4 className="component-label">End Date</h4>
      <input className="date-input" type="date" /> */}
      <button
        onClick={() => {
          var future = new Date();
          future.setDate(future.getDate() + 7);
          
          setValue({value: future, label: "This Week"})
          close()
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
      </button>
    </div>
  );
}
