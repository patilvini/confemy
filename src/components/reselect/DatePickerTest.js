import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatePickerTest = ({ props }) => {
  return (
    <DatePicker
      selected={props?.startDate}
      onChange={(date) => props.setStartDate(date)}
    />
  );
};

export default DatePickerTest;
