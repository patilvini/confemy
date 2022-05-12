import React, { Fragment } from 'react';

function LikeInactiveIcon({ className }) {
  return (
    <Fragment>
      <svg
        className={className}
        viewBox='0 0 24 24'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <title>icon/Favourite/Inactive</title>
        <g
          id='icon/Favourite/Inactive'
          stroke='none'
          strokeWidth='1'
          fill='none'
          fillRule='evenodd'
        >
          <g id='favorite_border_black_24dp'>
            <polygon id='Path' points='0 0 24 0 24 24 0 24'></polygon>
            <path
              d='M19.66,3.99 C17.02,2.19 13.76,3.03 12,5.09 C10.24,3.03 6.98,2.18 4.34,3.99 C2.94,4.95 2.06,6.57 2,8.28 C1.86,12.16 5.3,15.27 10.55,20.04 L10.65,20.13 C11.41,20.82 12.58,20.82 13.34,20.12 L13.45,20.02 C18.7,15.26 22.13,12.15 22,8.27 C21.94,6.57 21.06,4.95 19.66,3.99 L19.66,3.99 Z M12.1,18.55 L12,18.65 L11.9,18.55 C7.14,14.24 4,11.39 4,8.5 C4,6.5 5.5,5 7.5,5 C9.04,5 10.54,5.99 11.07,7.36 L12.94,7.36 C13.46,5.99 14.96,5 16.5,5 C18.5,5 20,6.5 20,8.5 C20,11.39 16.86,14.24 12.1,18.55 Z'
              id='Shape'
              fill='#C4C4C4'
            ></path>
          </g>
        </g>
      </svg>
    </Fragment>
  );
}

export default LikeInactiveIcon;
