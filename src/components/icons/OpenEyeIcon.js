import React, { Fragment } from 'react';

function OpenEyeIcon({ className }) {
  return (
    <Fragment>
      <svg
        className={className}
        viewBox='0 0 24 24'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <title>icon/show</title>
        <g
          id='icon/show'
          stroke='none'
          strokeWidth='1'
          fill='none'
          fillRule='evenodd'
        >
          <g id='visibility_black_24dp'>
            <polygon id='Path' points='0 0 24 0 24 24 0 24'></polygon>
            <path
              d='M12,4 C7,4 2.73,7.11 1,11.5 C2.73,15.89 7,19 12,19 C17,19 21.27,15.89 23,11.5 C21.27,7.11 17,4 12,4 Z M12,16.5 C9.24,16.5 7,14.26 7,11.5 C7,8.74 9.24,6.5 12,6.5 C14.76,6.5 17,8.74 17,11.5 C17,14.26 14.76,16.5 12,16.5 Z M12,8.5 C10.34,8.5 9,9.84 9,11.5 C9,13.16 10.34,14.5 12,14.5 C13.66,14.5 15,13.16 15,11.5 C15,9.84 13.66,8.5 12,8.5 Z'
              id='Shape'
              fill='#757575'
              fillRule='nonzero'
            ></path>
          </g>
        </g>
      </svg>
    </Fragment>
  );
}

export default OpenEyeIcon;
