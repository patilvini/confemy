import React from 'react';
import './switch.scss'

const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <label className="switch">
        <input type="checkbox" value={isOn} onChange={handleToggle}/>
        <span className="slider round"></span>
      </label>
    </>
  );
};

export default Switch;