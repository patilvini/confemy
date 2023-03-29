import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./customDatepicker.styles.scss";

export default function CustomDatepicker({
  id,
  name,
  selected,
  onChange,
  minDate,
  maxDate,
  disabled,
  placeholder,
}) {
  return (
    <div className="custom-datepicker-wrap">
      <DatePicker
        id={id}
        name={name}
        selected={selected}
        onChange={onChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={5}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={minDate}
        maxDate={maxDate}
        showMonthDropdown
        useShortMonthInDropdown
        isClearable
        placeholderText={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
