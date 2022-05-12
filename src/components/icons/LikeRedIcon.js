import React from 'react';

function LikeIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <title>icon/Favourite/Filled</title>
      <g
        id='icon/Favourite/Filled'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
      >
        <g id='favorite_black_24dp'>
          <polygon id='Path' points='0 0 24 0 24 24 0 24'></polygon>
          <path
            d='M13.35,20.13 C12.59,20.82 11.42,20.82 10.66,20.12 L10.55,20.02 C5.3,15.27 1.87,12.16 2,8.28 C2.06,6.58 2.93,4.95 4.34,3.99 C6.98,2.19 10.24,3.03 12,5.09 C13.76,3.03 17.02,2.18 19.66,3.99 C21.07,4.95 21.94,6.58 22,8.28 C22.14,12.16 18.7,15.27 13.45,20.04 L13.35,20.13 Z'
            id='Path'
            fill='#D8000C'
          ></path>
        </g>
      </g>
    </svg>
  );
}

export default LikeIcon;
