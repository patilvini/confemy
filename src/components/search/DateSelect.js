import BackIcon from "../icons/BackIcon";

export default function DateSelect(props) {
  return (
    <div>
      <button className="filter-back-button" onClick={props.close}>
      <BackIcon className="icon-size"/> 
        Filters

      </button>
      
      <h3>Dates</h3>

      <h4>Start Date</h4>
      <input className="date-input" type="date" />
      <h4>End Date</h4>
      <input className="date-input" type="date" />
      <button onClick={() => console.log("this week")} className="buttons-date">
        This Week
      </button>
      <button onClick={() => console.log("this month")} className="buttons-date">
        This Month
      </button>
    </div>
  );
}
