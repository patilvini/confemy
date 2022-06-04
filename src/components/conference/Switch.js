import React from 'react';
import './switch.scss'

const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <label class="switch">
        <input type="checkbox" value={isOn} onChange={handleToggle}/>
        <span class="slider round"></span>
      </label>
    </>
  );
};

export default Switch;