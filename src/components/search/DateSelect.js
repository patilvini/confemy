import { useState } from "react";
import BackIcon from "../icons/BackIcon";

export default function DateSelect({ close, setValue }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState()

  const submit = () =>{
    const start = new Date(startDate);
    const end = new Date(endDate)


    
      setValue({value: {startDate: start, endDate: end} , label: startDate + " - " + endDate })
      close()
    

    

  }

  return (
    <div className="filter-component">
      <button className="filter-back-button" onClick={close}>
        <BackIcon className="filter-icon" fill="#757575" />
        Filters
      </button>

      <h3 className="component-title">Dates</h3>

      <h4 className="component-label">Start Date</h4>
      <input
        onChange={(e) =>{
          setStartDate(e.target.value)
         }
        }
        className="date-input"
        type="date"
      />
      <h4 className="component-label">End Date</h4>
      <input onChange={(e)=>{
        setEndDate(e.target.value)
      }} className="date-input" type="date" />
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

      <button onClick={submit} className="button button-green">Set</button>
    </div>
  );
}
