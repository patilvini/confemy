import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./onlyDatePicker.styles.scss";

export default function OnlyDatepicker({
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
        name={name}
        selected={selected}
        onChange={onChange}
        dateFormat="MM/dd/yy"
        minDate={minDate}
        maxDate={maxDate}
        showMonthDropdown
        useShortMonthInDropdown
        isClearable
        placeholderText={placeholder}
        disabled={disabled}
        autoComplete="off"
      />
    </div>
  );
}
