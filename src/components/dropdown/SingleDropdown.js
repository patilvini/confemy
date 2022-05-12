import React, { useState, useEffect, useRef } from 'react';

const options = [
  { label: 'Browse Conferences', value: 'browseConfs' },
  { label: 'Organize Conferences', value: 'organizeConfs' },
  { label: 'Profile', value: 'profile' },
  { label: 'Saved Conferences', value: 'savedConfs' },
  { label: 'Passes', value: 'passes' },
  { label: 'Help', value: 'help' },
  { label: 'Account Settings', value: 'setting' },
  { label: 'Logout', value: 'logout' },
];

function SingleDropdown() {
  const [selected, setSelected] = useState(options[0]);
  const [openDropdown, setOpenDropdown] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) return;
      setOpenDropdown(false);
    };

    document.body.addEventListener('click', onBodyClick, { capture: true });
    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const renderOptions = options.map((option) => (
    <div
      onClick={() => setSelected(option)}
      key={option.value}
      className='item'
    >
      {option.label}
    </div>
  ));
  return (
    <div className='container'>
      <div ref={ref}>
        <label>Main label</label>
        <div onClick={() => setOpenDropdown(!openDropdown)}>
          <div>
            {selected.label} <i>V</i>
          </div>
          <div
            // onClick={(e) => e.stopPropagation()}
            className={openDropdown ? '' : 'display-none'}
          >
            {renderOptions}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleDropdown;
